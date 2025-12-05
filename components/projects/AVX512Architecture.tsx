"use client";

import { motion } from "framer-motion";

export default function AVX512Architecture() {
  return (
    <div className="w-full bg-black/40 rounded-xl border border-white/10 p-4 md:p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Title */}
      <div className="absolute top-4 right-4 text-xs font-mono text-gray-500">
        AVX-512 Pipeline Visualization
      </div>

      <div className="flex flex-col gap-8 relative z-10 max-w-4xl mx-auto">
        {/* Stage 1: Input & Frequency Count */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="relative p-4 rounded-lg border border-white/10 bg-white/5 w-48 text-center">
            <div className="text-xs text-gray-400 mb-2">Input Sequence</div>
            <div className="flex gap-0.5 justify-center">
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-6 bg-gray-600 rounded-sm"
                  animate={{
                    backgroundColor: ["#4b5563", "#22c55e", "#4b5563"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.05,
                  }}
                />
              ))}
            </div>
          </div>

          <ArrowRight />

          <div className="relative p-4 rounded-lg border border-neon-blue/30 bg-neon-blue/5 w-48 text-center">
            <div className="text-xs text-neon-blue mb-2">Freq Count (Ci)</div>
            <div className="font-mono text-lg font-bold text-white">
              _mm512_load
            </div>
          </div>
        </div>

        <ArrowDown />

        {/* Stage 2: Vector Processing (The Core) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Branch: Approximation */}
          <div className="space-y-8">
            <div className="relative p-4 rounded-lg border border-neon-purple/30 bg-neon-purple/5 text-center">
              <div className="text-xs text-neon-purple mb-1">
                Convert to Float
              </div>
              <div className="font-mono text-sm text-white mb-2">
                _mm512_cvtepi32_ps
              </div>
              {/* SIMD Lanes Animation */}
              <div className="flex gap-1 justify-center">
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-neon-purple"
                    animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                ))}
              </div>
            </div>

            <ArrowDown />

            <div className="relative p-4 rounded-lg border border-neon-green/30 bg-neon-green/5 text-center">
              <div className="text-xs text-neon-green mb-1">
                Poly Approx (Horner)
              </div>
              <div className="font-mono text-sm text-white">
                _mm512_fmadd_ps
              </div>
              <div className="text-[10px] text-gray-400 mt-1">
                c0 + x(c1 + x(c2 + x*c3))
              </div>
            </div>
          </div>

          {/* Right Branch: Masking & Parallel Ops */}
          <div className="space-y-8 mt-8 md:mt-0">
            <div className="relative p-4 rounded-lg border border-yellow-500/30 bg-yellow-500/5 text-center h-full flex flex-col justify-center">
              <div className="text-xs text-yellow-500 mb-1">
                Mask Generation
              </div>
              <div className="font-mono text-sm text-white">
                _mm512_cmp_ps_mask
              </div>
              <div className="flex gap-1 justify-center mt-2">
                {[1, 0, 1, 1, 0, 1, 1, 1].map((bit, i) => (
                  <motion.div
                    key={i}
                    className={`w-3 h-3 border ${
                      bit
                        ? "bg-yellow-500 border-yellow-500"
                        : "border-gray-600 bg-transparent"
                    }`}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <ArrowDown />

        {/* Stage 3: Accumulation */}
        <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
          <div className="relative p-4 rounded-lg border border-red-500/30 bg-red-500/5 w-64 text-center">
            <div className="text-xs text-red-400 mb-1">
              Parallel Accumulation
            </div>
            <div className="font-mono text-sm text-white">
              _mm512_mask3_fmadd_ps
            </div>
            <motion.div
              className="w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent mt-2"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <ArrowRight />

          <div className="relative p-4 rounded-lg border border-white/30 bg-white/10 w-32 text-center flex flex-col items-center justify-center">
            <div className="text-xs text-gray-300 mb-1">Output Entropy</div>
            <motion.div
              className="text-2xl font-bold text-white"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              H
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowDown() {
  return (
    <div className="flex justify-center w-full">
      <motion.div
        className="w-0.5 h-8 bg-gray-600"
        initial={{ height: 0 }}
        whileInView={{ height: 32 }}
        transition={{ duration: 1 }}
      >
        <div className="w-2 h-2 border-r border-b border-gray-600 rotate-45 transform translate-x-[-3px] translate-y-[28px]" />
      </motion.div>
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="hidden md:flex items-center">
      <motion.div
        className="h-0.5 w-8 bg-gray-600"
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        transition={{ duration: 1 }}
      >
        <div className="w-2 h-2 border-t border-r border-gray-600 rotate-45 transform translate-x-[28px] translate-y-[-5px]" />
      </motion.div>
    </div>
  );
}
