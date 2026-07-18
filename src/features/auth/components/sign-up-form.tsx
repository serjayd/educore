"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { type SignUpFormValues, signUpSchema } from "../schemas";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/auth-client";

export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormValues) => {
    const signup = await signUp.email({
      email: data.email,
      password: data.password,
      name: data.name,
    });

    if (signup.error) {
      toast.error(signup.error.message);
      router.push("/");
      return;
    }

    toast.success("Successfully created an account!");

    router.push("/dashboard");
    router.refresh();
  };
  return (
    <form className="mb-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Field>
        <FieldLabel htmlFor="name">Full Name</FieldLabel>
        <Input
          type="text"
          id="name"
          placeholder="John Doe"
          {...register("name")}
        />
        {errors.name && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        )}
      </Field>
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
        {isSubmitting ? "Creating..." : "Create Account"}
      </Button>
    </form>
  );
}
