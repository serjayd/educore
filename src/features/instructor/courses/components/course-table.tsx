import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TCourse } from "@/types/course";
import { CategoryLabel, LevelLabel, StatusLabel } from "../constants";
import { cn } from "@/lib/utils";
import CourseActions from "./course-actions";

interface CourseTableProps {
  courses: TCourse[];
}

export default function CourseTable({ courses }: CourseTableProps) {
  return (
    <>
      {/* MOBILE CARD VIEW */}
      <div className="mt-4 space-y-4 md:hidden">
        {courses.length === 0 ? (
          <div className="rounded-2xl border border-border p-6 text-center text-muted-foreground">
            No courses yet.
          </div>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="rounded-2xl border border-border p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="max-w-55 truncate font-semibold">
                  {course.title}
                </h3>

                <CourseActions courseId={course.id} status={course.status} />
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>

                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      course.status === "PUBLISHED" &&
                        "bg-chart-4/20 text-chart-4",
                      course.status === "DRAFT" &&
                        "bg-muted-foreground/20 text-muted-foreground",
                      course.status === "ARCHIVED" &&
                        "bg-chart-5/20 text-chart-5",
                    )}
                  >
                    {StatusLabel[course.status]}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span>{CategoryLabel[course.category]}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span>{LevelLabel[course.level]}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-semibold">£{course.price}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DESKTOP TABLE VIEW */}
      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-border md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-75">Course</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="max-w-62.5 truncate font-medium">
                  {course.title}
                </TableCell>

                <TableCell>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      course.status === "PUBLISHED" &&
                        "bg-chart-4/20 text-chart-4",
                      course.status === "DRAFT" &&
                        "bg-muted-foreground/20 text-muted-foreground",
                      course.status === "ARCHIVED" &&
                        "bg-chart-5/20 text-chart-5",
                    )}
                  >
                    {StatusLabel[course.status]}
                  </span>
                </TableCell>

                <TableCell>{CategoryLabel[course.category]}</TableCell>

                <TableCell>{LevelLabel[course.level]}</TableCell>

                <TableCell className="font-semibold">£{course.price}</TableCell>

                <TableCell className="text-right">
                  <CourseActions courseId={course.id} status={course.status} />
                </TableCell>
              </TableRow>
            ))}

            {courses.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No courses yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
