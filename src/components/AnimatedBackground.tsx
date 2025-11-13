// src/components/AnimatedBackground.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
    }));
    setParticles(newParticles);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Base Background dengan Gradient Animasi */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Overlay untuk blending mode */}
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-950/90 backdrop-blur-3xl" />

      {/* Animated Gradient Blobs */}
      <div className="relative w-full h-full">
        {/* Blob 1 - Besar */}
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30 dark:opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.6) 0%, rgba(139, 92, 246, 0) 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 300, 0],
            y: [0, 200, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "easeInOut",
          }}
        />

        {/* Blob 2 - Medium */}
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-30 dark:opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, -250, 0],
            y: [0, -150, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "easeInOut",
            delay: 5,
          }}
        />

        {/* Blob 3 - Small */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full opacity-25 dark:opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(236, 72, 153, 0.6) 0%, rgba(236, 72, 153, 0) 70%)",
            filter: "blur(70px)",
          }}
          animate={{
            x: [-200, 200, -200],
            y: [-100, 100, -100],
            scale: [1, 1.4, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 20,
            ease: "easeInOut",
            delay: 10,
          }}
        />
      </div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-white/40 dark:bg-white/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Animated Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5">
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <motion.path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Light Beams - Garis Cahaya Bergerak */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`,
        }}
      />

      {/* Animated Light Rays */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute top-0 left-0 w-1 h-full origin-top"
          style={{
            left: `${20 * i}%`,
            background: "linear-gradient(to bottom, transparent, rgba(139, 92, 246, 0.3), transparent)",
            transform: `rotate(${i * 15}deg)`,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            scaleY: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}