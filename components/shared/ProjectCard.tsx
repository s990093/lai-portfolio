"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import GlowCard from "./GlowCard";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  images?: string[];
  image?: string; // Backward compatibility
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  images,
  image,
  href,
}: ProjectCardProps) {
  // Combine single image and array into one list
  const allImages = images || (image ? [image] : []);
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allImages.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % allImages.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (allImages.length > 0) {
      setCurrentIndex(
        (prev) => (prev - 1 + allImages.length) % allImages.length
      );
    }
  };

  return (
    <GlowCard className="flex flex-col h-full group relative">
      {href && (
        <Link
          href={href}
          className="absolute inset-0 z-10"
          aria-label={`View ${title}`}
        />
      )}

      <div className="h-48 w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-4 overflow-hidden relative z-20 pointer-events-none">
        {/* Image Carousel - pointer-events-auto for buttons */}
        {allImages.length > 0 ? (
          <div className="relative w-full h-full pointer-events-auto">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={allImages[currentIndex]}
                alt={`${title} ${currentIndex + 1}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation Buttons */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-blue/20 backdrop-blur-sm border border-white/10 z-30"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-neon-blue/20 backdrop-blur-sm border border-white/10 z-30"
                >
                  <ChevronRight size={16} />
                </button>

                {/* Dots */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
                  {allImages.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "bg-neon-blue w-3"
                          : "bg-white/30 w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-mono text-xs">
            Project Preview
          </div>
        )}
      </div>

      <div className="flex justify-between items-start mb-2 relative z-20 pointer-events-none">
        <h3 className="text-xl font-bold text-white font-mono group-hover:text-neon-blue transition-colors">
          {title}
        </h3>
        {href && (
          <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-neon-blue transition-colors" />
        )}
      </div>

      <p className="text-gray-400 text-sm mb-4 flex-grow leading-relaxed relative z-20 pointer-events-none">
        {description}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto relative z-20 pointer-events-none">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 rounded bg-white/5 text-neon-blue border border-neon-blue/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </GlowCard>
  );
}
