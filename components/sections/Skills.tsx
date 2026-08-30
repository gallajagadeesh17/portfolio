"use client";

import React, { useEffect, useRef } from "react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";

interface TechGroup {
  category: string;
  items: string[];
}

const ecosystem: TechGroup[] = [
  {
    category: "LLM WORKFLOWS",
    items: ["Google Gemini", "AI Agents", "Prompt Engineering", "NLP"],
  },
  {
    category: "AUTOMATION & PIPELINES",
    items: ["n8n", "REST APIs", "Bright Data API", "Google Sheets API", "Gmail API", "LinkedIn API", "GitHub API"],
  },
  {
    category: "PYTHON & AI APPS",
    items: ["Python", "Flask", "Pandas", "NumPy", "Scikit-learn"],
  },
  {
    category: "DATABASES & TOOLS",
    items: ["SQL", "MySQL", "SQLite", "Git", "GitHub", "Google Colab"],
  },
];

export const Skills: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgLinesRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>("[data-eco-group]");
      const floatTween = gsap.to(groups, {
        y: -3,
        duration: 6.5,
        stagger: 0.35,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        paused: true,
      });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true, // Content NEVER hides after revealing!
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        "[data-toolkit-heading-word]",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.65, stagger: 0.07, ease: "power4.out" }
      );

      tl.fromTo(
        "[data-center-node]",
        { scale: 0.95, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.55, ease: "power3.out" },
        "-=0.25"
      );

      if (svgLinesRef.current) {
        const lines = svgLinesRef.current.querySelectorAll("line");
        tl.fromTo(
          lines,
          { strokeDasharray: 200, strokeDashoffset: 200, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.35, duration: 0.7, stagger: 0.1 },
          "-=0.4"
        );
      }

      tl.fromTo(
        groups,
        { y: 15, opacity: 0.35 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" },
        "-=0.4"
      );

      tl.fromTo(
        "[data-eco-item]",
        { y: 8, opacity: 0.55 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.025, ease: "power3.out" },
        "-=0.25"
      );

      tl.call(() => floatTween.play());
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="mb-16">
        <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
          03 / TOOLKIT
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-tight mt-2">
          <span data-toolkit-heading-word className="inline-block opacity-100">AI</span>{" "}
          <span data-toolkit-heading-word className="inline-block opacity-100">&amp;</span>{" "}
          <span data-toolkit-heading-word className="inline-block opacity-100">Automation</span>{" "}
          <span data-toolkit-heading-word className="inline-block font-serif italic font-normal text-accent opacity-100">Ecosystem.</span>
        </h2>
        <p className="text-sm sm:text-base text-primary-muted mt-3 max-w-2xl">
          Connected technology architecture linking AI applications, LLM workflows, automation pipelines, and developer tooling.
        </p>
      </div>

      {/* Connected AI Ecosystem Container */}
      <div className="relative p-6 sm:p-12 border-y border-white/10 flex flex-col items-center">
        {/* Subtle SVG Connecting Lines Background (Desktop) */}
        <svg
          ref={svgLinesRef}
          aria-hidden="true"
          className="hidden md:block pointer-events-none absolute inset-0 w-full h-full stroke-accent/40 fill-none z-0"
        >
          <line x1="50%" y1="20%" x2="25%" y2="50%" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="50%" y1="20%" x2="75%" y2="50%" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="50%" y1="20%" x2="25%" y2="80%" strokeWidth="1" strokeDasharray="4,4" />
          <line x1="50%" y1="20%" x2="75%" y2="80%" strokeWidth="1" strokeDasharray="4,4" />
        </svg>

        {/* Central Anchor Node */}
        <div data-center-node className="relative z-10 mb-12 text-center opacity-100">
          <div className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-accent bg-accent/15 text-accent font-mono text-xs sm:text-sm font-extrabold tracking-widest uppercase shadow-2xl shadow-accent/20">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            AI &amp; AUTOMATION CORE
          </div>
        </div>

        {/* 4 Connected Ecosystem Branch Groups */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {ecosystem.map((grp, gIdx) => (
            <div
              key={gIdx}
              data-eco-group
              className="p-6 rounded-2xl bg-surface/80 border border-white/10 backdrop-blur-md flex flex-col gap-3 hover:border-accent/40 transition-colors opacity-100"
            >
              <div className="font-mono text-xs font-bold text-accent uppercase tracking-widest border-b border-white/10 pb-2">
                // {grp.category}
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {grp.items.map((item, idx) => (
                  <span
                    key={idx}
                    data-eco-item
                    className="px-3.5 py-1.5 rounded-xl text-xs font-mono bg-white/5 border border-white/10 text-primary hover:-translate-y-0.5 hover:border-white/25 hover:text-white transition-[transform,border-color,color] duration-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
