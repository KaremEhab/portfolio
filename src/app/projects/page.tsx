/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import PrototypePage from "@/components/prototype";
import type { NormalizedProject } from "../../lib/contentful";
import type { projectModel } from "../../lib/models/project_model";
import IphonePage from "@/components/iphone";
import MacbookScreen from "@/components/macbook";

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
    <section
      id="projects"
      className="ml-sidebar transition-all duration-300 pr-5 min-h-screen/2 scroll-mt-20"
    >
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
      <div className="overflow-x-auto overflow-y-hidden py-4 scrollbar-hide">
        <ul
          className="flex gap-6 snap-x snap-mandatory scroll-smooth px-1 group"
          style={{ scrollBehavior: "smooth" }}
        >
          {filteredProjects.map((p) => {
            const fields = p.fields as projectModel;

            // ✅ Get first display image safely
            const displayImage = Array.isArray(fields.displayImages)
              ? fields.displayImages[0]
              : fields.displayImages && typeof fields.displayImages === "object"
              ? fields.displayImages
              : undefined;

            const imgUrl =
              displayImage &&
              "fields" in displayImage &&
              displayImage.fields?.file?.url
                ? `https:${displayImage.fields.file.url}`
                : ""; // 👈 Optional fallback image

            return (
              <li
                key={p.sys.id}
                className="relative min-w-[300px] max-w-[500px] flex-shrink-0 
        p-5 rounded-2xl
        transition-all duration-300 hover:scale-[1.03] snap-center overflow-hidden
        border border-[var(--card-border)]
        bg-[var(--project-card-bg)]
        hover:shadow-[0_4px_30px_var(--shadow-primary)]
        mb-5"
              >
                {/* 🔹 Figma badge */}
                {!fields.isApp && fields.figmaLink && (
                  <a
                    href={fields.figmaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-2 left-2 backdrop-blur-xl p-2 rounded-full z-10 border"
                    style={{
                      backgroundColor: "var(--background)/10",
                      borderColor: "var(--card-border)",
                    }}
                  >
                    <img
                      src="icons/figma-logo.svg"
                      alt="Figma Logo"
                      className="w-6 h-6 object-contain"
                    />
                  </a>
                )}

                {/* 🔹 Image Preview (iPhone or MacBook) */}
                {imgUrl && (
                  <div className="w-full max-w-[400px] max-h-[400px] flex items-center justify-center mx-auto">
                    {fields.categories?.some((cat) =>
                      ["web design", "next js"].includes(cat.toLowerCase())
                    ) ? (
                      <MacbookScreen imageSrc={imgUrl} />
                    ) : (
                      <IphonePage imageSrc={imgUrl} />
                    )}
                  </div>
                )}

                {/* Embedded Prototype */}
                {/* <div className="w-full" style={{ maxHeight: 400 }}>
                  <PrototypePage figmaEmbedUrl={fields.figmaEmbeddedLink} />
                </div> */}

                {/* 🔹 Text Info */}
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
