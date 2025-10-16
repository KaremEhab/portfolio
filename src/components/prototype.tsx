"use client";

import Image from "next/image";
import React, { useState } from "react";

interface FigmaPrototypeProps {
  figmaEmbedUrl?: string;
  className?: string; // outer wrapper
  backgroundColor?: string; // optional custom background
}

/**
 * Responsive Figma prototype that maintains an increased phone aspect ratio
 * and scales responsively up to a fixed max width.
 */
const FigmaPrototype: React.FC<FigmaPrototypeProps> = ({
  figmaEmbedUrl,
  className = "",
  backgroundColor = "#1E3A8A", // 🔵 Default blue background
}) => {
  const [isLoading, setIsLoading] = useState(true);

  if (!figmaEmbedUrl || typeof figmaEmbedUrl !== "string") {
    return (
      <div
        className={`flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg ${className}`}
      >
        <div>
          <p className="font-bold">Configuration Error</p>
          <p className="text-sm">Figma embed URL is missing or invalid.</p>
        </div>
      </div>
    );
  }

  const cleanUrl = new URL(figmaEmbedUrl);
  cleanUrl.searchParams.set("hotspot-hints", "1");
  cleanUrl.searchParams.set("hide-ui", "true");
  cleanUrl.searchParams.set("scaling", "contain");

  return (
    <div
      className={`relative rounded-[24px] overflow-hidden shadow-xl ${className}`}
      style={{
        aspectRatio: "375 / 950", // increased height ratio
        width: "100%",
        maxHeight: "380px",
        margin: "0 auto",
        transition: "all 0.3s ease-in-out",
        backgroundColor, // apply blue background dynamically
      }}
    >
      <div  className="absolute inset-0 flex flex-col items-center justify-center">
        <Image
          width={30}
          height={30}
          src="/assets/white-logo.svg"
          alt="Kareem Ehab Logo"
          className="w-30 h-30 object-contain"
        />
      </div>
      {isLoading && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3"
          style={{ backgroundColor }}
        >
          <Image
            width={30}
            height={30}
            src="/assets/white-logo.svg"
            alt="Kareem Ehab Logo"
            className="w-30 h-30 object-contain"
          />
          <div className="w-8 h-8 border-4 border-white/40 border-t-white rounded-full animate-spin" />
        </div>
      )}

      <iframe
        className="absolute top-0 left-0 w-full h-full border-0"
        title="Figma Prototype"
        src={cleanUrl.toString()}
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
};

/**
 * Wrapper for FigmaPrototype that keeps it responsive inside project cards.
 */
const PrototypePage: React.FC<{ figmaEmbedUrl?: string }> = ({
  figmaEmbedUrl,
}) => {
  const figmaPrototypeUrl =
    figmaEmbedUrl ||
    "https://embed.figma.com/proto/YLIh3gEZh7mr7dmcPKdTiW/Artist-App?page-id=0%3A1&node-id=2-43&starting-point-node-id=2%3A43&embed-host=share";

  return (
    <div className="w-full flex justify-center items-center">
      {/* You can change the background color here */}
      <FigmaPrototype
        figmaEmbedUrl={figmaPrototypeUrl}
        className="w-full"
        backgroundColor="#1E40AF" // 🔵 deep blue
      />
    </div>
  );
};

export default PrototypePage;
