"use client";

import React, { useEffect, useRef, useState } from "react";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";

interface TechGroup {
  id: number;
  number: string;
  category: string;
  flow: string[];
  items: string[];
}

const ecosystem: TechGroup[] = [
  {
    id: 0,
    number: "01",
    category: "LLM WORKFLOWS",
    flow: ["MODEL", "PROMPT", "AGENT", "NLP"],
    items: ["Google Gemini", "AI Agents", "Prompt Engineering", "NLP"],
  },
  {
    id: 1,
    number: "02",
    category: "AUTOMATION & PIPELINES",
    flow: ["n8n", "APIs", "DATA", "WORKFLOW"],
    items: ["n8n", "REST APIs", "Bright Data API", "Google Sheets API", "Gmail API", "LinkedIn API", "GitHub API"],
  },
  {
    id: 2,
    number: "03",
    category: "PYTHON & AI APPS",
    flow: ["Python", "Flask", "Pandas", "NumPy", "ML"],
    items: ["Python", "Flask", "Pandas", "NumPy", "Scikit-learn"],
  },
  {
    id: 3,
    number: "04",
    category: "DATABASES & TOOLS",
    flow: ["SQL", "MySQL", "SQLite", "Git", "GitHub", "Colab"],
    items: ["SQL", "MySQL", "SQLite", "Git", "GitHub", "Google Colab"],
  },
];

