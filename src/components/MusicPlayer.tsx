// src/components/MusicPlayer.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Music, ChevronRight, ChevronLeft } from "lucide-react";
// ▼▼▼ IMPOR HOOK BARU ▼▼▼
import { useRef, useState, forwardRef, useImperativeHandle } from "react";

// Definisikan 'song'
const song = {
  title: "Tabola Bale - Silet Open Up (feat. Jacson Zeran Juan Reza _ Diva Aurel)",
  src: "/Tabola Bale - Silet Open Up (feat. Jacson Zeran Juan Reza _ Diva Aurel).mp3"
};

// ▼▼▼ BUAT TIPE UNTUK HANDLE (AGAR TYPESCRIPT SENANG) ▼▼▼
export type MusicPlayerHandle = {
  play: () => void;
};

// ▼▼▼ UBAH FUNGSI MENJADI forwardRef ▼▼▼
const MusicPlayer = forwardRef<MusicPlayerHandle>((props, ref) => {
  // Semua state dan ref yang berhubungan dengan player
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPlayerCollapsed, setIsPlayerCollapsed] = useState(false);

  // ▼▼▼ BUAT FUNGSI 'play' INTERNAL BARU ▼▼▼
  const startPlaying = () => {
    audioRef.current?.play().catch(error => console.log("Audio play error:", error));
    setIsPlaying(true);
  };

  // Fungsi toggle play/pause (sekarang menggunakan startPlaying)
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      startPlaying(); // <-- Gunakan fungsi baru
    }
  };

  // ▼▼▼ EKSPOS FUNGSI 'startPlaying' SEBAGAI 'play' KE INDUK ▼▼▼
  useImperativeHandle(ref, () => ({
    play() {
      startPlaying();
    }
  }));

  return (
    <>
      {/* Elemen audio sekarang ada di dalam komponen ini */}
      <audio ref={audioRef} src={song.src} loop />

      {/* JSX Mini-Player (TIDAK BERUBAH) */}
      <motion.div 
        className="fixed bottom-20 right-4 md:bottom-4 z-50 flex items-center gap-3 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-lg shadow-lg"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        {/* Tombol Toggle */}
        <button 
          onClick={() => setIsPlayerCollapsed(!isPlayerCollapsed)} 
          className="p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          {isPlayerCollapsed ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        
        {/* Ikon Musik */}
        <AnimatePresence>
          {!isPlayerCollapsed && (
            <motion.div
              key="player-icon"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Music 
                size={20} 
                className={ isPlaying ? "animate-spin" : "" }
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Judul Lagu */}
        <AnimatePresence>
          {!isPlayerCollapsed && (
            <motion.div
              key="player-title"
              className="flex-shrink min-w-0"
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden", whiteSpace: "nowrap" }} 
            >
              <p className="text-sm font-medium truncate max-w-[150px]">{song.title}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tombol Play/Pause */}
        <button onClick={togglePlayPause} className="p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          {isPlaying ? (
            <Pause size={20} className="fill-current" />
          ) : (
            <Play size={20} className="fill-current" />
          )}
        </button>
      </motion.div>
    </>
  );
});

// ▼▼▼ PASTIKAN EXPORT DEFAULT SEPERTI INI ▼▼▼
MusicPlayer.displayName = "MusicPlayer"; // Tambahan untuk debugging
export default MusicPlayer;