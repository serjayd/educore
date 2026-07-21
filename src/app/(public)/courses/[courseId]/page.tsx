import Container from "@/components/shared/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SingleCourseCTA from "@/features/courses/components/single-course-cta";
import {
  CategoryLabel,
  LessonTypeLabel,
} from "@/features/instructor/courses/constants";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { BookOpen, Check, Video } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface CoursePageProps {
  params: Promise<{
    courseId: string;
  }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },

    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },

      sections: {
        include: {
          lessons: true,
        },
      },

      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },

      _count: {
        select: {
          reviews: true,
          sections: true,
        },
      },
    },
  });

  const session = await getSession();

  const isOwned = session?.user?.id
    ? await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId,
          },
        },
      })
    : null;

  const isInCart = session?.user?.id
    ? await prisma.cartItem.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId,
          },
        },
      })
    : null;

  if (!course) {
    notFound();
  }

  const totalLessons = course.sections.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );

  const totalSections = course.sections.length;

  return (
    <Container className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 items-start">
      {/* LEFT CONTENT */}
      <section className="md:col-span-3 space-y-8">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            {CategoryLabel[course.category]}
          </span>

          <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            {course.title}
          </h1>

          {course.description && (
            <p className="mt-2 text-muted-foreground">{course.description}</p>
          )}

          <div className="relative h-80 w-full mt-6">
            <Image
              fill
              src={course.banner ?? "/placeholder-course.jpg"}
              alt={course.title}
              className="object-cover rounded-2xl"
            />
          </div>
        </div>

        {/* COURSE CONTENT */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-2xl font-bold">Course content</h2>

            <p className="text-sm text-muted-foreground">
              {totalSections} sections · {totalLessons} lessons
            </p>
          </div>

          <Accordion
            type="multiple"
            className="border border-border rounded-xl p-4"
          >
            {course.sections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger>{section.title}</AccordionTrigger>

                <AccordionContent>
                  <ul className="space-y-2">
                    {section.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <span>{lesson.title}</span>

                        <span className="text-sm text-muted-foreground">
                          {LessonTypeLabel[lesson.type]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* INSTRUCTOR */}
        <div>
          <h2 className="font-display text-2xl font-bold">Instructor</h2>

          <div className="flex items-center gap-4 mt-4 border border-border rounded-xl p-4">
            {course.author.image ? (
              <Image
                src={course.author.image}
                alt={course.author.name}
                width={48}
                height={48}
                className="rounded-full"
              />
            ) : (
              <div className="size-12 rounded-full bg-gradient-primary text-muted flex items-center justify-center">
                {course.author.name.charAt(0)}
              </div>
            )}

            <div>
              <h3 className="font-semibold">{course.author.name}</h3>

              <p className="text-sm text-muted-foreground">
                Instructor on EduCore
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT PURCHASE CARD */}
      <section className="md:col-span-1">
        <div className="sticky top-8">
          <div className="border border-border rounded-2xl overflow-hidden">
            <div className="relative h-40 w-full">
              <Image
                fill
                src={course.banner ?? "/placeholder-course.jpg"}
                alt={course.title}
                className="object-cover"
              />
            </div>

            <div className="p-4">
              <p className="font-display text-3xl font-bold">£{course.price}</p>
              <SingleCourseCTA
                courseId={course.id}
                owned={!!isOwned}
                inCart={!!isInCart}
              />
              <p className="mt-3 text-center text-xs text-muted-foreground">
                30-day money-back guarantee
              </p>
              <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <BookOpen className="size-4" />
                  {totalLessons} on-demand lessons
                </li>

                <li className="flex items-center gap-2">
                  <Video className="size-4" />
                  Video, articles & quiz content
                </li>

                <li className="flex items-center gap-2">
                  <Check className="size-4" />
                  Full lifetime access
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
