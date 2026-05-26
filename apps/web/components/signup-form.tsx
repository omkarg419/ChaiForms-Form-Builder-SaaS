"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { useSignup } from "~/hooks/api/auth";

type SignupFormValues = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function SignupForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const {
    createUserWithEmailAndPasswordAsync,
    isError,
    isSuccess,
    error,
    status,
    reset: resetSignupMutation,
  } = useSignup();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<SignupFormValues>({
    mode: "onTouched",
  });

  const password = watch("password");

  const isLoading = status === "pending";

  useEffect(() => {
    if (isSuccess) {
      router.replace("/dashboard");
    }
  }, [isSuccess, router]);

  const onSubmit = async (values: SignupFormValues) => {
    try {
      console.log(values);

      const { id } = await createUserWithEmailAndPasswordAsync({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
      });

      console.log("User created with ID:", id);
    } catch (submitError) {
      console.error("Signup failed:", submitError);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={errors.fullName ? "true" : "false"}
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                />
                {errors.fullName ? (
                  <FieldDescription className="text-destructive">
                    {errors.fullName.message}
                  </FieldDescription>
                ) : null}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email ? (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                ) : null}
              </Field>
              <Field>
                <Field className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      aria-invalid={errors.password ? "true" : "false"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters long",
                        },
                      })}
                    />
                    {errors.password ? (
                      <FieldDescription className="text-destructive">
                        {errors.password.message}
                      </FieldDescription>
                    ) : null}
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      aria-invalid={errors.confirmPassword ? "true" : "false"}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                    />
                    {errors.confirmPassword ? (
                      <FieldDescription className="text-destructive">
                        {errors.confirmPassword.message}
                      </FieldDescription>
                    ) : null}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
                {isError ? (
                  <FieldDescription className="text-center text-destructive">
                    {error?.message ?? "Signup failed. Please try again."}
                  </FieldDescription>
                ) : null}
                {isSuccess ? (
                  <FieldDescription className="text-center text-emerald-600">
                    Account created successfully. Redirecting to your dashboard...
                  </FieldDescription>
                ) : null}
                <FieldDescription className="text-center">
                  Already have an account? <a href="/signin">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
