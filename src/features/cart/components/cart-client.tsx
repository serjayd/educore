"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TCartItems } from "@/types/cart";
import { ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { checkout, removeFromCart } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CartClientProps {
  cartItems: TCartItems;
}

export default function CartClient({ cartItems }: CartClientProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function removeItem(cartItem: string) {
    const res = await removeFromCart(cartItem);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success("Removed item from cart");
  }

  async function handleCheckout() {
    const res = await checkout();

    if (!res.success) {
      toast.error(res.message);
      setOpen(false);
      return;
    }
    setOpen(false);
    router.push("/my-courses");
    toast.success(res.message);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
          <ShoppingCart />
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping cart</SheetTitle>
        </SheetHeader>

        <div className="space-y-2 p-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 border rounded-lg p-3"
            >
              <Image
                width={96}
                height={64}
                src={item.course.banner ?? "/placeholder-course.jpg"}
                alt={item.course.title}
                className="h-16 w-24 rounded object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">{item.course.title}</h3>

                <p className="text-sm text-muted-foreground">
                  £{item.course.price}
                </p>
              </div>

              <Button
                size="icon"
                variant="destructive"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 />
              </Button>
            </div>
          ))}
        </div>

        <SheetFooter>
          <Button variant="default" onClick={() => handleCheckout()}>
            Checkout
          </Button>

          <SheetClose asChild>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
