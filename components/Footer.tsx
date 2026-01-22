import { TextLoop } from "./text-loop";
import { ThemeToggle } from "./ui/theme-toggle";

export function Footer() {
  return (
    <footer className="border-t py-2 flex justify-between items-center text-sm">
      <TextLoop>
        <span>Team I&E Cell ❤️</span>
        <span>~Creating Synergy</span>
      </TextLoop>
      <ThemeToggle />
    </footer>
  );
}
