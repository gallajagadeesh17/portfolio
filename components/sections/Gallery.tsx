"use client";

import React, { useState } from "react";
import Image from "next/image";
import { galleryData, GalleryItem } from "@/content/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageModal } from "@/components/ui/ImageModal";
import { Maximize2, Layers, Sparkles } from "lucide-react";

export const Gallery: React.FC = () => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const categories = ["All", "Workflow", "UI Design", "Code", "Certificate"];

  const filteredItems =
    filter === "All"
      ? galleryData
      : galleryData.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 relative">
      <SectionHeading
        number="08"
        title="Visual Architecture & Screenshots"
        subtitle="Behind-the-scenes workflow diagrams, component UI design screens, and code artifacts."
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-xs font-mono transition-all ${
              filter === cat
                ? "bg-accent-indigo text-white font-bold border border-accent-indigo"
                : "bg-surface text-slate-400 border border-white/10 hover:text-white"
            }`}
            data-cursor="expand"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveImage(item)}
            className="group relative rounded-2xl overflow-hidden bg-surface border border-surface-border hover:border-white/20 transition-all cursor-pointer shadow-lg"
            data-cursor="expand"
          >
            <div className="relative w-full h-64 sm:h-72 bg-slate-950">
              <Image
                src={item.image}
                alt={item.title}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80 group-hover:opacity-40 transition-opacity" />
            </div>

            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 pointer-events-none">
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 rounded-md bg-black/60 border border-white/10 backdrop-blur-md text-[10px] font-mono text-accent-cyan uppercase">
                  {item.category}
                </span>
                <div className="p-2 rounded-full bg-black/60 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-accent-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <ImageModal
        imageSrc={activeImage?.image || null}
        title={activeImage?.title}
        description={activeImage?.description}
        onClose={() => setActiveImage(null)}
      />
    </section>
  );
};

