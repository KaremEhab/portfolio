"use client";

import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full border hover:scale-110 transition-transform duration-200 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <span className="text-gray-800 text-xl">🌙</span>
      ) : (
        <span className="text-yellow-400 text-xl">☀️</span>
      )}
    </button>
  );
}
