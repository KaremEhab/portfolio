"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Wifi, BatteryFull } from "lucide-react";

interface IphonePageProps {
  imageSrc?: string;
}

const IphonePage: React.FC<IphonePageProps> = ({ imageSrc }) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
        relative mx-auto flex items-center justify-center
        h-full aspect-[10/19.5]
        transition-all duration-300
      "
    >
      {/* Phone Frame */}
      <div
        className="
          relative w-full h-full
          bg-black rounded-[1.3rem]
          border border-gray-800 shadow-2xl
          flex items-center justify-center overflow-hidden
        "
      >
        {/* Dynamic Island */}
        <div
          className="
            absolute top-[1.2rem] left-1/2 -translate-x-1/2
            w-[30%] h-[0.55rem] bg-black rounded-full z-20
          "
        ></div>

        {/* Inner Screen */}
        <div
          className="
            relative w-[90%] h-[94%] bg-black overflow-hidden
            rounded-[0.8rem]
          "
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="App Preview"
              fill
              priority
              sizes="100%"
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-gray-800" />
          )}
        </div>

        {/* Bottom Reflection Shadow */}
        <div
          className="
            absolute bottom-[-0.6rem] left-1/2 -translate-x-1/2
            w-[40%] h-[0.2rem] bg-black/50 rounded-full blur-md
          "
        />
      </div>
    </div>
  );
};

export default IphonePage;
