"use client";

import React, { useState, useEffect, useRef } from "react";
import { profileData } from "@/content/profile";
import { socialLinks } from "@/content/socials";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { Phone, MapPin, Linkedin, Github, FileText, ArrowRight, Copy, Check } from "lucide-react";

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          once: true, // Content NEVER hides after revealing!
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        "[data-contact-label]",
        { opacity: 0.4, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 }
      );

      tl.fromTo(
        "[data-contact-heading-line]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.09, ease: "power4.out" },
        "-=0.3"
      );

      tl.fromTo(
        "[data-contact-text]",
        { opacity: 0.4, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.4"
      );

      tl.fromTo(
        "[data-contact-link]",
        { opacity: 0.4, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profileData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      <div
        ref={containerRef}
        className="relative border-y border-white/10 py-24 text-center overflow-hidden"
      >
        {/* Soft Radial Lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-glow blur-[150px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div data-contact-label className="font-mono text-xs font-bold text-accent tracking-widest uppercase mb-6 opacity-100">
            // 06 / CONTACT
          </div>

          <h2 className="text-[clamp(56px,7vw,110px)] font-extrabold text-primary tracking-tight mb-8 leading-[1.02] opacity-100">
            <span data-contact-heading-line className="block opacity-100">Let's build</span>
            <span data-contact-heading-line className="block font-serif italic font-normal text-accent bg-gradient-to-r from-accent via-purple-300 to-accent-cyan bg-clip-text text-transparent opacity-100">
              something useful.
            </span>
          </h2>

          <p data-contact-text className="text-base sm:text-xl text-primary-muted mb-10 leading-relaxed max-w-2xl font-normal opacity-100">
            Interested in AI, automation, intelligent workflows or building something from an idea? Let's connect.
          </p>

          {/* Location & Phone Bar */}
          <div data-contact-text className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-primary-muted mb-12 opacity-100">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-accent" /> {profileData.location}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent-cyan" /> {profileData.phone}
            </span>
          </div>

          {/* Buttons Row */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 w-full">
            <a
              data-contact-link
              href={socialLinks.email.url}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2 shadow-xl shadow-accent/25 opacity-100"
              data-cursor="open"
            >
              EMAIL ME <ArrowRight className="w-4 h-4" />
            </a>

            <button
              data-contact-link
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-transparent border border-white/15 hover:border-white/30 text-primary font-mono text-xs uppercase tracking-wider transition-colors inline-flex items-center justify-center gap-2 opacity-100"
              data-cursor="open"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" /> COPIED EMAIL!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-accent" /> COPY EMAIL ADDRESS
                </>
              )}
            </button>
          </div>

          {/* Minimal Links Bar */}
          <div data-contact-text className="flex flex-wrap items-center justify-center gap-4 pt-8 border-t border-white/10 w-full text-xs font-mono text-primary-muted opacity-100">
            <a
              href={socialLinks.github.url}
              data-contact-link
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-white/10 hover:border-white/20 hover:text-white transition-colors flex items-center gap-2"
              data-cursor="open"
            >
              <Github className="w-4 h-4 text-accent" /> GITHUB ↗
            </a>

            <a
              href={socialLinks.linkedin.url}
              data-contact-link
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-white/10 hover:border-white/20 hover:text-white transition-colors flex items-center gap-2"
              data-cursor="open"
            >
              <Linkedin className="w-4 h-4 text-accent-cyan" /> LINKEDIN ↗
            </a>

            <a
              href={socialLinks.resume.url}
              data-contact-link
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md border border-white/10 hover:border-white/20 hover:text-white transition-colors flex items-center gap-2"
              data-cursor="open"
            >
              <FileText className="w-4 h-4 text-purple-400" /> DOWNLOAD RESUME ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
