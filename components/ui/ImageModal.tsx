"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImageModalProps {
  imageSrc: string | null;
  title?: string;
  description?: string;
  onClose: () => void;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  imageSrc,
  title,
  description,
  onClose,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (imageSrc) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageSrc, onClose]);

  if (!imageSrc) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="image-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-lg animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col rounded-2xl bg-surface border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close image modal"
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 border border-white/20 text-slate-300 hover:text-white transition-colors"
          data-cursor="expand"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full h-[60vh] sm:h-[70vh] bg-black">
          <Image
            src={imageSrc}
            alt={title || "Visual Preview"}
            fill
            className="object-contain"
          />
        </div>

        {(title || description) && (
          <div className="p-5 sm:p-6 bg-surface border-t border-white/10">
            {title && (
              <h3 id="image-modal-title" className="text-lg sm:text-xl font-bold text-white mb-1">
                {title}
              </h3>
            )}
            {description && (
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

