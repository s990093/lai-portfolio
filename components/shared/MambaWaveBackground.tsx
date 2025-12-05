"use client";

import { motion } from "framer-motion";

export default function MambaWaveBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <svg
        className="absolute w-full h-full opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: "#00f3ff", stopOpacity: 0 }}
            />
            <stop
              offset="50%"
              style={{ stopColor: "#00f3ff", stopOpacity: 0.5 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#00f3ff", stopOpacity: 0 }}
            />
          </linearGradient>
        </defs>
        {/* Multiple waves */}
        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d={`M -200 ${300 + i * 150} C 400 ${100 + i * 100}, 800 ${
              500 + i * 100
            }, 1800 ${200 + i * 100}`}
            fill="none"
            stroke="url(#grad1)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 1],
              opacity: [0, 0.4, 0.4],
              x: [-50, 0, 50, 0, -50], // Slow horizontal slide
              d: [
                `M -200 ${300 + i * 150} C 400 ${100 + i * 100}, 800 ${
                  500 + i * 100
                }, 1800 ${200 + i * 100}`,
                `M -200 ${350 + i * 150} C 400 ${150 + i * 100}, 800 ${
                  550 + i * 100
                }, 1800 ${250 + i * 100}`,
                `M -200 ${300 + i * 150} C 400 ${100 + i * 100}, 800 ${
                  500 + i * 100
                }, 1800 ${200 + i * 100}`,
              ],
            }}
            transition={{
              pathLength: { duration: 2, ease: "easeInOut" },
              opacity: { duration: 2, ease: "easeInOut" },
              x: { duration: 20 + i * 5, repeat: Infinity, ease: "linear" }, // Continuous sliding
              d: {
                duration: 10 + i * 5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="blur-[2px]"
          />
        ))}
      </svg>
    </div>
  );
}
