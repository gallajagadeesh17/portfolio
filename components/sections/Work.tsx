"use client";

import React, { useEffect, useRef } from "react";
import { ProjectBrowser } from "@/components/ui/ProjectBrowser";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";

export const Work: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0.3, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            once: true,
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-36 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* First Viewport Header */}
      <div className="mb-20">
        <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs mb-3">
          <span className="font-bold text-accent tracking-widest uppercase">
            03 / SELECTED WORK
          </span>
          <span className="text-slate-400 font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-white/5 border border-white/10">
            05 SYSTEMS · AI / AUTOMATION / ML
          </span>
        </div>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-tight mt-3">
          Systems I've <span className="font-serif italic font-normal text-accent bg-gradient-to-r from-accent via-purple-300 to-accent-cyan bg-clip-text text-transparent">built.</span>
        </h2>
        
        <p className="text-sm sm:text-base text-primary-muted mt-4 max-w-2xl leading-relaxed">
          A logged archive of AI applications, LLM workflows, multi-agent tools, and automated pipeline systems built from practical requirements.
        </p>
      </div>

      <ProjectBrowser />
    </section>
  );
};
