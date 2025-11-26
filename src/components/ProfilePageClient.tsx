// src/components/ProfilePageClient.tsx (OPTIMIZED WITH LAZY LOADING)
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import ProfileHeader from "@/components/ProfileHeader";
import SplashScreen from "@/components/SplashScreen";
import { MusicPlayerHandle } from "@/components/MusicPlayer";

// Lazy Load Heavy Components
const Hero = lazy(() => import("@/components/Hero"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillSection = lazy(() => import("@/components/SkillSection"));
const TimelineSection = lazy(() => import("@/components/TimelineSection"));
const ProjectSection = lazy(() => import("@/components/ProjectSection"));
const MusicPlayer = lazy(() => import("@/components/MusicPlayer"));
const Footer = lazy(() => import("@/components/Footer"));

// Loading Fallback
const SectionLoader = () => (
  <div className="w-full h-40 flex items-center justify-center">
    <motion.div
      className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default function ProfilePageClient() {
  const ref = useRef(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerHandle>(null);

  const handleEnterProfile = () => {
    setIsProfileVisible(true);
    setTimeout(() => {
      if (musicPlayerRef.current) {
        musicPlayerRef.current.play();
      }
    }, 500);
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
            transition={{ duration: 0.5 }}
          >
            <Navbar />
            
            <Suspense fallback={<SectionLoader />}>
              <Hero />
            </Suspense>
            
            <ProfileHeader />
            
            <Suspense fallback={<SectionLoader />}>
              <AboutSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <SkillSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <TimelineSection />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
              <ProjectSection />
            </Suspense>
            
            <div className="h-40" />
            
            <Suspense fallback={null}>
              <MusicPlayer ref={musicPlayerRef} />
            </Suspense>
            
            <Suspense fallback={null}>
              <Footer />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}