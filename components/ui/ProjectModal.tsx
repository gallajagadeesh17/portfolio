"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Project } from "@/content/projects";
import { X, ExternalLink, Github, CheckCircle2, Cpu } from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface border border-surface-border p-6 sm:p-8 md:p-10 shadow-2xl text-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 border border-white/10 text-primary-muted hover:text-white transition-colors"
          data-cursor="expand"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-3 mb-3 text-xs font-mono text-accent">
          <span className="px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 font-bold">
            PROJECT {project.number}
          </span>
          <span>•</span>
          <span className="text-primary-muted">{project.category}</span>
        </div>

        {/* Title & Subtitle */}
        <h2 id="project-modal-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-1">
          {project.title}
        </h2>
        <p className="text-sm font-mono text-accent mb-6">
          {project.subtitle}
        </p>

        {/* Featured Image */}
        <div className="relative w-full h-56 sm:h-72 md:h-96 rounded-xl overflow-hidden mb-8 border border-white/10 bg-slate-950">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-contain p-3 sm:p-4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60" />
        </div>

        {/* Short Description */}
        <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5 mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-accent font-semibold mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4" /> System Overview
          </h3>
          <p className="text-sm text-primary-muted leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Key Points & Achievements */}
        <div className="mb-8">
          <h3 className="text-base font-bold text-primary mb-4 font-mono">Key Highlights &amp; Implementation Details</h3>
          <ul className="space-y-3">
            {project.keyPoints.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span className="leading-relaxed">{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Technologies Badges */}
        <div className="mb-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-primary-muted mb-3">
            Technologies Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-accent font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-surface-border">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase transition-colors"
              data-cursor="expand"
            >
              <Github className="w-4 h-4" /> VIEW ON GITHUB ↗
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white font-mono text-xs font-bold uppercase transition-colors"
              data-cursor="expand"
            >
              <ExternalLink className="w-4 h-4" /> LIVE DEMO ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
