import { createClient } from "contentful";
import type { ProjectEntry, projectModel } from "./models/project_model";

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
});

// Helper to normalize ProjectFields with defaults
// Helper to extract value from Contentful field (handles locale object or direct value)
function extractField<T>(field: unknown): T | undefined {
  if (field == null) return undefined;
  if (
    typeof field === "object" &&
    field !== null &&
    Object.keys(field).length === 1
  ) {
    const locale = Object.keys(field)[0];
    // @ts-expect-error: dynamic key access
    return field[locale];
  }
  return field as T;
}

// Helper to normalize ProjectFields with defaults from Contentful entry fields
export function normalizeProjectFields(fields: unknown): projectModel {
  const f = fields as Record<string, unknown>;
  return {
    projectName: extractField<string>(f.projectName) || "",
    shortDescription: extractField<string>(f.shortDescription) || "",
    fullDescription: extractField(f.fullDescription),
    isApp: extractField<boolean>(f.isApp) ?? false,
    appStoreLink: extractField<string>(f.appStoreLink) || "",
    googlePlayLink: extractField<string>(f.googlePlayLink) || "",
    websiteLink: extractField<string>(f.websiteLink) || "",
    figmaLink: extractField<string>(f.figmaLink) || "",
    figmaEmbeddedLink: extractField<string>(f.figmaEmbeddedLink) || "",
    clientCountry: extractField<string>(f.clientCountry) || "",
    createdDate: extractField<string>(f.createdDate) || "",
    displayImages: extractField(f.displayImages) || [],
    demoVideo: extractField<string>(f.demoVideo) || "",
    categories: extractField<string[]>(f.categories) || [],
  };
}

// Normalized project type
export type NormalizedProject = Omit<ProjectEntry, "fields"> & {
  fields: projectModel;
};

// Optional helper for cleaner fetching
export async function getProjects(): Promise<NormalizedProject[]> {
  const response = await client.getEntries({
    content_type: "portfolio",
    include: 10,
  });
  // Normalize fields for each entry
  return (response.items as unknown as ProjectEntry[]).map((entry) => ({
    ...entry,
    fields: normalizeProjectFields(entry.fields),
  }));
}
