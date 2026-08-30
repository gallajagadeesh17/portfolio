"use client";

import React, { useEffect, useRef } from "react";
import { experienceData } from "@/content/experience";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CheckCircle2 } from "lucide-react";

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      const rows = containerRef.current?.querySelectorAll("[data-exp-row]");
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
              once: true, // Content NEVER hides after revealing!
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="mb-16">
        <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
          04 / BUILDING EXPERIENCE
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-tight mt-2">
          Experience through <span className="font-serif italic font-normal text-accent">building.</span>
        </h2>
        <p className="text-sm sm:text-base text-primary-muted mt-3 max-w-2xl">
          Hands-on technical development domains focusing on AI systems, automated workflow pipelines, and API integrations.
        </p>
      </div>

      {/* 3 Horizontal Editorial Rows */}
      <div className="flex flex-col border-t border-white/10">
        {experienceData.map((exp, idx) => (
          <div
            key={exp.id}
            data-exp-row
            className="py-9 border-b border-white/10 flex flex-col gap-4 group transition-[transform,border-color] duration-300 hover:border-accent/40 hover:translate-x-1.5 opacity-100"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-accent">
                  0{idx + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-primary group-hover:text-accent transition-colors">
                  {exp.role}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-primary-muted">
                <span>{exp.organization}</span>
                <span>•</span>
                <span>{exp.period}</span>
              </div>
            </div>

            <p className="text-sm text-primary-muted max-w-3xl leading-relaxed">
              {exp.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {exp.keyPoints.map((pt, pIdx) => (
                <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
