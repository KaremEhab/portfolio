"use client";

import { useTheme } from "@/providers/ThemeProvider";
import { Moon, Sun } from "lucide-react";

// Step 1: Accept `isCollapsed` as a prop
export default function ThemeToggle({ isCollapsed }: { isCollapsed: boolean }) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      // Step 2: Adjust classes for the collapsed state
      className={`mt-4 w-full flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 ${isCollapsed ? "justify-center px-2 py-2" : "px-4 py-2"
        }`}
      title={isCollapsed ? (theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode') : undefined}
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-4 h-4 text-yellow-400" />
          {/* Step 3: Conditionally render the text */}
          {!isCollapsed && <span className="text-sm text-white">Light Mode</span>}
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-blue-500" />
          {!isCollapsed && <span className="text-sm text-foreground">Dark Mode</span>}
        </>
      )}
    </button>
  );
}