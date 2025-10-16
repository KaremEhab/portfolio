"use client";

import { NormalizedProject } from "../../lib/contentful";
import { useEffect, useState } from "react";
import Image from "next/image";
import type { projectModel } from "../../lib/models/project_model";
import PrototypePage from "@/components/prototype";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<NormalizedProject[]>([]);

  useEffect(() => {
    (async () => {
      const { getProjects } = await import("../../lib/contentful");
      const data = await getProjects();
      setProjects(data);
    })();
  }, []);

  return (<section id="projects" className="min-h-screen py-20 scroll-mt-20">
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
            className="bg-card-DEFAULT/50 p-4 rounded-lg shadow-lg hover:shadow-primary/20 transition-shadow duration-200  flex flex-col overflow-hidden" style={{ border: "1px solid var(--card-border)" }}
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
            {/* Prototype SECTION */}
            <PrototypePage
            />
            <h2 className="text-xl font-semibold mt-3">{fields.projectName}</h2>
            <p className="text-muted-foreground text-sm mt-1">{fields.shortDescription}</p>
          </li>
        );
      })}
    </ul>
  </section>);
}
