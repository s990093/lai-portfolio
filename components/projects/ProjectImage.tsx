"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ProjectImageProps {
  src: string;
  alt: string;
  caption: string;
  description: string;
  className?: string;
}

export default function ProjectImage({
  src,
  alt,
  caption,
  description,
  className = "",
}: ProjectImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`group relative rounded-xl overflow-hidden border border-white/10 bg-white/5 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden bg-black/20">
        <motion.div
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
          className="relative w-full h-full"
        >
          <Image src={src} alt={alt} fill className="object-contain p-4" />
        </motion.div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
      </div>

      {/* Content */}
      <div className="p-5 relative z-10 border-t border-white/5 bg-[#0a0a0a]">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-8 bg-neon-blue/50" />
          <h4 className="text-sm font-bold text-white font-mono">{caption}</h4>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>

      {/* Decorative Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-blue/30" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-blue/30" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-blue/30" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-blue/30" />
    </motion.div>
  );
}
