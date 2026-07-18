"use client";

import Container from "@/components/shared/container";
import PageHeading from "@/components/shared/page-heading";
import { Button } from "@/components/ui/button";
import CourseCurriculum from "@/features/instructor/courses/components/course-curriculum";
import CourseDetails from "@/features/instructor/courses/components/course-details";
import CoursePricing from "@/features/instructor/courses/components/course-pricing";
import CourseReview from "@/features/instructor/courses/components/course-review";
import { cn } from "@/lib/utils";
import { useState } from "react";

const steps = [
  {
    label: "Course Details",
    component: <CourseDetails />,
  },
  {
    label: "Curriculum",
    component: <CourseCurriculum />,
  },
  {
    label: "Pricing",
    component: <CoursePricing />,
  },
  {
    label: "Review",
    component: <CourseReview />,
  },
];

export default function NewCoursesPage() {
  const [step, setStep] = useState(0);

  return (
    <section>
      <Container className="max-w-5xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <PageHeading title="Create a course" />
          <Button variant="outline" size="lg">
            Save draft
          </Button>
        </div>
        <div className="my-8 flex border-b">
          {steps.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setStep(index)}
              className={cn(
                "border-b-2 px-4 py-3 text-sm font-medium w-full",
                step === index
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mb-8">{steps[step].component}</div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setStep((prev) => Math.max(prev - 1, 0))}
            disabled={step === 0}
          >
            Back
          </Button>

          <Button
            size="lg"
            onClick={() =>
              setStep((prev) => Math.min(prev + 1, steps.length - 1))
            }
          >
            {step === steps.length - 1 ? "Publish Course" : "Continue"}
          </Button>
        </div>
      </Container>
    </section>
  );
}
