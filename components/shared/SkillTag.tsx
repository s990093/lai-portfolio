"use client";

import { motion } from "framer-motion";

interface SkillTagProps {
  name: string;
}

export default function SkillTag({ name }: SkillTagProps) {
  return (
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{
        y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      }}
      whileHover={{
        scale: 1.1,
        y: -5,
        boxShadow: "0 0 15px rgba(0, 243, 255, 0.4)",
      }}
      className="px-4 py-2 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue font-mono text-sm cursor-default hover:bg-neon-blue/10 hover:border-neon-blue/60 transition-colors shadow-[0_0_5px_rgba(0,243,255,0.1)]"
    >
      {name}
    </motion.div>
  );
}
