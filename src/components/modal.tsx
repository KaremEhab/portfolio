"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
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
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* 🔹 Backdrop */}
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onDismiss}
            />

            {/* 🔹 Floating close button (top-right of the screen) */}
            <button
                onClick={onDismiss}
                className="fixed top-4 right-4 z-[60] p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                aria-label="Close project details"
            >
                <X size={22} />
            </button>

            {/* 🔹 Modal content */}
            <div
                className="relative z-50 flex min-h-full items-center justify-center mt-20"
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className="relative w-full bg-card/80 backdrop-blur-2xl
                     border border-white/10 shadow-2xl rounded-2xl
                     text-white overflow-hidden"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
