"use client";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/actions";
import { toast } from "sonner";

interface AddToCartButtonProps {
  courseId: string;
}

export default function AddToCartButton({ courseId }: AddToCartButtonProps) {
  async function addItem() {
    const res = await addToCart(courseId);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success("Added to cart");
  }

  return (
    <Button
      size="lg"
      variant="outline"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        addItem();
      }}
    >
      Add To Cart
    </Button>
  );
}
