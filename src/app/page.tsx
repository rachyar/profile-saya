"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-scroll";

export default function Home() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  // dark/light theme
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => setMounted(true), []);
  
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "Website portfolio pribadi menggunakan Next.js, Tailwind, dan Framer Motion.",
      images: ["/project1.jpg", "/project1_2.jpg", "/project1_3.jpg"],
    },
    {
      id: 2,
      title: "E-Commerce App",
      description: "Aplikasi e-commerce sederhana dengan fitur keranjang dan checkout.",
      images: ["/project2.jpg", "/project2_2.jpg", "/project2_3.jpg"],
    },
    {
      id: 3,
      title: "Chatbot Telegram",
      description: "Bot Telegram untuk penjualan dengan fitur menu interaktif dan pencatatan transaksi.",
      images: ["/project3.jpg"],
    },
  ];

  const [activeProject, setActiveProject] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // Slideshow otomatis
  useEffect(() => {
    if (activeProject) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) =>
          prev + 1 >= activeProject.images.length ? 0 : prev + 1
        );
      }, 3000); // ganti gambar tiap 3 detik
      return () => clearInterval(interval);
    }
  }, [activeProject]);

  return (
    <main
      ref={ref}
      className="flex flex-col items-center min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white"
    >
      {/* ===== Navbar ===== */}
      <nav className="fixed top-0 w-full bg-gray-900/80 dark:bg-gray-200/80 backdrop-blur-md z-50 px-6 py-4 flex justify-center items-center gap-6">
        {["about", "skills", "projects"].map((item) => (
          <Link
            key={item}
            to={item}
            smooth={true}
            duration={600}
            offset={-80}
            className="cursor-pointer capitalize text-gray-200 dark:text-gray-800 hover:text-white dark:hover:text-black transition"
          >
            {item}
          </Link>
        ))}

        {/* Dark/Light Switcher */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="absolute right-6 p-2 rounded-full bg-transparent hover:bg-white/20 dark:hover:bg-black/20 transition"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        )}
      </nav>

      {/* ===== Hero Section ===== */}
      <motion.div
        style={{ y }}
        className="relative w-full h-[25vh] sm:h-[35vh] md:h-[45vh] lg:h-[55vh] overflow-hidden mt-16 mb-24 bg-transparent"
      >
        {/* Gambar utama (selalu utuh) */}
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-contain object-center relative z-10"
          priority
        />

        {/* Overlay transparan hitam tipis */}
        <div className="absolute inset-0 bg-black/20 z-20" />
      </motion.div>


      {/* Profile Picture */}
      <motion.div
        className="-mt-20 rounded-full border-4 border-white overflow-hidden w-40 h-40 shadow-xl z-10 cursor-pointer"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        onClick={() => setIsOpen(true)} // 👈 klik buka modal
      >
        <Image
          src="/profile.jpg"
          alt="Profile Picture"
          width={160}
          height={160}
          className="object-cover"
        />
      </motion.div>

      {/* Name & Role */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h1 className="text-3xl font-bold">Rifqi Achyar</h1>

        {/* Baris pertama: 3 role sejajar dengan pemisah | */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 text-gray-600 dark:text-gray-400 mt-2 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span>Web Developer</span>
          <span className="text-gray-400 dark:text-gray-600">|</span>
          <span>Software Developer</span>
          <span className="text-gray-400 dark:text-gray-600">|</span>
          <span>UI/UX Enthusiast</span>
        </motion.div>

        {/* Baris kedua: Software Developer */}
        <motion.p
          className="text-gray-600 dark:text-gray-400 mt-1 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          Frontend & Backend Developer
        </motion.p>
      </motion.div>


      {/* Social Media */}
      <motion.div
        className="flex gap-6 mt-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <a
          href="https://github.com/rachyar"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <FaGithub size={28} />
        </a>
        <a
          href="https://linkedin.com/in/rifqi-achyar-64363025b"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <FaLinkedin size={28} className="text-blue-400" />
        </a>
        <a
          href="https://instagram.com/ac_21ht"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition"
        >
          <FaInstagram size={28} className="text-pink-400" />
        </a>
      </motion.div>

      {/* ===== About Section ===== */}
      <section id="about" className="max-w-3xl text-center mt-32 px-6">
        <motion.h2
          className="text-2xl font-semibold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-gray-600 dark:text-gray-400 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          viewport={{ once: true }}
        >
          Saya adalah seorang Web Developer sekaligus Software Developer yang berfokus pada pengembangan aplikasi berbasis web dan software dengan pendekatan end-to-end: mulai dari Frontend hingga Backend.
        </motion.p>
      </section>

      {/* ===== Skills Section ===== */}
      <section id="skills" className="max-w-4xl mt-32 px-6 text-center">
        <motion.h2
          className="text-2xl font-semibold mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Skills
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Next.js",
              "Tailwind",
              "Framer Motion",
              "Git",
              "Laravel",
              "PHP Native",
            ].map((skill, i) => (
            <motion.div
              key={skill}
              className="p-4 rounded-xl bg-gray-200/50 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Projects Section ===== */}
      <section id="projects" className="max-w-5xl mt-32 px-6">
        <motion.h2
          className="text-2xl font-semibold mb-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              className="rounded-xl overflow-hidden bg-gray-200/50 dark:bg-white/10 p-4 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 8px 30px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveProject(project);
                setCurrentIndex(0);
              }}
            >
              {/* Gambar project (hanya tampil gambar pertama) */}
              <div className="h-40 w-full overflow-hidden rounded-lg mb-4">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  width={400}
                  height={160}
                  className="object-cover w-full h-full"
                />
              </div>

              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                {project.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="h-40" />

      {/* ===== Modal Popup ===== */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setIsOpen(false)} // klik luar → close
        >
          <div
            className="relative max-w-3xl w-full px-4"
            onClick={(e) => e.stopPropagation()} // klik dalam modal tidak close
          >
            <Image
              src="/profile.jpg"
              alt="Profile Popup"
              width={800}
              height={800}
              className="rounded-lg mx-auto"
            />
            {/* Tombol close */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {activeProject && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white dark:bg-gray-900 p-6 rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Slideshow */}
            <div className="relative h-80 w-full overflow-hidden rounded-lg">
              {activeProject.images.map((img, i) => (
                <motion.img
                  key={i}
                  src={img}
                  alt={`${activeProject.title} ${i + 1}`}
                  className="absolute w-full h-full object-contain"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: i === currentIndex ? 1 : 0 }}
                  transition={{ duration: 0.8 }}
                />
              ))}
            </div>

            {/* Judul & Deskripsi */}
            <h2 className="text-xl font-semibold mt-4">{activeProject.title}</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {activeProject.description}
            </p>

            {/* Tombol Close */}
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* ===== Footer ===== */}
      <footer className="text-center py-8 mt-16 border-t border-gray-800">
        <p className="text-gray-500">&copy; 2025 Rifqi Achyar. All rights reserved.</p>
      </footer>

    </main>
  );
}
