"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MambaWaveBackground from "@/components/shared/MambaWaveBackground";
import SimdGridOverlay from "@/components/shared/SimdGridOverlay";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import AVX512Architecture from "@/components/projects/AVX512Architecture";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Zap, Cpu, Code, BarChart3 } from "lucide-react";
import Link from "next/link";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

// Component for displaying math equations
const MathBlock = ({
  title,
  children,
}: {
  title?: string;
  children: string;
}) => (
  <div className="my-6 p-6 rounded-lg bg-white/5 border border-white/10 font-serif text-center relative overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    {title && (
      <div className="text-xs font-mono text-gray-500 mb-4 uppercase tracking-wider">
        {title}
      </div>
    )}
    <div className="text-xl md:text-2xl text-gray-200 font-light tracking-wide">
      <BlockMath math={children} />
    </div>
  </div>
);

// Component for formal algorithm display
const AlgorithmBlock = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="my-8 border-2 border-gray-700 bg-[#1a1a1a] font-mono text-sm shadow-2xl">
    <div className="border-b-2 border-gray-700 bg-gray-800 px-4 py-2 font-bold text-gray-200 flex justify-between items-center">
      <span>{title}</span>
    </div>
    <div className="p-4 text-gray-300 leading-relaxed whitespace-pre-wrap">
      {children}
    </div>
    <div className="border-t border-gray-700 bg-gray-800/50 px-4 py-1 text-xs text-gray-500 text-right">
      AVX-512 Optimized
    </div>
  </div>
);

