"use client";

import React, { useEffect, useRef } from "react";
import { profileData } from "@/content/profile";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ArrowRight } from "lucide-react";

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      const items = containerRef.current?.querySelectorAll("[data-scene-animate]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        "[data-about-heading-word]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.07, ease: "power4.out" }
      );

      if (items?.length) {
        tl.fromTo(
          items,
          { opacity: 0.3, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={containerRef} className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="mb-16">
        <span data-scene-animate className="inline-block font-mono text-xs font-bold text-accent tracking-widest uppercase opacity-100">
          01 / ABOUT
        </span>
        <h2 className="text-[clamp(44px,5.5vw,76px)] font-extrabold text-primary tracking-tight leading-tight mt-3 max-w-4xl opacity-100">
          <span data-about-heading-word className="inline-block opacity-100">I</span>{" "}
          <span data-about-heading-word className="inline-block opacity-100">build</span>{" "}
          <span data-about-heading-word className="inline-block opacity-100">with</span>{" "}
          <span data-about-heading-word className="inline-block opacity-100">AI,</span>{" "}
          <span data-about-heading-word className="inline-block font-serif italic font-normal text-accent opacity-100">automation</span>{" "}
          <span data-about-heading-word className="inline-block opacity-100">and</span>{" "}
          <span data-about-heading-word className="inline-block opacity-100">curiosity.</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Narrative Paragraph (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-primary-muted text-base sm:text-xl leading-relaxed">
          <p data-scene-animate className="text-primary font-medium text-xl sm:text-2xl leading-snug opacity-100">
            {profileData.aboutText.paragraph1}
          </p>
          <p data-scene-animate className="text-base sm:text-lg opacity-100">
            {profileData.aboutText.paragraph2}
          </p>

          <div data-scene-animate className="pt-4 opacity-100">
            <button
              onClick={() => {
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-transparent border border-white/15 hover:border-white/30 text-xs font-mono font-bold text-primary uppercase tracking-wider transition-all"
              data-cursor="open"
            >
              EXPLORE MY WORK <ArrowRight className="w-4 h-4 text-accent" />
            </button>
          </div>
        </div>

        {/* Editorial Capability Rows (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col border-t border-white/10">
          {profileData.gridBlocks.map((block, idx) => (
            <div
              key={idx}
              data-scene-animate
              className="py-7 border-b border-white/10 flex flex-col gap-1.5 group hover:border-accent/40 hover:translate-x-1.5 transition-[transform,border-color] duration-300 opacity-100"
            >
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-accent transition-colors">
                // {block.title}
              </span>
              <p className="text-xs sm:text-sm font-mono text-primary-muted leading-relaxed">
                {block.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
