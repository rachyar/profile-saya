"use client";

import { motion, AnimatePresence } from "framer-motion";
// 2. HAPUS BARIS 'lucide-react' INI KARENA SUDAH KOSONG
import { useRef, useEffect, useState } from "react";
import Footer from "@/components/Footer";import Navbar from "@/components/Navbar";
// ▼▼▼ TAMBAHKAN BARIS INI ▼▼▼
import MusicPlayer, { MusicPlayerHandle } from "@/components/MusicPlayer";
import ProjectSection from "@/components/ProjectSection";
import Hero from "@/components/Hero";
// ▼▼▼ TAMBAHKAN BARIS INI ▼▼▼
import SplashScreen from "@/components/SplashScreen";
import SkillSection from "@/components/SkillSection";
import AboutSection from "@/components/AboutSection";
import ProfileHeader from "@/components/ProfileHeader";

export default function ProfilePageClient() {
  const ref = useRef(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  useEffect(() => {
    // Effect ini sekarang kosong
  }, []);

  const handleEnterProfile = () => {
    setIsProfileVisible(true); 
    // ▼▼▼ GANTI LOGIKA IF DENGAN INI ▼▼▼
    if (musicPlayerRef.current) {
      musicPlayerRef.current.play(); 
    }
  };

  return (
    <main
      ref={ref}
      id="main-content"
      className="flex flex-col items-center min-h-screen text-gray-900 dark:text-white"
    >
      {/* Elemen Audio BARU - gunakan nama file mp3 Anda */}

      {/* Wrapper Animasi BARU */}
      <AnimatePresence mode="wait">
        
        {!isProfileVisible ? (
          <SplashScreen onEnter={handleEnterProfile} />
        ) : (

          <motion.div
            key="profile"
            className="w-full flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* ▼▼▼ TAMBAHKAN BARIS INI ▼▼▼ */}
            <Navbar />

            {/* ===== Navbar ===== */}

            {/* ===== Hero Section ===== */}
            {/* ▼▼▼ GANTI DENGAN KOMPONEN BARU ▼▼▼ */}
            <Hero />

            {/* Profile Picture */}
            {/* Name & Role */}
            {/* Social Media */}
            <ProfileHeader />

            {/* ===== About Section ===== */}
            <AboutSection />

            {/* ===== Skills Section ===== */}
            <SkillSection />
            
            {/* ===== Projects Section ===== */}
            {/* ▼▼▼ TAMBAHKAN KOMPONEN BARU DI SINI ▼▼▼ */}
            <ProjectSection />
            
            <div className="h-40" />
            
            {/* ===== Modal Popup ===== */}
            {/* ===== Navbar Mobile (BARU) ===== */}
            {/* ▼▼▼ KODE BARU (MINI-PLAYER) - TAMBAHKAN BLOK INI ▼▼▼ */}
            <MusicPlayer ref={musicPlayerRef} />

            {/* ===== Footer ===== */}
            <Footer />

          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}