"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export function useOAuthSignIn() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/profile/edit",
        fetchOptions: {
          onLoading: () => {
            toast.loading("Signing in with Google...");
          },
          onSuccess: () => {
            toast.success("Signed in successfully!");
            router.push("/feed");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  };

  const handleLinkedInSignIn = () => {
    startTransition(async () => {
      await authClient.signIn.social({
        provider: "linkedin",
        callbackURL: "/profile/edit",
        fetchOptions: {
          onLoading: () => {
            toast.loading("Signing in with LinkedIn...");
          },
          onSuccess: () => {
            toast.success("Signed in successfully!");
            router.push("/feed");
          },
          onError: (error) => {
            toast.error(error.error.message);
          },
        },
      });
    });
  };

  return { handleGoogleSignIn, handleLinkedInSignIn, isPending };
}
