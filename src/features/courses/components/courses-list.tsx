import { Button } from "@/components/ui/button";

import AddToCartButton from "@/features/cart/components/add-to-cart";
import {
  CategoryLabel,
  LevelLabel,
} from "@/features/instructor/courses/constants";
import { TCourseWithDetails } from "@/types/course";

import Image from "next/image";
import Link from "next/link";

interface CoursesListProps {
  filteredCourses: TCourseWithDetails[];
  userCourses:
    | {
        courseId: string;
      }[]
    | null;
  cartItems:
    | {
        courseId: string;
      }[]
    | null;
}

export default function CoursesList({
  filteredCourses,
  userCourses,
  cartItems,
}: CoursesListProps) {
  return (
    <section className="col-span-3">
      <div className="grid md:grid-cols-3 gap-2">
        {filteredCourses.map((course) => {
          const isOwned = userCourses?.some(
            (item) => item.courseId === course.id,
          );

          const isInCart = cartItems?.some(
            (item) => item.courseId === course.id,
          );

          return (
            <Link
              href={`/courses/${course.id}`}
              key={course.id}
              className="border border-border rounded-2xl hover:-translate-y-1 transition-all shadow-sm hover:shadow-soft"
            >
              <div className="relative h-40 w-full">
                <Image
                  fill
                  src={course.banner ?? "/placeholder-course.jpg"}
                  alt={course.title}
                  className="object-cover rounded-t-2xl"
                />

                <span className="absolute top-3 left-3 z-10 rounded-full bg-secondary px-3 py-1 text-xs font-medium">
                  {LevelLabel[course.level]}
                </span>
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {CategoryLabel[course.category]}
                </span>
                <h3 className="mt-2 line-clamp-2 font-display text-base font-semibold leading-snug text-foreground hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  By {course.author.name}
                </p>
                <div className="pt-4 flex items-center justify-between flex-wrap">
                  <h4 className="font-display text-lg font-bold text-foreground">
                    £{course.price}
                  </h4>
                  {isOwned ? (
                    <Button disabled>Owned</Button>
                  ) : isInCart ? (
                    <Button disabled variant="secondary">
                      Added to Cart
                    </Button>
                  ) : (
                    <AddToCartButton courseId={course.id} />
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
