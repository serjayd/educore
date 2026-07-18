import Container from "@/components/shared/container";
import PageHeading from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function InstructorCoursesPage() {
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
      </Container>
    </section>
  );
}