export const Skills: React.FC = () => {
  const [hoveredModule, setHoveredModule] = useState<number | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgLinesRef = useRef<SVGSVGElement | null>(null);

  // Desktop Mouse Parallax (2-4px offset for nodes, 1px for core)
  useEffect(() => {
    if (
      prefersReducedMotion() ||
      typeof window === "undefined" ||
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const moveX = ((e.clientX - centerX) / (rect.width / 2)) * 3.5; // max 3.5px
      const moveY = ((e.clientY - centerY) / (rect.height / 2)) * 3.5; // max 3.5px

      setMouseOffset({ x: moveX, y: moveY });
    };

    const node = containerRef.current;
    node?.addEventListener("mousemove", handleMouseMove);
    return () => node?.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // 7-Phase Staggered Entrance Sequence (0.0s -> 1.3s)
  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
          toggleActions: "play none none none",
        },
      });

      // Phase 1 (0.0s): Heading & signal line
      tl.fromTo(
        "[data-skills-signal]",
        { scaleX: 0 },
        { scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut" },
        0.0
      );

      // Phase 2 (0.2s): Technical background grid
      tl.fromTo(
        "[data-sys-grid]",
        { opacity: 0 },
        { opacity: 0.2, duration: 0.6 },
        0.2
      );

      // Phase 3 (0.35s): Central AI Core appears
      tl.fromTo(
        "[data-center-orb]",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.5)" },
        0.35
      );

      // Phase 4 (0.55s): Orbital rings draw
      tl.fromTo(
        "[data-orbital-ring]",
        { opacity: 0, scale: 0.7 },
        { opacity: 0.5, scale: 1, duration: 0.6, ease: "power2.out" },
        0.55
      );

      // Phase 5 (0.7s): Topology network lines draw
      if (svgLinesRef.current) {
        const lines = svgLinesRef.current.querySelectorAll("[data-topology-path]");
        tl.fromTo(
          lines,
          { strokeDasharray: 400, strokeDashoffset: 400, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.35, duration: 0.85, stagger: 0.1 },
          0.7
        );
      }

      // Phase 6 (0.9s): Ecosystem modules appear
      tl.fromTo(
        "[data-module-card]",
        { y: 20, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: "power2.out" },
        0.9
      );

      // Phase 7 (1.1s): Technology system nodes stagger in
      tl.fromTo(
        "[data-tech-node]",
        { opacity: 0.4, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" },
        1.1
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-36 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative overflow-hidden">
      {/* Section Header */}
      <div className="mb-16">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs mb-3">
          <span className="font-bold text-accent tracking-widest uppercase">
            03 / TOOLKIT
          </span>
          <span className="text-slate-400 font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10">
            CONNECTED SYSTEMS / 23 TECHNOLOGIES
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-tight mt-1">
          AI &amp; Automation <span className="font-serif italic font-normal text-accent bg-gradient-to-r from-accent via-purple-300 to-accent-cyan bg-clip-text text-transparent">Ecosystem.</span>
        </h2>
        
        <p className="text-sm sm:text-base text-primary-muted mt-3 max-w-2xl leading-relaxed">
          Connected technology architecture linking AI applications, LLM workflows, automation pipelines, and developer tooling.
        </p>

        {/* Animated Horizontal Signal Header Line */}
        <div data-skills-signal className="w-full h-px bg-gradient-to-r from-accent/60 via-white/20 to-transparent mt-6 opacity-100" />
      </div>

      {/* System Status Decorative Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-slate-400 mb-10 pb-3 border-b border-white/10 tracking-widest uppercase">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          AI SYSTEM / CONNECTED
        </span>
        <span className="hidden sm:inline">23 TECHNOLOGIES / 04 DOMAINS</span>
        <span className="text-accent font-bold">AUTOMATION / ACTIVE</span>
      </div>

      {/* Main Radial AI Architecture Visualization Container */}
      <div className="relative py-16 px-4 sm:px-8 border-y border-white/10 flex flex-col items-center min-h-[640px]">
        {/* Background Technical Grid Overlay */}
        <div data-sys-grid className="pointer-events-none absolute inset-0 bg-[radial-gradient(#8B5CF6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 z-0" />

        {/* Desktop Multi-Path SVG Topology Network */}
        <svg
          ref={svgLinesRef}
          aria-hidden="true"
          className="hidden md:block pointer-events-none absolute inset-0 w-full h-full stroke-accent/40 fill-none z-0"
        >
          {/* Branch 0: Top-Left (LLM WORKFLOWS) */}
          <path
            data-topology-path
            d="M 640 160 L 320 280"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            className={`transition-all duration-300 ${
              hoveredModule === 0 ? "stroke-accent opacity-100 stroke-[2.5px]" : hoveredModule !== null ? "opacity-15" : "opacity-35"
            }`}
          />
          {/* Branch 1: Top-Right (AUTOMATION & PIPELINES) */}
          <path
            data-topology-path
            d="M 640 160 L 960 280"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            className={`transition-all duration-300 ${
              hoveredModule === 1 ? "stroke-accent opacity-100 stroke-[2.5px]" : hoveredModule !== null ? "opacity-15" : "opacity-35"
            }`}
          />
          {/* Branch 2: Bottom-Left (PYTHON & AI APPS) */}
          <path
            data-topology-path
            d="M 640 160 L 320 540"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            className={`transition-all duration-300 ${
              hoveredModule === 2 ? "stroke-accent opacity-100 stroke-[2.5px]" : hoveredModule !== null ? "opacity-15" : "opacity-35"
            }`}
          />
          {/* Branch 3: Bottom-Right (DATABASES & TOOLS) */}
          <path
            data-topology-path
            d="M 640 160 L 960 540"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            className={`transition-all duration-300 ${
              hoveredModule === 3 ? "stroke-accent opacity-100 stroke-[2.5px]" : hoveredModule !== null ? "opacity-15" : "opacity-35"
            }`}
          />

          {/* Animated Data Particles Traveling along SVG Paths */}
          <g className="opacity-90">
            <circle r="3" className="fill-accent shadow-md">
              <animateMotion path="M 640 160 L 320 280" dur="4.0s" repeatCount="indefinite" />
            </circle>
            <circle r="3" className="fill-accent-cyan shadow-md">
              <animateMotion path="M 640 160 L 960 280" dur="4.6s" repeatCount="indefinite" />
            </circle>
            <circle r="3" className="fill-purple-300 shadow-md">
              <animateMotion path="M 640 160 L 320 540" dur="5.0s" repeatCount="indefinite" />
            </circle>
            <circle r="3" className="fill-accent shadow-md">
              <animateMotion path="M 640 160 L 960 540" dur="5.4s" repeatCount="indefinite" />
            </circle>
          </g>
        </svg>

        {/* Mobile Vertical Architecture Line */}
        <svg
          aria-hidden="true"
          className="md:hidden pointer-events-none absolute inset-0 w-full h-full stroke-accent/30 stroke-[1.5] stroke-dasharray-[4,4] fill-none z-0"
        >
          <line x1="50%" y1="5%" x2="50%" y2="95%" />
        </svg>

        {/* Substantial Central Hero Technology Core Orb */}
        <div
          data-center-orb
          className={`relative z-10 mb-20 text-center opacity-100 transition-all duration-300 ease-out flex items-center justify-center ${
            hoveredModule !== null ? "scale-105" : "scale-100"
          }`}
          style={{ transform: `translate3d(${mouseOffset.x * 0.3}px, ${mouseOffset.y * 0.3}px, 0)` }}
        >
          {/* Outer Dashed Rotating SVG Orbital Ring */}
          <div
            data-orbital-ring
            className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-dashed border-accent/40 animate-[spin_25s_linear_infinite] pointer-events-none opacity-40 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
          />

          {/* Inner Concentric Ring */}
          <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full border border-accent/25 bg-accent/5 backdrop-blur-sm pointer-events-none" />

          {/* Central Glowing System Orb */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-accent bg-background/95 shadow-[0_0_35px_rgba(139,92,246,0.35)] backdrop-blur-md flex flex-col items-center justify-center p-2 group cursor-default">
            <span className="w-3 h-3 rounded-full bg-accent animate-ping mb-1" />
            <span className="font-mono text-[10px] sm:text-xs font-extrabold text-accent tracking-wider uppercase leading-tight text-center">
              AI &amp; AUTOMATION<br />CORE
            </span>
          </div>
        </div>

        {/* 4 Ecosystem Radial Modules (No Rectangular Cards, Interactive Hover Dimming & Parallax) */}
        <div
          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-14 sm:gap-20 w-full transition-transform duration-300 ease-out"
          style={{ transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)` }}
        >
          {ecosystem.map((grp) => {
            const isHovered = hoveredModule === grp.id;
            const isDimmed = hoveredModule !== null && !isHovered;

            return (
              <div
                key={grp.id}
                data-module-card
                onMouseEnter={() => setHoveredModule(grp.id)}
                onMouseLeave={() => setHoveredModule(null)}
                className={`flex flex-col gap-4 transition-all duration-300 opacity-100 ${
                  isDimmed ? "opacity-35 scale-[0.99]" : "opacity-100"
                }`}
              >
                {/* Module Header & Index */}
                <div className="flex items-center justify-between pb-2 border-b border-white/10 font-mono text-xs">
                  <div className="flex items-center gap-2.5 font-bold tracking-widest uppercase">
                    <span className="text-accent">{grp.number}</span>
                    <span className={`w-2 h-2 rounded-full transition-colors ${isHovered ? "bg-accent scale-125 shadow-[0_0_8px_#8B5CF6]" : "bg-white/30"}`} />
                    <h3 className={`transition-colors ${isHovered ? "text-accent" : "text-primary"}`}>
                      {grp.category}
                    </h3>
                  </div>

                  <span className="text-[10px] text-slate-500 font-mono">
                    {grp.items.length} COMPONENT NODES
                  </span>
                </div>

                {/* Directional System Flow Lines */}
                <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-slate-400">
                  <span className="text-accent text-[10px]">SYSTEM FLOW:</span>
                  {grp.flow.map((step, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                        {step}
                      </span>
                      {sIdx < grp.flow.length - 1 && (
                        <span className="text-accent font-bold">→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                {/* Interactive Component Nodes */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {grp.items.map((item, idx) => (
                    <div
                      key={idx}
                      data-tech-node
                      className={`px-3.5 py-2 rounded-lg text-xs font-mono border transition-all cursor-default opacity-100 flex items-center gap-2 ${
                        isHovered
                          ? "bg-white/10 border-accent text-white -translate-y-0.5 shadow-md shadow-accent/15"
                          : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-accent hover:text-white hover:-translate-y-0.5"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isHovered ? "bg-accent" : "bg-white/30"}`} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
