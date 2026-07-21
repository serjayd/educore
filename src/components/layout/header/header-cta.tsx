import { Button } from "@/components/ui/button";
import Cart from "@/features/cart/components/cart";
import prisma from "@/lib/prisma";

import { IUserSession } from "@/types/user";
import Link from "next/link";

interface HeaderCTAProps {
  session: IUserSession | null;
}

export default async function HeaderCTA({ session }: HeaderCTAProps) {
  let cartItemsTotal = 0;

  if (session?.user?.id) {
    cartItemsTotal = await prisma.cartItem.count({
      where: {
        userId: session.user.id,
      },
    });
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Cart />

        {cartItemsTotal > 0 && (
          <span className="absolute right-0.5 top-0.5 flex size-3.5 items-center justify-center rounded-full bg-primary text-[10px] text-white">
            {cartItemsTotal}
          </span>
        )}
      </div>
      {!session ? (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <Button variant="outline" size="lg" asChild>
            <Link href="/sign-in" className="w-full md:w-fit">
              Sign In
            </Link>
          </Button>
          <Button variant="default" size="lg" asChild>
            <Link href="/sign-up" className="w-full md:w-fit">
              Get Started
            </Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
          <Button variant="ghost" size="lg" asChild>
            <Link href="/instructor" className="w-full md:w-fit">
              Instructor
            </Link>
          </Button>
          <Button variant="default" size="lg" asChild>
            <Link href="/my-courses" className="w-full md:w-fit">
              My Learning
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
