"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Packages", href: "/packages" },
    { name: "Contact", href: "/contact" },
    { name: "About Me", href: "/about" },
  ];

  return (
    <nav
      className="flex items-center py-4 px-8 sticky top-0 z-50 backdrop-blur"
      style={{
        background: "var(--navbar-bg)",
        borderColor: "var(--card-border)",
        WebkitBackdropFilter: "blur(12px)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Kareem Ehab</h1>
      </div>
      {/* Desktop links */}
      <div className="flex-1 justify-center gap-6 hidden md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color:
                pathname === link.href
                  ? "var(--blue-500)"
                  : "var(--foreground)",
              fontWeight: pathname === link.href ? 600 : undefined,
            }}
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </div>
      {/* Mobile menu button */}
      <div className="flex-1 flex justify-end items-center">
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((open) => !open)}
            className="px-4 py-2 rounded border"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
            aria-label="Open menu"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>
        <div className="hidden md:block">
          <ThemeToggle />
        </div>
      </div>
      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--card-bg)] border-t border-[var(--card-border)] flex flex-col items-center py-4 md:hidden z-40 backdrop-blur">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color:
                  pathname === link.href
                    ? "var(--blue-500)"
                    : "var(--foreground)",
                fontWeight: pathname === link.href ? 600 : undefined,
              }}
              className="py-2 px-4 w-full text-center hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}
