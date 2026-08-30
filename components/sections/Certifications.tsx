"use client";

import React, { useState, useEffect, useRef } from "react";
import { certificationsData, Certification } from "@/content/certifications";
import { ImageModal } from "@/components/ui/ImageModal";
import { getGSAP, prefersReducedMotion } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";

export const Certifications: React.FC = () => {
  const [previewCert, setPreviewCert] = useState<Certification | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    const { gsap } = getGSAP();

    const ctx = gsap.context(() => {
      const rows = containerRef.current?.querySelectorAll("[data-cert-row]");
      if (rows?.length) {
        gsap.fromTo(
          rows,
          { opacity: 0.3, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
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
    <section id="certifications" ref={containerRef} className="py-28 sm:py-36 px-6 sm:px-8 max-w-7xl mx-auto z-10 relative border-t border-white/[0.06]">
      {/* Section Header */}
      <div className="mb-16">
        <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
          05 / CERTIFICATIONS
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary tracking-tight leading-tight mt-2">
          Credentials &amp; <span className="font-serif italic font-normal text-accent">Certifications.</span>
        </h2>
        <p className="text-sm sm:text-base text-primary-muted mt-3 max-w-2xl">
          Verified certifications in Generative AI, Data Analytics, and Professional Skills.
        </p>
      </div>

      {/* Vertical Editorial List with Thin Separator Lines */}
      <div className="flex flex-col border-t border-white/10">
        {certificationsData.map((cert, idx) => (
          <div
            key={cert.id}
            data-cert-row
            className="group py-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors hover:border-accent/40 cursor-pointer opacity-100"
            onClick={() => setPreviewCert(cert)}
            data-cursor="open"
          >
            <div className="flex items-start md:items-center gap-6 min-w-0 flex-1">
              <span className="font-mono text-sm font-bold text-accent group-hover:translate-x-1.5 transition-transform">
                0{idx + 1}
              </span>

              <div className="min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-primary group-hover:text-accent group-hover:translate-x-1.5 transition-[transform,color] break-words">
                  {cert.title}
                </h3>
                <p className="text-xs font-mono text-primary-muted mt-1">
                  {cert.issuer} • {cert.date}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-primary-muted hidden sm:inline max-w-[min(24rem,45vw)] whitespace-normal text-right leading-relaxed">
                {cert.skillsVerified.join(" • ")}
              </span>
              <div className="p-2.5 rounded-full border border-white/15 text-primary opacity-60 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-accent group-hover:text-accent transition-all">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ImageModal
        imageSrc={previewCert?.image || null}
        title={previewCert?.title}
        description={`Issued by ${previewCert?.issuer} (${previewCert?.date})`}
        onClose={() => setPreviewCert(null)}
      />
    </section>
  );
};
