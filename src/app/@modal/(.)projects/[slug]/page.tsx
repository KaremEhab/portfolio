import { Modal } from "@/components/modal";
import { getProjects, NormalizedProject } from "@/lib/contentful";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ExternalLink, Apple, Bot, Globe } from "lucide-react";
import { Asset } from "contentful";
import PrototypePage from "@/components/prototype";
import type { Document } from "@contentful/rich-text-types";

// ✅ 1. RichText component
function RichText({ document }: { document: Document | null | undefined }) {
  if (!document) return null;
  return (
    <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-white/80 leading-relaxed">
      {documentToReactComponents(document)}
    </div>
  );
}

// ✅ 2. ProjectContent component
function ProjectContent({ project }: { project: NormalizedProject }) {
  const { fields } = project;
  const displayImage = (
    Array.isArray(fields.displayImages)
      ? fields.displayImages[0]
      : fields.displayImages
  ) as Asset | undefined;

  const imageUrl = displayImage?.fields?.file?.url
    ? `https:${displayImage.fields.file.url}`
    : "";

  const videoUrl = fields.demoVideo
    ? typeof fields.demoVideo === "string"
      ? fields.demoVideo
      : `https:${(fields.demoVideo as Asset).fields?.file?.url ?? ""}`
    : "";

  return (
    <div className="bg-card-bg/80 backdrop-blur-2xl border border-card-border rounded-2xl p-8 md:p-12 animate-slide-up grid md:grid-cols-5 gap-8 md:gap-16">
      <div className="md:col-span-2 text-white flex flex-col gap-8 md:gap-12">
        <header>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">
            {fields.projectName}
          </h1>
          <p className="text-md md:text-lg text-white/70">
            {fields.clientCountry} - {fields.createdDate}
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            {fields.figmaLink && (
              <a
                href={fields.figmaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-white/5 border border-white/20 rounded-lg transition hover:bg-white/10"
              >
                View Figma Project <ExternalLink size={16} />
              </a>
            )}

            {/* Website Link Button */}
            {fields.websiteLink && (
              <a
                href={fields.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-white/5 border border-white/20 rounded-lg transition hover:bg-white/10"
              >
                <Globe size={16} /> Visit Website
              </a>
            )}

            {fields.appStoreLink && (
              <a
                href={fields.appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-white/5 border border-white/20 rounded-lg transition hover:bg-white/10"
              >
                <Apple size={16} /> App Store
              </a>
            )}

            {fields.googlePlayLink && (
              <a
                href={fields.googlePlayLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-white/5 border border-white/20 rounded-lg transition hover:bg-white/10"
              >
                <Bot size={16} /> Google Play
              </a>
            )}
          </div>
        </header>

        <div>
          <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-3">
            Full Description
          </h2>

          {videoUrl ? (
            <div className="mb-8 mt-4">
              <video
                src={videoUrl}
                className="w-full h-auto object-contain rounded-xl"
                style={{ maxHeight: 535 }}
                autoPlay
                muted
                loop
                playsInline
                controls={false}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          ) : imageUrl ? (
            <div
              className="mb-8 mt-4 rounded-xl"
              style={{ backgroundColor: "#fff" }}
            >
              <Image
                src={imageUrl}
                alt={`${fields.projectName} mockup`}
                width={800}
                height={1600}
                className="w-full h-auto object-contain rounded-xl"
                style={{ maxHeight: 535 }}
              />
            </div>
          ) : null}

          <RichText document={fields.fullDescription} />
        </div>
      </div>

      <aside className="md:col-span-3">
        <div className="sticky top-8 h-full">
          {fields.figmaEmbeddedLink && (
            <div className="rounded-xl overflow-hidden border border-card-border h-full">
              <PrototypePage figmaEmbedUrl={fields.figmaEmbeddedLink} />
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default async function ProjectModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const projects = await getProjects();
  const project = projects.find((p) => slugify(p.fields.projectName) === slug);

  if (!project) {
    notFound();
  }

  return (
    <Modal>
      <ProjectContent project={project} />
    </Modal>
  );
}
