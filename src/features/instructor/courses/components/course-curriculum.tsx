"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, FileText, Plus, Trash2, Video } from "lucide-react";
import { useCreateCourseStore } from "../store";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LessonTypeLabel } from "../constants";
import { Field, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Props = {
  onNext: () => void;
  onBack: () => void;
};

export default function CourseCurriculum({ onNext, onBack }: Props) {
  const {
    curriculum,
    addSection,
    updateSection,
    removeSection,
    addLessonVideo,
    addLessonArticle,
    updateLesson,
    removeLesson,
  } = useCreateCourseStore();

  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [openLessonId, setOpenLessonId] = useState<string | null>(null);

  return (
    <form
      className="space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onNext();
      }}
    >
      <div className="space-y-4">
        {curriculum.sections.map((s) => (
          <div key={s.id} className="border rounded-lg">
            <div className="flex items-center justify-between p-4 gap-4">
              <Input
                className="flex-1"
                type="text"
                value={s.title}
                onChange={(e) => updateSection(s.id, e.target.value)}
              />

              <div className="flex items-center gap-3">
                <p className="text-muted-foreground text-xs whitespace-nowrap">
                  {s.lessons.length} lessons
                </p>

                <Button
                  size="icon"
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    setOpenSectionId((prev) => (prev === s.id ? null : s.id))
                  }
                >
                  <ChevronDown />
                </Button>

                <Button
                  size="icon"
                  type="button"
                  variant="destructive"
                  onClick={() => removeSection(s.id)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
            {openSectionId === s.id && (
              <div className="border-t border-border p-6 space-y-4">
                {s.lessons.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center">
                    <p className="text-sm font-medium text-muted-foreground">
                      No lessons yet
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {s.lessons.map((l) => (
                      <div key={l.id} className="flex flex-col">
                        <div
                          className={cn(
                            "flex items-center justify-between rounded-lg border gap-4 p-4",
                            openLessonId && "rounded-bl-none rounded-br-none",
                          )}
                        >
                          <div>
                            {l.type === "VIDEO" ? (
                              <Video className="size-4 text-primary" />
                            ) : (
                              <FileText className="size-4 text-primary" />
                            )}
                          </div>
                          <Input
                            className="flex-1"
                            type="text"
                            value={l.title}
                            onChange={(e) =>
                              updateLesson(s.id, l.id, {
                                title: e.target.value,
                              })
                            }
                          />
                          <p className="text-xs font-medium whitespace-nowrap">
                            {LessonTypeLabel[l.type]}
                          </p>
                          <Button
                            size="xs"
                            type="button"
                            variant="secondary"
                            onClick={() =>
                              setOpenLessonId((prev) =>
                                prev === l.id ? null : l.id,
                              )
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            size="icon"
                            type="button"
                            variant="destructive"
                            onClick={() => removeLesson(s.id, l.id)}
                          >
                            <Trash2 />
                          </Button>
                        </div>
                        {openLessonId === l.id && (
                          <div className="border border-t-0 rounded-b-lg p-4 space-y-4">
                            {l.type === "VIDEO" && (
                              <Field className="space-y-2">
                                <FieldLabel htmlFor="videoUrl">
                                  Video URL (optional)
                                </FieldLabel>

                                <Input
                                  id="videoUrl"
                                  type="text"
                                  placeholder="https://youtube.com/watch?v=..."
                                  value={l.videoUrl ?? ""}
                                  onChange={(e) =>
                                    updateLesson(s.id, l.id, {
                                      videoUrl: e.target.value,
                                    })
                                  }
                                />
                              </Field>
                            )}

                            {l.type === "ARTICLE" && (
                              <Field className="space-y-2">
                                <FieldLabel htmlFor="content">
                                  Article Content (optional)
                                </FieldLabel>

                                <Textarea
                                  id="content"
                                  className="w-full min-h-40 rounded-md border border-border bg-background p-3 text-sm resize-none"
                                  placeholder="Write your article here..."
                                  value={l.content ?? ""}
                                  onChange={(e) =>
                                    updateLesson(s.id, l.id, {
                                      content: e.target.value,
                                    })
                                  }
                                />
                              </Field>
                            )}

                            <Field className="space-y-2">
                              <FieldLabel htmlFor="description">
                                Lesson Description (optional)
                              </FieldLabel>

                              <Textarea
                                id="description"
                                className="w-full min-h-20 rounded-md border border-border bg-background p-3 text-sm resize-none"
                                placeholder="Write your article..."
                                value={l.description ?? ""}
                                onChange={(e) =>
                                  updateLesson(s.id, l.id, {
                                    description: e.target.value,
                                  })
                                }
                              />
                            </Field>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => addLessonVideo(s.id)}
                  >
                    <Video /> Video
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => addLessonArticle(s.id)}
                  >
                    <FileText /> Article
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={addSection}
      >
        <Plus />
        Add Section
      </Button>

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>

        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
