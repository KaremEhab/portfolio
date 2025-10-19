// src/components/macbook.tsx

"use client";

import React from "react";
import Image from "next/image";

interface MacbookScreenProps {
  imageSrc?: string;
}

const MacbookScreen: React.FC<MacbookScreenProps> = ({ imageSrc }) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center mx-auto"
      style={{
        aspectRatio: "16 / 10", // ✅ Always keep 16:10 ratio
        width: "100%",
        maxWidth: "600px", // you can freely change this
        perspective: "1200px",
      }}
    >
      {/* Scale Wrapper — makes everything inside scale properly */}
      <div className="w-full h-full relative" style={{ fontSize: "1.2vw" }}>
        {/* 💻 MacBook Screen */}
        <div className="absolute inset-0 flex flex-col items-center justify-end">
          <div
            className="relative w-[90%] h-[88%] shadow-2xl bg-black p-[0.5%] border-[0.3vw] border-gray-800"
            style={{ borderRadius: "0.5vw" }} // Applied responsive border radius
          >
            <div
              className="relative w-full h-full overflow-hidden"
              style={{ borderRadius: "0.2vw" }} // Applied responsive border radius
            >
              {/* Wallpaper */}
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt="MacBook Wallpaper"
                  fill
                  style={{ objectFit: "cover" }}
                  className="absolute inset-0 z-0"
                  priority
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900" />
                  <div className="absolute inset-0 bg-[url('/assets/background-shapes.png')] opacity-10" />
                </>
              )}

              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[12%] h-[3%] bg-black rounded-b-lg z-20" />
            </div>
          </div>

          {/* 🧭 MacBook Base */}
          <div
            className="relative rounded-b-xl mx-auto shadow-inner"
            style={{
              height: "6%",
              width: "98%",
              transformOrigin: "top center",
              transform: "rotateX(75deg) translateY(-4%)",
              background: "linear-gradient(to bottom, #2d3748, #1a202c)",
              borderBottom: "0.2vw solid #1a202c",
              borderLeft: "0.2vw solid #1a202c",
              borderRight: "0.2vw solid #1a202c",
              boxShadow:
                "inset 0 -1px 2px rgba(255,255,255,0.05), 0 8px 20px rgba(0,0,0,0.4)",
            }}
          >
            {/* Trackpad */}
            <div
              className="absolute bottom-[15%] left-1/2 -translate-x-1/2 bg-gray-700/80 rounded-full"
              style={{ width: "20%", height: "6%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacbookScreen;
