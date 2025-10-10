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
      >
        <ThemeProvider>
          <div className="relative min-h-screen w-full">
            <div className="fixed inset-0 z-0">
              <Image
                src="/assets/background-image.png"
                alt="Stylized background image"
                fill
                className="object-cover pointer-events-none"
              />
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: "var(--bg-overlay)",
                  backdropFilter: "blur(100px)",
                  WebkitBackdropFilter: "blur(100px)",
                }}
              />
              <Image
                src="/assets/background-shapes.png"
                alt="Abstract background shapes"
                fill
                className="object-cover opacity-20 pointer-events-none"
              />
            </div>

            <div className="relative z-10">
              <Sidebar />
              {/* This margin correctly offsets the content from the 290px sidebar */}
              <main className="md:ml-[290px]">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

