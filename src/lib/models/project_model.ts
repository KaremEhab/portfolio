import { Asset, Entry, EntrySkeletonType } from "contentful";
import { Document } from "@contentful/rich-text-types";

// 1️⃣ Define your content model fields
export interface projectModel {
  projectName: string;
  shortDescription?: string;
  fullDescription?: Document;
  isApp?: boolean;
  appStoreLink?: string;
  googlePlayLink?: string;
  figmaLink?: string;
  figmaEmbeddedLink?: string; // Added this line
  clientCountry?: string;
  createdDate?: string;
  displayImages?: Asset[];
  demoVideo?: string;
  categories?: string[];
}

// 2️⃣ Define a skeleton (helps with Contentful Entry typing)
export type ProjectSkeleton = EntrySkeletonType<projectModel, "project">;

// 3️⃣ Define a full entry type
export type ProjectEntry = Entry<ProjectSkeleton>;
