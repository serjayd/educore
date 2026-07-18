import SignInForm from "@/features/auth/components/sign-in-form";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

export default function SignInPage() {
  return (
    <section className="w-full max-w-sm">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-black transition-colors mb-6"
      >
        <ArrowLeft className="size-4" /> <span>Back to Home</span>
      </Link>
      <div className="mb-4">
        <h2 className="mb-1 text-lg font-medium">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to your StoreDock account
        </p>
      </div>
      <SignInForm />
      <p className="text-muted-foreground text-sm text-center">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:underline">
          Create one free
        </Link>
      </p>
    </section>
  );
}
