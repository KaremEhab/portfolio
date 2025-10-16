"use client";

import React, { useState } from "react";

interface FigmaPrototypeProps {
    figmaEmbedUrl: string;
    className?: string; // green wrapper style
    frameClassName?: string; // Figma phone size only
}

const FigmaPrototype: React.FC<FigmaPrototypeProps> = ({
    figmaEmbedUrl,
    className = "",
    frameClassName = "w-[375px] h-[812px]", // default phone size
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
        // Outer wrapper (green background)
        <div
            className={`flex items-center justify-center bg-white-700 rounded-[32px] shadow-lg overflow-hidden ${className}`}
        >
            {/* Fixed-size Figma phone */}
            <div className={`relative ${frameClassName}`}>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-green-700">
                        <div className="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin" />
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
        </div>
    );
};

interface PrototypePageProps {
    className?: string; // green wrapper
    frameClassName?: string; // fixed Figma phone
}

const PrototypePage: React.FC<PrototypePageProps> = ({
    className = "w-[440px] h-[900px]", // freely resize this
    frameClassName = "w-[375px] h-[812px]", // keeps the phone fixed
}) => {
    const figmaPrototypeUrl =
        "https://embed.figma.com/proto/YLIh3gEZh7mr7dmcPKdTiW/Artist-App?page-id=0%3A1&node-id=2-43&starting-point-node-id=2%3A43&embed-host=share";

    return (
        <FigmaPrototype
            figmaEmbedUrl={figmaPrototypeUrl}
            className={className}
            frameClassName={frameClassName}
        />
    );
};

export default PrototypePage;
