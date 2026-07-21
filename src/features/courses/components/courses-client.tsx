"use client";

import { TCourseWithDetails } from "@/types/course";
import CoursesList from "./courses-list";
import { useState } from "react";
import FilterCourses from "./filter-courses";

interface CoursesClientProps {
  courses: TCourseWithDetails[];
  userCourses:
    | {
        courseId: string;
      }[]
    | null;
  cartItems:
    | {
        courseId: string;
      }[]
    | null;
}

export default function CoursesClient({
  courses,
  userCourses,
  cartItems,
}: CoursesClientProps) {
  const [filteredCourses, setFilteredCourses] = useState(courses);

  return (
    <div className="grid md:grid-cols-4 mt-8 gap-4">
      <FilterCourses
        courses={courses}
        setFilteredCourses={setFilteredCourses}
      />

      <CoursesList
        filteredCourses={filteredCourses}
        userCourses={userCourses}
        cartItems={cartItems}
      />
    </div>
  );
}
