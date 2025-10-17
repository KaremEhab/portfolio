"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ✅ Prevent background scroll
        document.body.classList.add("modal-open");

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") router.back();
        };
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.classList.remove("modal-open");
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [router]);

    const onDismiss = () => router.back();

    return (
        <div
            ref={dialogRef}
            className="fixed inset-0 z-40 flex justify-end p-0"
        >
            {/* ✅ Backdrop - covers full screen */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
                onClick={onDismiss}
            />

            {/* ✅ Right-aligned modal sheet (no margin-left) */}
            <div
                className="
          relative z-50
          h-full
          w-full md:w-[calc(100%-var(--sidebar-width))]
          bg-card-bg/80 dark:bg-card-bg/60
          backdrop-blur-2xl
          border-l border-card-border
          shadow-2xl
          animate-slide-up
          overflow-y-auto
          p-8 md:p-12
          rounded-none md:rounded-l-2xl
        "
            >
                {/* Close button */}
                <button
                    onClick={onDismiss}
                    className="absolute top-4 right-4 p-2 rounded-full bg-background/50 hover:bg-background transition-colors"
                >
                    <X size={20} />
                </button>

                {children}
            </div>
        </div>
    );
}
