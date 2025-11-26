// src/components/SkillSection.tsx (OPTIMIZED)
"use client";

import { motion } from "framer-motion";

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
  return (
    <section id="skills" className="max-w-5xl mt-32 px-6">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Technical Skills
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            className="relative group"
            initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Card Container */}
            <div className="relative p-6 rounded-xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              {/* Corner Accent */}
              <div
                className="absolute top-0 left-0 w-16 h-16 opacity-20 transition-opacity group-hover:opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${skill.color})`,
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
              />

              {/* Skill Name */}
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  {skill.name}
                </h3>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar Background */}
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                {/* Progress Bar Fill */}
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Overall Skill Level Indicator */}
      <motion.div
        className="mt-12 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200 dark:border-purple-800"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Average Skill Level
          </p>
          <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {Math.round(skills.reduce((acc, skill) => acc + skill.level, 0) / skills.length)}%
          </p>
        </div>
      </motion.div>
    </section>
  );
}