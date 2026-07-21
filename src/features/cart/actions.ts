"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export async function addToCart(courseId: string) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const userId = session.user.id;

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
    });

    if (!course) {
      return {
        success: false,
        message: "Course not found",
      };
    }

    const alreadyPurchased = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (alreadyPurchased) {
      return {
        success: false,
        message: "You already own this course",
      };
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });

    if (existingCartItem) {
      return {
        success: false,
        message: "Course is already in your cart",
      };
    }

    const cartItem = await prisma.cartItem.create({
      data: {
        userId,
        courseId,
      },
    });

    revalidatePath("/courses");

    return {
      success: true,
      cartItem,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to add course to cart",
    };
  }
}

export async function removeFromCart(cartItemId: string) {
  try {
    const cartItem = await prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    revalidatePath("/courses");

    return {
      success: true,
      cartItem,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Failed to remove course from cart",
    };
  }
}

export async function checkout() {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const userId = session.user.id;

    const cartItems = await prisma.cartItem.findMany({
      where: {
        userId,
      },
    });

    if (cartItems.length === 0) {
      return {
        success: false,
        message: "Your cart is empty",
      };
    }

    await prisma.$transaction(async (tx) => {
      // Add courses to library
      await tx.enrollment.createMany({
        data: cartItems.map((item) => ({
          userId,
          courseId: item.courseId,
        })),
        skipDuplicates: true,
      });

      // Remove from cart
      await tx.cartItem.deleteMany({
        where: {
          userId,
        },
      });
    });

    revalidatePath("/courses");

    return {
      success: true,
      message: "Courses added to your library",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Checkout failed",
    };
  }
}

export async function buyCourse(courseId: string) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const alreadyOwned = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },
    });

    if (alreadyOwned) {
      return {
        success: false,
        message: "You already own this course",
      };
    }

    await prisma.enrollment.create({
      data: {
        userId: session.user.id,
        courseId,
      },
    });

    revalidatePath("/my-courses");

    return {
      success: true,
      message: "Course added to your library",
    };
  } catch {
    return {
      success: false,
      message: "Purchase failed",
    };
  }
}
