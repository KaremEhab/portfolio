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
    const [isMounted, setIsMounted] = useState(false);
    const currentYear = new Date().getFullYear();
    const [activeSection, setActiveSection] = useState("home");
    const observer = useRef<IntersectionObserver | null>(null);
    const searchRef = useRef<HTMLInputElement>(null);

    // This effect runs only on the client, after the component has mounted
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Focus search on Cmd+F or Ctrl+F
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

    // Observe sections to highlight active link
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
        <aside
            className="fixed top-0 left-0 h-screen hidden md:flex flex-col w-[260px]
                 backdrop-blur-xl border-r p-4 z-20"
            style={{
                backgroundColor: "var(--sidebar-bg)",
                borderColor: "var(--sidebar-border)",
            }}
        >
            {/* ===== Header ===== */}
            <div className="flex flex-col gap-1 flex-1">
                <header className="mb-4 flex items-center gap-2">
                    {isMounted ? (
                        <>
                            {/* Black Logo (visible in light mode, hidden in dark mode) */}
                            <img
                                src="assets/black-logo.svg"
                                alt="Kareem Ehab Logo"
                                className="w-10 h-10 object-contain block dark:hidden"
                            />

                            {/* White Logo (hidden in light mode, visible in dark mode) */}
                            <img
                                src="assets/white-logo.svg"
                                alt="Kareem Ehab Logo"
                                className="w-10 h-10 object-contain hidden dark:block"
                            />
                        </>
                    ) : (
                        // Render a placeholder or default logo on the server and initial client render
                        <img
                            src="assets/black-logo.svg"
                            alt="Kareem Ehab Logo"
                            className="w-10 h-10 object-contain"
                        />
                    )}
                    <div
                        className="h-8 w-[1.5px]"
                        style={{ backgroundColor: "var(--muted-foreground)" }}
                    ></div>
                    <div>
                        <h1 className="text-[13px] font-bold leading-tight">Kareem Ehab</h1>
                        <p className="text-[10px] mt-0.5 text-muted-foreground">
                            Design Driven Development
                        </p>
                    </div>
                </header>

                {/* ===== Search ===== */}
                <div className="relative mb-4">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={16}
                    />
                    <input
                        ref={searchRef}
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg pl-10 pr-4 py-2 text-xs border border-transparent bg-[color:var(--primary-opacity)] text-[color:var(--foreground)] focus:outline-none focus:border-white transition-colors duration-200"
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
                                className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 text-left font-medium"
                                style={{
                                    backgroundColor: isActive
                                        ? "var(--primary)"
                                        : "var(--accent-bg)",
                                    color: isActive ? "var(--primary-foreground)" : "var(--foreground)",
                                    border: "1px solid transparent",
                                    boxShadow: isActive
                                        ? "0 0 10px rgba(59,130,246,0.3)"
                                        : "none",
                                }}
                            >
                                <Icon
                                    size={16}
                                    strokeWidth={isActive ? 2.5 : 1.5}
                                    style={{
                                        color: isActive
                                            ? "var(--primary-foreground)"
                                            : "var(--foreground)",
                                    }}
                                />
                                <span className="text-xs">{link.name}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* ===== Stats Box ===== */}
                <div
                    className="mt-auto rounded-lg p-4 text-center border"
                    style={{
                        backgroundColor: "var(--card-bg)",
                        borderColor: "var(--card-border)",
                    }}
                >
                    <p
                        className="text-2xl font-bold"
                        style={{ color: "var(--primary)" }}
                    >
                        +152.4K
                    </p>
                    <p className="text-[11px] text-muted-foreground">Working Hours</p>
                    <button
                        className="w-full text-xs font-semibold py-2.5 rounded-lg mt-4 transition-opacity"
                        style={{
                            backgroundColor: "var(--primary)",
                            color: "var(--primary-foreground)",
                        }}
                    >
                        Hire Me
                    </button>
                </div>
            </div>

            {/* ===== Footer ===== */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium">Language</span>
                    <div
                        className="flex items-center gap-1 bg-transparent p-1 rounded-lg border"
                        style={{ borderColor: "var(--card-border)" }}
                    >
                        <button className="px-3 py-1 text-[11px] rounded-md text-muted-foreground">
                            العربية
                        </button>
                        <button
                            className="px-3 py-1 text-[11px] rounded-md"
                            style={{
                                backgroundColor: "var(--primary)",
                                color: "var(--primary-foreground)",
                            }}
                        >
                            English
                        </button>
                    </div>
                </div>

                <div className="mt-6">
                    <ThemeToggle />
                </div>

                <p className="text-[10px] text-muted-foreground mt-6 text-center">
                    © {currentYear} Kareem Ehab, All rights reserved.
                </p>
            </div>
        </aside>
    );
}