"use server";

import prisma from "@/lib/prisma";
import { requireSession } from "@/lib/session";
import { CreateCourseInput } from "@/types/course";
import { revalidatePath } from "next/cache";

export async function createCourse(data: CreateCourseInput) {
  const session = await requireSession();

  if (!session || !session.user) return null;

  const course = await prisma.course.create({
    data: {
      title: data.title,

      description: data.description,

      price: data.price,

      banner: data.banner,

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

              videoUrl: lesson.videoUrl,

              content: lesson.content,

              description: lesson.description,

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

export async function archiveCourse(courseId: string) {
  try {
    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        status: "ARCHIVED",
      },
    });

    revalidatePath("/instructor/courses");

    return {
      success: true,
      course,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to archive course",
    };
  }
}

export async function restoreCourse(courseId: string) {
  try {
    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        status: "DRAFT",
      },
    });

    revalidatePath("/instructor/courses");

    return {
      success: true,
      course,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to restore course",
    };
  }
}

export async function publishCourse(courseId: string) {
  try {
    const course = await prisma.course.update({
      where: {
        id: courseId,
      },
      data: {
        status: "PUBLISHED",
      },
    });

    revalidatePath("/instructor/courses");

    return {
      success: true,
      course,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to publish course",
    };
  }
}

export async function deleteCourse(courseId: string) {
  try {
    const course = await prisma.course.delete({
      where: {
        id: courseId,
      },
    });

    revalidatePath("/instructor/courses");

    return {
      success: true,
      course,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to delete course",
    };
  }
}
