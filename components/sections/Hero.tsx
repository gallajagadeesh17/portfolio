"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { profileData } from "@/content/profile";
import { socialLinks } from "@/content/socials";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { getGSAP, prefersReducedMotion, supportsPointerMotion } from "@/lib/gsap";
import { ArrowRight, ArrowDown, Github, Linkedin, Mail, FileText } from "lucide-react";

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const profileFrameRef = useRef<HTMLDivElement | null>(null);
  const parallaxLayerRef = useRef<HTMLDivElement | null>(null);
  const copyLayerRef = useRef<HTMLDivElement | null>(null);
  const floatingLayerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const lineSvgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();
    let cleanupParallax: (() => void) | undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (glowRef.current) {
        tl.fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
          0
        );
      }

      if (lineSvgRef.current) {
        const paths = lineSvgRef.current.querySelectorAll("line");
        tl.fromTo(
          paths,
          { strokeDasharray: 500, strokeDashoffset: 500, opacity: 0 },
          { strokeDashoffset: 0, opacity: 0.35, duration: 0.8, stagger: 0.1 },
          0.05
        );
      }

      tl.fromTo(
        "[data-hero-label]",
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.2
      );

      tl.fromTo(
        "[data-hero-brand]",
        { opacity: 0, x: -12 },
        { opacity: 1, x: 0, duration: 0.5 },
        0.35
      );

      tl.fromTo(
        "[data-hero-heading-word]",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.15, ease: "power4.out" },
        0.5
      );

      tl.fromTo(
        "[data-hero-text]",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.5 },
        1
      );

      if (profileFrameRef.current) {
        tl.fromTo(
          profileFrameRef.current,
          { clipPath: "inset(100% 0% 0% 0%)", opacity: 0, scale: 1.05 },
          { clipPath: "inset(0% 0% 0% 0%)", opacity: 1, scale: 1, duration: 0.75, ease: "power3.out" },
          1.2
        );
      }

      tl.fromTo(
        "[data-hero-float]",
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
        1.35
      );

      tl.fromTo(
        "[data-hero-cta]",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 },
        1.5
      );

      tl.fromTo(
        "[data-hero-social]",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" },
        1.7
      );

      if (supportsPointerMotion(1024) && parallaxLayerRef.current) {
        const layer = parallaxLayerRef.current;
        const copy = copyLayerRef.current;
        const floating = floatingLayerRef.current;
        const moveX = gsap.quickTo(layer, "x", { duration: 0.7, ease: "power3.out" });
        const moveY = gsap.quickTo(layer, "y", { duration: 0.7, ease: "power3.out" });
        const moveCopyX = copy ? gsap.quickTo(copy, "x", { duration: 0.8, ease: "power3.out" }) : undefined;
        const moveCopyY = copy ? gsap.quickTo(copy, "y", { duration: 0.8, ease: "power3.out" }) : undefined;
        const moveFloatX = floating ? gsap.quickTo(floating, "x", { duration: 0.55, ease: "power3.out" }) : undefined;

        const handlePointerMove = (event: PointerEvent) => {
          const xRatio = event.clientX / window.innerWidth - 0.5;
          const yRatio = event.clientY / window.innerHeight - 0.5;
          moveX(xRatio * 4);
          moveY(yRatio * 2);
          moveCopyX?.(xRatio * -3);
          moveCopyY?.(yRatio * -2);
          moveFloatX?.(xRatio * 6);
        };

        const resetPointerPosition = () => {
          moveX(0);
          moveY(0);
          moveCopyX?.(0);
          moveCopyY?.(0);
          moveFloatX?.(0);
        };

        window.addEventListener("pointermove", handlePointerMove, { passive: true });
        document.addEventListener("mouseleave", resetPointerPosition);

        gsap.to(profileFrameRef.current, {
          y: -5,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        if (floatingLayerRef.current) {
          gsap.to(floatingLayerRef.current, {
            y: -7,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        }

        cleanupParallax = () => {
          window.removeEventListener("pointermove", handlePointerMove);
          document.removeEventListener("mouseleave", resetPointerPosition);
        };
      }
    }, containerRef);

    return () => {
      cleanupParallax?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 px-6 sm:px-8 max-w-7xl mx-auto z-10 overflow-visible"
    >
      {/* Muted Background Depth Lighting */}
      <div ref={glowRef} data-hero-glow className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(720px,90vw)] h-[min(720px,90vw)] bg-accent-glow opacity-100 blur-[150px] pointer-events-none -z-10" />

      {/* Fine Geometric SVG Overlay */}
      <svg
        ref={lineSvgRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 w-full h-full stroke-white/10 fill-none -z-10"
      >
        <line x1="5%" y1="18%" x2="95%" y2="18%" strokeWidth="1" />
        <line x1="78%" y1="5%" x2="78%" y2="95%" strokeWidth="1" />
      </svg>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-8 xl:gap-12 items-center my-auto">
        {/* Left Column: Clamp Display Typography (7 Cols) */}
        <div ref={copyLayerRef} className="lg:col-span-7 flex flex-col items-start min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-6 max-w-full">
            <span data-hero-brand className="font-mono text-sm font-extrabold tracking-widest text-primary opacity-100">
              Galla Jagadeesh
            </span>
            <span className="text-white/20">•</span>
            <div data-hero-label className="font-mono text-xs text-primary-muted uppercase tracking-widest opacity-100">
              AI &amp; AUTOMATION DEVELOPER
            </div>
          </div>

          {/* Clamp Display Heading */}
          <h1 className="text-[clamp(56px,7.5vw,115px)] font-extrabold text-primary tracking-tight leading-[0.96] mb-8">
            <span data-hero-heading-word className="block opacity-100">Building</span>
            <span
              data-hero-heading-word
              className="block font-serif italic font-normal text-accent bg-gradient-to-r from-accent via-purple-300 to-accent-cyan bg-clip-text text-transparent opacity-100"
            >
              AI systems
            </span>
            <span data-hero-heading-word className="block opacity-100">that work.</span>
          </h1>

          {/* Supporting Text */}
          <p data-hero-text className="text-base sm:text-lg text-primary-muted max-w-xl mb-3 leading-relaxed font-normal opacity-100">
            {profileData.supportingParagraph}
          </p>

          <p data-hero-text className="text-xs sm:text-sm text-slate-400 max-w-xl mb-10 leading-relaxed font-mono opacity-100">
            {profileData.additionalLine}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
            <MagneticButton
              data-hero-cta
              onClick={() => {
                document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-semibold text-xs font-mono uppercase tracking-wider transition-all gap-2 shadow-xl shadow-accent/20 opacity-100"
            >
              EXPLORE MY WORK <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              data-hero-cta
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-transparent border border-white/15 hover:border-white/30 text-primary font-mono text-xs uppercase tracking-wider transition-colors gap-2 opacity-100"
            >
              ABOUT ME <ArrowDown className="w-3.5 h-3.5 text-accent" />
            </MagneticButton>
          </div>

          {/* Contact Bar */}
          <div data-hero-social className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10 w-full sm:w-auto text-xs font-mono text-primary-muted opacity-100">
            <a
              href={socialLinks.email.url}
              className="py-1 px-3 rounded-md border border-white/10 hover:border-white/20 text-slate-300 flex items-center gap-2"
              data-cursor="open"
            >
              <Mail className="w-3.5 h-3.5 text-accent" />
              <span>{profileData.email}</span>
            </a>
            <a
              href={socialLinks.github.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-md border border-white/10 hover:border-white/20 text-slate-300"
              data-cursor="open"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href={socialLinks.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-md border border-white/10 hover:border-white/20 text-slate-300"
              data-cursor="open"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={socialLinks.resume.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-1 px-3 rounded-md border border-white/10 hover:border-white/20 text-slate-300 flex items-center gap-1.5"
              data-cursor="open"
            >
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Right Column: Profile Image Visual + Floating Text Labels (5 Cols) */}
        <div ref={parallaxLayerRef} className="lg:col-span-5 flex justify-center relative overflow-visible px-2 sm:px-8 lg:px-0">
          <div className="relative w-[min(320px,82vw)] h-[min(320px,82vw)] sm:w-[380px] sm:h-[380px] lg:w-[340px] lg:h-[340px] xl:w-[400px] xl:h-[400px] 2xl:w-[420px] 2xl:h-[420px] group overflow-visible">
            {/* Profile Visual Frame */}
            <div ref={profileFrameRef} className="relative w-full h-full rounded-3xl overflow-hidden border border-white/15 bg-surface shadow-2xl">
              <Image
                src="/images/profile.png"
                alt="Galla Jagadeesh"
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-75" />
              
              <div className="absolute bottom-5 left-5 right-5 p-3.5 rounded-xl bg-background/80 border border-white/10 backdrop-blur-md flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-primary">{profileData.name}</p>
                  <p className="text-[10px] font-mono text-accent">{profileData.location}</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
            </div>

            {/* Minimal Floating Text Capability Labels */}
            <div ref={floatingLayerRef} className="absolute inset-0 z-20 overflow-visible pointer-events-none">
              <div
                data-hero-float
                className="absolute -top-8 left-2 px-3 sm:px-3.5 py-1.5 whitespace-nowrap rounded-full bg-background/90 border border-white/15 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-accent tracking-wider uppercase shadow-xl opacity-100"
              >
                AI APPLICATIONS
              </div>

              <div
                data-hero-float
                className="absolute -top-8 right-2 px-3 sm:px-3.5 py-1.5 whitespace-nowrap rounded-full bg-background/90 border border-white/15 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-slate-300 tracking-wider uppercase shadow-xl opacity-100"
              >
                LLM WORKFLOWS
              </div>

              <div
                data-hero-float
                className="absolute -bottom-8 left-2 px-3 sm:px-3.5 py-1.5 whitespace-nowrap rounded-full bg-background/90 border border-white/15 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-slate-300 tracking-wider uppercase shadow-xl opacity-100"
              >
                N8N AUTOMATION
              </div>

              <div
                data-hero-float
                className="absolute -bottom-8 right-2 px-3 sm:px-3.5 py-1.5 whitespace-nowrap rounded-full bg-background/90 border border-white/15 backdrop-blur-md text-[10px] sm:text-[11px] font-mono text-slate-300 tracking-wider uppercase shadow-xl opacity-100"
              >
                RAPID PROTOTYPING
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
