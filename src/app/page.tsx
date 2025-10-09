"use client";

import { NormalizedProject } from "../lib/contentful";
import Image from "next/image";
import type { projectModel } from "../lib/models/project_model";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  const [projects, setProjects] = useState<NormalizedProject[]>([]);

  useEffect(() => {
    (async () => {
      const { getProjects } = await import("../lib/contentful");
      const data = await getProjects();
      setProjects(data);
    })();
  }, []);

  if (!mounted) return null;

  return (
    <main
      className="p-10 min-h-screen transition-colors duration-300"
      style={{ background: "var(--background)", color: "var(--foreground)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Portfolio Projects</h1>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => {
          const fields = p.fields as projectModel;

          let displayImage = undefined;
          if (Array.isArray(fields.displayImages)) {
            displayImage = fields.displayImages[0];
          } else if (
            fields.displayImages &&
            typeof fields.displayImages === "object"
          ) {
            displayImage = fields.displayImages;
          }
          const imgUrl = displayImage?.fields?.file?.url
            ? `https:${displayImage.fields.file.url}`
            : null;

          return (
            <li
              key={p.sys.id}
              className="border p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
              style={{
                background: "var(--card-bg)",
                borderColor: "var(--card-border)",
              }}
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

              <h2 className="text-xl font-semibold mt-3">
                {fields.projectName || "Untitled Project"}
              </h2>

              <p className="text-gray-600 dark:text-gray-400 mb-2">
                {fields.shortDescription || "No description provided."}
              </p>

              {/* Full Description */}
              {fields.fullDescription && (
                <details className="mb-2">
                  <summary className="cursor-pointer text-blue-600 dark:text-blue-400">
                    Full Description
                  </summary>
                  <div className="prose prose-sm max-w-none bg-gray-50 dark:bg-gray-700 p-2 rounded mt-1">
                    {documentToReactComponents(fields.fullDescription)}
                  </div>
                </details>
              )}

              {/* Figma Design Only */}
              {fields.isFigmaDesignOnly !== undefined && (
                <div className="mb-1">
                  <span className="font-medium">Figma Design Only:</span>{" "}
                  {fields.isFigmaDesignOnly ? "Yes" : "No"}
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-2 mb-2">
                {typeof fields.appStoreLink === "string" &&
                  fields.appStoreLink && (
                    <a
                      href={fields.appStoreLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      App Store
                    </a>
                  )}
                {typeof fields.googlePlayLink === "string" &&
                  fields.googlePlayLink && (
                    <a
                      href={fields.googlePlayLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 underline"
                    >
                      Google Play
                    </a>
                  )}
                {typeof fields.figmaLink === "string" && fields.figmaLink && (
                  <a
                    href={fields.figmaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 underline"
                  >
                    Figma
                  </a>
                )}
              </div>

              {/* Created Date */}
              {typeof fields.createdDate === "string" && fields.createdDate && (
                <div className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Created:</span>{" "}
                  {fields.createdDate}
                </div>
              )}

              {/* Demo Video */}
              {typeof fields.demoVideo === "string" && fields.demoVideo && (
                <div className="mb-2">
                  <video
                    src={fields.demoVideo}
                    controls
                    className="w-full max-h-48 rounded"
                  />
                </div>
              )}

              {/* Display Images (extra) */}
              {Array.isArray(fields.displayImages) &&
                fields.displayImages.length > 1 && (
                  <div className="flex gap-2 mt-2 overflow-x-auto">
                    {fields.displayImages.slice(1).map((img, idx) => {
                      const url = img?.fields?.file?.url
                        ? `https:${img.fields.file.url}`
                        : null;
                      return url ? (
                        <Image
                          key={img.sys?.id || idx}
                          src={url}
                          alt={
                            typeof img.fields?.title === "string"
                              ? img.fields.title
                              : "Project image"
                          }
                          width={80}
                          height={60}
                          className="rounded border"
                        />
                      ) : null;
                    })}
                  </div>
                )}

              {/* Client Country & Categories */}
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                {typeof fields.clientCountry === "string" &&
                  fields.clientCountry && <span>{fields.clientCountry}</span>}
                {(() => {
                  let cats = fields.categories;
                  if (typeof cats === "string") cats = [cats];
                  if (Array.isArray(cats) && cats.length > 0) {
                    return <span> • {cats.join(", ")}</span>;
                  }
                  return null;
                })()}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
