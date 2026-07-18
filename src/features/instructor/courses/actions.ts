"use server";

import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";

type CreateCourseInput = {
  title: string;
  price: number;
  description?: string;

  category:
    | "WEB_DEVELOPMENT"
    | "MOBILE_DEVELOPMENT"
    | "BACKEND_ENGINEERING"
    | "DATA_SCIENCE"
    | "CYBERSECURITY"
    | "DEVOPS"
    | "GAME_DEVELOPMENT"
    | "DESIGN";

  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

  status: "DRAFT" | "PUBLISHED";

  curriculum: {
    sections: {
      title: string;
      lessons: {
        title: string;
        type: "VIDEO" | "ARTICLE";
      }[];
    }[];
  };
};

export async function createCourse(data: CreateCourseInput) {
  const session = await requireSession();

  if (!session || !session.user) return null;

  const course = await prisma.course.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,

      category: data.category,
      level: data.level,

      status: data.status,

      author: {
        connect: {
          id: session.user.id,
        },
      },

      sections: {
        create: data.curriculum.sections.map((section, index) => ({
          title: section.title,

          position: index + 1,

          lessons: {
            create: section.lessons.map((lesson, lessonIndex) => ({
              title: lesson.title,

              type: lesson.type,

              position: lessonIndex + 1,
            })),
          },
        })),
      },
    },

    include: {
      sections: {
        include: {
          lessons: true,
        },
      },
    },
  });

  return course;
}
