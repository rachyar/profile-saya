// src/components/Footer.tsx
"use client";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Link } from "react-scroll";

// --- KOMPONEN IKON JOBSTREET CUSTOM (SVG) ---
// Kita buat manual agar mirip logo aslinya (Simbol 'J' dengan panah)
const JobstreetIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M16.5 3C19.5376 3 22 5.46243 22 8.5C22 11.5376 19.5376 14 16.5 14H12.5V18.5C12.5 19.8807 11.3807 21 10 21C8.61929 21 7.5 19.8807 7.5 18.5V8.5C7.5 5.46243 9.96243 3 13 3H16.5ZM16.5 5H13C11.067 5 9.5 6.567 9.5 8.5V14H16.5C19.5376 14 22 11.5376 22 8.5C22 6.567 20.433 5 18.5 5H16.5Z" />
    <path d="M5 5H7V19H5V5Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full max-w-5xl text-center pt-8 pb-24 md:pb-8 mt-16 border-t border-gray-800 px-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Bagian Kiri: Copyright */}
        <div className="text-gray-500 text-sm">
          &copy; 2025 Rifqi Achyar. All rights reserved.
        </div>

        {/* Bagian Tengah: Social Media (Desktop) / Atas (Mobile) */}
        <div className="flex gap-6 order-first md:order-none items-center">
          {/* GitHub */}
          <a
            href="https://github.com/rachyar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition transform hover:scale-110"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/rifqi-achyar-64363025b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-blue-500 transition transform hover:scale-110"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>

          {/* JobStreet (BARU) */}
          <a
            href="https://id.jobstreet.com/id/profiles/rifqi-achyar-lPCCqXmkP3" // <-- GANTI DENGAN LINK PROFIL JOBSTREET ANDA
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-yellow-400 transition transform hover:scale-110"
            aria-label="JobStreet"
            title="JobStreet Profile"
          >
            <JobstreetIcon size={24} />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/ac_21ht"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-pink-500 transition transform hover:scale-110"
            aria-label="Instagram"
          >
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Bagian Kanan: Back to Top */}
        <Link
          to="main-content"
          smooth={true}
          duration={600}
          className="cursor-pointer flex items-center gap-2 text-gray-500 hover:text-purple-500 transition group"
        >
          <span className="text-sm font-medium group-hover:underline">Back to Top</span>
          {/* Ikon Panah Sederhana (Tanpa perlu import lucide extra) */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="group-hover:-translate-y-1 transition-transform"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M16 12l-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </Link>
      </div>
    </footer>
  );
}