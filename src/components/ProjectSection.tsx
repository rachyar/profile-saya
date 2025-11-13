// src/components/ProjectSection.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Website portfolio pribadi menggunakan Next.js, Tailwind, dan Framer Motion dengan animasi interaktif.",
    images: ["/project1.jpg", "/project1_2.jpg", "/project1_3.jpg"],
    tags: ["Next.js", "Tailwind", "Framer Motion"],
    github: "#",
    demo: "#",
  },
  {
    id: 2,
    title: "E-Commerce App",
    description: "Aplikasi e-commerce lengkap dengan fitur keranjang, checkout, dan payment gateway integration.",
    images: ["/project2.jpg", "/project2_2.jpg", "/project2_3.jpg"],
    tags: ["React", "Node.js", "MongoDB"],
    github: "#",
    demo: "#",
  },
  {
    id: 3,
    title: "Chatbot Telegram",
    description: "Bot Telegram untuk penjualan dengan fitur menu interaktif dan pencatatan transaksi otomatis.",
    images: ["/project3.jpg"],
    tags: ["Python", "Telegram API", "PostgreSQL"],
    github: "#",
  },
];

export default function ProjectSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    if (activeProject) {
      const interval = setInterval(() => {
        paginate(1);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [activeProject, currentIndex]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    if (!activeProject) return;
    const newIndex =
      newDirection > 0
        ? (currentIndex + 1) % activeProject.images.length
        : (currentIndex - 1 + activeProject.images.length) % activeProject.images.length;
    setDirection(newDirection);
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setDirection(slideIndex > currentIndex ? 1 : -1);
    setCurrentIndex(slideIndex);
  };

  return (
    <>
      <section id="projects" className="max-w-6xl mt-32 px-6">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Featured Projects
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              onClick={() => {
                setActiveProject(project);
                setCurrentIndex(0);
              }}
            >
              {/* Glow Effect */}
              <motion.div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Card */}
              <motion.div
                className="relative rounded-2xl overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    width={400}
                    height={192}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* View Project Text */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <span className="px-6 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-sm font-semibold">
                      View Details
                    </span>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 text-xs rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.2 + idx * 0.1 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: "linear-gradient(135deg, transparent 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)",
                    backgroundSize: "200% 200%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Enhanced Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4"
            onClick={() => setActiveProject(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative max-w-5xl w-full bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              {/* Image Slideshow */}
              <div className="relative h-96 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.img
                    key={currentIndex}
                    src={activeProject.images[currentIndex]}
                    alt={`${activeProject.title} ${currentIndex + 1}`}
                    className="absolute w-full h-full object-contain"
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.3 },
                    }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={1}
                    onDragEnd={(e, { offset, velocity }: PanInfo) => {
                      const swipe = swipePower(offset.x, velocity.x);
                      if (swipe < -swipeConfidenceThreshold) {
                        paginate(1);
                      } else if (swipe > swipeConfidenceThreshold) {
                        paginate(-1);
                      }
                    }}
                  />
                </AnimatePresence>

                {/* Navigation Dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {activeProject.images.map((_, i) => (
                    <motion.button
                      key={i}
                      onClick={() => goToSlide(i)}
                      className={`h-2 rounded-full transition-all ${
                        i === currentIndex
                          ? "w-8 bg-white"
                          : "w-2 bg-white/50 hover:bg-white/75"
                      }`}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <motion.h2
                  className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeProject.title}
                </motion.h2>
                
                <motion.p
                  className="text-gray-600 dark:text-gray-400 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {activeProject.description}
                </motion.p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {activeProject.tags.map((tag, idx) => (
                    <motion.span
                      key={idx}
                      className="px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 text-sm font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  {activeProject.github && (
                    <motion.a
                      href={activeProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:scale-105 transition-transform"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github size={20} />
                      View Code
                    </motion.a>
                  )}
                  {activeProject.demo && (
                    <motion.a
                      href={activeProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:scale-105 transition-transform"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </motion.a>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-2xl font-bold hover:rotate-90 transition-transform"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}