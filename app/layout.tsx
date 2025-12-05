import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Lai Lab | Futuristic AI & Robotics Research",
  description:
    "Personal research website of Lai Hong-Wei, focusing on Mamba, AI, Robotics, and HPC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden selection:bg-neon-blue selection:text-black`}
      >
        {children}
      </body>
    </html>
  );
}
