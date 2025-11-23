// src/components/ProfilePageClient.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import MusicPlayer, { MusicPlayerHandle } from "@/components/MusicPlayer";
import ProjectSection from "@/components/ProjectSection";
import Hero from "@/components/Hero";
import SplashScreen from "@/components/SplashScreen";
import SkillSection from "@/components/SkillSection";
import AboutSection from "@/components/AboutSection";
import ProfileHeader from "@/components/ProfileHeader";
import TimelineSection from "@/components/TimelineSection"; // ← TAMBAHKAN INI

export default function ProfilePageClient() {
  const ref = useRef(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  const handleEnterProfile = () => {
    setIsProfileVisible(true);
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
            <Navbar />
            <Hero />
            <ProfileHeader />
            <AboutSection />
            <SkillSection />
            
            {/* TAMBAHKAN KOMPONEN TIMELINE DI SINI */}
            <TimelineSection />
            
            <ProjectSection />
            <div className="h-40" />
            <MusicPlayer ref={musicPlayerRef} />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}