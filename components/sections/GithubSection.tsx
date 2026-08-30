"use client";

import React from "react";
import { socialLinks } from "@/content/socials";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Github, Star, GitFork, ExternalLink, Code, Terminal } from "lucide-react";

interface RepoItem {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

const featuredRepos: RepoItem[] = [
  {
    name: "LinkedIn-Job-Finder-Automation",
    description: "An n8n-powered job discovery workflow that turns search criteria into structured LinkedIn job leads and saves them to Google Sheets.",
    stars: 12,
    forks: 4,
    language: "n8n / JavaScript",
    url: "https://github.com/gallajagadeesh17/LinkedIn-Job-Finder-Automation",
  },
  {
    name: "MAKKMAL-Web-Platform",
    description: "Modern full-stack web application featuring user authentication, password recovery, intuitive UI/UX, and responsive architecture.",
    stars: 8,
    forks: 2,
    language: "TypeScript / Next.js",
    url: "https://github.com/gallajagadeesh17",
  },
  {
    name: "BESCOM-Digital-Platform-Concept",
    description: "Consumer utility service architecture, billing management, and real-time outage reporting platform concept.",
    stars: 6,
    forks: 1,
    language: "React / Tailwind",
    url: "https://github.com/gallajagadeesh17",
  },
];

export const GithubSection: React.FC = () => {
  return (
    <section id="github-section" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <SectionHeading
        number="07"
        title="Building in Public"
        subtitle="Explore open-source repositories, automated workflows, and code contributions."
      />

      <div className="p-8 sm:p-10 rounded-3xl bg-surface border border-surface-border relative overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8 pb-8 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white">
              <Github className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">@gallajagadeesh17</h3>
              <p className="text-xs font-mono text-accent-cyan">GitHub Developer Profile</p>
            </div>
          </div>

          <a
            href={socialLinks.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-accent-indigo hover:bg-accent-indigo/90 text-white font-medium text-xs font-mono tracking-wider uppercase inline-flex items-center gap-2 transition-colors"
            data-cursor="expand"
          >
            Visit GitHub Profile <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Featured Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredRepos.map((repo, idx) => (
            <a
              key={idx}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all flex flex-col justify-between group"
              data-cursor="expand"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-accent-cyan mb-2">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Terminal className="w-3.5 h-3.5" /> {repo.name}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                  {repo.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-slate-500 pt-3 border-t border-white/5">
                <span className="text-slate-300 font-semibold">{repo.language}</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400" /> {repo.stars}
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="w-3.5 h-3.5" /> {repo.forks}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

