"use client";

import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import {
    Home,
    FolderCode,
    Code2,
    User,
    Users,
    Mail,
    Search,
} from "lucide-react";

const links = [
    { name: "Home", id: "home", icon: <Home size={20} /> },
    { name: "Projects", id: "projects", icon: <FolderCode size={20} /> },
    { name: "Skills", id: "skills", icon: <Code2 size={20} /> },
    { name: "About Me", id: "about", icon: <User size={20} /> },
    { name: "Testimonials", id: "testimonials", icon: <Users size={20} /> },
    { name: "Contact Me", id: "contact", icon: <Mail size={20} /> },
];

export default function Sidebar() {
    const currentYear = new Date().getFullYear();
    const [activeSection, setActiveSection] = useState("home");
    const observer = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const mainContent = document.querySelector("main");
        if (!mainContent) return;

        observer.current = new IntersectionObserver(
            (entries) => {
                const visibleSection = entries.find(
                    (entry) => entry.isIntersecting
                )?.target;
                if (visibleSection) {
                    setActiveSection(visibleSection.id);
                }
            },
            { root: null, threshold: 0.5 }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((section) => observer.current?.observe(section));

        return () => {
            sections.forEach((section) => observer.current?.unobserve(section));
        };
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <aside className="fixed top-0 left-0 h-screen hidden md:flex flex-col w-[280px] bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 z-20">
            <div className="flex flex-col gap-4 flex-1">
                <header className="mb-4">
                    <h1 className="text-xl font-bold">Kareem Ehab</h1>
                    <p className="text-sm text-muted-foreground">
                        Design Driven Development
                    </p>
                </header>

                <div className="relative mb-4">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        size={18}
                    />
                    <input
                        type="search"
                        placeholder="Search..."
                        className="w-full bg-transparent border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <nav className="flex flex-col gap-2">
                    {links.map((link) => {
                        const isActive = activeSection === link.id;
                        return (
                            <button
                                key={link.id}
                                onClick={() => scrollToSection(link.id)}
                                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-all text-left ${isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                                    }`}
                            >
                                {link.icon}
                                <span className="font-medium">{link.name}</span>
                            </button>
                        );
                    })}
                </nav>

                <div className="mt-auto bg-white/5 border border-white/10 rounded-lg p-4 text-center">
                    <p className="text-4xl font-bold text-primary">+152.4K</p>
                    <p className="text-sm text-muted-foreground">Working Hours</p>
                </div>

                <button className="w-full bg-primary text-primary-foreground font-semibold py-2.5 rounded-lg mt-4 hover:opacity-90 transition-opacity">
                    Hire Me
                </button>
            </div>

            <div className="mt-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium">Language</span>
                    <div className="flex items-center gap-1 bg-transparent p-1 rounded-lg border border-white/10">
                        <button className="px-3 py-1 text-sm rounded-md text-muted-foreground">
                            العربية
                        </button>
                        <button className="px-3 py-1 text-sm rounded-md bg-primary text-primary-foreground">
                            English
                        </button>
                    </div>
                </div>
                {/* <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Theme</span>
                    <ThemeToggle />
                </div> */}
                <p className="text-xs text-muted-foreground mt-6 text-center">
                    © {currentYear} Kareem Ehab, All rights reserved.
                </p>
            </div>
        </aside>
    );
}

