"use client";

import { useTheme } from "@/providers/ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
  className="p-2 rounded-full border hover:scale-110 transition-transform duration-200"
  style={{ background: "var(--card-bg)" , borderColor: "var(--card-border)"}}
      aria-label="Toggle dark/light mode"
    >
      {theme === "dark" ? (
        <span className="text-yellow-400 text-xl">☀️</span>
      ) : (
        <span className="text-gray-800 text-xl">🌙</span>
      )}
    </button>
  );
}
