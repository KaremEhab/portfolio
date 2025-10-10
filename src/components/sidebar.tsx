"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import {
    Search,
    Home,
    FolderCode,
    Code2,
    Mail,
    User2,
    Users2,
} from "lucide-react";

const links = [
    { name: "Home", id: "home", icon: Home },
    { name: "Projects", id: "projects", icon: FolderCode },
    { name: "Skills", id: "skills", icon: Code2 },
    { name: "About Me", id: "about", icon: User2 },
    { name: "Testimonials", id: "testimonials", icon: Users2 },
    { name: "Contact Me", id: "contact", icon: Mail },
];

export default function Sidebar() {
    const currentYear = new Date().getFullYear();
    const [activeSection, setActiveSection] = useState("home");
    const observer = useRef<IntersectionObserver | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // ✅ Cmd+F or Ctrl+F focuses the search bar
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isMac = navigator.platform.toUpperCase().includes("MAC");
            const cmdPressed = isMac ? e.metaKey : e.ctrlKey;

            if (cmdPressed && e.key === "f") {
                e.preventDefault();
                searchRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // ✅ Observe sections to highlight active link
    useEffect(() => {
        const sections = document.querySelectorAll("section[id]");
        observer.current = new IntersectionObserver(
            (entries) => {
                const visible = entries.find((e) => e.isIntersecting)?.target;
                if (visible) setActiveSection(visible.id);
            },
            { threshold: 0.5 }
        );
        sections.forEach((sec) => observer.current?.observe(sec));
        return () => sections.forEach((sec) => observer.current?.unobserve(sec));
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <aside className="fixed top-0 left-0 h-screen hidden md:flex flex-col w-[290px] bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 z-20">
            {/* ===== Header ===== */}
            <div className="flex flex-col gap-4 flex-1">
                <header className="mb-4 flex items-center gap-4">
                    {/* Logo */}
                    <img
                        src="assets/kareem-ehab-logo.svg"
                        alt="Kareem Ehab Logo"
                        className="w-10 h-10 object-contain"
                    />

                    {/* Divider */}
                    <div className="h-8 w-[1.5px] bg-white/40"></div>

                    {/* Name + Subtitle */}
                    <div>
                        <h1 className="text-xl font-bold leading-tight">Kareem Ehab</h1>
                        <p className="text-s text-white/70 mt-0.5">
                            Design Driven Development
                        </p>
                    </div>
                </header>

                {/* ===== Search ===== */}
                <div className="relative mb-4">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
                        size={18}
                    />
                    <input
                        ref={searchRef}
                        type="search"
                        placeholder="Search..."
                        className="w-full bg-transparent border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#4482E0]"
                    />
                </div>

                {/* ===== Navigation ===== */}
                <nav className="flex flex-col gap-2">
                    {links.map((link) => {
                        const isActive = activeSection === link.id;
                        const Icon = link.icon;
                        return (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all duration-200 text-left font-medium
                                    ${isActive
                                        ? "bg-[#4482E0] text-white shadow-md shadow-[#4482E0]/30"
                                        : "bg-[#4482E0]/20 text-white/80 hover:bg-[#4482E0]/40 hover:text-white"
                                    }`}
                            >
                                <Icon
                                    size={20}
                                    strokeWidth={isActive ? 3 : 1.5}
                                    className={`${isActive
                                        ? "text-white fill-white"
                                        : "text-white/80"
                                        } transition-all duration-200`}
                                />
                                <span>{link.name}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* ===== Stats Box ===== */}
                <div className="mt-auto bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-4xl font-bold text-[#4482E0]">+152.4K</p>
                    <p className="text-sm text-muted-foreground">Working Hours</p>
                    {/* ===== Hire Me Button ===== */}
                    <button className="w-full bg-[#4482E0] text-white font-semibold py-2.5 rounded-lg mt-4 hover:opacity-90 transition-opacity">
                        Hire Me
                    </button>
                </div>
            </div>

            {/* ===== Footer ===== */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Language</span>
                    <div className="flex items-center gap-1 bg-transparent p-1 rounded-lg border border-white/10">
                        <button className="px-3 py-1 text-sm rounded-md text-muted-foreground">
                            العربية
                        </button>
                        <button className="px-3 py-1 text-sm rounded-md bg-[#4482E0] text-white">
                            English
                        </button>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground mt-6 text-center">
                    © {currentYear} Kareem Ehab, All rights reserved.
                </p>
            </div>
        </aside>
    );
}
