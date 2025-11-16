// src/components/AnimatedBackground.tsx (OPTIMIZED VERSION)
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// FIXED: Generate particles on client side only to avoid hydration error
const generateParticles = () => 
  Array.from({ length: 10 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
  }));

export default function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
  }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles(generateParticles());
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Static Base Background - No animation */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />

      {/* Overlay untuk blending mode */}
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-3xl" />

      {/* Animated Gradient Blobs - OPTIMIZED */}
      <div className="relative w-full h-full">
        {/* Blob 1 - Reduced blur */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-20 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, rgba(139, 92, 246, 0) 70%)",
            filter: "blur(60px)", // Reduced from 80px
          }}
          animate={{
            x: [0, 200, 0], // Reduced movement
            y: [0, 150, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 30, // Increased duration = slower = smoother
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 - Simplified */}
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0) 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -200, 0],
            y: [0, -100, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating Particles - REDUCED */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/30 dark:bg-white/15"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            willChange: "transform", // GPU acceleration hint
          }}
          animate={{
            y: [0, -80, 0], // Reduced movement
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* REMOVED: Grid lines, light beams, and animated rays - too heavy */}
    </div>
  );
}