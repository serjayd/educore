"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  CategoryLabel,
  LevelLabel,
} from "@/features/instructor/courses/constants";
import { TCourseWithDetails } from "@/types/course";
import { Search, SlidersHorizontal } from "lucide-react";

interface FilterCoursesProps {
  courses: TCourseWithDetails[];
  setFilteredCourses: (courses: TCourseWithDetails[]) => void;
}

export default function FilterCourses({
  courses,
  setFilteredCourses,
}: FilterCoursesProps) {
  const [search, setSearch] = useState("");

  const [selectedLevel, setSelectedLevel] = useState<string>("ALL");

  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  useEffect(() => {
    const filtered = courses.filter((course) => {
      const searchMatch = course.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const levelMatch =
        selectedLevel === "ALL" ? true : course.level === selectedLevel;

      const categoryMatch =
        selectedCategory === "ALL"
          ? true
          : course.category === selectedCategory;

      return searchMatch && levelMatch && categoryMatch;
    });

    setFilteredCourses(filtered);
  }, [search, selectedLevel, selectedCategory, courses, setFilteredCourses]);

  return (
    <section className="col-span-1 space-y-6">
      {/* SEARCH */}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

        <Input
          type="text"
          placeholder="Search courses..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* LEVEL */}

      <Field>
        <FieldLabel>
          <SlidersHorizontal className="size-4" />
          Level
        </FieldLabel>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant={selectedLevel === "ALL" ? "default" : "secondary"}
            onClick={() => setSelectedLevel("ALL")}
          >
            All
          </Button>

          {Object.entries(LevelLabel).map(([value, label]) => (
            <Button
              key={value}
              type="button"
              variant={selectedLevel === value ? "default" : "secondary"}
              onClick={() => setSelectedLevel(value)}
            >
              {label}
            </Button>
          ))}
        </div>
      </Field>

      {/* CATEGORY */}

      <Field>
        <FieldLabel>
          <SlidersHorizontal className="size-4" />
          Category
        </FieldLabel>

        <Button
          type="button"
          variant={selectedCategory === "ALL" ? "default" : "secondary"}
          onClick={() => setSelectedCategory("ALL")}
        >
          All Categories
        </Button>

        {Object.entries(CategoryLabel).map(([value, label]) => (
          <Button
            key={value}
            type="button"
            variant={selectedCategory === value ? "default" : "secondary"}
            onClick={() => setSelectedCategory(value)}
          >
            {label}
          </Button>
        ))}
      </Field>
    </section>
  );
}
