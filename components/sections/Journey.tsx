"use client";

import React, { useEffect, useRef } from "react";
import { journeyData } from "@/content/journey";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

export const Journey: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linePathRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap, ScrollTrigger } = getGSAP();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-journey-heading-word]",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Progressive line drawing down the vertical timeline
      if (linePathRef.current) {
        gsap.fromTo(
          linePathRef.current,
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

      // ScrollTrigger for each milestone node (active highlight without hiding content)
      const nodes = containerRef.current?.querySelectorAll("[data-journey-node]");
      nodes?.forEach((node) => {
        const nodeTween = gsap.fromTo(
          node,
          { opacity: 0.4, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            paused: true,
            immediateRender: false,
          }
        );
        const supportTween = gsap.fromTo(
          node.querySelectorAll("[data-journey-support]"),
          { opacity: 0.65, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.out",
            paused: true,
            immediateRender: false,
          }
        );

        ScrollTrigger.create({
          trigger: node,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => {
            node.classList.add("journey-active");
            nodeTween.restart();
            supportTween.restart();
          },
          onLeaveBack: () => node.classList.remove("journey-active"),
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={containerRef} className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="mb-16">
        <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
          02 / JOURNEY
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-tight mt-2">
          <span data-journey-heading-word className="inline-block opacity-100">Learning</span>{" "}
          <span data-journey-heading-word className="inline-block opacity-100">by</span>{" "}
          <span data-journey-heading-word className="inline-block font-serif italic font-normal text-accent opacity-100">building.</span>
        </h2>
        <p className="text-sm sm:text-base text-primary-muted mt-3 max-w-2xl">
          Academic foundations combined with hands-on AI application, LLM workflow, and automation engineering.
        </p>
      </div>

      <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-20 sm:space-y-28">
        {/* Animated Drawing Path */}
        <div ref={linePathRef} className="absolute top-0 bottom-0 -left-px w-0.5 bg-accent z-0" />

        {journeyData.map((item) => (
          <div
            key={item.id}
            data-journey-node
            className="relative opacity-100 group"
          >
            {/* Timeline Node Dot */}
            <div className="absolute -left-[31px] sm:-left-[47px] top-2.5 w-4 h-4 rounded-full bg-background border-2 border-white/30 group-[.journey-active]:border-accent group-[.journey-active]:bg-accent group-[.journey-active]:scale-125 transition-all duration-300" />

            <div className="p-6 sm:p-8 rounded-2xl bg-surface border border-surface-border group-[.journey-active]:border-accent/40 transition-all duration-300">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="font-mono text-xs font-bold text-accent px-3 py-1 rounded-full bg-white/5 border border-white/10">
                  {item.year}
                </span>
                <span className="text-xs font-mono text-primary-muted uppercase tracking-widest">
                  {item.type}
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-primary mb-1 group-[.journey-active]:translate-x-1.5 transition-transform">
                {item.title}
              </h3>
              <p className="text-xs font-mono text-accent mb-4">
                {item.organization}
              </p>

              <p data-journey-support className="text-sm sm:text-base text-primary-muted mb-6 leading-relaxed opacity-100">
                {item.description}
              </p>

              <div data-journey-support className="space-y-2 pt-4 border-t border-white/10 opacity-100">
                {item.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-primary-muted">
                    <ArrowRight className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{h}</span>
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
