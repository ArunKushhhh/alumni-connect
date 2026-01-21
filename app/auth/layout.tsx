import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full max-w-4xl flex flex-col items-center justify-between">
      <div className="py-2 border-b w-full">
        <Link href={"/"} className={buttonVariants({ variant: "link" })}>
          <ArrowLeft />
          <p>Go back</p>
        </Link>
      </div>
      <div className="w-full flex-1 flex justify-center items-center">
        {children}
      </div>
    </div>
  );
}
