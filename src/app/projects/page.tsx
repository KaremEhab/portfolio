/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import PrototypePage from "@/components/prototype";
import type { NormalizedProject } from "../../lib/contentful";
import type { projectModel } from "../../lib/models/project_model";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<NormalizedProject[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<NormalizedProject[]>(
    []
  );
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Projects");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch Projects + Categories
  useEffect(() => {
    (async () => {
      const { getProjects } = await import("../../lib/contentful");
      const data = await getProjects();
      setProjects(data);
      setFilteredProjects(data);

      const allCategories = data.flatMap((p) => p.fields.categories || []);
      const uniqueCategories = [
        "All Projects",
        ...Array.from(new Set(allCategories)),
      ];
      setCategories(uniqueCategories);
    })();
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Handle Category Selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    if (category === "All Projects") {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((p) =>
        p.fields.categories?.includes(category)
      );
      setFilteredProjects(filtered);
    }
  };

  return (
    <section id="projects" className="min-h-screen py-20 scroll-mt-20">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>

        {/* 🔽 Dropdown Menu */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between gap-2 bg-primary px-5 py-2.5 rounded-xl font-medium shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-primary/50 backdrop-blur-md border border-white/20"
          >
            {selectedCategory}
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-xl bg-white/80 dark:bg-neutral-900/70 border border-white/20 animate-fadeIn z-20">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className="w-full text-left px-4 py-2 text-sm text-gray-800 dark:text-gray-200 hover:bg-primary/10 dark:hover:bg-primary/20 transition-colors duration-200"
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PROJECTS SCROLL ROW */}
      <div className="overflow-x-auto overflow-y-hidden pb-4 scrollbar-hide">
        <ul
          className="flex gap-6 snap-x snap-mandatory scroll-smooth px-1"
          style={{ scrollBehavior: "smooth" }}
        >
          {filteredProjects.map((p) => {
            const fields = p.fields as projectModel;
            const imgUrl = fields.displayImages?.[0]?.fields?.file?.url
              ? `https:${fields.displayImages[0].fields.file.url}`
              : null;

            return (
              <li
                key={p.sys.id}
                className="relative bg-card-DEFAULT/50 min-w-[300px] max-w-[500px] flex-shrink-0 
                     p-5 rounded-2xl shadow-lg hover:shadow-primary/30 
                     transition-all duration-300 hover:scale-[1.03] snap-center overflow-hidden"
                style={{ border: "1px solid var(--card-border)" }}
              >
                {/* Figma Badge */}
                {!fields.isApp && fields.figmaLink && (
                  <a
                    href={fields.figmaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div
                      className="absolute top-2 left-2 backdrop-blur-xl p-2 rounded-full z-10 border"
                      style={{
                        backgroundColor: "var(--background)/10",
                        borderColor: "var(--card-border)",
                      }}
                    >
                      <img
                        src="icons/figma-logo.svg"
                        alt="Figma Logo"
                        className="relative z-10 w-full max-w-[30px] h-auto object-contain"
                      />
                    </div>
                  </a>
                )}

                {/* Thumbnail */}
                {imgUrl && !fields.isApp && (
                  <Image
                    src={imgUrl}
                    alt={fields.projectName || "Project image"}
                    width={400}
                    height={200}
                    className="w-full h-44 object-cover rounded-xl"
                  />
                )}

                {/* Embedded Prototype */}
                <PrototypePage figmaEmbedUrl={fields.figmaEmbeddedLink} />

                {/* Details */}
                <h2 className="text-xl font-semibold mt-3">
                  {fields.projectName}
                </h2>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
                  {fields.shortDescription}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
