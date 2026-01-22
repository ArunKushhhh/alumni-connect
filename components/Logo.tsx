import Image from "next/image";
import Link from "next/link";

export function Logo({ isLogoOnly }: { isLogoOnly?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={28}
        height={28}
        className="dark:invert"
      />
      {!isLogoOnly && <h1 className="text-xl font-bold">Alumni Connect</h1>}
    </Link>
  );
}
