"use client";

import { Logo } from "@/components/Logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signUpSchema } from "@/schema/auth";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useOAuthSignIn } from "@/hooks/useOAuthSignIn";

export default function SignUpPage() {
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { handleGoogleSignIn, handleLinkedInSignIn } = useOAuthSignIn();

  function onSubmit(data: z.infer<typeof signUpSchema>) {
    startTransition(async () => {
      await authClient.signUp.email({
        email: data.email,
        name: data.name,
        password: data.password,
        fetchOptions: {
          onLoading: () => {
            toast.loading("Creating user...");
          },
          onSuccess: () => {
            toast.success("User created successfully!");
            router.push("/profile/edit");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="space-y-6">
          <Logo />
          <h2 className="text-xl font-bold">Sign Up</h2>
        </CardTitle>
        <CardDescription>
          Register yourself with the Alumni Connect to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2 w-full">
          <Button className="w-1/2" onClick={handleGoogleSignIn}>
            Sign up with Google
          </Button>
          <Button className="w-1/2" onClick={handleLinkedInSignIn}>
            Sign up with LinkedIn
          </Button>
        </div>
        <div className="text-center text-xs uppercase font-medium text-muted-foreground">
          Or Sign up with email
        </div>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel>Name</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  aria-invalid={fieldState.invalid}
                  placeholder="Arun Kushwaha"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel>Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="arunsarojkushwaha10@gmail.com"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field className="gap-1">
                <FieldLabel>Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="********"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <span>Sign up</span>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex gap-1 justify-center text-sm">
        Already have an account?
        <Link
          href="/auth/sign-in"
          className={`p-0! ${buttonVariants({ variant: "link" })}`}
        >
          Sign In
        </Link>
      </CardFooter>
    </Card>
  );
}
