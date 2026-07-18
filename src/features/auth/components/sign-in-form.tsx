"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type SignInFormValues, signInSchema } from "../schemas";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormValues) => {
    const signin = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (signin.error) {
      toast.error(signin.error.message);
      router.push("/");
      return;
    }

    toast.success("Successfully signed in!");

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form className="mb-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="email">Email Address</FieldLabel>
        <Input
          type="email"
          id="email"
          placeholder="you@example.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-destructive text-sm">{errors.email.message}</p>
        )}
      </Field>
      <Field>
        <FieldLabel htmlFor="password">Password</FieldLabel>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="At least 8 characters"
            {...register("password")}
          />
          <Button
            variant="ghost"
            type="button"
            className="absolute right-1 top-1/2 -translate-y-1/2 size-8 p-0"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Eye /> : <EyeOff />}
          </Button>
        </div>
        {errors.password && (
          <p className="text-destructive text-sm">{errors.password.message}</p>
        )}
      </Field>
      <Button
        variant="default"
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </Button>
    </form>
  );
}
