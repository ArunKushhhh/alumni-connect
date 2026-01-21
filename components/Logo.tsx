import Image from "next/image";

export function Logo({ isLogoOnly }: { isLogoOnly?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={28}
        height={28}
        className="dark:invert"
      />
      {!isLogoOnly && <h1 className="text-xl font-bold">Alumni Connect</h1>}
    </div>
  );
}
