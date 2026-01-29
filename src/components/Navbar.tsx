// src/components/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import { Sun, Moon, User, Lightbulb, Briefcase, Clock, Mail } from "lucide-react"; // <-- (BARU) Tambah ikon Mail
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Link } from "react-scroll";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {/* ===== Navbar Atas (Desktop) ===== */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 px-6 py-4 hidden md:flex justify-center items-center gap-6">
        {/* (BARU) Menambahkan 'contact' ke dalam array menu */}
        {["about", "skills", "timeline", "projects", "contact"].map((item) => (
          <Link
            key={item}
            to={item}
            smooth={true}
            duration={600}
            offset={-80}
            className="cursor-pointer capitalize text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition"
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

      {/* ===== Navbar Mobile ===== */}
      <motion.nav 
        className="md:hidden fixed bottom-0 w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-50 flex justify-around items-center py-2 border-t border-white/10 dark:border-black/10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {[
          { name: "about", icon: <User size={20} /> },
          { name: "skills", icon: <Lightbulb size={20} /> },
          { name: "timeline", icon: <Clock size={20} /> },
          { name: "projects", icon: <Briefcase size={20} /> },
          { name: "contact", icon: <Mail size={20} /> }, // <-- (BARU) Menu contact mobile
        ].map((item) => (
          <Link
            key={item.name}
            to={item.name}
            smooth={true}
            duration={600}
            offset={-80}
            className="cursor-pointer flex flex-col items-center justify-center text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition "
          >
            {item.icon}
            <span className="text-xs capitalize mt-1">{item.name}</span>
          </Link>
        ))}

        {/* Tombol Tema (Mobile) */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer flex flex-col items-center justify-center text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition w-1/5" // Ubah lebar jadi w-1/5 agar pas 5 item + 1 tombol
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              <span className="text-xs capitalize mt-1">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>
          )}

      </motion.nav>
    </>
  );
}