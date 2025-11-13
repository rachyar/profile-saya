// src/components/Hero.tsx
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.2]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden mt-16 mb-24"
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)",
            "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(139, 92, 246, 0.3) 100%)",
            "linear-gradient(135deg, rgba(236, 72, 153, 0.3) 0%, rgba(59, 130, 246, 0.3) 100%)",
            "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.3) 100%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Main Image with Parallax */}
      <motion.div
        style={{ scale, opacity }}
        className="relative w-full h-full"
      >
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-contain object-center"
          priority
        />
      </motion.div>

      {/* Overlay dengan Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950 z-10" />

      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Light Streaks */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`streak-${i}`}
          className="absolute w-1 h-24 bg-gradient-to-b from-white/50 to-transparent"
          style={{
            left: `${30 + i * 20}%`,
            top: "-10%",
          }}
          animate={{
            y: ["0%", "150%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeIn",
          }}
        />
      ))}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: [0.5, 1, 0.5],
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center p-2">
          <motion.div
            className="w-1 h-2 bg-gray-400 dark:bg-gray-600 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}