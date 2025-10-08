"use client";

import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-700 mt-16 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-3">
        <div className="flex gap-6">
          <Link
            href="/"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/projects"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/packages"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Packages
          </Link>
          <Link
            href="/contact"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/about"
            className="hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            About
          </Link>
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/KaremEhab"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/kareem-ehab/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:karemehab2323@gmail.com"
            className="hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            Email
          </a>
        </div>
      </div>

      <p className="mt-2">
        © {currentYear} <span className="font-semibold">Kareem Ehab</span>. All
        rights reserved.
      </p>
    </footer>
  );
}
