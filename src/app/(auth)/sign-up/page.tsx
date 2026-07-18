import SignUpForm from "@/features/auth/components/sign-up-form";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

export default function SignUpPage() {
  return (
    <section className="w-full max-w-sm">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-black transition-colors mb-6"
      >
        <ArrowLeft className="size-4" /> <span>Back to Home</span>
      </Link>
      <div className="mb-4">
        <h2 className="mb-1 text-lg font-medium">Start for Free</h2>
        <p className="text-muted-foreground">No credit card required</p>
      </div>
      <SignUpForm />
      <p className="text-muted-foreground text-sm text-center">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-chart-1 hover:underline">
          Sign In
        </Link>
      </p>
    </section>
  );
}
