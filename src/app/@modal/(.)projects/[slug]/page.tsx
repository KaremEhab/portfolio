import { Modal } from "@/components/modal";
import { getProjects } from "@/lib/contentful";
import { slugify } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { ExternalLink } from "lucide-react";
import { Asset } from "contentful";

// ✅ Renders rich text content from Contentful
function RichText({ document }: { document: any | null }) {
    if (!document) return null;
    return (
        <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none text-foreground/80 leading-relaxed">
            {documentToReactComponents(document)}
        </div>
    );
}

// ✅ Reusable project layout component (used in both /projects/[slug] and modal)
function ProjectContent({ project }: { project: any }) {
    const { fields } = project;

    const heroImage = (Array.isArray(fields.displayImages)
        ? fields.displayImages[0]
        : fields.displayImages) as Asset | undefined;

    const heroImageUrl = heroImage?.fields?.file?.url
        ? `https:${heroImage.fields.file.url}`
        : "";

    return (
        <div>
            <header className="mb-8 md:mb-12">
                <h1 className="text-3xl md:text-5xl font-bold mb-2">
                    {fields.projectName}
                </h1>
                <p className="text-md md:text-lg text-muted-foreground max-w-3xl">
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
                <div className="md:col-span-2">
                    <h2 className="text-2xl font-bold mb-4">About the project</h2>
                    <RichText document={fields.fullDescription} />
                </div>

                <aside className="md:col-span-1">
                    <div className="sticky top-8">
                        <h3 className="text-xl font-bold mb-4">Project Info</h3>

                        <div className="space-y-4 text-sm border-t border-card-border pt-4">
                            <div className="flex justify-between items-start gap-4">
                                <span className="text-muted-foreground">Date</span>
                                <span className="text-right font-medium">
                                    {fields.createdDate}
                                </span>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <span className="text-muted-foreground">Country</span>
                                <span className="text-right font-medium">
                                    {fields.clientCountry}
                                </span>
                            </div>
                            <div className="flex justify-between items-start gap-4">
                                <span className="text-muted-foreground">Categories</span>
                                <span className="text-right font-medium">
                                    {fields.categories?.join(", ")}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 border-t border-card-border pt-6 flex flex-col gap-3">
                            {fields.figmaLink && (
                                <a
                                    href={fields.figmaLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold py-2.5 rounded-lg transition hover:bg-primary/20"
                                >
                                    View on Figma <ExternalLink size={16} />
                                </a>
                            )}
                            {fields.googlePlayLink && (
                                <a
                                    href={fields.googlePlayLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold py-2.5 rounded-lg transition hover:bg-primary/20"
                                >
                                    Google Play Store <ExternalLink size={16} />
                                </a>
                            )}
                            {fields.appStoreLink && (
                                <a
                                    href={fields.appStoreLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 bg-primary/10 text-primary font-semibold py-2.5 rounded-lg transition hover:bg-primary/20"
                                >
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

// ✅ Server Component – safe to be async
export default async function ProjectModal({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;

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
