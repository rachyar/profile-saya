// src/components/Footer.tsx
"use client"; // <-- JADIKAN CLIENT COMPONENT

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { ArrowUpCircle } from "lucide-react";
import { Link } from "react-scroll"; // <-- Impor Link untuk "Back to Top"

export default function Footer() {
  return (
    <footer className="w-full max-w-5xl text-center pt-8 pb-24 md:pb-8 mt-16 border-t border-gray-800 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Bagian Kiri: Copyright */}
        <div className="text-gray-500 text-sm">
          &copy; 2025 Rifqi Achyar. All rights reserved.
        </div>

        {/* Bagian Tengah: Social Media (Desktop) / Atas (Mobile) */}
        <div className="flex gap-6 order-first md:order-none">
          <a
            href="https://github.com/rachyar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/rifqi-achyar-64363025b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-400 transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com/r14chyar_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-400 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Bagian Kanan: Back to Top */}
        <Link
          to="main-content" // <-- Target ID yang kita buat di Langkah 28
          smooth={true}
          duration={600}
          className="cursor-pointer flex items-center gap-2 text-gray-500 hover:text-white transition"
        >
          <ArrowUpCircle size={20} />
          <span>Back to Top</span>
        </Link>
        
      </div>
    </footer>
  );
}