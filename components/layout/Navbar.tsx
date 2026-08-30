"use client";

import React, { useState, useEffect } from "react";
import { socialLinks } from "@/content/socials";
import { MagneticButton } from "@/components/ui/MagneticButton";

const navItems = [
  { label: "ABOUT", href: "#about" },
  { label: "JOURNEY", href: "#journey" },
  { label: "TOOLKIT", href: "#skills" },
  { label: "WORK", href: "#work" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "CERTIFICATIONS", href: "#certifications" },
  { label: "CONTACT", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Active section detection
      const sections = navItems.map((item) => item.href.substring(1));
      let foundActiveSection = false;
      for (const sectionId of sections.reverse()) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sectionId);
            foundActiveSection = true;
            break;
          }
        }
      }

      if (!foundActiveSection) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          className="font-mono text-sm font-extrabold tracking-widest text-primary hover:text-accent transition-colors"
          data-cursor="open"
        >
          Galla Jagadeesh
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-6 font-mono text-xs font-semibold text-primary-muted">
          {navItems.map((item) => {
            const isCurrent = activeSection === item.href.substring(1);
            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative transition-colors hover:text-primary ${
                  isCurrent ? "text-accent font-bold" : ""
                }`}
                data-cursor="open"
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full origin-left transition-transform duration-300 ${
                    isCurrent ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Resume Action CTA */}
        <div className="flex items-center gap-3">
          <MagneticButton
            onClick={() => {
              window.open(socialLinks.resume.url, "_blank");
            }}
            className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-0.5 text-xs font-mono text-primary uppercase tracking-wider transition-all"
          >
            RESUME ↓
          </MagneticButton>
        </div>
      </div>
    </header>
  );
};
