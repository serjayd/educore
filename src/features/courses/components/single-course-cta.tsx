"use client";

import { Button } from "@/components/ui/button";
import { buyCourse } from "@/features/cart/actions";
import AddToCartButton from "@/features/cart/components/add-to-cart";
import { toast } from "sonner";

interface SingleCourseCTAProps {
  courseId: string;
  owned: boolean;
  inCart: boolean;
}

export default function SingleCourseCTA({
  courseId,
  owned,
  inCart,
}: SingleCourseCTAProps) {
  const handleCheckout = async (courseId: string) => {
    const res = await buyCourse(courseId);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
  };

  if (owned) {
    return (
      <Button disabled className="w-full mt-4">
        Owned
      </Button>
    );
  }

  if (inCart) {
    return (
      <Button disabled variant="secondary" className="w-full mt-4">
        Added to Cart
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-2 mt-4">
      <Button size="lg" onClick={() => handleCheckout(courseId)}>
        Buy Now
      </Button>

      <AddToCartButton courseId={courseId} />
    </div>
  );
}
