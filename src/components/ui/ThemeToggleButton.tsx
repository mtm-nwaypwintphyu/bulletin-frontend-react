import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../stores/useThemeStore";
import Button from "./Button";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      className="px-3 py-1.5 text-xs font-semibold flex items-center gap-2"
    >
      {theme === "light" ? (
        <>
          <Moon className="size-4" />
          <span>Dark</span>
        </>
      ) : (
        <>
          <Sun className="size-4" />
          <span>Light</span>
        </>
      )}
    </Button>
  );
}
