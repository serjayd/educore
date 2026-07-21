import Container from "@/components/shared/container";
import PageHeading from "@/components/shared/page-heading";
import CoursesClient from "@/features/courses/components/courses-client";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          enrollments: true,
          reviews: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const session = await getSession();

  const userCourses = await prisma.enrollment.findMany({
    where: {
      userId: session?.user.id,
    },
    select: {
      courseId: true,
    },
  });

  const cartItems = session?.user?.id
    ? await prisma.cartItem.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          courseId: true,
        },
      })
    : [];

  return (
    <Container className="py-8">
      <PageHeading
        title="Explore courses"
        subtitle={`${courses.length} courses to help you learn something new`}
      />
      <CoursesClient
        courses={courses}
        userCourses={userCourses}
        cartItems={cartItems}
      />
    </Container>
  );
}
