// src/components/AnimatedBackground.tsx (HIGHLY OPTIMIZED)
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      {/* Static Gradient Base */}
      <div 
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/90 dark:bg-gray-950/90" />

      {/* Simplified Animated Blobs - ONLY 2 */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-15 dark:opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 80, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-15 dark:opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -80, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}