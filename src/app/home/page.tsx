"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react"; // ✅ Import new icons for buttons

// --- SVG Icons for Technologies ---
const FlutterIcon = () => (
  <svg
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-foreground/80 group-hover:text-foreground transition-colors"
  >
    <path
      d="M14.314 0L6.059 8.255L11.025 13.22L22.529 1.716L14.314 0Z"
      fill="currentColor"
    />
    <path
      d="M14.314 10.783L6.059 19.038L14.314 27.293L22.535 19.072L17.564 14.101L14.314 10.783Z"
      fill="currentColor"
    />
    <path
      d="M11.025 13.22L6.059 8.255L14.314 0L11.025 13.22Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
  </svg>
);

const FigmaIcon = () => (
  <svg
    aria-hidden="true"
    width="16"
    height="24"
    viewBox="0 0 16 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="group-hover:opacity-100 transition-opacity opacity-80"
  >
    <path
      d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z"
      fill="#F24E1E"
    />
    <path
      d="M4 12C1.79086 12 0 10.2091 0 8C0 5.79086 1.79086 4 4 4V12Z"
      fill="#FF7262"
    />
    <path
      d="M4 16C1.79086 16 0 17.7909 0 20C0 22.2091 1.79086 24 4 24V16Z"
      fill="#A259FF"
    />
    <path
      d="M8 16C5.79086 16 4 17.7909 4 20C4 22.2091 5.79086 24 8 24C10.2091 24 12 22.2091 12 20C12 17.7909 10.2091 16 8 16Z"
      fill="#1ABCFE"
    />
    <path
      d="M12 8C14.2091 8 16 6.20914 16 4C16 1.79086 14.2091 0 12 0V8Z"
      fill="#0ACF83"
    />
  </svg>
);

const SwiftIcon = () => (
  <svg
    aria-hidden="true"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-foreground/80 group-hover:text-foreground transition-colors"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19.4385 13.2286C21.0759 11.4514 22.0163 9.77143 22.0163 7.8C22.0163 4.22571 19.4678 2.78571 16.2759 2.78571C13.2918 2.78571 11.2371 4.38 9.38853 6.02571C8.24264 6.95143 7.15589 7.94571 5.94082 7.94571C4.30339 7.94571 3.27582 6.8 2.02967 6.8C0.589673 6.8 0 7.72571 0 8.94C0 10.9714 1.50163 12.3429 2.87309 12.3429C4.01898 12.3429 4.93016 11.5029 6.27301 11.5029C7.64448 11.5029 8.79036 12.5657 10.0365 13.6286C11.5973 14.9714 13.2347 16.3429 15.4293 16.3429C17.3021 16.3429 18.3297 15.3486 19.4164 14.1643L14.0734 21.2143L21.3693 13.2286H19.4385Z"
      fill="currentColor"
    />
  </svg>
);

export default function HomePage() {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const logoSrc =
    isMounted && theme === "dark"
      ? "/assets/mobile-background-light-shape.svg"
      : "/assets/mobile-background-dark-shape.svg";

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-x-10 py-20 scroll-mt-20"
    >
      {/* LEFT CONTENT */}
      <div className="w-full md:w-3/5 flex flex-col justify-center text-left">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
          I&apos;m Kareem Ehab, a design-driven developer building beautiful
          experiences.
        </h1>
        <p className="text-2xl lg:text-3xl text-primary font-medium mt-4">
          Flutter Development & UI UX Design
        </p>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-6">Development Tools</h2>

          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-3 group cursor-pointer">
              <img
                src="/icons/flutter-logo.svg"
                alt="Flutter Logo"
                className="relative z-10 w-full max-w-[24px] h-auto object-contain"
              />

              <span className="font-medium text-m group-hover:text-foreground transition-colors">
                Flutter
              </span>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <img
                src="/icons/firebase-logo.svg"
                alt="Firebase Logo"
                className="relative z-10 w-full max-w-[24px] h-auto object-contain"
              />

              <span className="font-medium text-m group-hover:text-foreground transition-colors">
                Firebase
              </span>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <img
                src="/icons/figma-logo.svg"
                alt="Figma Logo"
                className="relative z-10 w-full max-w-[24px] h-auto object-contain"
              />

              <span className="font-medium text-m group-hover:text-foreground transition-colors">
                Figma
              </span>
            </div>

            <div className="flex items-center gap-3 group cursor-pointer">
              <img
                src="/icons/github-logo.svg"
                alt="Github Logo"
                className="relative z-10 w-full max-w-[24px] h-auto object-contain"
              />

              <span className="font-medium text-m group-hover:text-foreground transition-colors">
                Github
              </span>
            </div>
          </div>
        </div>

        {/* ✅ CHANGE: More creative and professional buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/#projects"
            className=" bg-[var(--project-card-bg)] group relative inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-semibold text-primary-foreground bg-primary overflow-hidden shadow-lg shadow-primary/30 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <span className="relative z-10">View My Work</span>
            <ArrowRight
              size={18}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </Link>

          <Link
            href="/#contact"
            className="group inline-flex items-center justify-center gap-2 border border-foreground text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-foreground/5 hover:text-foreground transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <span>Get In Touch</span>
            <Mail
              size={16}
              className="opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="w-full md:w-2/5 flex justify-center md:justify-end relative mt-16 md:mt-0">
        <Image
          width={10}
          height={10}
          src={logoSrc}
          alt="Background pattern"
          className="w-full max-w-[450px] h-auto object-contain opacity-70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <img
          src="/assets/phone.png"
          alt="Phone mockup"
          className="relative z-10 w-full max-w-[500px] h-auto object-contain"
        />
      </div>
    </section>
  );
}
