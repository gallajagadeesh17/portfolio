"use client";

import React, { useState, useEffect, useRef } from "react";
import { certificationsData, Certification } from "@/content/certifications";
import { ImageModal } from "@/components/ui/ImageModal";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight, ExternalLink } from "lucide-react";

export const Certifications: React.FC = () => {
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      // 1. Horizontal divider lines animation (content-first once:true)
      const dividers = containerRef.current?.querySelectorAll("[data-cert-divider]");
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
              start: "top 78%",
              once: true,
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Credential rows stagger reveal
      const rows = containerRef.current?.querySelectorAll("[data-cert-row]");
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0.3, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 78%",
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
    <section id="certifications" ref={containerRef} className="py-36 sm:py-44 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative">
      {/* Section Header */}
      <div className="mb-20">
        <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
          05 / CERTIFICATIONS
        </span>
        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-primary tracking-tight leading-tight mt-3">
          Credentials &amp; <span className="font-serif italic font-normal text-accent">Certifications.</span>
        </h2>
        <p className="text-sm sm:text-base text-primary-muted mt-3 max-w-2xl">
          Verified certifications in Generative AI, Data Analytics, and Professional Skills.
        </p>
      </div>

      {/* Premium Editorial Credential List */}
      <div className="flex flex-col border-t border-white/10">
        {certificationsData.map((cert, idx) => (
          <div
            key={cert.id}
            data-cert-row
            className="group py-9 border-b border-white/10 flex flex-col gap-5 transition-all hover:border-accent/40 cursor-pointer opacity-100"
            onClick={() => {
              if (cert.image) setPreviewCert(cert);
              else if (cert.credentialUrl) window.open(cert.credentialUrl, "_blank");
            }}
            data-cursor="open"
          >
            {/* Top Meta & Title Row */}
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs sm:text-sm font-bold text-accent group-hover:text-purple-300 transition-colors">
                  0{idx + 1}
                </span>
                <h3 className="text-[clamp(24px,3.2vw,44px)] font-extrabold text-primary group-hover:text-accent group-hover:translate-x-1.5 transition-all leading-tight">
                  {cert.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs text-primary-muted shrink-0">
                <span className="text-slate-300 font-semibold">{cert.issuer}</span>
                <span>•</span>
                <span className="text-accent">{cert.date}</span>
              </div>
            </div>

            {/* Horizontal Divider Line */}
            <div data-cert-divider className="w-full h-px bg-white/10 group-hover:bg-accent/50 transition-colors" />

            {/* Skills Tags & Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {cert.skillsVerified.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-slate-300 group-hover:border-white/20 transition-colors"
                  >
                    ✓ {skill}
                  </span>
                ))}
              </div>

              {/* Minimal Circular Arrow Action Button */}
              <div className="flex items-center gap-2 text-xs font-mono text-primary-muted shrink-0">
                {cert.image && (
                  <span className="hidden sm:inline text-[11px] text-slate-400">
                    PREVIEW CERTIFICATE
                  </span>
                )}
                <div className="p-3 rounded-full border border-white/15 text-primary group-hover:border-accent group-hover:text-accent group-hover:translate-x-1 transition-all">
                  {cert.credentialUrl && !cert.image ? (
                    <ExternalLink className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certificate Image Lightbox Modal */}
      <ImageModal
        imageSrc={previewCert?.image || null}
        title={previewCert?.title}
        description={`Issued by ${previewCert?.issuer} (${previewCert?.date})`}
        onClose={() => setPreviewCert(null)}
      />
    </section>
  );
};
