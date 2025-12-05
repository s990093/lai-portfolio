"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import MambaWaveBackground from "@/components/shared/MambaWaveBackground";
import SimdGridOverlay from "@/components/shared/SimdGridOverlay";
import SectionTitle from "@/components/shared/SectionTitle";
import AnimatedContainer from "@/components/shared/AnimatedContainer";
import SkillTag from "@/components/shared/SkillTag";
import ProjectCard from "@/components/shared/ProjectCard";
import ExperienceCard from "@/components/shared/ExperienceCard";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Home() {
  const skills = {
    ai: [
      "Mamba",
      "Transformer",
      "YOLO",
      "RT-DETR",
      "PyTorch",
      "Diffusion",
      "Anomaly Detection",
    ],
    systems: ["CUDA", "AVX-512", "OpenMP", "NUMA", "C++", "Jetson Nano"],
    robotics: [
      "PyBullet",
      "Gym",
      "RL",
      "Embedded AIoT",
      "ROS",
      "Drone Control",
    ],
    web: ["Next.js", "React", "Docker", "FastAPI", "Flutter", "Node.js", "iOS"],
  };

  const projects = [
    {
      title: "DDoS Attack Detection (IEEE GCCE 2025)",
      description:
        "An Efficient DDoS-Attack Detection System based on Multi-Entropy Clustering and the Mamba Model. Achieved 5.5x speedup vs Transformer and reduced memory by 2/3.",
      tags: ["Research", "Mamba", "Security", "Paper"],
      className: "md:col-span-2 md:row-span-2", // Featured
      images: ["/ddos-architecture.png", "/project2.png", "/project3.png"],
      href: "/projects/ddos-detection",
    },
    {
      title: "Efficient DDoS Acceleration",
      description:
        "A CPU-based sliding window entropy acceleration system using AVX-512 vectorization and Taylor series approximation. Achieved 406x speedup.",
      tags: ["HPC", "AVX-512", "C++", "Optimization"],
      className: "md:col-span-1 md:row-span-1",
      images: ["/project3.png"],
      href: "/projects/ddos-acceleration",
    },
    {
      title: "Embedded Sequence Modeling",
      description:
        "Ported Mamba to NVIDIA Jetson. Optimized CUDA kernels & Chebyshev polynomial approximation for 2x speedup in Vision Transformers.",
      tags: ["Embedded", "CUDA", "Jetson", "AIoT"],
      className: "md:col-span-1 md:row-span-1",
      images: ["/project3.png", "/project1.png"],
      href: "/projects/embedded-sequence-modeling",
    },
    {
      title: "Kumamoto Hackathon: Delivery Stabilizer",
      description:
        "Excellence Prize winner. 4-axis stabilizer for motorcycle delivery boxes with sensor integration and real-time App control.",
      tags: ["IoT", "Embedded", "Hackathon", "Japan"],
      className: "md:col-span-2 md:row-span-1", // Wide
      images: ["/project1.png", "/project2.png"],
    },
    {
      title: "Fish Recognition System",
      description:
        "High-performance fish recognition using RT-DETR. Improved precision by 18.31% compared to YOLO.",
      tags: ["CV", "RT-DETR", "YOLO", "AI"],
      className: "md:col-span-1",
      images: ["/project2.png"],
    },
    {
      title: "Smart News Clustering",
      description:
        "Multi-layer attention mechanism (BERT + MLP) for news clustering. Best Silhouette Score 0.6339.",
      tags: ["NLP", "BERT", "Web"],
      className: "md:col-span-1",
      images: ["/project3.png"],
    },
    {
      title: "Quant Trading Strategy",
      description:
        "PSO optimized multi-indicator weighting + Random Forest classifier. Backtested on TSMC (2013-2023) with +4086% profit factor.",
      tags: ["FinTech", "ML", "AlgoTrading"],
      className: "md:col-span-1",
      images: ["/project1.png"],
    },
    {
      title: "Music Platform (Team Leader)",
      description:
        "Led a 10-person team to build a complete music platform. Handled backend, iOS App integration, and system deployment.",
      tags: ["Leadership", "Full Stack", "iOS", "Backend"],
      className: "md:col-span-1",
      images: ["/project2.png", "/project3.png"],
    },
    {
      title: "Campus Food App",
      description:
        "Flutter-based campus food delivery app with multi-language support and real-time collaboration.",
      tags: ["Flutter", "App", "UI/UX"],
      className: "md:col-span-1",
      images: ["/project3.png", "/project1.png"],
    },
    {
      title: "Hiking Rescue Device",
      description:
        "Low-power multi-node rescue device for hikers. Real-time data transmission and display.",
      tags: ["IoT", "Low Power", "Embedded"],
      className: "md:col-span-1",
      images: ["/project1.png", "/project2.png"],
    },
    {
      title: "Offshore Wind Interactive Aid",
      description:
        "Interactive teaching aid for sustainable energy education. Hardware design and frontend development.",
      tags: ["EdTech", "Hardware", "Frontend"],
      className: "md:col-span-1",
      images: ["/project2.png"],
    },
    {
      title: "Smart Campus Cooling System",
      description:
        "IoT-based cooling system combining crowd detection and automatic misting.",
      tags: ["AI", "IoT", "Full Stack"],
      className: "md:col-span-1",
      images: ["/project3.png"],
    },
  ];

  const experiences = [
    {
      role: "IEEE GCCE 2025 Presenter",
      desc: "Presented 'An Efficient DDoS-Attack Detection System based on Multi-Entropy Clustering and the Mamba Model' in Osaka.",
      year: "2025",
      className: "md:col-span-2",
      image: "/project1.png",
    },
    {
      role: "NSTC Research Grant",
      desc: "Recipient of National Science and Technology Council grant for Mamba-based DDoS detection research.",
      year: "2024",
      className: "md:col-span-1",
    },
    {
      role: "Speaker @ GDG Kaohsiung",
      desc: "Shared Mamba architecture principles and demonstrated live on Jetson.",
      year: "2024",
      className: "md:col-span-1",
      image: "/project2.png",
    },
    {
      role: "Kumamoto Hackathon Winner",
      desc: "Excellence Prize. International cross-cultural collaboration in Japan.",
      year: "2023",
      className: "md:col-span-1",
      image: "/project3.png",
    },
    {
      role: "Portland State University",
      desc: "Young Overseas 10 Billion Program. Exchange student in USA.",
      year: "2023",
      className: "md:col-span-1",
    },
    {
      role: "Fukuoka Institute of Technology",
      desc: "Dream Building Program. Exchange student in Japan.",
      year: "2023",
      className: "md:col-span-1",
    },
    {
      role: "Research Intern (MOEA)",
      desc: "Industry-Academia-Research Engineering Talent Practical Ability Excellence Base Plan.",
      year: "2024",
      className: "md:col-span-1",
    },
    {
      role: "Intern (MOL)",
      desc: "New Sprout Plan participant.",
      year: "2022",
      className: "md:col-span-1",
    },
    {
      role: "Teaching Assistant",
      desc: "Information Theory & Information Security courses at NKUST.",
      year: "2023-24",
      className: "md:col-span-1",
    },
    {
      role: "NKUST Hackathon Champion",
      desc: "2x Champion, 1x Runner-up in CS Department Hackathons.",
      year: "2022-24",
      className: "md:col-span-1",
    },
    {
      role: "Vocational Cup Hackathon",
      desc: "National 6th Place & 2x Southern Region Honorable Mention.",
      year: "2023",
      className: "md:col-span-1",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-neon-blue selection:text-black">
      <MambaWaveBackground />
      <SimdGridOverlay />
      <Navbar />

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 overflow-hidden"
      >
        {/* Neon Line Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[500px] bg-gradient-to-r from-transparent via-neon-blue/20 to-transparent rotate-45 blur-3xl opacity-20 pointer-events-none animate-pulse-slow"></div>

        <AnimatedContainer className="text-center z-10 max-w-4xl relative">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="mb-6 inline-block px-4 py-1.5 rounded-full border border-neon-blue/30 bg-neon-blue/10 text-neon-blue text-sm font-mono"
          >
            System.init(Lai_Lab)
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight relative">
            <span className="text-white">Lai</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
              Hong-Wei
            </span>
            {/* Subtle text glow */}
            <div className="absolute inset-0 blur-2xl bg-neon-blue/20 opacity-50 -z-10"></div>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 font-light max-w-2xl mx-auto">
            Futuristic AI / Robotics / HPC Research
          </p>
          <p className="text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
            Student at <strong className="text-gray-300">NKUST</strong>.
            Specializing in <strong className="text-neon-blue">Mamba</strong>{" "}
            sequence modeling,{" "}
            <strong className="text-neon-purple">DDoS detection</strong>, and{" "}
            <strong className="text-neon-green">HPC acceleration</strong>.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="neon"
              size="lg"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 hover:bg-white/10"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact Me
            </Button>
          </div>
        </AnimatedContainer>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <SectionTitle title="About Me" subtitle="Researcher & Developer" />
          <AnimatedContainer
            delay={0.2}
            className="max-w-3xl mx-auto text-gray-300 leading-relaxed text-lg text-center font-light"
          >
            <p className="mb-6">
              I am a Computer Science student at{" "}
              <span className="text-neon-blue">
                National Kaohsiung University of Science and Technology (NKUST)
              </span>
              . My passion lies in bridging the gap between theoretical AI and
              practical system implementation.
            </p>
            <p className="mb-6">
              My core research focuses on{" "}
              <strong className="text-white">
                Efficient Sequence Modeling (Mamba)
              </strong>{" "}
              and <strong className="text-white">Network Security</strong>. I
              have presented my work on DDoS detection at{" "}
              <strong className="text-neon-purple">IEEE GCCE 2025</strong> in
              Osaka.
            </p>
            <p className="mb-6">
              I have extensive international experience, including programs at{" "}
              <span className="text-white">
                Portland State University (USA)
              </span>
              ,{" "}
              <span className="text-white">
                Fukuoka Institute of Technology (Japan)
              </span>
              , and winning the Excellence Prize at the{" "}
              <span className="text-white">Kumamoto University Hackathon</span>.
            </p>
          </AnimatedContainer>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 relative z-10 bg-black/20">
        <div className="container mx-auto px-6">
          <SectionTitle title="Experience" subtitle="Journey & Achievements" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {experiences.map((exp, i) => (
              <AnimatedContainer
                key={i}
                delay={i * 0.05}
                className={exp.className || "md:col-span-1"}
              >
                <ExperienceCard {...exp} />
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative z-10">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Technical Arsenal"
            subtitle="Core Competencies"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <AnimatedContainer delay={0.1}>
              <h3 className="text-xl font-mono text-neon-blue mb-6 border-b border-neon-blue/20 pb-2">
                AI / Deep Learning
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.ai.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.2}>
              <h3 className="text-xl font-mono text-neon-purple mb-6 border-b border-neon-purple/20 pb-2">
                Systems / HPC
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.systems.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.3}>
              <h3 className="text-xl font-mono text-neon-green mb-6 border-b border-neon-green/20 pb-2">
                Robotics / IoT
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.robotics.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </AnimatedContainer>

            <AnimatedContainer delay={0.4}>
              <h3 className="text-xl font-mono text-white mb-6 border-b border-white/20 pb-2">
                Web / Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {skills.web.map((s) => (
                  <SkillTag key={s} name={s} />
                ))}
              </div>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 relative z-10 bg-black/20">
        <div className="container mx-auto px-6">
          <SectionTitle
            title="Selected Projects"
            subtitle="Innovation & Implementation"
          />

          {/* Irregular Grid (Bento Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-auto gap-6 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <AnimatedContainer
                key={index}
                delay={index * 0.05}
                className={project.className}
              >
                <ProjectCard {...project} />
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative z-10">
        <div className="container mx-auto px-6 text-center">
          <SectionTitle
            title="Initialize Connection"
            subtitle="Let's Collaborate"
          />

          <AnimatedContainer className="flex flex-col items-center gap-8">
            <p className="text-gray-400 max-w-xl">
              Interested in Mamba, HPC, or Robotics? Feel free to reach out for
              collaborations or just a tech chat.
            </p>

            <div className="flex gap-6">
              <a
                href="mailto:contact@lailab.dev"
                className="p-4 rounded-full bg-white/5 hover:bg-neon-blue/20 border border-white/10 hover:border-neon-blue/50 transition-all group"
              >
                <Mail className="w-6 h-6 text-gray-300 group-hover:text-neon-blue" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/5 hover:bg-neon-purple/20 border border-white/10 hover:border-neon-purple/50 transition-all group"
              >
                <Github className="w-6 h-6 text-gray-300 group-hover:text-neon-purple" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/5 hover:bg-neon-blue/20 border border-white/10 hover:border-neon-blue/50 transition-all group"
              >
                <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-neon-blue" />
              </a>
            </div>

            <div className="mt-12 p-8 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-sm max-w-2xl w-full">
              <form className="flex flex-col gap-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue focus:outline-none transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue focus:outline-none transition-colors"
                  />
                </div>
                <textarea
                  placeholder="Message"
                  rows={4}
                  className="bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:border-neon-blue focus:outline-none transition-colors"
                ></textarea>
                <Button variant="neon" className="w-full md:w-auto self-end">
                  Send Transmission
                </Button>
              </form>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      <Footer />
    </main>
  );
}
