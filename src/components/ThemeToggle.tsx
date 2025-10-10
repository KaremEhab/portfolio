"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  // ✅ Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  // ✅ Handle toggle with animation
  const toggleTheme = () => {
    const html = document.documentElement;
    html.classList.add("transition-colors", "duration-500", "ease-in-out");

    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }

    setIsDark(!isDark);

    // Remove transition class after animation finishes
    setTimeout(() => {
      html.classList.remove("transition-colors", "duration-500", "ease-in-out");
    }, 600);
  };

  return (
    <button
      onClick={toggleTheme}
      className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4 text-yellow-400 transition-transform duration-500 rotate-0" />
          <span className="text-sm text-white">Light Mode</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4 text-blue-500 transition-transform duration-500 rotate-180" />
          <span className="text-sm text-foreground">Dark Mode</span>
        </>
      )}
    </button>
  );
}
