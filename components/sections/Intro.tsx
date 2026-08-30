"use client";

import React, { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

interface IntroProps {
  onComplete: () => void;
}

export const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev >= 6) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 400);
          }, 200);
          return 6;
        }
        return prev + 1;
      });
    }, 280);

    return () => clearInterval(timer);
  }, [onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(onComplete, 200);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-12 bg-background text-primary transition-opacity duration-500 cursor-pointer ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Top Header */}
      <div className="w-full flex items-center justify-between font-mono text-xs text-primary-muted">
        <span className="tracking-widest uppercase">// PORTFOLIO INTRO</span>
        <span className="hover:text-white transition-colors">[CLICK TO SKIP]</span>
      </div>

      {/* Center Cinematic Typography */}
      <div className="flex flex-col items-center text-center my-auto">
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white uppercase mb-3">
          GALLA <span className="text-accent font-serif italic lowercase font-normal">Jagadeesh</span>
        </h1>

        <p className="font-mono text-xs sm:text-sm text-primary-muted tracking-[0.25em] uppercase mb-8">
          AI &amp; AUTOMATION DEVELOPER
        </p>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-accent">
          <span>SCROLL TO ENTER</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping" />
        </div>
      </div>

      {/* Bottom Progress Counter (01 06) */}
      <div className="w-full flex items-center justify-between border-t border-white/10 pt-4 font-mono text-xs text-primary-muted">
        <span>GALLA JAGADEESH</span>
        <div className="flex items-center gap-3">
          <span className="text-white font-bold">0{step}</span>
          <span className="text-slate-600">/</span>
          <span>06</span>
        </div>
      </div>
    </div>
  );
};
