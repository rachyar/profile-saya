// src/components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { Code, Layers, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable and scalable code",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Layers,
    title: "Full Stack",
    description: "End-to-end development expertise",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Optimized for speed and efficiency",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Heart,
    title: "User Focused",
    description: "Creating delightful experiences",
    color: "from-red-500 to-pink-500",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="max-w-6xl text-center mt-32 px-6">
      {/* Title */}
      <motion.h2
        className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      {/* Main Description */}
      <motion.div
        className="relative mb-16 p-8 rounded-2xl bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-transparent rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-pink-500/20 to-transparent rounded-br-2xl" />

        {/* Text Content */}
        <motion.p
          className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          viewport={{ once: true }}
        >
          I am a <span className="font-bold text-purple-600 dark:text-purple-400">Web Developer</span> and{" "}
          <span className="font-bold text-pink-600 dark:text-pink-400">Software Developer</span> who focuses on
          developing web-based applications and software with an{" "}
          <span className="font-bold">end-to-end approach</span>: from Frontend to Backend.
        </motion.p>

        {/* Animated Line */}
        <motion.div
          className="h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mt-6"
          initial={{ width: 0 }}
          whileInView={{ width: "100%" }}
          transition={{ delay: 0.7, duration: 1 }}
          viewport={{ once: true }}
        />
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={feature.title}
            className="relative group"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Glow Effect */}
            <motion.div
              className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(135deg, ${feature.color})`,
                filter: "blur(20px)",
              }}
            />

            {/* Card */}
            <motion.div
              className="relative p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 h-full"
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Icon Container */}
              <motion.div
                className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <feature.icon className="text-white" size={32} />
              </motion.div>

              {/* Title */}
              <h3 className="text-lg font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>

              {/* Decorative Elements */}
              {[...Array(3)].map((_, idx) => (
                <motion.div
                  key={idx}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100"
                  style={{
                    top: `${20 + idx * 30}%`,
                    right: "10px",
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.3,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Quote Section */}
      <motion.div
        className="mt-16 relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        viewport={{ once: true }}
      >
        {/* Large Quote Mark */}
        <motion.div
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-8xl text-purple-200 dark:text-purple-900 opacity-50 font-serif"
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          viewport={{ once: true }}
        >
          &quot;
        </motion.div>

        <motion.blockquote
          className="relative text-xl italic text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Code is like humor. When you have to explain it, it&apos;s bad.
        </motion.blockquote>


        <motion.p
          className="text-sm text-gray-500 dark:text-gray-500 mt-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          viewport={{ once: true }}
        >
          — Cory House
        </motion.p>
      </motion.div>
    </section>
  );
}