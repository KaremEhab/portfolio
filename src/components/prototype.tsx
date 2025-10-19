/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

// A simple hook to check if an element is in the viewport
const useInView = (options: IntersectionObserverInit = {}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, inView] as const;
};

interface FigmaPrototypeProps {
  figmaEmbedUrl?: string;
  className?: string;
  backgroundColor?: string;
}

const FigmaPrototype: React.FC<FigmaPrototypeProps> = ({
  figmaEmbedUrl,
  className = "",
  backgroundColor = "#1E3A8A",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [ref, inView] = useInView({ threshold: 0.1 });

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
  cleanUrl.searchParams.set("hotspot-hints", "0");
  cleanUrl.searchParams.set("hide-ui", "true");
  cleanUrl.searchParams.set("scaling", "contain");

  return (
    <div
      ref={ref}
      // --- CHANGE: Added h-full to the className to ensure it takes parent's height ---
      className={`relative overflow-hidden shadow-xl ${className}`}
      style={{
        // --- CHANGE: Removed aspectRatio, minWidth, and minHeight ---
        width: "100%",
        height: "100%", // Explicitly set height to 100%
        margin: "0 auto",
        transition: "all 0.3s ease-in-out",
        backgroundColor,
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Image
          width={30}
          height={30}
          src="/assets/white-logo.svg"
          alt="Kareem Ehab Logo"
          className="w-30 h-30 object-contain"
        />
      </div>
      {inView && (
        <>
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
        </>
      )}
    </div>
  );
};

const PrototypePage: React.FC<{ figmaEmbedUrl?: string }> = ({
  figmaEmbedUrl,
}) => {
  return (
    // --- CHANGE: Added h-full here so it can be passed down ---
    <div className="w-full h-full flex justify-center items-center">
      <FigmaPrototype
        figmaEmbedUrl={figmaEmbedUrl}
        // --- CHANGE: And passed h-full to the child component ---
        className="w-full h-full"
        backgroundColor="#1E40AF"
      />
    </div>
  );
};

export default PrototypePage;
