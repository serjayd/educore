import { Category, Level, Status, LessonType } from "@/generated/prisma/client";

export const CategoryLabel: Record<Category, string> = {
  WEB_DEVELOPMENT: "Web Development",
  MOBILE_DEVELOPMENT: "Mobile Development",
  BACKEND_ENGINEERING: "Backend Engineering",
  DATA_SCIENCE: "Data Science",
  CYBERSECURITY: "Cybersecurity",
  DEVOPS: "DevOps",
  GAME_DEVELOPMENT: "Game Development",
  DESIGN: "Design",
};

export const LevelLabel: Record<Level, string> = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
};

export const StatusLabel: Record<Status, string> = {
  DRAFT: "Draft",
  PUBLISHED: "Published",
  ARCHIVED: "Archived",
};

export const LessonTypeLabel: Record<LessonType, string> = {
  VIDEO: "Video",
  ARTICLE: "Article",
};
