import { Asset, Entry, EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

// 1️⃣ Define your content model fields
export interface ProjectFields {
  projectName: string;
  shortDescription?: string;
  fullDescription?: Document;
  isFigmaDesignOnly?: boolean;
  appStoreLink?: string;
  googlePlayLink?: string;
  figmaLink?: string;
  clientCountry?: string;
  createdDate?: string;
  displayImages?: Asset[];
  demoVideo?: string;
  categories?: string[];
}

// 2️⃣ Define a skeleton (helps with Contentful Entry typing)
export type ProjectSkeleton = EntrySkeletonType<ProjectFields, 'project'>;

// 3️⃣ Define a full entry type
export type ProjectEntry = Entry<ProjectSkeleton>;
