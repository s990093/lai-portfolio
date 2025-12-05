"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import SectionTitle from "@/components/shared/SectionTitle";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Cpu, Zap, Layers, Terminal, BarChart3 } from "lucide-react";
import Link from "next/link";
import "katex/dist/katex.min.css";
import { BlockMath, InlineMath } from "react-katex";
import ProjectImage from "@/components/projects/ProjectImage";

export default function EmbeddedSequenceModelingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-neon-blue selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black/90 to-background z-0" />

        <div className="container mx-auto relative z-10">
          <Link href="/">
            <Button
              variant="ghost"
              className="mb-8 hover:text-neon-blue group pl-0"
            >
              <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap gap-2 mb-6">
              {["Embedded AI", "CUDA", "NVIDIA Jetson", "Mamba"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-mono border border-neon-blue/30 text-neon-blue bg-neon-blue/5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Embedded Sequence Modeling: <br />
              <span className="text-neon-blue">Mamba on Jetson</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              Porting and optimizing the Mamba state-space model for NVIDIA
              Jetson embedded platforms. Achieved{" "}
              <span className="text-white font-bold">4x speedup</span> over
              Transformers and further{" "}
              <span className="text-white font-bold">2x acceleration</span>{" "}
              using custom Chebyshev polynomial CUDA kernels.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Main Content */}
          <div className="lg:col-span-2 space-y-16">
            {/* Project Overview */}
            <section>
              <SectionTitle title="01. Overview & Motivation" />
              <AnimatedContainer className="prose prose-invert max-w-none text-gray-300">
                <p>
                  The Mamba model, a novel State Space Model (SSM), offers
                  linear time complexity <InlineMath math="O(n)" /> for sequence
                  modeling, addressing the quadratic bottleneck{" "}
                  <InlineMath math="O(n^2)" /> of Transformers. This project
                  focuses on porting Mamba to the ARM-based NVIDIA Jetson
                  platform and optimizing it for edge computing.
                </p>
                <p>
                  By leveraging HiPPO (High-order Polynomial Projection
                  Operators) theory and selective state spaces, Mamba compresses
                  history into a fixed-size state vector, enabling efficient
                  long-sequence processing with minimal memory footprint.
                </p>
                <div className="my-8 p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Core State Space Equation
                  </h3>
                  <BlockMath math="x'(t) = Ax(t) + Bu(t)" />
                  <BlockMath math="y(t) = Cx(t) + Du(t)" />
                  <p className="text-sm text-gray-400 mt-4 text-center">
                    Where <InlineMath math="A, B, C, D" /> are learnable
                    parameters governing the state evolution.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mt-8">
                  <ProjectImage
                    src="/projects/embedded-sequence-modeling/image-7.png"
                    alt="HiPPO Matrix Visualization"
                    caption="Figure 1: HiPPO Matrix Visualization"
                    description="HiPPO projects historical inputs into a state vector using polynomial approximation, enabling linear-time processing while retaining long-term memory."
                  />
                  <ProjectImage
                    src="/projects/embedded-sequence-modeling/image-6.png"
                    alt="Mamba vs Transformer Comparison"
                    caption="Figure 2: Mamba vs. Transformer Performance"
                    description="Mamba (green) demonstrates superior efficiency, achieving 15x lower latency and 14x memory savings compared to Transformers (orange) on comparable tasks."
                  />
                </div>
              </AnimatedContainer>
            </section>

            {/* Implementation: Mamba on Jetson */}
            <section>
              <SectionTitle title="02. Mamba on Jetson" />
              <AnimatedContainer className="space-y-6">
                <p className="text-gray-300">
                  The official Mamba implementation relies on x86-optimized CUDA
                  kernels that are incompatible with Jetson's ARM64
                  architecture. We developed a cross-platform deployment
                  pipeline:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white/5 rounded-lg border border-neon-blue/20">
                    <div className="mb-3 text-neon-blue">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-white mb-2">
                      Custom CUDA Extension
                    </h4>
                    <p className="text-sm text-gray-400">
                      Built using PyTorch C++ extension and setuptools to
                      compile kernels as dynamic libraries.
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-neon-blue/20">
                    <div className="mb-3 text-neon-blue">
                      <Cpu className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-white mb-2">
                      Targeted Compilation
                    </h4>
                    <p className="text-sm text-gray-400">
                      configured for <code>compute_87</code> (Orin) architecture
                      to ensure efficient machine code generation.
                    </p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg border border-neon-blue/20">
                    <div className="mb-3 text-neon-blue">
                      <Zap className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-white mb-2">
                      Ninja Build System
                    </h4>
                    <p className="text-sm text-gray-400">
                      Enabled parallel compilation with Ninja to significantly
                      reduce build times on the embedded CPU.
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <ProjectImage
                    src="/projects/embedded-sequence-modeling/image-5.png"
                    alt="Mamba vs Transformer Inference Speed"
                    caption="Figure 3: Inference Speed on Jetson"
                    description="On the Jetson Nano, our Mamba implementation achieves ~4x faster inference than Transformers with a significantly lower memory footprint, validating its suitability for edge AI."
                  />
                </div>
              </AnimatedContainer>
            </section>

            {/* Optimization: Chebyshev Self-Attention */}
            <section>
              <SectionTitle title="03. Chebyshev Self-Attention (ViT)" />
              <AnimatedContainer className="space-y-6">
                <p className="text-gray-300">
                  Before applying optimizations to Mamba, we first explored{" "}
                  <strong>Chebyshev polynomial approximation</strong> on Vision
                  Transformers (ViT) to reduce the quadratic complexity of
                  Self-Attention.
                </p>
                <div className="my-8 p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-lg font-bold text-white mb-4">
                    Standard Self-Attention
                  </h3>
                  <BlockMath math="A = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)" />
                  <p className="text-sm text-gray-400 mt-4">
                    The dot product <InlineMath math="QK^T" /> is
                    computationally expensive. We proposed replacing it with a
                    polynomial approximation <InlineMath math="T_n(x)" /> to
                    bypass large matrix multiplications.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <ProjectImage
                    src="/projects/embedded-sequence-modeling/image-3.png"
                    alt="Self-Attention vs Chebyshev"
                    caption="Figure 5: Heatmap Comparison"
                    description="Comparison of attention maps: Standard Self-Attention (Left) vs. Chebyshev Approximation (Right). The approximation successfully retains key structural features."
                  />
                  <ProjectImage
                    src="/projects/embedded-sequence-modeling/image-1.png"
                    alt="Self-Attention Multi-head"
                    caption="Figure 6: Standard Multi-head Attention"
                    description="Visualization of standard multi-head attention patterns, showing diverse feature focus across different heads."
                  />
                  <div className="md:col-span-2">
                    <ProjectImage
                      src="/projects/embedded-sequence-modeling/image-2.png"
                      alt="Chebyshev Multi-head"
                      caption="Figure 7: Chebyshev Multi-head Approximation"
                      description="Chebyshev approximation successfully captures diverse feature relationships similar to standard attention, proving its viability as a lightweight alternative."
                    />
                  </div>
                </div>
              </AnimatedContainer>
            </section>

            {/* Optimization: Chebyshev Mamba */}
            <section>
              <SectionTitle title="04. Chebyshev Mamba Optimization" />
              <AnimatedContainer className="space-y-6">
                <p className="text-gray-300">
                  To further accelerate inference, we approximated the core
                  recursive computation using Chebyshev polynomials. This
                  approach replaces complex dot products with efficient
                  polynomial recurrence, suitable for GPU parallelization.
                </p>
                <div className="bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 font-mono text-sm">
                  <div className="text-gray-500 mb-2">
                    // Chebyshev Recurrence Relation
                  </div>
                  <BlockMath math="T_0(x) = 1" />
                  <BlockMath math="T_1(x) = x" />
                  <BlockMath math="T_{n+1}(x) = 2xT_n(x) - T_{n-1}(x)" />
                </div>
                <p className="text-gray-300">
                  We implemented a custom kernel{" "}
                  <code>CUDA-ChebyshevMambaBlock</code> that maps this
                  recurrence to GPU threads, achieving a{" "}
                  <strong>2x speedup</strong> over the standard Mamba CUDA
                  kernel.
                </p>
                <div className="mt-8">
                  <ProjectImage
                    src="/projects/embedded-sequence-modeling/image-4.png"
                    alt="Kernel Speed Comparison"
                    caption="Figure 4: Kernel Performance"
                    description="Our custom CUDA-ChebyshevMambaBlock (CM-CUDA) outperforms standard Mamba CUDA kernels by 2x and CPU implementations by orders of magnitude."
                  />
                </div>
              </AnimatedContainer>
            </section>

            {/* Experimental Results */}
            <section>
              <SectionTitle title="05. Experimental Results" />
              <div className="space-y-8">
                {/* Table 0: CSA vs BSA */}
                <AnimatedContainer>
                  <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-bold text-white flex justify-between items-center">
                      <span>
                        Chebyshev Self-Attention vs. Baseline (CIFAR-10)
                      </span>
                      <BarChart3 className="w-4 h-4 text-neon-blue" />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-white/5">
                          <tr>
                            <th className="px-6 py-3">Metric</th>
                            <th className="px-6 py-3">
                              Basic Self-Attention (BSA)
                            </th>
                            <th className="px-6 py-3">Chebyshev SA (CSA)</th>
                            <th className="px-6 py-3">Impact</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">
                              Accuracy
                            </td>
                            <td className="px-6 py-4">86.38%</td>
                            <td className="px-6 py-4 text-white">83.48%</td>
                            <td className="px-6 py-4 text-yellow-400">-2.9%</td>
                          </tr>
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">
                              Total Train Time
                            </td>
                            <td className="px-6 py-4">4568.60 s</td>
                            <td className="px-6 py-4 text-neon-green">
                              4387.34 s
                            </td>
                            <td className="px-6 py-4 text-neon-green font-bold">
                              ~4% Faster
                            </td>
                          </tr>
                          <tr className="hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">
                              Inference Time
                            </td>
                            <td className="px-6 py-4">3.04 s</td>
                            <td className="px-6 py-4 text-neon-blue">2.79 s</td>
                            <td className="px-6 py-4 text-neon-blue font-bold">
                              ~8% Faster
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </AnimatedContainer>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProjectImage
                    src="/projects/embedded-sequence-modeling/image-9.png"
                    alt="Model Accuracy Comparison"
                    caption="Figure 8: Accuracy Comparison"
                    description="Mamba achieves higher final accuracy (76.83%) compared to the Transformer baseline (42.83%) on CIFAR-10, demonstrating superior learning capability."
                  />
                  <ProjectImage
                    src="/projects/embedded-sequence-modeling/image-8.png"
                    alt="Model Loss Comparison"
                    caption="Figure 9: Training Loss"
                    description="Mamba demonstrates faster convergence and lower final loss compared to Transformers, indicating more efficient training dynamics."
                  />
                </div>

                {/* Table 1: Mamba vs Transformer */}
                <AnimatedContainer>
                  <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-bold text-white flex justify-between items-center">
                      <span>
                        Mamba vs. Transformer (CIFAR-10 on Jetson Nano)
                      </span>
                      <BarChart3 className="w-4 h-4 text-neon-blue" />
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
                              Training Time
                            </td>
                            <td className="px-6 py-4">260.68 s</td>
                            <td className="px-6 py-4 text-neon-green">
                              58.29 s
                            </td>
                            <td className="px-6 py-4 text-neon-green font-bold">
                              4.5x Faster
                            </td>
                          </tr>
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">
                              Inference Latency
                            </td>
                            <td className="px-6 py-4">25.45 ms</td>
                            <td className="px-6 py-4 text-neon-blue">
                              7.61 ms
                            </td>
                            <td className="px-6 py-4 text-neon-blue font-bold">
                              3.3x Faster
                            </td>
                          </tr>
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">
                              Memory Usage
                            </td>
                            <td className="px-6 py-4">283.0 MB</td>
                            <td className="px-6 py-4 text-neon-purple">
                              65.0 MB
                            </td>
                            <td className="px-6 py-4 text-neon-purple font-bold">
                              4.4x Lower
                            </td>
                          </tr>
                          <tr className="hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">
                              Accuracy
                            </td>
                            <td className="px-6 py-4">42.83%</td>
                            <td className="px-6 py-4 text-white">76.83%</td>
                            <td className="px-6 py-4 text-white font-bold">
                              +34%
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </AnimatedContainer>

                {/* Table 2: Kernel Comparison */}
                <AnimatedContainer delay={0.2}>
                  <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="bg-white/5 px-6 py-3 border-b border-white/10 font-bold text-white flex justify-between items-center">
                      <span>Kernel Performance Comparison (Forward Pass)</span>
                      <Zap className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left text-gray-300">
                        <thead className="text-xs text-gray-400 uppercase bg-white/5">
                          <tr>
                            <th className="px-6 py-3">
                              Configuration (B, L, D)
                            </th>
                            <th className="px-6 py-3">M-CPU (ms)</th>
                            <th className="px-6 py-3">M-CUDA (ms)</th>
                            <th className="px-6 py-3">CM-CUDA (Ours)</th>
                            <th className="px-6 py-3">Speedup vs M-CUDA</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">
                              (32, 128, 64)
                            </td>
                            <td className="px-6 py-4">32.82</td>
                            <td className="px-6 py-4">25.30</td>
                            <td className="px-6 py-4 text-neon-yellow font-bold">
                              5.20
                            </td>
                            <td className="px-6 py-4 text-neon-yellow font-bold">
                              4.8x
                            </td>
                          </tr>
                          <tr className="border-b border-white/5 hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">
                              (64, 128, 64)
                            </td>
                            <td className="px-6 py-4">58.26</td>
                            <td className="px-6 py-4">39.78</td>
                            <td className="px-6 py-4 text-neon-yellow font-bold">
                              6.62
                            </td>
                            <td className="px-6 py-4 text-neon-yellow font-bold">
                              6.0x
                            </td>
                          </tr>
                          <tr className="hover:bg-white/5">
                            <td className="px-6 py-4 font-medium text-white">
                              (64, 256, 64)
                            </td>
                            <td className="px-6 py-4">162.32</td>
                            <td className="px-6 py-4">45.91</td>
                            <td className="px-6 py-4 text-neon-yellow font-bold">
                              12.14
                            </td>
                            <td className="px-6 py-4 text-neon-yellow font-bold">
                              3.8x
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="px-6 py-2 text-xs text-gray-500 bg-black/20">
                      * CM-CUDA: Chebyshev Mamba CUDA, M-CUDA: Standard Mamba
                      CUDA, M-CPU: Mamba CPU
                    </div>
                  </div>
                </AnimatedContainer>
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
                    A. Gu and T. Dao, “Mamba: Linear-time Sequence Modeling with
                    Selective State Spaces,” arXiv preprint arXiv:2312.00752,
                    v.2, 2024.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon-blue">[2]</span>
                  <p>
                    Dao, T. (2023). FlashAttention-2: Faster and
                    memory-efficient exact attention with IO-aware
                    parallelization. arXiv preprint arXiv:2307.08691.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="text-neon-blue">[3]</span>
                  <p>
                    Qi, Y., Ye, P., Han, X., Liu, K., Yang, W., & Li, Y. (2023).
                    SemSA: Semantic Sparse Attention for Large Language Models.
                    ICLR.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <div className="space-y-8">
            <div className="sticky top-32 space-y-8">
              {/* Tech Stack */}
              <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-neon-blue" /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "PyTorch",
                    "CUDA C++",
                    "NVIDIA Jetson",
                    "Ninja Build",
                    "Python",
                    "Chebyshev Approx",
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Achievement */}
              <div className="bg-gradient-to-br from-neon-blue/10 to-purple-500/10 border border-neon-blue/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  Performance Breakthrough
                </h3>
                <div className="text-3xl font-bold text-neon-blue mb-1">
                  6x Speedup
                </div>
                <p className="text-sm text-gray-400">
                  Combined Mamba architecture with custom Chebyshev CUDA kernels
                  on Jetson Nano.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
