"use client";

import { useState } from "react";

import Container from "@/components/shared/container";
import PageHeading from "@/components/shared/page-heading";

import CourseDetails from "@/features/instructor/courses/components/course-details";
import CourseCurriculum from "@/features/instructor/courses/components/course-curriculum";
import CoursePricing from "@/features/instructor/courses/components/course-pricing";
import CourseReview from "@/features/instructor/courses/components/course-review";

import { cn } from "@/lib/utils";

export default function NewCoursesPage() {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const steps = [
    {
      label: "Course Details",
      component: <CourseDetails onNext={nextStep} />,
    },
    {
      label: "Curriculum",
      component: <CourseCurriculum onNext={nextStep} onBack={prevStep} />,
    },
    {
      label: "Pricing",
      component: <CoursePricing onNext={nextStep} onBack={prevStep} />,
    },
    {
      label: "Review",
      component: <CourseReview onBack={prevStep} />,
    },
  ];

  return (
    <section>
      <Container className="max-w-5xl">
        <PageHeading title="Create a course" />

        <div className="my-8 flex border-b">
          {steps.map((item, index) => (
            <button
              key={item.label}
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
      </Container>
    </section>
  );
}
