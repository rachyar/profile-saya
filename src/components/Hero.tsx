// src/components/Hero.tsx (OPTIMIZED)
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative w-full h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden mt-16 mb-24"
    >
      {/* Simplified Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)",
        }}
      />

      {/* Main Image with Parallax */}
      <motion.div
        style={{ opacity }}
        className="relative w-full h-full"
      >
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-contain object-center"
          priority
          quality={75}
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay dengan Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-gray-950 z-10" />

      {/* Simplified Floating Elements - REDUCED */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full"
          style={{
            left: `${20 + i * 25}%`,
            top: `${30 + i * 10}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
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