import Container from "@/components/shared/container";
import PageHeading from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import CoursesList from "@/features/instructor/courses/components/courses-list";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function InstructorCoursesPage() {
  const session = await getSession();

  if (!session || !session.user) return null;

  const courses = await prisma.course.findMany({
    where: {
      authorId: session.user.id,
    },
  });

  return (
    <section>
      <Container>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <PageHeading
            title="Your Courses"
            subtitle="Create, edit and track your courses"
          />
          <Button variant="default" size="lg" asChild>
            <Link
              href="/instructor/courses/new"
              className="mt-2 sm:mt-0 w-full sm:w-fit"
            >
              <Plus /> New Course
            </Link>
          </Button>
        </div>
        <CoursesList courses={courses} />
      </Container>
    </section>
  );
}
