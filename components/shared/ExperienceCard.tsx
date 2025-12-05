"use client";

import { motion } from "framer-motion";
import GlowCard from "./GlowCard";

interface ExperienceCardProps {
  role: string;
  desc: string;
  year: string;
  image?: string;
  className?: string;
}

export default function ExperienceCard({
  role,
  desc,
  year,
  image,
  className,
}: ExperienceCardProps) {
  return (
    <GlowCard className={`flex flex-col md:flex-row gap-6 h-full ${className}`}>
      {image && (
        <div className="w-full md:w-1/3 h-48 md:h-auto relative rounded-lg overflow-hidden flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={role}
            className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r" />
        </div>
      )}

      <div className="flex flex-col flex-grow justify-center">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors">
            {role}
          </h3>
          <span className="text-sm font-mono text-neon-blue bg-neon-blue/10 px-2 py-1 rounded border border-neon-blue/20">
            {year}
          </span>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </GlowCard>
  );
}
