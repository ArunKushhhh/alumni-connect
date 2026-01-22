"use client";
import { authClient } from "@/lib/auth-client";
import { Logo } from "./Logo";
import { buttonVariants } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { startTransition } from "react";
import {
  Bell,
  Briefcase,
  Compass,
  House,
  MessageCircle,
  UserStar,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const routes = [
  {
    href: "/feed",
    label: "Home",
    icon: House,
  },
  {
    href: "/discover",
    label: "Discover",
    icon: Compass,
  },
  {
    href: "/networking/grow",
    label: "Network",
    icon: UserStar,
  },
  {
    href: "/jobs",
    label: "Jobs",
    icon: Briefcase,
  },
  {
    href: "/messaging",
    label: "Messaging",
    icon: MessageCircle,
  },
  {
    href: "/notifications",
    label: "Notifications",
    icon: Bell,
  },
];

const dropdownLinks = [
  {
    href: "/profile",
    label: "Profile",
  },
];

export function Navbar() {
  const pathName = usePathname();
  const activeRoute =
    routes.find(
      (route) =>
        (route.href !== "/" && pathName.startsWith(route.href)) ||
        pathName === route.href,
    ) || routes[0];

  const { data: session } = authClient.useSession();

  return (
    <header className="flex items-center justify-between py-2 border-b fixed top-0 left-1/2 -translate-x-1/2 bg-background max-w-4xl w-full z-1">
      <div>
        <Logo isLogoOnly={session ? true : false} />
        {/* search bar */}
      </div>
      {session ? (
        <nav className="flex gap-1 items-center">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`gap-0! flex-col ${buttonVariants({
                variant:
                  activeRoute.href === route.href ? "secondary" : "ghost",
                size: "lg",
              })}`}
            >
              <route.icon className="size-4" />
              <span className="text-[10px]">{route.label}</span>
            </Link>
          ))}
          <div className="h-10 mx-2 border" />
          <div className="flex items-center">
            <User />
          </div>
        </nav>
      ) : (
        <div className="flex gap-1 items-center">
          <Link
            href="/auth/sign-in"
            className={buttonVariants({ variant: "link" })}
          >
            Sign In
          </Link>
          <Link
            href="/auth/sign-up"
            className={buttonVariants({ variant: "default" })}
          >
            Sign Up
          </Link>
        </div>
      )}
    </header>
  );
}

function User() {
  const router = useRouter();

  const handleSignOut = async () => {
    startTransition(async () => {
      await authClient.signOut();
      toast.success("Signed out successfully!");
      router.push("/");
    });
  };
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-medium">
            Manage Account
          </DropdownMenuLabel>
          {dropdownLinks.map((link) => (
            <DropdownMenuItem key={link.href}>
              <Link href={link.href} className="text-xs">
                {link.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="text-xs">
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
