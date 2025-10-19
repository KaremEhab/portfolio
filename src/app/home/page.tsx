"use client";

/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from "react";
import { useTheme } from "@/providers/ThemeProvider";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react"; // ✅ Import new icons for buttons

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
