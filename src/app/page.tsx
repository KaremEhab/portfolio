"use client";

import { NormalizedProject } from "../lib/contentful";
import Image from "next/image";
import type { projectModel } from "../lib/models/project_model";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState, useRef } from "react";
import { Smartphone, PenTool } from "lucide-react";

// JavaScript-powered Marquee component
const Marquee = ({ speed = 60, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const original = track.querySelector(".marquee-original") as HTMLElement;
    if (!original) return;

    // Clone content for seamless looping
    const clone = original.cloneNode(true) as HTMLElement;
    track.appendChild(clone);

    let animationId: number;
    let startTime: number | null = null;
    let lastTimestamp: number | null = null;
    let totalPausedTime = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      if (lastTimestamp) {
        totalPausedTime += timestamp - lastTimestamp;
      }
      lastTimestamp = null;

      const elapsed = timestamp - startTime - totalPausedTime;
      const totalWidth = original.offsetWidth;
      const move = (elapsed / 1000 * speed) % totalWidth;

      track.style.transform = `translateX(-${move}px)`;
      animationId = requestAnimationFrame(step);
    };

    const startAnimation = () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(step);
    };

    startAnimation();

    const onMouseEnter = () => {
      lastTimestamp = performance.now();
      cancelAnimationFrame(animationId);
    };
    const onMouseLeave = () => startAnimation();

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative flex overflow-x-hidden border-t border-b border-card-border py-4 my-20 ${className}`}
    >
      <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
        <div className="marquee-original flex items-center">
          <span className="mx-4 text-lg">Pixel Perfect</span>
          <span className="text-primary mx-4">*</span>
          <span className="mx-4 text-lg">Fast & Fluid</span>
          <span className="text-primary mx-4">*</span>
          <span className="mx-4 text-lg">Scalable Apps</span>
          <span className="text-primary mx-4">*</span>
          <span className="mx-4 text-lg">Modern UI</span>
          <span className="text-primary mx-4">*</span>
          <span className="mx-4 text-lg">Smooth Animations</span>
          <span className="text-primary mx-4">*</span>
          <span className="mx-4 text-lg">Adaptive UI</span>
          <span className="text-primary mx-4">*</span>
        </div>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [projects, setProjects] = useState<NormalizedProject[]>([]);

  useEffect(() => {
    (async () => {
      const { getProjects } = await import("../lib/contentful");
      const data = await getProjects();
      setProjects(data);
    })();
  }, []);

  return (
    <>
      <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
        {/* HOME SECTION */}
        <section
          id="home"
          className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 py-20 scroll-mt-20"
        >
          {/* LEFT CONTENT */}
          <div className="flex-1 flex flex-col justify-center">
            <h1 className="text-5xl md:text-8xl font-bold max-w-3xl leading-tight">
              Building Beautiful Experiences Through
            </h1>
            <p className="text-3xl md:text-xl text-muted-foreground mt-4">
              Flutter Development & UI UX Design
            </p>

            <div className="mt-16">
              <h2 className="text-2xl font-semibold mb-6">What I Offer</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card-DEFAULT/50 backdrop-blur-sm border border-card-border rounded-xl p-6">
                  <div className="bg-primary/10 border border-primary/20 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                    <Smartphone className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Cross-Platform Applications</h3>
                  <p className="text-muted-foreground text-sm">
                    Building seamless apps that work perfectly across iOS, Android, and web platforms.
                  </p>
                </div>
                <div className="bg-card-DEFAULT/50 backdrop-blur-sm border border-card-border rounded-xl p-6">
                  <div className="bg-primary/10 border border-primary/20 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                    <PenTool className="text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Initiative UI/UX Designs</h3>
                  <p className="text-muted-foreground text-sm">
                    Creating intuitive and engaging user experiences with modern design principles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center md:justify-end relative">
            {/* BACKGROUND PATTERN */}
            <img
              src="assets/mobile-background-shape.svg"
              alt="Background pattern"
              className="max-w-[420px] w-full h-auto object-contain opacity-70 absolute right-0 bottom-0 translate-x-6 translate-y-4"
            />

            {/* FOREGROUND PHONE IMAGE */}
            <img
              src="assets/phone.png"
              alt="Phone mockup"
              className="relative z-10 max-w-[320px] w-full h-auto object-contain"
            />
          </div>

        </section>
      </div>

      {/* The marquee sits outside the padded container to be full-width */}
      <div className="w-full">
        <Marquee speed={60} />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 md:px-10">
        <section id="projects" className="min-h-screen py-20 scroll-mt-20">
          <h1 className="text-3xl font-bold mb-6">My Portfolio Projects</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => {
              const fields = p.fields as projectModel;
              const imgUrl = fields.displayImages?.[0]?.fields?.file?.url
                ? `https:${fields.displayImages[0].fields.file.url}`
                : null;

              return (
                <li
                  key={p.sys.id}
                  className="border border-card-border bg-card-DEFAULT/50 p-4 rounded-lg shadow-lg hover:shadow-primary/20 transition-shadow duration-200"
                >
                  {imgUrl && (
                    <Image
                      src={imgUrl}
                      alt={fields.projectName || "Project image"}
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover rounded"
                    />
                  )}
                  <h2 className="text-xl font-semibold mt-3">{fields.projectName}</h2>
                  <p className="text-muted-foreground text-sm mt-1">{fields.shortDescription}</p>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="skills" className="min-h-screen py-20 scroll-mt-20">
          <h2 className="text-3xl font-bold">Skills</h2>
        </section>

        <section id="about" className="min-h-screen py-20 scroll-mt-20">
          <h2 className="text-3xl font-bold">About Me</h2>
        </section>

        <section id="testimonials" className="min-h-screen py-20 scroll-mt-20">
          <h2 className="text-3xl font-bold">Testimonials</h2>
        </section>

        <section id="contact" className="min-h-screen py-20 scroll-mt-20">
          <h2 className="text-3xl font-bold">Contact Me</h2>
        </section>
      </div>
    </>
  );
}

