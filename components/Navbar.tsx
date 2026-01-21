"use client";
import { authClient } from "@/lib/auth-client";
import { Logo } from "./Logo";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function Navbar() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleSignOut = async () => {
    startTransition(async () => {
      await authClient.signOut();
      toast.success("Signed out successfully!");
      router.push("/");
    });
  };
  return (
    <div className="flex items-center justify-between py-2 border-b">
      <Logo isLogoOnly />
      <Button onClick={handleSignOut} disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
          </>
        ) : (
          "Sign out"
        )}
      </Button>
    </div>
  );
}
