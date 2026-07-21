import { TCourse } from "./course";

export type TCartItems = ({
  course: TCourse;
} & {
  id: string;
  userId: string;
  courseId: string;
})[];
