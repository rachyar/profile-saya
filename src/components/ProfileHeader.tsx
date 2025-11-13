// src/components/ProfileHeader.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function ProfileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* Profile Picture dengan Glow Effect */}
      <motion.div
        className="relative -mt-20 z-10 cursor-pointer group"
        initial={{ opacity: 0, y: 50, scale: 0.5 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ 
          duration: 1,
          type: "spring",
          stiffness: 100,
        }}
        onClick={() => setIsOpen(true)}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Animated Ring */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: [0, 360],
          }}
          transition={{
            scale: { duration: 1.5, repeat: Infinity },
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          }}
          style={{
            background: "conic-gradient(from 0deg, #8b5cf6, #3b82f6, #ec4899, #8b5cf6)",
            padding: "4px",
            filter: "blur(8px)",
            opacity: 0.6,
          }}
        />

        {/* Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Image Container */}
        <motion.div
          className="relative w-40 h-40 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/profile.jpg"
            alt="Profile Picture"
            width={160}
            height={160}
            className="object-cover"
          />
          
          {/* Overlay Gradient saat Hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-purple-600/50 to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      {/* Name & Role dengan Text Gradient Animation */}
      <motion.div
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <motion.h1
          className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundSize: "200% 200%",
          }}
        >
          Rifqi Achyar
        </motion.h1>

        {/* Typing Effect untuk Role */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 text-gray-700 dark:text-gray-300 mt-4 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          {["Web Developer", "Software Developer", "UI/UX Enthusiast"].map((role, i) => (
            <motion.span
              key={role}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.2, duration: 0.5 }}
              className="relative px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-purple-200 dark:border-purple-800"
            >
              {role}
              {i < 2 && <span className="ml-2 text-gray-400">•</span>}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="text-gray-600 dark:text-gray-400 mt-3 text-sm md:text-base font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
        >
          Frontend & Backend Developer
        </motion.p>
      </motion.div>

      {/* Social Media dengan Hover Animation */}
      <motion.div
        className="flex gap-4 mt-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        {[
          { icon: FaGithub, url: "https://github.com/rachyar", color: "hover:text-gray-900 dark:hover:text-white" },
          { icon: FaLinkedin, url: "https://linkedin.com/in/rifqi-achyar-64363025b", color: "hover:text-blue-500" },
          { icon: FaInstagram, url: "https://instagram.com/ac_21ht", color: "hover:text-pink-500" },
        ].map((social, i) => (
          <motion.a
            key={i}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative p-4 rounded-full bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200 dark:border-gray-700 transition-colors ${social.color}`}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 + i * 0.1, type: "spring", stiffness: 200 }}
          >
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0"
              whileHover={{ opacity: 0.3, scale: 1.3 }}
              transition={{ duration: 0.3 }}
              style={{ filter: "blur(10px)" }}
            />
            <social.icon size={28} className="relative z-10" />
          </motion.a>
        ))}
      </motion.div>

      {/* Modal Popup dengan Backdrop Blur */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 px-4"
          onClick={() => setIsOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Image
              src="/profile.jpg"
              alt="Profile Popup"
              width={800}
              height={800}
              className="rounded-2xl shadow-2xl border-4 border-white dark:border-gray-800"
            />
            
            {/* Close Button dengan Animation */}
            <motion.button
              onClick={() => setIsOpen(false)}
              className="absolute -top-4 -right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-2xl font-bold"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}