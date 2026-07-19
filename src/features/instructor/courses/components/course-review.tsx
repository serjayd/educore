"use client";

import { Button } from "@/components/ui/button";
import { useCreateCourseStore } from "../store";

import { createCourse } from "../actions";
import { toast } from "sonner";
import { publishCourseSchema } from "../schemas";
import { useRouter } from "next/navigation";

interface CourseReviewProps {
  onBack: () => void;
}

export default function CourseReview({ onBack }: CourseReviewProps) {
  const { curriculum, details, resetCourse } = useCreateCourseStore();

  const totalLessons = curriculum.sections.reduce(
    (total, section) => total + section.lessons.length,
    0,
  );

  const router = useRouter();

  const handleSave = async (status: "DRAFT" | "PUBLISHED") => {
    if (status === "PUBLISHED") {
      const result = publishCourseSchema.safeParse({
        ...details,
        curriculum,
      });

      if (!result.success) {
        toast.error(result.error.issues[0].message);
        return;
      }
    }

    const course = await createCourse({
      ...details,
      curriculum,
      status,
    });

    if (!course) {
      toast.error("Something went wrong");
      return;
    }

    resetCourse();

    if (status === "PUBLISHED") {
      toast.success("Course has been published");
    } else {
      toast.success("Course has been saved as draft");
    }

    router.push("/instructor/courses");
  };

  return (
    <div className="border border-border rounded-2xl p-4 space-y-4">
      <div className="text-center">
        <h2 className="font-display text-xl mb-2 font-bold text-foreground">
          {details.title ? details.title : "Untitled Course"}
        </h2>

        <p className="text-muted-foreground text-sm mb-4">
          {curriculum.sections.length} sections · {totalLessons} lessons · £
          {details.price}
        </p>
        <p className="text-muted-foreground text-sm">
          Review your course details and curriculum. <br /> Once published,
          students can enroll right away.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-2 justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>

        <div className="flex flex-col md:flex-row gap-2 ">
          <Button variant="outline" onClick={() => handleSave("DRAFT")}>
            Save as Draft
          </Button>

          <Button onClick={() => handleSave("PUBLISHED")}>
            Publish Course
          </Button>
        </div>
      </div>
    </div>
  );
}
