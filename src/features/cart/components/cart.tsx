import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import CartClient from "./cart-client";

export default async function Cart() {
  const session = await getSession();

  if (!session?.user) return null;

  const cartItems = await prisma.cartItem.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      course: true,
    },
  });

  return <CartClient cartItems={cartItems} />;
}
