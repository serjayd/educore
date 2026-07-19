"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { courseDetailsSchema } from "../schemas";
import { z } from "zod";
import { useCreateCourseStore } from "../store";
import { PoundSterling } from "lucide-react";

interface CoursePricingProps {
  onNext: () => void;
  onBack: () => void;
}

const coursePricingSchema = courseDetailsSchema.pick({
  price: true,
});

type CoursePricingFormValues = z.infer<typeof coursePricingSchema>;

export default function CoursePricing({ onNext, onBack }: CoursePricingProps) {
  const { details, setDetails } = useCreateCourseStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CoursePricingFormValues>({
    resolver: zodResolver(coursePricingSchema),

    defaultValues: {
      price: details.price ?? 0,
    },
  });

  const onSubmit = (data: CoursePricingFormValues) => {
    setDetails({
      price: data.price,
    });

    onNext();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-border rounded-2xl p-4 space-y-4"
    >
      <Field>
        <FieldLabel htmlFor="price">Course Price</FieldLabel>

        <div className="relative">
          <PoundSterling className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="price"
            type="number"
            placeholder="49.99"
            className="pl-9"
            {...register("price", {
              valueAsNumber: true,
            })}
          />
        </div>

        {errors.price && (
          <p className="text-sm text-red-500">{errors.price.message}</p>
        )}
      </Field>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>

        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
