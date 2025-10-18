import { Modal } from "@/components/modal";
import { getProjects } from "@/lib/contentful";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ExternalLink } from "lucide-react";
import { Asset } from "contentful";

function RichText({ document }: { document: any | null }) {
    if (!document) return null;
    return (
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-white/80 leading-relaxed">
            {documentToReactComponents(document)}
        </div>
    );
}

// Reusable component for the project layout
function ProjectContent({ project }: { project: any }) {
    const { fields } = project;
    const heroImage = (Array.isArray(fields.displayImages)
        ? fields.displayImages[0]
        : fields.displayImages) as Asset | undefined;

    const heroImageUrl = heroImage?.fields?.file?.url ? `https:${heroImage.fields.file.url}` : "";

    return (
        // This container provides the background and padding for the content inside the modal
        <div className="bg-card-bg/80 backdrop-blur-2xl border border-card-border rounded-2xl p-8 md:p-12 animate-slide-up">
            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 text-white">
                    {fields.projectName}
                </h1>
                <p className="text-md md:text-lg text-white/70 max-w-3xl">
                    {fields.shortDescription}
                </p>
            </header>

            {heroImageUrl && (
                <div className="mb-8 md:mb-12 rounded-xl overflow-hidden border border-card-border">
                    <Image
                        src={heroImageUrl}
                        alt={fields.projectName}
                        width={1200}
                        height={675}
                        className="w-full h-auto object-cover"
                    />
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                <div className="md:col-span-2 text-white">
                    <h2 className="text-2xl font-bold mb-4">About the project</h2>
                    <RichText document={fields.fullDescription} />
                </div>
                <aside className="md:col-span-1">
                    <div className="sticky top-8">
                        <h3 className="text-xl font-bold mb-4 text-white">Project Info</h3>
                        <div className="space-y-4 text-sm border-t border-card-border pt-4 text-white">
                            <div className="flex justify-between items-start gap-4">
                                <span className="text-white/60">Date</span>
                                <span className="text-right font-medium">{fields.createdDate}</span>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <span className="text-white/60">Country</span>
                                <span className="text-right font-medium">{fields.clientCountry}</span>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <span className="text-white/60">Categories</span>
                                <span className="text-right font-medium">
                                    {fields.categories?.join(", ")}
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 border-t border-card-border pt-6 flex flex-col gap-3">
                            {fields.figmaLink && (
                                <a href={fields.figmaLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold py-2.5 rounded-lg transition hover:bg-primary/20">
                                    View on Figma <ExternalLink size={16} />
                                </a>
                            )}
                            {fields.googlePlayLink && (
                                <a href={fields.googlePlayLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold py-2.5 rounded-lg transition hover:bg-primary/20">
                                    Google Play Store <ExternalLink size={16} />
                                </a>
                            )}
                            {fields.appStoreLink && (
                                <a href={fields.appStoreLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold py-2.5 rounded-lg transition hover:bg-primary/20">
                                    Apple App Store <ExternalLink size={16} />
                                </a>
                            )}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
}


export default async function ProjectModal({ params }: { params: Promise<{ slug: string }> }) {
    // ✅ FIX: Await the params promise to resolve it before accessing its properties.
    const resolvedParams = await params;
    const { slug } = resolvedParams;

    const projects = await getProjects();
    const project = projects.find(
        (p) => slugify(p.fields.projectName) === slug
    );

    if (!project) {
        notFound();
    }

    return (
        <Modal>
            <ProjectContent project={project} />
        </Modal>
    );
}

