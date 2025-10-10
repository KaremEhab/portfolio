import { Smartphone, PenTool } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
    return (
        <section
            id="home"
            className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-x-10 py-20 scroll-mt-20"
        >
            {/* LEFT CONTENT (takes up 60% of width on medium screens) */}
            <div className="w-full md:w-4/6 flex flex-col justify-center text-left">
                <h1 className="text-5xl md:w-2/3 lg:text-4xl font-bold leading-tight">
                    Building Beautiful Experiences Through
                </h1>
                <p className="text-xl lg:text-l text-muted-foreground mt-4">
                    Flutter Development & UI UX Design
                </p>

                <div className="mt-10 md:w-140">
                    <h2 className="text-xl font-semibold mb-6">What I Offer</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                        <div className="bg-card-DEFAULT/50 backdrop-blur-sm border border-card-border rounded-xl p-6 text-left">
                            <div className="bg-primary/10 border border-primary/20 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                                <Smartphone className="text-primary" />
                            </div>
                            <h3 className="text-m font-semibold mb-2">
                                Cross-Platform Applications
                            </h3>
                            <p className="text-muted-foreground text-xs">
                                Building seamless apps that work perfectly across iOS, Android, and web platforms.
                            </p>
                        </div>
                        <div className="bg-card-DEFAULT/50 backdrop-blur-sm border border-card-border rounded-xl p-6 text-left">
                            <div className="bg-primary/10 border border-primary/20 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                                <PenTool className="text-primary" />
                            </div>
                            <h3 className="text-m font-semibold mb-2">Intuitive UI/UX Designs</h3>
                            <p className="text-muted-foreground text-xs">
                                Creating intuitive and engaging user experiences with modern design principles.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT IMAGE (takes up 40% of width on medium screens) */}
            <div className="w-full md:w-2/5 flex justify-center md:justify-end relative mt-16 md:mt-0">
                {/* BACKGROUND PATTERN */}
                <Image
                    width={10}
                    height={10}
                    src="assets/mobile-background-shape.svg"
                    alt="Background pattern"
                    className="w-full max-w-[350px] h-auto object-contain opacity-70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />

                {/* FOREGROUND PHONE IMAGE */}
                <img
                    src="assets/phone.png"
                    alt="Phone mockup"
                    className="relative z-10 w-full max-w-[500px] h-auto object-contain"
                />
            </div>
        </section>
    );
}
