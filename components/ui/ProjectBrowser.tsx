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
  
  const activeImageRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const projectTitleRef = useRef<HTMLHeadingElement | null>(null);
  const projectMetaRef = useRef<HTMLDivElement | null>(null);
  const projectDescriptionRef = useRef<HTMLParagraphElement | null>(null);
  const transitionTimelineRef = useRef<{ kill: () => void } | null>(null);
  const transitionInProgressRef = useRef(false);

  const activeProject = projectsData[activeIndex];

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = getGSAP();
    const targets = [activeImageRef.current, counterRef.current, projectTitleRef.current, projectMetaRef.current, projectDescriptionRef.current].filter(Boolean);
    gsap.killTweensOf(targets);
    transitionInProgressRef.current = false;

    const tweens: { kill: () => void }[] = [];

    // 1. Clip-path mask image transition on active index change
    if (activeImageRef.current) {
      tweens.push(gsap.fromTo(
        activeImageRef.current,
        { clipPath: "inset(100% 0% 0% 0%)", scale: 1.04, opacity: 0.6 },
        { clipPath: "inset(0% 0% 0% 0%)", scale: 1, opacity: 1, duration: 0.7, ease: "power3.out" }
      ));
    }

    // 2. New number enters from below after the old number exits upward.
    if (counterRef.current) {
      tweens.push(gsap.fromTo(
        counterRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      ));
    }

    if (projectTitleRef.current) {
      tweens.push(gsap.fromTo(
        projectTitleRef.current,
        { y: 14, opacity: 0.35 },
        { y: 0, opacity: 1, duration: 0.42, ease: "power3.out", delay: 0.12 }
      ));
    }

    if (projectDescriptionRef.current) {
      tweens.push(gsap.fromTo(
        projectDescriptionRef.current,
        { y: 12, opacity: 0.35 },
        { y: 0, opacity: 1, duration: 0.42, ease: "power3.out", delay: 0.2 }
      ));
    }

    if (projectMetaRef.current) {
      tweens.push(gsap.fromTo(
        projectMetaRef.current,
        { y: 10, opacity: 0.35 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.28 }
      ));
    }

    return () => tweens.forEach((tween) => tween.kill());
  }, [activeIndex]);

  useEffect(() => {
    return () => transitionTimelineRef.current?.kill();
  }, []);

  const transitionToProject = (nextIndex: number) => {
    if (nextIndex === activeIndex || transitionInProgressRef.current) return;

    if (prefersReducedMotion()) {
      setActiveIndex(nextIndex);
      return;
    }

    const { gsap } = getGSAP();
    transitionTimelineRef.current?.kill();
    transitionInProgressRef.current = true;

    transitionTimelineRef.current = gsap.timeline({
      onComplete: () => setActiveIndex(nextIndex),
    })
      .to(activeImageRef.current, { opacity: 0, scale: 0.98, duration: 0.18, ease: "power2.in" }, 0)
      .to(counterRef.current, { y: -12, opacity: 0, duration: 0.18, ease: "power2.in" }, 0)
      .to(projectMetaRef.current, { y: -8, opacity: 0, duration: 0.18, ease: "power2.in" }, 0)
      .to(projectTitleRef.current, { y: -8, opacity: 0, duration: 0.18, ease: "power2.in" }, 0)
      .to(projectDescriptionRef.current, { y: -8, opacity: 0, duration: 0.18, ease: "power2.in" }, 0);
  };

  const handleNext = () => {
    transitionToProject((activeIndex + 1) % projectsData.length);
  };

  const handlePrev = () => {
    transitionToProject((activeIndex - 1 + projectsData.length) % projectsData.length);
  };

  return (
    <div className="w-full">
      {/* Desktop Artwork Centerpiece Scene (25% Left Index, 75% Right Large Artwork) */}
      <div className="hidden lg:grid grid-cols-12 gap-10 items-stretch border-y border-white/10 py-12">
        {/* Left Side: 25% Systems Index */}
        <div className="col-span-4 flex flex-col justify-between pr-6 border-r border-white/10">
          <div>
            <div className="flex items-center justify-between font-mono text-xs text-primary-muted mb-8 pb-4 border-b border-white/10">
              <span>SYSTEMS INDEX</span>
              <div ref={counterRef} className="text-accent font-bold text-sm">
                0{activeIndex + 1} / 0{projectsData.length}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {projectsData.map((project, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={project.id}
                    onClick={() => transitionToProject(idx)}
                    className={`group w-full text-left p-4 rounded-xl transition-all duration-300 border flex items-center justify-between min-w-0 ${
                      isActive
                        ? "bg-white/5 border-accent text-primary"
                        : "bg-transparent border-transparent text-primary-muted hover:text-primary hover:bg-white/[0.025]"
                    }`}
                    data-cursor="open"
                  >
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-2 font-mono text-xs mb-1">
                        <span className={isActive ? "text-accent font-bold" : "text-slate-500"}>
                          0{project.number}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase">{project.category}</span>
                      </div>
                      <h3 className="text-base font-bold leading-snug break-words group-hover:translate-x-1.5 transition-transform">
                        {project.title}
                      </h3>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 transition-all ${
                        isActive
                          ? "text-accent opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Controls */}
          <div className="pt-8 border-t border-white/10 flex items-center justify-between font-mono text-xs text-primary-muted">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              0{activeIndex + 1} / 0{projectsData.length} BROWSE
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

        {/* Right Side: 75% Large Uncropped Artwork Container (object-fit: contain) */}
        <div className="col-span-8 flex flex-col justify-between pl-4">
          <div>
            {/* Artwork Image Container */}
            <div
              ref={activeImageRef}
              className="relative w-full h-[420px] xl:h-[480px] rounded-2xl overflow-hidden bg-black border border-white/10 mb-6 group cursor-pointer flex items-center justify-center"
              onClick={() => setSelectedModalProject(activeProject)}
              data-cursor="view"
            >
              <Image
                src={activeProject.image}
                alt={activeProject.title}
                fill
                priority
                className="object-contain p-3 sm:p-5 xl:p-6 transition-transform duration-700 group-hover:scale-[1.015]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-30" />
              
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-background/90 backdrop-blur-md border border-white/20 text-xs font-mono text-white flex items-center gap-2 shadow-xl">
                <span>VIEW CASE DETAILS</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
              </div>
            </div>

            {/* Title & Metadata */}
            <div ref={projectMetaRef} className="flex items-center gap-3 mb-2 font-mono text-xs text-accent opacity-100">
              <span>// {activeProject.category}</span>
              <span>•</span>
              <span className="text-primary-muted">{activeProject.subtitle}</span>
            </div>

            <h3 ref={projectTitleRef} className="text-3xl font-extrabold text-primary mb-3 opacity-100 break-words">
              {activeProject.title}
            </h3>

            <p ref={projectDescriptionRef} className="text-sm text-primary-muted mb-6 leading-relaxed opacity-100">
              {activeProject.shortDescription}
            </p>

            <div className="space-y-2 mb-6">
              {activeProject.keyPoints.slice(0, 3).map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {activeProject.technologies.map((tech, tIdx) => (
                <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10">
            <button
              onClick={() => setSelectedModalProject(activeProject)}
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
              data-cursor="open"
            >
              EXPLORE DETAILS <ArrowUpRight className="w-4 h-4" />
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

      {/* Mobile Stacked Artwork Layout (0 Pinning, 100% Visible) */}
      <div className="lg:hidden flex flex-col gap-10">
        {projectsData.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedModalProject(project)}
            className="border-b border-white/10 pb-10 flex flex-col gap-6"
          >
            <div className="relative w-full h-64 rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-contain p-3 sm:p-4"
              />
            </div>

            <div>
              <div className="font-mono text-xs text-accent mb-1">
                0{project.number} • {project.category}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">{project.title}</h3>
              <p className="text-xs text-primary-muted leading-relaxed mb-4">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.technologies.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-white/5 text-[11px] font-mono text-slate-400">
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedModalProject(project);
                }}
                className="w-full py-3.5 rounded-xl bg-accent text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                EXPLORE CASE DETAILS →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </div>
  );
};
