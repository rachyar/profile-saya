// src/components/SplashScreen.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

type SplashScreenProps = {
  onEnter: () => void;
};

export default function SplashScreen({ onEnter }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key="splash"
      className="flex flex-col items-center justify-center w-full min-h-screen px-4 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
    >
      {/* Animated Background Circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 200 + i * 150,
            height: 200 + i * 150,
            background: `radial-gradient(circle, ${
              i === 0 ? "rgba(139, 92, 246, 0.1)" : 
              i === 1 ? "rgba(59, 130, 246, 0.1)" : 
              "rgba(236, 72, 153, 0.1)"
            }, transparent)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Profile Picture Container */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 20,
          delay: 0.2,
        }}
      >
        {/* Rotating Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            background: "conic-gradient(from 0deg, #8b5cf6, #3b82f6, #ec4899, #8b5cf6)",
            padding: "4px",
            filter: "blur(8px)",
          }}
        />

        {/* Pulsing Glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.5) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        {/* Profile Image */}
        <motion.div
          className="relative w-40 h-40 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.05 }}
        >
          <Image
            src="/profile.jpg"
            alt="Profile Picture"
            width={160}
            height={160}
            className="object-cover"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Name with Gradient Animation */}
      <motion.h1
        className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{ 
          opacity: { delay: 0.5, duration: 0.7 },
          y: { delay: 0.5, duration: 0.7 },
          backgroundPosition: { duration: 5, repeat: Infinity, ease: "linear" },
        }}
        style={{ backgroundSize: "200% 200%" }}
      >
        Rifqi Achyar
      </motion.h1>

      {/* Subtitle with Typewriter Effect */}
      <motion.p
        className="text-gray-600 dark:text-gray-400 mb-8 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7 }}
      >
        Web & Software Developer
      </motion.p>

      {/* Progress Bar */}
      <motion.div
        className="w-64 mb-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="relative h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Progress Fill */}
          <motion.div
            className="h-full bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        <motion.p
          className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Loading... {progress}%
        </motion.p>
      </motion.div>

      {/* Enter Button */}
      <motion.button
        className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-2xl relative overflow-hidden group"
        onClick={onEnter}
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0.5,
          y: 0,
          scale: isLoaded ? [1, 1.05, 1] : 1,
        }}
        transition={{ 
          opacity: { delay: 0.8, duration: 0.7 },
          y: { delay: 0.8, duration: 0.7 },
          scale: { duration: 1.5, repeat: Infinity },
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        disabled={!isLoaded}
      >
        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Button Text */}
        <span className="relative z-10 flex items-center gap-2">
          {isLoaded ? "Enter Portfolio" : "Loading..."}
          {isLoaded && (
            <motion.span
              initial={{ x: 0 }}
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              →
            </motion.span>
          )}
        </span>

        {/* Ripple Effect on Click */}
        <motion.div
          className="absolute inset-0 bg-white rounded-full"
          initial={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </motion.button>

      {/* Floating Particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-purple-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}