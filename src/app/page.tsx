
import { getProjects } from '../lib/contentful';
import Image from 'next/image';
import type { ProjectFields } from '../lib/types/project';

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Portfolio Projects</h1>

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => {
          const fields = p.fields as ProjectFields;

          const displayImage = fields.displayImages?.[0];
          const imgUrl = displayImage?.fields?.file?.url
            ? `https:${displayImage.fields.file.url}`
            : null;

          return (
            <li key={p.sys.id} className="border p-4 rounded-lg shadow">
              {imgUrl && (
                <Image
                  src={imgUrl}
                  alt={fields.projectName || 'Project image'}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover rounded"
                />
              )}

              <h2 className="text-xl font-semibold mt-3">
                {fields.projectName || 'Untitled Project'}
              </h2>

              <p className="text-gray-600 mb-2">
                {fields.shortDescription || 'No description provided.'}
              </p>

              {/* Full Description (as JSON for now) */}
              {fields.fullDescription && (
                <details className="mb-2">
                  <summary className="cursor-pointer text-blue-600">Full Description</summary>
                  <pre className="whitespace-pre-wrap text-xs bg-gray-50 p-2 rounded mt-1">
                    {JSON.stringify(fields.fullDescription, null, 2)}
                  </pre>
                </details>
              )}

              {/* Figma Design Only */}
              {fields.isFigmaDesignOnly !== undefined && (
                <div className="mb-1">
                  <span className="font-medium">Figma Design Only:</span> {fields.isFigmaDesignOnly ? 'Yes' : 'No'}
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-2 mb-2">
                {typeof fields.appStoreLink === 'string' && fields.appStoreLink && (
                  <a href={fields.appStoreLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">App Store</a>
                )}
                {typeof fields.googlePlayLink === 'string' && fields.googlePlayLink && (
                  <a href={fields.googlePlayLink} target="_blank" rel="noopener noreferrer" className="text-green-600 underline">Google Play</a>
                )}
                {typeof fields.figmaLink === 'string' && fields.figmaLink && (
                  <a href={fields.figmaLink} target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">Figma</a>
                )}
              </div>

              {/* Created Date */}
              {typeof fields.createdDate === 'string' && fields.createdDate && (
                <div className="mb-1 text-sm text-gray-500">
                  <span className="font-medium">Created:</span> {fields.createdDate}
                </div>
              )}

              {/* Demo Video */}
              {typeof fields.demoVideo === 'string' && fields.demoVideo && (
                <div className="mb-2">
                  <video src={fields.demoVideo} controls className="w-full max-h-48 rounded" />
                </div>
              )}

              {/* Display Images (beyond first) */}
              {Array.isArray(fields.displayImages) && fields.displayImages.length > 1 && (
                <div className="flex gap-2 mt-2 overflow-x-auto">
                  {fields.displayImages.slice(1).map((img, idx) => {
                    const url = img?.fields?.file?.url ? `https:${img.fields.file.url}` : null;
                    return url ? (
                      <Image
                        key={img.sys?.id || idx}
                        src={url}
                        alt={typeof img.fields?.title === 'string' ? img.fields.title : 'Project image'}
                        width={80}
                        height={60}
                        className="rounded border"
                      />
                    ) : null;
                  })}
                </div>
              )}

              {/* Client Country & Categories */}
              <div className="mt-3 text-sm text-gray-500">
                {typeof fields.clientCountry === 'string' && fields.clientCountry && <span>{fields.clientCountry}</span>}
                {Array.isArray(fields.categories) && fields.categories.length > 0 && (
                  <span> • {fields.categories.join(', ')}</span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
