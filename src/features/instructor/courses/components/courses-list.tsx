import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TCourse } from "@/types/course";
import CourseTable from "./course-table";

interface CoursesListProps {
  courses: TCourse[];
}

export default function CoursesList({ courses }: CoursesListProps) {
  return (
    <Tabs defaultValue="all" className="mt-8 w-full">
      <TabsList className="grid w-full grid-cols-2 gap-2 md:flex md:w-fit">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="published">Published</TabsTrigger>
        <TabsTrigger value="drafts">Drafts</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="mt-6 md:mt-0">
        <CourseTable courses={courses} />
      </TabsContent>

      <TabsContent value="published" className="mt-6 md:mt-0">
        <CourseTable
          courses={courses.filter((course) => course.status === "PUBLISHED")}
        />
      </TabsContent>

      <TabsContent value="drafts" className="mt-6 md:mt-0">
        <CourseTable
          courses={courses.filter((course) => course.status === "DRAFT")}
        />
      </TabsContent>

      <TabsContent value="archived" className="mt-6 md:mt-0">
        <CourseTable
          courses={courses.filter((course) => course.status === "ARCHIVED")}
        />
      </TabsContent>
    </Tabs>
  );
}
