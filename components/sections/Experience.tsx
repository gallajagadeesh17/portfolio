"use client";

import React, { useEffect, useRef } from "react";
import { experienceData } from "@/content/experience";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { CheckCircle2 } from "lucide-react";

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timelineLineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap, ScrollTrigger } = getGSAP();

    const ctx = gsap.context(() => {
      // 1. Progressive vertical timeline drawing path
      if (timelineLineRef.current) {
        gsap.fromTo(
          timelineLineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 65%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          }
        );
      }

      // 2. Active milestone node detection on scroll
      const rows = containerRef.current?.querySelectorAll("[data-exp-timeline-row]");
      rows?.forEach((row) => {
        ScrollTrigger.create({
          trigger: row,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => row.classList.add("exp-active"),
          onLeaveBack: () => row.classList.remove("exp-active"),
        });
      });

      // 3. Staggered reveal of horizontal divider lines & bullets (content-first once:true)
      const dividers = containerRef.current?.querySelectorAll("[data-exp-divider]");
      if (dividers?.length) {
        gsap.fromTo(
          dividers,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      }

      const bullets = containerRef.current?.querySelectorAll("[data-exp-bullet]");
      if (bullets?.length) {
        gsap.fromTo(
          bullets,
          { opacity: 0.3, x: -10 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 75%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={containerRef} className="py-36 sm:py-44 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="mb-20">
        <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
          04 / BUILDING EXPERIENCE
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-tight mt-3">
          Experience through <span className="font-serif italic font-normal text-accent">building.</span>
        </h2>
        <p className="text-sm sm:text-base text-primary-muted mt-3 max-w-2xl">
          Hands-on technical development domains focusing on AI systems, automated workflow pipelines, and API integrations.
        </p>
      </div>

      {/* Vertical Editorial Experience Timeline */}
      <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-24 sm:space-y-32">
        {/* Animated Vertical Line Path */}
        <div ref={timelineLineRef} className="absolute top-0 bottom-0 -left-px w-0.5 bg-accent z-0" />

        {experienceData.map((exp, idx) => (
          <div
            key={exp.id}
            data-exp-timeline-row
            className="relative group transition-all duration-300 opacity-100"
          >
            {/* Active Timeline Node Dot */}
            <div className="absolute -left-[31px] sm:-left-[55px] top-3.5 w-4 h-4 rounded-full bg-background border-2 border-white/30 group-[.exp-active]:border-accent group-[.exp-active]:bg-accent group-[.exp-active]:scale-125 transition-all duration-300 shadow-[0_0_15px_rgba(139,92,246,0.5)]" />

            <div className="flex flex-col gap-6">
              {/* Top Meta Row */}
              <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs sm:text-sm font-bold text-accent group-hover:text-purple-300 transition-colors">
                    0{idx + 1}
                  </span>
                  <h3 className="text-[clamp(28px,3.8vw,56px)] font-extrabold text-primary group-hover:text-accent group-hover:translate-x-2 transition-all leading-tight">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-primary-muted shrink-0">
                  <span className="text-slate-300 font-semibold">{exp.organization}</span>
                  <span>•</span>
                  <span className="text-accent">{exp.period}</span>
                </div>
              </div>

              {/* Horizontal Divider Line */}
              <div data-exp-divider className="w-full h-px bg-white/15 group-hover:bg-accent/50 transition-colors" />

              {/* Description */}
              <p className="text-base sm:text-lg text-primary-muted max-w-3xl leading-relaxed group-hover:text-slate-200 transition-colors">
                {exp.description}
              </p>

              {/* 3 Compact Bullet Points */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {exp.keyPoints.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    data-exp-bullet
                    className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-all opacity-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm text-slate-300 leading-normal">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
