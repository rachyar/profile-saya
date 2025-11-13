// src/components/SkillSection.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const skills = [
  { name: "HTML", level: 95, color: "from-orange-500 to-red-500" },
  { name: "CSS", level: 90, color: "from-blue-500 to-cyan-500" },
  { name: "JavaScript", level: 88, color: "from-yellow-500 to-amber-500" },
  { name: "React", level: 85, color: "from-cyan-500 to-blue-500" },
  { name: "Next.js", level: 82, color: "from-gray-800 to-gray-600" },
  { name: "Tailwind", level: 90, color: "from-teal-500 to-cyan-500" },
  { name: "Framer Motion", level: 75, color: "from-pink-500 to-purple-500" },
  { name: "Git", level: 80, color: "from-red-600 to-orange-600" },
  { name: "Laravel", level: 78, color: "from-red-500 to-pink-500" },
  { name: "PHP Native", level: 85, color: "from-indigo-500 to-purple-500" },
];

export default function SkillSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="max-w-5xl mt-32 px-6">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Technical Skills
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="relative group"
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
            onHoverStart={() => setHoveredSkill(skill.name)}
            onHoverEnd={() => setHoveredSkill(null)}
          >
            {/* Glow Effect Background */}
            <motion.div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, ${skill.color})`,
                filter: "blur(20px)",
              }}
            />

            {/* Card Container */}
            <motion.div
              className="relative p-6 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Animated Corner Accents */}
              <motion.div
                className="absolute top-0 left-0 w-20 h-20 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${skill.color})`,
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
                animate={{
                  scale: hoveredSkill === skill.name ? [1, 1.2, 1] : 1,
                }}
                transition={{ duration: 0.5 }}
              />

              {/* Skill Name */}
              <div className="flex justify-between items-center mb-3">
                <motion.h3
                  className="text-lg font-semibold"
                  animate={{
                    color: hoveredSkill === skill.name ? "#8b5cf6" : "inherit",
                  }}
                >
                  {skill.name}
                </motion.h3>
                <motion.span
                  className="text-sm font-bold text-purple-600 dark:text-purple-400"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: i * 0.1 + 0.3, type: "spring" }}
                >
                  {skill.level}%
                </motion.span>
              </div>

              {/* Progress Bar Background */}
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                {/* Animated Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
                  }}
                  animate={{
                    x: ["-100%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Progress Bar Fill */}
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative overflow-hidden`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{
                    delay: i * 0.1,
                    duration: 1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                >
                  {/* Animated Highlight */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </motion.div>
              </div>

              {/* Particle Effect on Hover */}
              {hoveredSkill === skill.name && (
                <>
                  {[...Array(5)].map((_, idx) => (
                    <motion.div
                      key={idx}
                      className="absolute w-1 h-1 rounded-full bg-purple-500"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        y: [0, -20],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                    />
                  ))}
                </>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Overall Skill Level Indicator */}
      <motion.div
        className="mt-12 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200 dark:border-purple-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="text-center">
          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400 mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Average Skill Level
          </motion.p>
          <motion.p
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
          >
            {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}