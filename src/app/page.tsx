"use client";

import { Marquee } from "../components/marquee";
import HomePage from "./home/page";
import SkillsPage from "./skills/page";
// import { PackagesPage } from "./packages/page";
import AboutPage from "./about/page";
import TestimonialsPage from "./testimonials/page";
import ContactPage from "./contact/page";
import ProjectsPage from "./projects/page";

export default function App() {
  return (
    <>
      {/* SKILLS SECTION */}
      <div className="mx-auto px-6 md:px-5">
        <main className="ml-sidebar transition-all duration-300">
          <HomePage />
        </main>
      </div>

      {/* MARQUEE SECTION */}
      <Marquee />

      {/* PROJECTS SECTION */}
      <div className="bg-[var(--project-card-bg)] pb-5 pt-5 mt-20">
        <ProjectsPage />
      </div>

      <div className="mx-auto px-6 md:px-5">
        <main className="ml-sidebar transition-all duration-300">
          {/* SKILLS SECTION */}
          <SkillsPage />

          {/* ABOUT SECTION */}
          <AboutPage />

          {/* TESTIMONIALS SECTION */}
          <TestimonialsPage />

          {/* CONTACT SECTION */}
          <ContactPage />
        </main>
      </div>
    </>
  );
}
