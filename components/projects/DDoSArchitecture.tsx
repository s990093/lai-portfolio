"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function DDoSArchitecture() {
  return (
    <div className="w-full bg-black/40 rounded-xl border border-white/10 p-4 md:p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Legend */}
      <div className="absolute top-4 right-4 flex gap-4 text-xs font-mono z-10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" /> Raw Traffic
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" /> Attack
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />{" "}
          Mixed/Suspicious
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" /> Benign
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 relative z-0">
        {/* Stage 1: Feature Engineering & GMM */}
        <div className="flex-1 space-y-8">
          {/* Module 1: Feature Engineering */}
          <div className="relative p-6 rounded-lg border border-blue-500/30 bg-blue-500/5">
            <h3 className="text-blue-400 font-bold mb-2 text-sm">
              Feature Engineering
            </h3>
            <div className="flex justify-between items-center">
              <div className="text-xs text-gray-400 space-y-1">
                <div>Shannon Entropy</div>
                <div>Rényi Entropy</div>
                <div>Min Entropy</div>
              </div>
              <motion.div
                className="text-2xl font-bold text-white"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                H(X|ddos)
              </motion.div>
            </div>

            {/* Traffic Flow Animation Input */}
            <div className="absolute -left-4 top-1/2 -translate-x-full">
              <TrafficStream color="bg-blue-500" delay={0} />
            </div>
          </div>

          {/* Arrow Down */}
          <div className="flex justify-center">
            <motion.div
              className="w-1 h-8 bg-gradient-to-b from-blue-500/50 to-green-500/50"
              animate={{ height: [32, 48, 32], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Module 2: PSO-GMM Clustering */}
          <div className="relative p-6 rounded-lg border border-green-500/30 bg-green-500/5 h-48">
            <h3 className="text-green-400 font-bold mb-2 text-sm">
              Stage 1: PSO-GMM Clustering
            </h3>
            <div className="flex h-full">
              {/* GMM Visualization */}
              <div className="w-1/2 flex items-center justify-center relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-24 h-24 border-2 border-green-500/20 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      borderColor: [
                        "rgba(34,197,94,0.2)",
                        "rgba(34,197,94,0.5)",
                        "rgba(34,197,94,0.2)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-16 h-16 border-2 border-red-500/20 rounded-full absolute"
                    animate={{ scale: [1.1, 1, 1.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                <div className="z-10 text-xs text-center">
                  <div>PSO Optimization</div>
                  <div className="text-[10px] text-gray-400">EM Algorithm</div>
                </div>
              </div>

              {/* Separation Logic */}
              <div className="w-1/2 flex flex-col justify-center gap-4 pl-4 border-l border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs text-red-400">C_ddos (Block)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                  <span className="text-xs text-yellow-400">
                    C_mixed (Pass)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Arrow Right (Desktop) / Down (Mobile) */}
        <div className="flex lg:flex-col justify-center items-center">
          <motion.div
            className="lg:w-16 lg:h-1 w-1 h-16 bg-gradient-to-r from-green-500/50 to-purple-500/50"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>

        {/* Stage 2: Mamba Deep Analysis */}
        <div className="flex-1 relative p-6 rounded-lg border border-purple-500/30 bg-purple-500/5 flex flex-col">
          <h3 className="text-purple-400 font-bold mb-4 text-sm">
            Stage 2: Mamba Deep Analysis
          </h3>

          {/* Mamba Block Visualization */}
          <div className="flex-1 flex flex-col items-center justify-center gap-4 relative">
            {/* Input Stream (Mixed) */}
            <div className="absolute -left-6 top-10 hidden lg:block">
              <TrafficStream color="bg-yellow-500" delay={1} />
            </div>

            {/* Mamba Layers */}
            {[1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-full h-12 rounded bg-purple-500/10 border border-purple-500/20 flex items-center justify-between px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <span className="text-xs text-purple-300">Mamba Block {i}</span>
                <div className="flex gap-1">
                  <motion.div
                    className="w-1 h-4 bg-purple-500"
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  />
                  <motion.div
                    className="w-1 h-4 bg-blue-500"
                    animate={{ scaleY: [1, 1.5, 1] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: i * 0.1 + 0.2,
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* SSM Curve Animation */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <motion.path
                d="M 50 20 C 150 20, 150 300, 250 300"
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Final Output */}
          <div className="mt-8 pt-4 border-t border-white/10 flex justify-around">
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Sigmoid &lt; 0.5</div>
              <div className="px-3 py-1 rounded bg-green-500/20 text-green-400 text-xs font-bold">
                Benign
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-400 mb-1">Sigmoid ≥ 0.5</div>
              <div className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-xs font-bold">
                DDoS
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper component for particle stream
function TrafficStream({ color, delay }: { color: string; delay: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`w-2 h-2 rounded-full ${color}`}
          animate={{ x: [0, 20, 40], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: delay + i * 0.3,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
