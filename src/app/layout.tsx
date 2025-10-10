import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/ThemeProvider";
import Sidebar from "@/components/sidebar";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kareem Ehab | Portfolio",
  description: "Portfolio Projects by Kareem Ehab",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{
          backgroundColor: "var(--background)",
          color: "var(--foreground)",
          transition: "background-color 0.5s ease, color 0.5s ease",
        }}
      >
        <ThemeProvider>
          <div className="relative min-h-screen w-full">
            {/* ===== BACKGROUND LAYER ===== */}
            <div className="fixed inset-0 z-0">
              {/* Main Background Image */}
              <Image
                src="/assets/background-image.png"
                alt="Stylized background image"
                fill
                className="object-cover pointer-events-none"
                priority
              />

              {/* Dynamic Blur Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "var(--main-background)",
                  backdropFilter: "blur(100px)",
                  WebkitBackdropFilter: "blur(100px)",
                  transition: "background-color 0.5s ease",
                }}
              />

              {/* Abstract Shapes Layer */}
              <Image
                src="/assets/background-shapes.png"
                alt="Abstract background shapes"
                fill
                className="object-cover opacity-20 pointer-events-none"
              />
            </div>

            {/* ===== FOREGROUND CONTENT ===== */}
            <div className="relative z-10">
              <Sidebar />
              {/* Content offset to match sidebar width */}
              <main className="md:ml-[260px] p-6 transition-all duration-300">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
