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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          once: true,
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        "[data-work-heading-word]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power4.out" }
      ).fromTo(
        "[data-work-browser]",
        { opacity: 0.45, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="mb-16">
        <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
          03 / SELECTED WORK
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-tight mt-3">
          <span data-work-heading-word className="inline-block opacity-100">Systems</span>{" "}
          <span data-work-heading-word className="inline-block opacity-100">I've</span>{" "}
          <span data-work-heading-word className="inline-block font-serif italic font-normal text-accent opacity-100">built.</span>
        </h2>
        <p className="text-sm sm:text-base text-primary-muted mt-3 max-w-2xl">
          A selection of AI applications, LLM workflows, multi-agent tools, and automation systems developed from practical requirements.
        </p>
      </div>

      <div data-work-browser className="opacity-100">
        <ProjectBrowser />
      </div>
    </section>
  );
};
