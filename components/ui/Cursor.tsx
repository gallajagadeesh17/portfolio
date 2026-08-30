"use client";

import React, { useEffect, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

export const Cursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      prefersReducedMotion() ||
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window
    ) {
      setIsTouchDevice(true);
      return;
    }

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const viewElem = target.closest('[data-cursor="view"]');
        const linkElem = target.closest("a") || target.closest('[data-cursor="expand"]');
        const openElem = target.closest('[data-cursor="open"]') || target.closest("button");

        if (viewElem) {
          setCursorText("VIEW");
          setIsPointer(true);
        } else if (linkElem) {
          setCursorText(null);
          setIsPointer(true);
        } else if (openElem) {
          setCursorText("OPEN");
          setIsPointer(true);
        } else {
          setCursorText(null);
          const isClickable = window.getComputedStyle(target).cursor === "pointer";
          setIsPointer(isClickable);
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      {/* Inner Dot / Label Circle */}
      {cursorText ? (
        <div
          className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent text-white font-mono text-[10px] font-bold tracking-widest px-2.5 py-1.5 shadow-xl flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(1.1)`,
          }}
        >
          {cursorText}
        </div>
      ) : (
        <>
          <div
            className="fixed top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-cyan transition-transform duration-75 ease-out"
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%) scale(${
                isPointer ? 1.4 : 1
              })`,
            }}
          />
          <div
            className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
              isPointer
                ? "h-10 w-10 border-accent/60 bg-accent/10"
                : "h-7 w-7 border-white/20"
            }`}
            style={{
              transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
            }}
          />
        </>
      )}
    </div>
  );
};
