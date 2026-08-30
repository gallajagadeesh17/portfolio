import React from "react";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  number,
  title,
  subtitle,
  align = "left",
}) => {
  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === "center" ? "text-center flex flex-col items-center" : "text-left"
      }`}
    >
      <div className="inline-flex items-center gap-2 mb-3">
        <span className="font-mono text-xs md:text-sm font-semibold text-accent-cyan tracking-widest uppercase px-2.5 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20">
          // {number}
        </span>
        <div className="h-px w-8 bg-gradient-to-r from-accent-cyan/50 to-transparent" />
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-3 text-base md:text-lg text-slate-400 max-w-2xl font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

