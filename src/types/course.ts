export type TCourse = {
  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string | null;
  banner: string | null;
  category:
    | "WEB_DEVELOPMENT"
    | "MOBILE_DEVELOPMENT"
    | "BACKEND_ENGINEERING"
    | "DATA_SCIENCE"
    | "CYBERSECURITY"
    | "DEVOPS"
    | "GAME_DEVELOPMENT"
    | "DESIGN";
  price: number;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  authorId: string;
};

export type CreateCourseInput = {
  title: string;
  price: number;
  description?: string;

  category:
    | "WEB_DEVELOPMENT"
    | "MOBILE_DEVELOPMENT"
    | "BACKEND_ENGINEERING"
    | "DATA_SCIENCE"
    | "CYBERSECURITY"
    | "DEVOPS"
    | "GAME_DEVELOPMENT"
    | "DESIGN";

  level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

  status: "DRAFT" | "PUBLISHED";

  curriculum: {
    sections: {
      title: string;
      lessons: {
        title: string;
        type: "VIDEO" | "ARTICLE";
      }[];
    }[];
  };
};
