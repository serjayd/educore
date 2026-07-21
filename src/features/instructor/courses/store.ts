import { create } from "zustand";
import { CourseDetailsInput, CurriculumInput } from "./schemas";

type CreateCourseStore = {
  details: CourseDetailsInput;

  curriculum: CurriculumInput;

  setDetails: (data: Partial<CourseDetailsInput>) => void;

  addSection: () => void;

  updateSection: (id: string, title: string) => void;

  removeSection: (id: string) => void;

  addLessonVideo: (sectionId: string) => void;

  addLessonArticle: (sectionId: string) => void;

  updateLesson: (
    sectionId: string,
    lessonId: string,
    data: Partial<{
      title: string;
      videoUrl: string;
      content: string;
      description: string;
    }>,
  ) => void;

  removeLesson: (sectionId: string, lessonId: string) => void;

  resetCourse: () => void;
};

const initialDetails: CourseDetailsInput = {
  title: "",

  description: "",

  banner: undefined,

  category: "WEB_DEVELOPMENT",

  level: "BEGINNER",

  price: 0,
};

const initialCurriculum: CurriculumInput = {
  sections: [],
};

export const useCreateCourseStore = create<CreateCourseStore>((set) => ({
  details: initialDetails,

  curriculum: initialCurriculum,

  setDetails: (data) =>
    set((state) => ({
      details: {
        ...state.details,
        ...data,
      },
    })),

  // CREATE SECTION

  addSection: () =>
    set((state) => ({
      curriculum: {
        sections: [
          ...state.curriculum.sections,

          {
            id: crypto.randomUUID(),

            title: `New Section ${state.curriculum.sections.length + 1}`,

            position: state.curriculum.sections.length + 1,

            lessons: [],
          },
        ],
      },
    })),

  // UPDATE SECTION TITLE

  updateSection: (id, title) =>
    set((state) => ({
      curriculum: {
        sections: state.curriculum.sections.map((section) =>
          section.id === id
            ? {
                ...section,
                title,
              }
            : section,
        ),
      },
    })),

  // DELETE SECTION

  removeSection: (id) =>
    set((state) => ({
      curriculum: {
        sections: state.curriculum.sections.filter(
          (section) => section.id !== id,
        ),
      },
    })),

  // CREATE LESSON

  addLessonVideo: (sectionId) =>
    set((state) => ({
      curriculum: {
        sections: state.curriculum.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,

                lessons: [
                  ...section.lessons,

                  {
                    id: crypto.randomUUID(),

                    title: `Untitled lesson`,

                    type: "VIDEO",

                    position: section.lessons.length + 1,

                    isFree: false,
                  },
                ],
              }
            : section,
        ),
      },
    })),

  addLessonArticle: (sectionId) =>
    set((state) => ({
      curriculum: {
        sections: state.curriculum.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,

                lessons: [
                  ...section.lessons,

                  {
                    id: crypto.randomUUID(),

                    title: `Untitled lesson`,

                    type: "ARTICLE",

                    position: section.lessons.length + 1,

                    isFree: false,

                    content: "",
                  },
                ],
              }
            : section,
        ),
      },
    })),

  // UPDATE LESSON TITLE

  updateLesson: (sectionId, lessonId, data) =>
    set((state) => ({
      curriculum: {
        sections: state.curriculum.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                lessons: section.lessons.map((lesson) =>
                  lesson.id === lessonId
                    ? {
                        ...lesson,
                        ...data,
                      }
                    : lesson,
                ),
              }
            : section,
        ),
      },
    })),

  // DELETE LESSON

  removeLesson: (sectionId, lessonId) =>
    set((state) => ({
      curriculum: {
        sections: state.curriculum.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,

                lessons: section.lessons.filter(
                  (lesson) => lesson.id !== lessonId,
                ),
              }
            : section,
        ),
      },
    })),
  resetCourse: () =>
    set({
      details: {
        title: "",
        description: "",
        category: "WEB_DEVELOPMENT",
        level: "BEGINNER",
        price: 0,
        banner: undefined,
      },

      curriculum: {
        sections: [],
      },
    }),
}));
