// src/components/CVPreviewCard.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, Eye, FileText } from "lucide-react";

export default function CVPreviewCard() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Efek Pegas (Spring) agar gerakan smooth
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), {
    stiffness: 150,
    damping: 20,
  });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct * 200); // Sensitivitas rotasi
    y.set(yPct * 200);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const CV_FILE_PATH = "/dokumen/CV_Achyar_Update.pdf";

  return (
    <motion.div
      className="relative w-64 h-80 perspective-1000 cursor-pointer group"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800"
      >
        {/* --- VISUAL MOCKUP CV (Tampilan Pura-pura Dokumen) --- */}
        <div className="absolute inset-0 p-6 flex flex-col gap-4 overflow-hidden opacity-80 group-hover:opacity-40 transition-opacity duration-300">
          {/* Header Mockup */}
          <div className="flex gap-4 items-center mb-2">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="space-y-2">
              <div className="w-24 h-3 bg-gray-300 dark:bg-gray-600 rounded" />
              <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
          {/* Lines Mockup */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`h-2 bg-gray-100 dark:bg-gray-800 rounded ${
                i % 2 === 0 ? "w-full" : "w-2/3"
              }`}
            />
          ))}
          <div className="mt-4 w-full h-20 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-dashed border-gray-200 dark:border-gray-700" />
          
          {/* Watermark Text */}
          <div className="absolute bottom-4 right-4 rotate-[-15deg] opacity-10">
             <FileText size={80} />
          </div>
        </div>

        {/* --- OVERLAY BUTTONS (Muncul saat Hover) --- */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 transform translate-z-20"
          style={{ transform: "translateZ(50px)" }} // Tombol melayang di atas kartu
        >
          {/* Tombol Preview */}
          <a
            href={CV_FILE_PATH}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-purple-600 font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <Eye size={18} />
            Preview
          </a>

          {/* Tombol Download */}
          <a
            href={CV_FILE_PATH}
            download="CV_Rifqi_Achyar.pdf"
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            <Download size={18} />
            Download
          </a>
        </div>

        {/* Decorative Gradient Border */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 z-0 pointer-events-none" />
      </motion.div>

      {/* Shadow Effect di bawah kartu */}
      <div className="absolute -bottom-10 left-10 right-10 h-4 bg-black/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}