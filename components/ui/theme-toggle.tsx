"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-0 items-center">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => setTheme("light")}
      >
        <Sun />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => setTheme("dark")}
      >
        <Moon />
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="icon-sm"
        onClick={() => setTheme("system")}
      >
        <Monitor />
      </Button>
    </div>
  );
}
