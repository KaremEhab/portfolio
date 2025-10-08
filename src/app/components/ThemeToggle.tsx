"use client";

import { useTheme } from "@/app/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 border rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-800"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
