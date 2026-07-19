"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  ArchiveRestore,
  Ellipsis,
  Send,
  SquarePen,
  Trash2,
} from "lucide-react";
import {
  archiveCourse,
  deleteCourse,
  publishCourse,
  restoreCourse,
} from "../actions";
import { toast } from "sonner";

interface CourseActions {
  courseId: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export default function CourseActions({ courseId, status }: CourseActions) {
  async function onArchive(id: string) {
    const res = await archiveCourse(id);

    if (!res.success) {
      console.error(res.message);
      return;
    }

    toast.success(`Course ${res.course?.title} has been archived!`);
  }

  async function onRestore(id: string) {
    const res = await restoreCourse(id);

    if (!res.success) {
      console.error(res.message);
      return;
    }

    toast.success(`Course ${res.course?.title} has been restored!`);
  }

  async function onPublish(id: string) {
    const res = await publishCourse(id);

    if (!res.success) {
      console.error(res.message);
      return;
    }

    toast.success(`Course ${res.course?.title} has been published!`);
  }

  async function onDelete(id: string) {
    const res = await deleteCourse(id);

    if (!res.success) {
      console.error(res.message);
      return;
    }

    toast.success(`Course ${res.course?.title} has been deleted!`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary" className="h-8 w-8">
          <Ellipsis className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {status !== "PUBLISHED" && (
          <DropdownMenuItem onClick={() => onPublish(courseId)}>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <SquarePen className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        {status === "ARCHIVED" ? (
          <DropdownMenuItem onClick={() => onRestore(courseId)}>
            <ArchiveRestore className="mr-2 h-4 w-4" />
            Restore
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => onArchive(courseId)}>
            <Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          variant="destructive"
          onClick={() => onDelete(courseId)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
