import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateCourseStore } from "../store";
import { CourseDetailsInput, courseDetailsSchema } from "../schemas";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryLabel, LevelLabel } from "../constants";
import { Button } from "@/components/ui/button";

interface CourseDetailsProps {
  onNext: () => void;
}

export default function CourseDetails({ onNext }: CourseDetailsProps) {
  const details = useCreateCourseStore((state) => state.details);

  const setDetails = useCreateCourseStore((state) => state.setDetails);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<CourseDetailsInput>({
    resolver: zodResolver(courseDetailsSchema),

    defaultValues: details,
  });

  const category = useWatch({
    control,
    name: "category",
  });

  const level = useWatch({
    control,
    name: "level",
  });

  function onSubmit(data: CourseDetailsInput) {
    setDetails(data);

    onNext();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border border-border rounded-2xl p-4 space-y-4"
    >
      <Field>
        <FieldLabel htmlFor="title">Course Title</FieldLabel>
        <Input
          type="text"
          id="title"
          placeholder="e.g., The Complete Web Development Bootcamp"
          {...register("title")}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </Field>
      <Field>
        <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
        <Textarea
          id="description"
          placeholder="What will students learn?"
          className="resize-none h-30"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description.message}</p>
        )}
      </Field>
      <Field>
        <FieldLabel htmlFor="banner">Banner (optional)</FieldLabel>
        <Input
          id="banner"
          type="file"
          accept="image/*"
          onChange={(e) => {
            setValue("banner", e.target.files?.[0]);
          }}
        />
      </Field>
      <div className="grid md:grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="category">Category</FieldLabel>
          <Select
            value={category}
            onValueChange={(value) =>
              setValue("category", value as CourseDetailsInput["category"])
            }
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>

            <SelectContent>
              {Object.entries(CategoryLabel).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="level">Level</FieldLabel>
          <Select
            value={level}
            onValueChange={(value) =>
              setValue("level", value as CourseDetailsInput["level"])
            }
          >
            <SelectTrigger id="level">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>

            <SelectContent>
              {Object.entries(LevelLabel).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </div>
      <div className="flex justify-end">
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
