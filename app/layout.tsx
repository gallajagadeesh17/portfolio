import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Cursor } from "@/components/ui/Cursor";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gallajagadeesh.vercel.app"),
  title: "Galla Jagadeesh — AI & Automation Developer",
  description:
    "Galla Jagadeesh is a B.Tech Computer Engineering (Artificial Intelligence) student building AI applications, LLM workflows and workflow automations using n8n, Python, Flask and Google Gemini.",
  keywords: [
    "Galla Jagadeesh",
    "AI & Automation Developer",
    "B.Tech Computer Engineering Artificial Intelligence",
    "n8n",
    "Google Gemini",
    "Flask",
    "Python",
    "LLM Workflows",
  ],
  authors: [{ name: "Galla Jagadeesh" }],
  creator: "Galla Jagadeesh",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gallajagadeesh.vercel.app",
    title: "Galla Jagadeesh — AI & Automation Developer",
    description:
      "Building AI systems that work. B.Tech Computer Engineering (AI) student building AI applications, LLM workflows, and workflow automations.",
    siteName: "Galla Jagadeesh Portfolio",
    images: [
      {
        url: "/images/profile.png",
        width: 800,
        height: 800,
        alt: "Galla Jagadeesh — AI & Automation Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galla Jagadeesh — AI & Automation Developer",
    description:
      "Building AI systems that work using n8n, Python, Flask, and Google Gemini.",
    images: ["/images/profile.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth ${inter.variable} ${playfair.variable}`}
    >
      <body className="relative bg-background text-primary antialiased selection:bg-accent/40 selection:text-white bg-grid-texture min-h-screen flex flex-col font-sans">
        {/* Subtle Particle Layer */}
        <ParticleCanvas />
        {/* Custom Desktop Cursor Layer */}
        <Cursor />
        {/* Main Content */}
        <div className="relative z-10 flex-1">{children}</div>
      </body>
    </html>
  );
}
