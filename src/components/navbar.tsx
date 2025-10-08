"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Packages", href: "/packages" },
    { name: "Contact", href: "/contact" },
    { name: "About Me", href: "/about" },
  ];

  return (
    <nav className="flex justify-between items-center py-4 px-8 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-2xl font-bold">Kareem Ehab</h1>
      <div className="flex gap-6 items-center">
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
        <ThemeToggle />
      </div>
    </nav>
  );
}
