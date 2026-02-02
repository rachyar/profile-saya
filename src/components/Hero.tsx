// src/components/Hero.tsx (REVISI RESPONSIVE)
"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import CVPreviewCard from "./CVPreviewCard"; 

export default function Hero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  // Parallax effect (hanya aktif di desktop/screen besar agar mobile lebih ringan)
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section 
      ref={ref} 
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-12" // Tambah padding agar tidak mepet
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-white dark:to-gray-950 z-0" />
      
      <div className="container mx-auto px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* --- KOLOM 1: Teks (Order 1 di Mobile & Desktop) --- */}
        <motion.div 
          className="text-center lg:text-left space-y-6 order-1" // <-- PASTI ORDER 1
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 text-sm font-semibold mb-2 mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
            </span>
            Available for Hire
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Hi, I'm <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Achyar
            </span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Seorang <b>Web Developer & IT Professional</b> yang berfokus menciptakan pengalaman digital yang modern, cepat, dan interaktif.
          </p>
          
          {/* Instruksi Mobile (Teks ini sekarang VALID karena kartu ada di bawahnya) */}
          <div className="flex flex-col items-center lg:items-start gap-2 pt-2">
             <p className="text-sm text-purple-500 font-medium animate-bounce lg:hidden">
              ↓ Tap Kartu CV di bawah ini
            </p>
            <p className="text-sm text-gray-400 italic hidden lg:block animate-pulse">
              ← Arahkan mouse ke kartu untuk melihat opsi
            </p>
          </div>

        </motion.div>

        {/* --- KOLOM 2: 3D CV Card (Order 2 di Mobile & Desktop) --- */}
        <motion.div 
          className="relative order-2 flex justify-center items-center perspective-1000 mt-4 lg:mt-0" // Tambah margin top di mobile
          style={{ y, opacity }} 
        >
           {/* Wrapper untuk mengatur skala di mobile agar tidak terlalu besar */}
           <div className="relative z-20 transform scale-90 md:scale-100 transition-transform hover:scale-105 duration-500">
              <CVPreviewCard />
           </div>

           {/* Elemen Dekorasi di belakang kartu */}
           <div className="absolute -z-10 w-[250px] h-[250px] lg:w-[300px] lg:h-[300px] bg-gradient-to-tr from-purple-400/30 to-pink-400/30 rounded-full blur-[60px] lg:blur-[80px]" />
        </motion.div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 z-20 opacity-50 hidden md:block" // Sembunyikan di HP kecil jika mengganggu
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center p-1">
          <motion.div className="w-1 h-2 bg-gray-400 rounded-full" animate={{ y: [0, 15, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
      </motion.div>
    </section>
  );
}