export default function DDoSAccelerationPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-neon-blue selection:text-black">
      <MambaWaveBackground />
      <SimdGridOverlay />
      <Navbar />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <Link href="/#projects">
          <Button variant="ghost" className="mb-8 hover:text-neon-blue pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Button>
        </Link>

        {/* Header */}
        <AnimatedContainer className="mb-16">
          <div className="inline-block px-3 py-1 rounded-full border border-neon-green/30 bg-neon-green/10 text-neon-green text-xs font-mono mb-4">
            High Performance Computing
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Efficient DDoS Acceleration with{" "}
            <span className="text-neon-blue">AVX-512</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            A CPU-based sliding window entropy acceleration system using AVX-512
            vectorization and Taylor series approximation. Achieved 406x speedup
            without GPU dependency.
          </p>
        </AnimatedContainer>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            {
              label: "Max Speedup",
              value: "406x",
              icon: Zap,
              color: "text-neon-blue",
            },
            {
              label: "Latency (4k Window)",
              value: "0.046s",
              icon: Activity,
              color: "text-neon-green",
            },
            {
              label: "Approximation Error",
              value: "1.3e-5",
              icon: BarChart3,
              color: "text-neon-purple",
            },
            {
              label: "Architecture",
              value: "AVX-512",
              icon: Cpu,
              color: "text-white",
            },
          ].map((stat, i) => (
            <AnimatedContainer
              key={i}
              delay={i * 0.1}
              className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <stat.icon className={`w-8 h-8 mb-4 ${stat.color}`} />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </AnimatedContainer>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Text Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Abstract */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-8 bg-neon-blue rounded-full" /> Abstract
              </h2>
              <div className="prose prose-invert max-w-none text-gray-300">
                <p>
                  This research proposes a sliding window entropy acceleration
                  method based on CPU AVX-512 vectorization for high-speed
                  network DDoS attack detection. Traditional entropy calculation
                  involves high-cost log operations. We employ a 3rd-order
                  Taylor polynomial combined with Horner's method to approximate
                  log2(1+x), and directly load byte frequencies into AVX-512
                  registers. Through <code>_mm512_fmadd_ps</code> and mask
                  operations, we achieve parallel accumulation, compressing the
                  original O(n·w) calculation to approximately O(n).
                </p>
              </div>
            </section>

            {/* Mathematical Foundation */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-neon-purple rounded-full" />{" "}
                Mathematical Foundation
              </h2>

              <p className="text-gray-300 mb-4">
                The Information Entropy H(X) for a discrete random variable X is
                defined as:
              </p>
              <MathBlock title="Shannon Entropy">
                {"H(X) = - \\sum_{i} p_i \\log_2 p_i"}
              </MathBlock>

              <p className="text-gray-300 mb-4">
                For a sliding window of size W, where byte value i appears c_i
                times, the entropy can be computed efficiently as:
              </p>
              <MathBlock title="Sliding Window Entropy">
                {
                  "H = \\log_2 W - \\frac{1}{W} \\sum_{i=0}^{255} c_i \\log_2 c_i"
                }
              </MathBlock>

              <p className="text-gray-300 mb-4">
                To accelerate the costly log2 calculation, we use a 3rd-order
                Taylor expansion approximated via Horner's Method:
              </p>
              <MathBlock title="Polynomial Approximation">
                {"P(x) = c_0 + x(c_1 + x(c_2 + x c_3))"}
              </MathBlock>
            </section>

            {/* Algorithm & Implementation */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-neon-green rounded-full" />{" "}
                Algorithm & Implementation
              </h2>

              <AnimatedContainer className="mb-8">
                <AVX512Architecture />
                <p className="text-center text-sm text-gray-500 mt-4">
                  Figure 1: AVX-512 Vectorized Entropy Calculation Flowchart
                </p>
              </AnimatedContainer>

              <AlgorithmBlock title="Algorithm 1: AVX-512 Vectorized Entropy">
                {`Require: Byte frequency array C[256], Window size W
Ensure: Entropy value H

1:  Load constants for Taylor series (c0, c1, c2, c3) into zmm registers
2:  Initialize accumulator sum_vec = 0
3:  
4:  for i = 0 to 255 step 16 do
5:      // Load 16 integer frequencies
6:      idx_vec = _mm512_load_si512(&C[i])
7:      
8:      // Convert to float
9:      freq_vec = _mm512_cvtepi32_ps(idx_vec)
10:     
11:     // Mask for non-zero frequencies (avoid log(0))
12:     mask = _mm512_cmp_ps_mask(freq_vec, zero, _CMP_GT_OQ)
13:     
14:     // Polynomial Approximation (Horner's Method)
15:     // log_val = c0 + x * (c1 + x * (c2 + x * c3))
16:     term = _mm512_fmadd_ps(x, c3, c2)
17:     term = _mm512_fmadd_ps(x, term, c1)
18:     log_val = _mm512_fmadd_ps(x, term, c0)
19:     
20:     // Accumulate: sum += freq * log(freq)
21:     sum_vec = _mm512_mask3_fmadd_ps(freq_vec, log_val, sum_vec, mask)
22: end for
23: 
24: H_partial = ReduceSum(sum_vec)
25: H = log2(W) - (1/W) * H_partial
26: return H`}
              </AlgorithmBlock>
            </section>

            {/* Experimental Results */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-white rounded-full" /> Experimental
                Results
              </h2>

              <div className="space-y-8">
                {/* Table 1: Approximation Accuracy */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-bold text-white">
                    Table 1: Log Approximation Performance (Single Precision)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                      <thead className="text-xs text-gray-400 uppercase bg-white/5">
                        <tr>
                          <th className="px-6 py-3">Method</th>
                          <th className="px-6 py-3">Time (µs)</th>
                          <th className="px-6 py-3">Speedup</th>
                          <th className="px-6 py-3">MAE Error</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            NumPy
                          </td>
                          <td className="px-6 py-4">491.56</td>
                          <td className="px-6 py-4">1.00x</td>
                          <td className="px-6 py-4">-</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            C++ Baseline
                          </td>
                          <td className="px-6 py-4">303.93</td>
                          <td className="px-6 py-4">1.61x</td>
                          <td className="px-6 py-4">-</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-neon-blue">
                            Polynomial (AVX-512)
                          </td>
                          <td className="px-6 py-4 text-neon-blue font-bold">
                            52.19
                          </td>
                          <td className="px-6 py-4 text-neon-blue font-bold">
                            9.42x
                          </td>
                          <td className="px-6 py-4">1.3 × 10⁻⁵</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2: Window Size Performance */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-bold text-white">
                    Table 2: System Performance by Window Size
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                      <thead className="text-xs text-gray-400 uppercase bg-white/5">
                        <tr>
                          <th className="px-6 py-3">Window Size</th>
                          <th className="px-6 py-3">Baseline Time (s)</th>
                          <th className="px-6 py-3">AVX-512 Time (s)</th>
                          <th className="px-6 py-3">Speedup</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            100
                          </td>
                          <td className="px-6 py-4">1.6380</td>
                          <td className="px-6 py-4">0.0487</td>
                          <td className="px-6 py-4 text-neon-green">33.64x</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            512
                          </td>
                          <td className="px-6 py-4">4.9548</td>
                          <td className="px-6 py-4">0.0586</td>
                          <td className="px-6 py-4 text-neon-green">84.50x</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            1,024
                          </td>
                          <td className="px-6 py-4">6.1399</td>
                          <td className="px-6 py-4">0.0461</td>
                          <td className="px-6 py-4 text-neon-green">133.07x</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            4,096
                          </td>
                          <td className="px-6 py-4">18.8877</td>
                          <td className="px-6 py-4 text-neon-blue font-bold">
                            0.0465
                          </td>
                          <td className="px-6 py-4 text-neon-blue font-bold">
                            406.02x
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24">
              <div className="p-6 rounded-xl bg-gradient-to-br from-neon-green/10 to-blue-500/10 border border-white/10">
                <h3 className="text-xl font-bold text-white mb-4">
                  Why AVX-512?
                </h3>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  Many enterprise and edge environments lack dedicated GPUs.
                  AVX-512 allows us to exploit data-level parallelism directly
                  on the CPU, achieving GPU-like throughput for specific
                  workloads like entropy calculation.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Scalar (1x)</span>
                    <span>Vector (16x)</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-neon-green"
                      initial={{ width: "6%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-bold text-white mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "C++",
                    "AVX-512",
                    "SIMD",
                    "Optimization",
                    "Assembly",
                    "HPC",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

// Icon component helper
function Activity(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
