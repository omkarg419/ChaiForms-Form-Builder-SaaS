"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "~/components/ui/field";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { useLogin } from "~/hooks/api/auth";

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const { signInWithEmailAndPasswordAsync, isError, isSuccess, error, status } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    mode: "onTouched",
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      console.log(values);

      const { id } = await signInWithEmailAndPasswordAsync({
        email: values.email,
        password: values.password,
      });

      console.log("User logged in with ID:", id);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const isLoading = status === "pending";

  useEffect(() => {
    if (isSuccess) {
      router.replace("/dashboard");
    }
  }, [isSuccess, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={errors.email ? "true" : "false"}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email ? (
                  <FieldDescription className="text-destructive">
                    {errors.email.message}
                  </FieldDescription>
                ) : null}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a> */}
                </div>
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
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
                {isError ? (
                  <FieldDescription className="text-center text-destructive">
                    {error?.message ?? "Login failed. Please try again."}
                  </FieldDescription>
                ) : null}
                {isSuccess ? (
                  <FieldDescription className="text-center text-emerald-600">
                    Login successful. Redirecting to your dashboard...
                  </FieldDescription>
                ) : null}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/signup">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
