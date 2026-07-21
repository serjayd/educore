import { z } from "zod";

export const categorySchema = z.enum([
  "WEB_DEVELOPMENT",
  "MOBILE_DEVELOPMENT",
  "BACKEND_ENGINEERING",
  "DATA_SCIENCE",
  "CYBERSECURITY",
  "DEVOPS",
  "GAME_DEVELOPMENT",
  "DESIGN",
]);

export const levelSchema = z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]);

export const lessonTypeSchema = z.enum(["VIDEO", "ARTICLE"]);

export const courseDetailsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),

  description: z.string().optional(),

  banner: z.instanceof(File).optional(),

  category: categorySchema,

  price: z.number().min(0),

  level: levelSchema,
});

export const lessonSchema = z.object({
  id: z.string(),

  title: z.string().min(3),

  description: z.string().optional(),

  type: lessonTypeSchema,

  videoUrl: z.string().optional(),

  content: z.string().optional(),

  position: z.number(),

  isFree: z.boolean(),
});

export const sectionSchema = z.object({
  id: z.string(),

  title: z.string().min(3),

  position: z.number(),

  lessons: z.array(lessonSchema),
});

export const curriculumSchema = z.object({
  sections: z.array(sectionSchema),
});

export const publishCourseSchema = z.object({
  title: z.string().min(3, "Course title is required"),

  description: z.string().optional(),

  category: z.string().min(1, "Category is required"),

  level: z.string().min(1, "Level is required"),

  price: z.number().min(0),

  banner: z.instanceof(File).optional(),

  curriculum: z.object({
    sections: z
      .array(
        z.object({
          title: z.string().min(1, "Section title is required"),

          lessons: z
            .array(
              z.object({
                title: z.string().min(1, "Lesson title is required"),
              }),
            )
            .min(1, "Section needs at least one lesson"),
        }),
      )
      .min(1, "Course needs at least one section"),
  }),
});

export type CourseDetailsInput = z.infer<typeof courseDetailsSchema>;

export type CurriculumInput = z.infer<typeof curriculumSchema>;
