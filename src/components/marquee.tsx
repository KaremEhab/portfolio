import { Sparkles } from "lucide-react";

export function Marquee() {
    const items = [
        "Pixel Perfect",
        "Fast & Fluid",
        "Scalable Apps",
        "Modern UI",
        "Smooth Animations",
        "Adaptive",
        "Responsive Design",
        "Clean Code",
    ];

    return (
        <div className="relative flex overflow-hidden bg-[#4482E0] text-white py-4">
            {/* Animated Gradient Background */}
            <div
                className="absolute inset-0 rotate-[-2deg] scale-110 blur-xl"
                style={{
                    background:
                        "linear-gradient(120deg, var(--primary) 0%, var(--accent) 40%, var(--primary) 80%)",
                    animation: "gradient-move 8s ease-in-out infinite alternate",
                    transformOrigin: "center",
                }}
            ></div>

            {/* Subtle Filled Overlay */}
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-md"></div>

            {/* Marquee Content */}
            <div className="relative z-10 w-full">
                <div className="flex">
                    {/* Main Loop */}
                    <div className="flex animate-marquee whitespace-nowrap">
                        {items.map((item, index) => (
                            <div key={index} className="inline-flex items-center mx-6">
                                <span className="text-white text-lg font-medium tracking-wide">
                                    {item}
                                </span>
                                <Sparkles className="w-5 h-5 text-white/70 ml-4 animate-pulse" />
                            </div>
                        ))}
                    </div>

                    {/* Duplicate for Seamless Scroll */}
                    <div
                        className="flex animate-marquee whitespace-nowrap"
                        aria-hidden="true"
                    >
                        {items.map((item, index) => (
                            <div
                                key={`duplicate-${index}`}
                                className="inline-flex items-center mx-6"
                            >
                                <span className="text-white text-lg font-medium tracking-wide">
                                    {item}
                                </span>
                                <Sparkles className="w-5 h-5 text-white/70 ml-4 animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Fade Edges */}
                <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#0f1729] via-transparent to-transparent dark:from-[#4482E0] pointer-events-none" />
                <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-[#0f1729] via-transparent to-transparent dark:from-[#4482E0] pointer-events-none" />
            </div>
        </div>
    );
}
