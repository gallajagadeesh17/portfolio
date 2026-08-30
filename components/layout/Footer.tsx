"use client";

import React from "react";
import { socialLinks } from "@/content/socials";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-white/10 bg-background py-10 px-6 sm:px-8 z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs text-primary-muted">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToTop();
            }}
            className="font-extrabold text-sm text-primary tracking-widest uppercase hover:text-accent transition-colors"
          >
            Galla Jagadeesh
          </a>
          <span className="text-white/20">•</span>
          <span>AI · AUTOMATION · FULL STACK</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">
          <a
            href={socialLinks.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            GitHub
          </a>
          <a
            href={socialLinks.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={socialLinks.resume.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Copyright & Top */}
        <div className="flex items-center gap-4">
          <span>© 2026 Galla Jagadeesh</span>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-lg border border-white/10 hover:border-white/20 text-primary transition-colors flex items-center gap-1 font-bold"
            data-cursor="expand"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent" />
          </button>
        </div>
      </div>
    </footer>
  );
};
