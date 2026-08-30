"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { projectsData, Project } from "@/content/projects";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight, Github, CheckCircle2, ChevronRight, ChevronLeft, ArrowRight } from "lucide-react";

export const ProjectBrowser: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);
  const [isArtworkHovered, setIsArtworkHovered] = useState(false);

  const activeImageRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);

  const activeProject = projectsData[activeIndex];

  // Project Switching Mechanical Transition
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = getGSAP();

    // 1. Image mechanical switch: Old scale 1 -> 0.97 & opacity 1 -> 0; New scale 1.03 -> 1.0 & opacity 0 -> 1
    if (activeImageRef.current) {
      gsap.fromTo(
        activeImageRef.current,
        { scale: 1.03, opacity: 0, x: -8 },
        { scale: 1.0, opacity: 1, x: 0, duration: 0.65, ease: "power3.out" }
      );
    }

    // 2. Vertical sliding odometer counter (01 / 05)
    if (counterRef.current) {
      gsap.fromTo(
        counterRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }

    // 3. Staggered text reveal (y: 10px -> 0)
    if (textContainerRef.current) {
      const items = textContainerRef.current.querySelectorAll("[data-stage-reveal]");
      if (items.length) {
        gsap.fromTo(
          items,
          { y: 10, opacity: 0.3 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: "power2.out" }
        );
      }
    }
  }, [activeIndex]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projectsData.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <div className="w-full">
      {/* Desktop System Vault Layout (~28% Left Manifest / ~70% Right Stage) */}
      <div className="hidden lg:grid grid-cols-12 gap-10 items-stretch border-y border-white/10 py-12">
        {/* Left Side: ~28% Project Manifest */}
        <div className="col-span-4 flex flex-col justify-between pr-6 border-r border-white/10">
          <div>
            {/* Header Counter & Archive Label */}
            <div className="flex items-center justify-between font-mono text-xs text-primary-muted mb-8 pb-4 border-b border-white/10">
              <span className="tracking-widest uppercase text-[11px] text-slate-400">SYSTEM ARCHIVE</span>
              <div ref={counterRef} className="text-accent font-bold text-sm">
                0{activeIndex + 1} / 0{projectsData.length}
              </div>
            </div>

            {/* Vertical Project Manifest (All 5 Projects) */}
            <div className="flex flex-col gap-4">
              {projectsData.map((project, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <div
                    key={project.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`group w-full text-left p-3.5 rounded-xl transition-all duration-300 cursor-pointer border ${
                      isActive
                        ? "bg-white/[0.04] border-accent/70 opacity-100 shadow-lg shadow-accent/10"
                        : "bg-transparent border-transparent opacity-45 hover:opacity-90 hover:bg-white/[0.02]"
                    }`}
                    data-cursor="open"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 font-mono text-xs mb-1">
                        <span className={`font-bold ${isActive ? "text-accent" : "text-slate-400"}`}>
                          0{project.number}
                        </span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#8B5CF6]" />
                        )}
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                          {project.category}
                        </span>
                      </div>

                      <ArrowRight
                        className={`w-3.5 h-3.5 transition-all ${
                          isActive
                            ? "text-accent opacity-100 translate-x-0"
                            : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-slate-400"
                        }`}
                      />
                    </div>

                    <h3 className="text-base font-bold text-primary group-hover:translate-x-1 transition-transform truncate">
                      {project.title}
                    </h3>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Browsing Controls */}
          <div className="pt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-primary-muted">
            <span className="flex items-center gap-2 text-[11px] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
              SYSTEM 0{activeIndex + 1} ACTIVE
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous project"
                className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-primary transition-colors"
                data-cursor="open"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next project"
                className="p-2 rounded-lg border border-white/10 hover:border-white/30 text-primary transition-colors"
                data-cursor="open"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: ~70% Artwork Stage */}
        <div ref={textContainerRef} className="col-span-8 flex flex-col justify-between pl-4">
          <div>
            {/* Artwork Stage Frame with L-Shaped Blueprint Corner Brackets & Abstract Background */}
            <div
              ref={activeImageRef}
              onMouseEnter={() => setIsArtworkHovered(true)}
              onMouseLeave={() => setIsArtworkHovered(false)}
              onClick={() => setSelectedModalProject(activeProject)}
              className="relative w-full h-[420px] xl:h-[480px] rounded-2xl overflow-hidden bg-black border border-white/10 mb-6 group cursor-pointer flex items-center justify-center transition-all duration-300"
              data-cursor="view"
            >
              {/* Soft Violet Background Radial Glow */}
              <div className="absolute inset-0 bg-accent-glow blur-[120px] opacity-25 pointer-events-none" />

              {/* Project-Specific Abstract Low-Opacity Background SVG Topology Patterns */}
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 w-full h-full stroke-white/10 fill-none opacity-20"
              >
                {activeIndex === 0 && (
                  /* Saarthi-AI: Interconnected node network */
                  <>
                    <line x1="10%" y1="20%" x2="40%" y2="70%" strokeWidth="1" strokeDasharray="3,3" />
                    <line x1="40%" y1="70%" x2="80%" y2="30%" strokeWidth="1" strokeDasharray="3,3" />
                    <circle cx="10%" cy="20%" r="3" className="fill-accent/40" />
                    <circle cx="40%" cy="70%" r="3" className="fill-accent/40" />
                    <circle cx="80%" cy="30%" r="3" className="fill-accent/40" />
                  </>
                )}
                {activeIndex === 1 && (
                  /* LinkedIn Automation AI: Horizontal workflow lines */
                  <>
                    <path d="M 0 100 Q 300 200 600 100 T 1200 100" strokeWidth="1" strokeDasharray="4,4" />
                    <path d="M 0 300 Q 300 200 600 300 T 1200 300" strokeWidth="1" strokeDasharray="4,4" />
                  </>
                )}
                {activeIndex === 2 && (
                  /* Project Archaeologist: Dense node topology grid */
                  <>
                    <line x1="20%" y1="10%" x2="20%" y2="90%" strokeWidth="1" strokeDasharray="2,4" />
                    <line x1="60%" y1="10%" x2="60%" y2="90%" strokeWidth="1" strokeDasharray="2,4" />
                    <line x1="10%" y1="50%" x2="90%" y2="50%" strokeWidth="1" strokeDasharray="2,4" />
                  </>
                )}
                {activeIndex === 3 && (
                  /* LinkedIn Job Finder: Directional funnel lines */
                  <>
                    <line x1="5%" y1="10%" x2="45%" y2="50%" strokeWidth="1" />
                    <line x1="95%" y1="10%" x2="55%" y2="50%" strokeWidth="1" />
                    <line x1="50%" y1="50%" x2="50%" y2="90%" strokeWidth="1" />
                  </>
                )}
                {activeIndex === 4 && (
                  /* AI Spam Detection: Scatter cluster pattern */
                  <>
                    <circle cx="35%" cy="40%" r="2" className="fill-white/30" />
                    <circle cx="38%" cy="45%" r="2" className="fill-white/30" />
                    <circle cx="65%" cy="60%" r="2" className="fill-accent/50" />
                    <circle cx="70%" cy="65%" r="2" className="fill-accent/50" />
                    <line x1="20%" y1="80%" x2="80%" y2="20%" strokeWidth="1" strokeDasharray="4,4" />
                  </>
                )}
              </svg>

              {/* Monospace Decorative Micro-Labels */}
              <div className="absolute top-3 left-4 font-mono text-[10px] text-slate-500 tracking-widest uppercase pointer-events-none">
                SYSTEM / 0{activeProject.number}
              </div>
              <div className="absolute top-3 right-4 font-mono text-[10px] text-slate-500 tracking-widest uppercase pointer-events-none">
                {activeProject.category}
              </div>
              <div className="absolute bottom-3 left-4 font-mono text-[10px] text-slate-500 tracking-widest uppercase pointer-events-none">
                PROJECT ARCHIVE
              </div>
              <div className="absolute bottom-3 right-4 font-mono text-[10px] text-accent tracking-widest uppercase pointer-events-none flex items-center gap-1">
                <span>VIEW ↗</span>
              </div>

              {/* L-Shaped Blueprint Corner Brackets */}
              <div
                className={`absolute top-2 left-2 w-3.5 h-3.5 border-l-2 border-t-2 border-accent/60 transition-transform duration-300 ${
                  isArtworkHovered ? "scale-90" : "scale-100"
                }`}
              />
              <div
                className={`absolute top-2 right-2 w-3.5 h-3.5 border-r-2 border-t-2 border-accent/60 transition-transform duration-300 ${
                  isArtworkHovered ? "scale-90" : "scale-100"
                }`}
              />
              <div
                className={`absolute bottom-2 left-2 w-3.5 h-3.5 border-l-2 border-b-2 border-accent/60 transition-transform duration-300 ${
                  isArtworkHovered ? "scale-90" : "scale-100"
                }`}
              />
              <div
                className={`absolute bottom-2 right-2 w-3.5 h-3.5 border-r-2 border-b-2 border-accent/60 transition-transform duration-300 ${
                  isArtworkHovered ? "scale-90" : "scale-100"
                }`}
              />

              {/* Uncropped Project Artwork Image (object-fit: contain) */}
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                priority
                className={`object-contain p-6 transition-transform duration-500 ${
                  isArtworkHovered ? "scale-[1.015]" : "scale-100"
                }`}
              />
            </div>

            {/* Title & Category Metadata */}
            <div data-stage-reveal className="flex items-center gap-3 mb-2 font-mono text-xs text-accent opacity-100">
              <span>// {activeProject.category}</span>
              <span>•</span>
              <span className="text-primary-muted">{activeProject.subtitle}</span>
            </div>

            <h3 data-stage-reveal className="text-3xl font-extrabold text-primary mb-3 opacity-100">
              {activeProject.title}
            </h3>

            <p data-stage-reveal className="text-sm text-primary-muted mb-5 leading-relaxed opacity-100">
              {activeProject.shortDescription}
            </p>

            {/* Key Points */}
            <div data-stage-reveal className="space-y-2 mb-6 opacity-100">
              {activeProject.keyPoints.slice(0, 3).map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Tech Tags */}
            <div data-stage-reveal className="flex flex-wrap gap-2 mb-6 opacity-100">
              {activeProject.technologies.map((tech, tIdx) => (
                <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTA Row */}
          <div data-stage-reveal className="flex items-center gap-4 pt-4 border-t border-white/10 opacity-100">
            <button
              onClick={() => setSelectedModalProject(activeProject)}
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              data-cursor="open"
            >
              EXPLORE CASE DETAILS <ArrowUpRight className="w-4 h-4" />
            </button>

            {activeProject.githubUrl && (
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View on GitHub"
                className="p-3 rounded-xl bg-transparent border border-white/15 hover:border-white/30 text-primary transition-colors"
                data-cursor="open"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Stacked Archive Layout (0 Pinning, 100% Visible) */}
      <div className="lg:hidden flex flex-col gap-12">
        {/* Navigation Bar for Mobile */}
        <div className="flex items-center justify-between font-mono text-xs py-3 border-b border-white/10 text-primary-muted">
          <span className="text-accent font-bold">0{activeIndex + 1} / 0{projectsData.length}</span>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="px-3 py-1.5 rounded-lg border border-white/10 text-primary flex items-center gap-1"
            >
              ← PREV
            </button>
            <button
              onClick={handleNext}
              className="px-3 py-1.5 rounded-lg border border-accent bg-accent/15 text-accent font-bold flex items-center gap-1"
            >
              NEXT PROJECT →
            </button>
          </div>
        </div>

        {/* Mobile Single Active Project Card */}
        <div className="flex flex-col gap-6">
          <div
            onClick={() => setSelectedModalProject(activeProject)}
            className="relative w-full h-64 rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center"
          >
            <Image
              src={activeProject.image}
              alt={activeProject.title}
              fill
              className="object-contain p-3"
            />
            <div className="absolute top-3 left-3 font-mono text-[10px] text-slate-400">
              SYSTEM / 0{activeProject.number}
            </div>
            <div className="absolute bottom-3 right-3 font-mono text-[10px] text-accent">
              VIEW ↗
            </div>
          </div>

          <div>
            <div className="font-mono text-xs text-accent mb-1">
              // {activeProject.category}
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">{activeProject.title}</h3>
            <p className="text-xs text-primary-muted leading-relaxed mb-4">
              {activeProject.shortDescription}
            </p>

            <div className="space-y-2 mb-6">
              {activeProject.keyPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 mb-6">
              {activeProject.technologies.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-white/5 text-[11px] font-mono text-slate-400">
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => setSelectedModalProject(activeProject)}
              className="w-full py-3.5 rounded-xl bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              EXPLORE CASE DETAILS <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </div>
  );
};
