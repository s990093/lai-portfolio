"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MambaWaveBackground from "@/components/shared/MambaWaveBackground";
import SimdGridOverlay from "@/components/shared/SimdGridOverlay";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import DDoSArchitecture from "@/components/projects/DDoSArchitecture";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cpu, Shield, Zap, Activity } from "lucide-react";
import Link from "next/link";
import "katex/dist/katex.min.css";
import { BlockMath } from "react-katex";

// Custom Mamba Architecture Animation Component
const MambaArchitecture = () => {
  return (
    <div className="w-full h-64 md:h-80 bg-black/40 rounded-xl border border-neon-blue/30 relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />

      {/* Input Sequence */}
      <div className="flex gap-2 absolute left-4 md:left-10 top-1/2 -translate-y-1/2">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="w-3 h-8 md:w-4 md:h-12 bg-gray-700 rounded-sm"
            animate={{
              backgroundColor: ["#374151", "#00f3ff", "#374151"],
              scaleY: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* SSM Core Processing */}
      <div className="relative w-32 h-32 md:w-48 md:h-48 border-2 border-neon-purple/50 rounded-full flex items-center justify-center">
        <motion.div
          className="absolute inset-0 border-2 border-neon-blue/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-2 border border-neon-green/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />

        {/* State Space Trajectory */}
        <svg className="w-full h-full absolute inset-0 pointer-events-none">
          <motion.path
            d="M 20 64 Q 64 20 108 64 T 196 64"
            fill="none"
            stroke="#bc13fe"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        <div className="text-center z-10">
          <div className="text-xs text-gray-400 font-mono">SSM</div>
          <div className="text-lg font-bold text-white">Mamba</div>
        </div>
      </div>

      {/* Output Classification */}
      <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        <motion.div
          className="px-4 py-2 rounded bg-red-500/20 border border-red-500/50 text-red-500 font-mono text-sm"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          DDoS Detected
        </motion.div>
        <div className="px-4 py-2 rounded bg-green-500/10 border border-green-500/30 text-green-500 font-mono text-sm opacity-30">
          Normal Traffic
        </div>
      </div>

      {/* Data Flow Particles */}
      <motion.div
        className="absolute top-1/2 left-20 w-4 h-4 bg-neon-blue rounded-full blur-sm"
        animate={{
          x: [0, 100, 200, 300],
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 0.5],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// Component for formal algorithm display
const AlgorithmBlock = ({
  title,
  children,
}: {
  title: string;
  children: string;
}) => (
  <div className="my-6 font-mono text-sm bg-[#0a0a0a] border-y-2 border-gray-200 text-gray-300 max-w-3xl mx-auto shadow-2xl overflow-x-auto">
    {/* Title */}
    <div className="py-2 px-4 font-bold text-gray-100 border-b border-gray-700">
      {title}
    </div>
    {/* LaTeX Content */}
    <div className="py-4 px-4">
      <BlockMath math={children} />
    </div>
    {/* Bottom Border */}
    <div className="h-1 bg-gray-200 w-full" />
  </div>
);

export default function DDoSProjectPage() {
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
          <div className="inline-block px-3 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-xs font-mono mb-4">
            IEEE GCCE 2025
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Efficient DDoS Detection with{" "}
            <span className="text-neon-blue">Mamba</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
            A novel two-stage architecture combining Multi-Entropy Clustering
            and State-Space Models (Mamba) to achieve 5.5x speedup over
            Transformers while maintaining 99.9% accuracy.
          </p>
        </AnimatedContainer>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            {
              label: "Speedup vs Transformer",
              value: "5.5x",
              icon: Zap,
              color: "text-neon-blue",
            },
            {
              label: "F1-Score",
              value: "0.983",
              icon: Shield,
              color: "text-neon-green",
            },
            {
              label: "Throughput",
              value: "383.5 samples/ms",
              icon: Activity,
              color: "text-neon-purple",
            },
            {
              label: "Memory Usage",
              value: "499 MB",
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
                  This research proposes a "Multi-Entropy Fast Screening + Mamba
                  Analysis" DDoS detection architecture. It first uses Shannon,
                  Rényi, and Min-entropy combined with PSO-enhanced GMM to
                  quickly filter 67.2% of high-purity attack traffic. Then, the
                  Mamba model performs sequence classification. On CIC series
                  datasets, it achieved an F1-score of 0.983, a throughput of
                  383.52 samples/ms, and only 499MB memory consumption. The
                  overall performance is 5.5 times higher than Transformer,
                  demonstrating the best balance of accuracy, real-time
                  performance, and resource efficiency.
                </p>
              </div>
            </section>
            {/* Architecture Diagram */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-neon-purple rounded-full" /> System
                Architecture
              </h2>
              <AnimatedContainer className="mb-8">
                <DDoSArchitecture />
                <p className="text-center text-sm text-gray-500 mt-4 mb-2">
                  Figure 1: Two-Stage DDoS Detection System Flowchart (PSO-GMM +
                  Mamba)
                </p>
              </AnimatedContainer>
            </section>
            {/* Core Algorithms */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-neon-blue rounded-full" /> Core
                Algorithms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatedContainer delay={0.2} className="space-y-2">
                  <AlgorithmBlock title="Algorithm 1: Simplified PSO for GMM">
                    {`\\begin{array}{l}
\\textbf{Require: } \\text{Dataset } \\mathcal{D}, \\text{ particle count } N, \\text{ max iterations } T \\\\
\\textbf{Ensure: } \\text{Best parameters } \\mathbf{w}^* \\\\
1: \\text{Initialize particles } \\mathbf{w}_i \\text{ and velocities } \\mathbf{v}_i \\text{ randomly} \\\\
2: \\text{Evaluate fitness } f(\\mathbf{w}_i) \\text{ and set } \\mathbf{pBest}_i, \\mathbf{gBest} \\\\
3: \\textbf{for } t = 1 \\text{ to } T \\textbf{ do} \\\\
4: \\quad \\textbf{for } \\text{each particle } i \\textbf{ do} \\\\
5: \\quad \\quad \\text{Evaluate fitness } F_i = f(\\mathbf{w}_i) \\\\
6: \\quad \\quad \\textbf{if } F_i < f(\\mathbf{pBest}_i) \\textbf{ then} \\\\
7: \\quad \\quad \\quad \\mathbf{pBest}_i \\leftarrow \\mathbf{w}_i \\\\
8: \\quad \\quad \\textbf{end if} \\\\
9: \\quad \\quad \\textbf{if } F_i < f(\\mathbf{gBest}) \\textbf{ then} \\\\
10: \\quad \\quad \\quad \\mathbf{gBest} \\leftarrow \\mathbf{w}_i \\\\
11: \\quad \\quad \\textbf{end if} \\\\
12: \\quad \\textbf{end for} \\\\
13: \\quad \\textbf{for } \\text{each particle } i \\textbf{ do} \\\\
14: \\quad \\quad \\text{Update velocity } \\mathbf{v}_i \\text{ and position } \\mathbf{w}_i \\text{ using } \\mathbf{pBest} \\text{ and } \\mathbf{gBest} \\\\
15: \\quad \\textbf{end for} \\\\
16: \\textbf{end for} \\\\
17: \\textbf{return } \\mathbf{gBest} \\text{ as } \\mathbf{w}^*
\\end{array}`}
                  </AlgorithmBlock>
                </AnimatedContainer>

                <AnimatedContainer delay={0.3} className="space-y-2">
                  <AlgorithmBlock title="Procedure 1: Mamba Inference Procedure">
                    {`\\begin{array}{l}
\\textbf{Require: } \\text{Sequence } X \\in \\mathbb{R}^{T \\times D_{in}} \\\\
\\textbf{Ensure: } \\text{Decision } d \\in \\{\\text{DDoS, Benign}\\} \\\\
1: H \\leftarrow \\text{Linear}(X, \\text{dim}_{out} = 256) \\\\
2: H \\leftarrow \\text{LayerNorm}(H) \\\\
3: H \\leftarrow \\text{Dropout}(H, p = 0.1) \\\\
4: H \\leftarrow H + \\text{PositionalEncoding}(H) \\\\
5: \\textbf{for } i = 1 \\text{ to } 4 \\textbf{ do} \\\\
6: \\quad H \\leftarrow \\text{MambaBlock}(H, d_{state} = 16, d_{conv} = 4) \\\\
7: \\textbf{end for} \\\\
8: V \\leftarrow \\text{MeanPool}(H) \\\\
9: V \\leftarrow \\text{FFN}(V, \\text{hidden} = 128) \\\\
10: V \\leftarrow \\text{LayerNorm}(V) \\\\
11: V \\leftarrow \\text{Dropout}(V, p = 0.1) \\\\
12: logit \\leftarrow \\text{Linear}(V, \\text{dim}_{out} = 1) \\\\
13: p \\leftarrow \\sigma(logit) \\\\
14: \\textbf{if } p \\geq 0.5 \\textbf{ then} \\\\
15: \\quad \\textbf{return } \\text{DDoS} \\\\
16: \\textbf{else} \\\\
17: \\quad \\textbf{return } \\text{Benign} \\\\
18: \\textbf{end if}
\\end{array}`}
                  </AlgorithmBlock>
                </AnimatedContainer>
              </div>
            </section>
            {/* Methodology */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-1 h-8 bg-neon-green rounded-full" />{" "}
                Methodology
              </h2>
              <div className="space-y-6 text-gray-300">
                <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="text-lg font-bold text-neon-blue mb-2">
                    Stage 1: Fast Screening (PSO-GMM)
                  </h3>
                  <p>
                    Utilizes lightweight unsupervised classifiers to filter
                    high-purity DDoS attacks at minimal cost. Calculates
                    Shannon, Rényi, and Min-entropy features, then uses
                    PSO-optimized GMM to cluster traffic into High-Purity Attack
                    Cluster (C_ddos) and Mixed Cluster (C_mixed).
                  </p>
                </div>
                <div className="p-6 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="text-lg font-bold text-neon-purple mb-2">
                    Stage 2: Deep Analysis (Mamba)
                  </h3>
                  <p>
                    Applies the Mamba State-Space Model (SSM) to the small
                    amount of suspicious traffic (C_mixed). Mamba solves the
                    quadratic complexity O(N²) of Transformers, achieving linear
                    time O(N) inference efficiency while maintaining high model
                    expressiveness.
                  </p>
                </div>
              </div>
            </section>
            {/* Experimental Results */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-white rounded-full" /> Experimental
                Results
              </h2>

              <div className="space-y-8">
                {/* Table 1: Clustering Efficiency */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-bold text-white">
                    Table 1: Stage 1 Clustering Efficiency (PSO-GMM)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                      <thead className="text-xs text-gray-400 uppercase bg-white/5">
                        <tr>
                          <th className="px-6 py-3">Cluster</th>
                          <th className="px-6 py-3">Traffic Type</th>
                          <th className="px-6 py-3">Ratio (%)</th>
                          <th className="px-6 py-3">Purity (%)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            High-Purity (C_ddos)
                          </td>
                          <td className="px-6 py-4 text-red-400">Attack</td>
                          <td className="px-6 py-4">67.2%</td>
                          <td className="px-6 py-4">94.8%</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            Mixed (C_mixed)
                          </td>
                          <td className="px-6 py-4 text-yellow-400">
                            Suspicious
                          </td>
                          <td className="px-6 py-4">32.8%</td>
                          <td className="px-6 py-4">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 2: Mamba vs Transformer */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-bold text-white">
                    Table 2: Mamba vs Transformer Performance
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                      <thead className="text-xs text-gray-400 uppercase bg-white/5">
                        <tr>
                          <th className="px-6 py-3">Metric</th>
                          <th className="px-6 py-3">Transformer</th>
                          <th className="px-6 py-3">Mamba (Ours)</th>
                          <th className="px-6 py-3">Improvement</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            F1-Score
                          </td>
                          <td className="px-6 py-4">0.9996</td>
                          <td className="px-6 py-4 text-neon-green font-bold">
                            0.9998
                          </td>
                          <td className="px-6 py-4 text-green-400">+0.02%</td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            Throughput
                          </td>
                          <td className="px-6 py-4">~1,900 samples/s</td>
                          <td className="px-6 py-4 text-neon-blue font-bold">
                            19,980 samples/s
                          </td>
                          <td className="px-6 py-4 text-neon-blue font-bold">
                            10x
                          </td>
                        </tr>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            VRAM Usage
                          </td>
                          <td className="px-6 py-4">9.0 GB</td>
                          <td className="px-6 py-4 text-neon-purple font-bold">
                            4.8 GB
                          </td>
                          <td className="px-6 py-4 text-neon-purple font-bold">
                            -47%
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            Convergence
                          </td>
                          <td className="px-6 py-4">Slow (0.09 Loss)</td>
                          <td className="px-6 py-4 text-white font-bold">
                            Fast (0.015 Loss)
                          </td>
                          <td className="px-6 py-4 text-white font-bold">6x</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Table 3: System Latency */}
                <div className="overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-bold text-white">
                    Table 3: System Latency & Speedup (Batch 64, FP32)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-300">
                      <thead className="text-xs text-gray-400 uppercase bg-white/5">
                        <tr>
                          <th className="px-6 py-3">Method</th>
                          <th className="px-6 py-3">Stage 1 (ms)</th>
                          <th className="px-6 py-3">Stage 2 (ms)</th>
                          <th className="px-6 py-3">Total (ms)</th>
                          <th className="px-6 py-3">Speedup</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-white/5 hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            One-Stage (Transformer)
                          </td>
                          <td className="px-6 py-4">-</td>
                          <td className="px-6 py-4">18.55</td>
                          <td className="px-6 py-4">18.59</td>
                          <td className="px-6 py-4">1.0x</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="px-6 py-4 font-medium text-white">
                            Two-Stage (Ours)
                          </td>
                          <td className="px-6 py-4">0.037</td>
                          <td className="px-6 py-4">0.354</td>
                          <td className="px-6 py-4 text-neon-blue font-bold">
                            0.427
                          </td>
                          <td className="px-6 py-4 text-neon-blue font-bold">
                            43.5x
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>
            {/* References */}
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <span className="w-1 h-8 bg-gray-500 rounded-full" /> References
              </h2>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex gap-2">
                  <span className="text-neon-blue">[1]</span>
                  <p>
                    Nexusguard, “DDoS Trend Report 2024,” Nexusguard, 2024.
                    [Online]. Available:{" "}
                    <a
                      href="https://www.nexusguard.com/threat-report/ddos-trend-report-2024"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-blue hover:underline"
                    >
                      https://www.nexusguard.com/threat-report/ddos-trend-report-2024
                    </a>
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon-blue">[2]</span>
                  <p>
                    Cloudflare, “DDoS Threat Report: Q3 2024,” Cloudflare, Oct.
                    2024. [Online]. Available:{" "}
                    <a
                      href="https://radar.cloudflare.com/reports/ddos-2024-q3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neon-blue hover:underline"
                    >
                      https://radar.cloudflare.com/reports/ddos-2024-q3
                    </a>
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon-blue">[3]</span>
                  <p>
                    K.-S. Yu, S.-H. Kim, D.-W. Lim, and Y.-S. Kim, “A Multiple
                    Rényi Entropy based Intrusion Detection System for Connected
                    Vehicles,” Entropy, vol. 22, no. 2, p. 186, Feb. 2020.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar & Animation */}
          <div className="lg:col-span-1 space-y-8">
            <div className="sticky top-24">
              <h3 className="text-xl font-bold text-white mb-4">Mamba Core</h3>
              <MambaArchitecture />

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border border-white/10">
                <h4 className="font-bold text-white mb-4">Why Mamba?</h4>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex gap-2">
                    <span className="text-neon-blue">✓</span> Linear-time
                    inference O(N)
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neon-blue">✓</span> 5.5x faster than
                    Transformer
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neon-blue">✓</span> 50% less memory
                    usage
                  </li>
                  <li className="flex gap-2">
                    <span className="text-neon-blue">✓</span> Handles long
                    sequences efficiently
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-bold text-white mb-4">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python",
                    "PyTorch",
                    "Mamba-SSM",
                    "CUDA",
                    "Scikit-learn",
                    "PSO",
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
