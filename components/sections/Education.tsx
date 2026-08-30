"use client";

import React, { useEffect, useRef } from "react";
import { educationData } from "@/content/education";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

export const Education: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true, // Content NEVER hides after revealing!
          toggleActions: "play none none none",
        },
      });

      if (lineRef.current) {
        tl.fromTo(
          lineRef.current,
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut" }
        );
      }

      tl.fromTo(
        "[data-edu-sequence]",
        { opacity: 0.4, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, stagger: 0.09, ease: "power3.out" },
        "-=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="education" className="py-16 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      <div ref={containerRef} className="relative py-10">
        {/* Animated Horizontal Line */}
        <div ref={lineRef} className="absolute top-0 left-0 right-0 h-px bg-white/15" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left */}
          <div data-edu-sequence className="font-mono text-xs font-bold text-accent tracking-widest uppercase opacity-100">
            // EDUCATION
          </div>

          {/* Center */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8">
            <div className="opacity-100 min-w-0">
              <h3 data-edu-sequence className="text-2xl sm:text-3xl font-extrabold text-primary break-words opacity-100">
                {educationData.school}
              </h3>
              <p data-edu-sequence className="text-xs sm:text-sm font-mono text-primary-muted mt-1 opacity-100">
                {educationData.degree}
              </p>
            </div>
            <span data-edu-sequence className="hidden md:block text-white/20 opacity-100">•</span>
            <div data-edu-sequence className="font-mono text-xs font-bold text-slate-300 opacity-100">
              {educationData.dates}
            </div>
          </div>

          {/* Right Marker */}
          <div data-edu-sequence className="p-3 rounded-full border border-white/10 text-accent shrink-0 opacity-100">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
      </div>
    </section>
  );
};
