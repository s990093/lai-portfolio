"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlowCard({ children, className }: GlowCardProps) {
  return (
    <motion.div
      animate={{ y: [0, -5, 0] }}
      transition={{
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 25px rgba(0, 243, 255, 0.2)" }}
      className={cn(
        "relative rounded-xl border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden group",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 p-6 h-full">{children}</div>
      {/* Neon border effect */}
      <div className="absolute inset-0 border border-neon-blue/20 rounded-xl group-hover:border-neon-blue/50 transition-colors duration-300 pointer-events-none" />
    </motion.div>
  );
}
