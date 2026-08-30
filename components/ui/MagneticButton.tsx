"use client";

import React, { useRef, useState } from "react";
import { supportsPointerMotion } from "@/lib/gsap";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = "",
  strength = 6, // Capped at 6px max as per Phase 4 directives
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const motionEnabledRef = useRef<boolean | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    motionEnabledRef.current ??= supportsPointerMotion();
    if (!motionEnabledRef.current) return;
    const btn = buttonRef.current;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) / (rect.width / 2);
    const deltaY = (e.clientY - centerY) / (rect.height / 2);

    setPosition({
      x: Math.max(-6, Math.min(6, deltaX * strength)),
      y: Math.max(-6, Math.min(6, deltaY * strength)),
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: position.x === 0
          ? "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)"
          : "transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className={`relative inline-flex items-center justify-center font-medium transition-all ${className}`}
      data-cursor="open"
      {...props}
    >
      {children}
    </button>
  );
};
