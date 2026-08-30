"use client";

import React from "react";

const row1 = [
  "AI APPLICATIONS",
  "AUTOMATION",
  "PYTHON",
  "NLP",
  "GOOGLE GEMINI",
  "N8N",
  "LLM WORKFLOWS",
];

const row2 = [
  "FLASK",
  "PANDAS",
  "NUMPY",
  "SCIKIT-LEARN",
  "REST APIs",
  "GITHUB API",
  "SQL",
];

export const Marquee: React.FC = () => {
  return (
    <section aria-label="Skills Marquee" className="py-12 sm:py-16 border-y border-white/10 bg-background/50 overflow-hidden relative z-10">
      {/* Row 1: Left */}
      <div className="flex whitespace-nowrap overflow-hidden mb-4">
        <div className="flex animate-marquee-left motion-reduce:animate-none space-x-12 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-primary-muted/40 font-mono uppercase tracking-widest">
          {[...row1, ...row1, ...row1].map((item, idx) => (
            <span key={idx} className="flex items-center gap-8 hover:text-accent transition-colors">
              <span>{item}</span>
              <span className="text-accent text-xl sm:text-3xl">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Right */}
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex animate-marquee-right motion-reduce:animate-none space-x-12 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-primary-muted/30 font-mono uppercase tracking-widest">
          {[...row2, ...row2, ...row2].map((item, idx) => (
            <span key={idx} className="flex items-center gap-8 hover:text-accent-cyan transition-colors">
              <span>{item}</span>
              <span className="text-accent-cyan text-xl sm:text-3xl">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
