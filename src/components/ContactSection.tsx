// src/components/ContactSection.tsx
"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Phone, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // --- BAGIAN KONFIGURASI EMAILJS ---
    // Ganti string di bawah ini dengan ID dari dashboard EmailJS Anda nanti
    const SERVICE_ID = "service_se715ys"; 
    const TEMPLATE_ID = "template_fhvvfea";
    const PUBLIC_KEY = "ijqmZsYuj9ExNTloz";

    if (formRef.current) {
      emailjs
        .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then(
          (result) => {
            console.log(result.text);
            setStatus("success");
            setIsLoading(false);
            formRef.current?.reset();
            // Reset status kembali ke normal setelah 5 detik
            setTimeout(() => setStatus("idle"), 5000);
          },
          (error) => {
            console.log(error.text);
            setStatus("error");
            setIsLoading(false);
          }
        );
    }
  };

  return (
    <section id="contact" className="max-w-6xl w-full mt-32 mb-20 px-6">
      <motion.h2
        className="text-3xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Get In Touch
      </motion.h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* --- KOLOM KIRI: Info Kontak --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="relative p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Let's Talk About Everything!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Tertarik berkolaborasi atau punya pertanyaan tentang project? 
              Jangan ragu untuk mengirimkan pesan. Saya selalu terbuka untuk mendiskusikan 
              ide-ide baru dan peluang kreatif.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Email</p>
                  <p className="font-medium">achyarrifqi9@gmail.com</p> {/* GANTI DENGAN EMAIL ASLI ANDA */}
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                <div className="p-3 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Phone / WhatsApp</p>
                  <p className="font-medium">+62 851-6540-1804</p> {/* GANTI DENGAN NOMOR ASLI ANDA */}
                </div>
              </div>

              <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-500">Location</p>
                  <p className="font-medium">Mojorejo, Taman, Madiun City, East Java, Indonesia</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* --- KOLOM KANAN: Form Input --- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="relative p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg"
          >
            <div className="space-y-6">
              {/* Input Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="user_name" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="Nama Anda"
                />
              </div>

              {/* Input Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="user_email" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="email@example.com"
                />
              </div>

              {/* Input Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Judul Pesan
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                  placeholder="Topik diskusi..."
                />
              </div>

              {/* Input Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Isi Pesan
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition-all resize-none"
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all ${
                  status === "success" 
                    ? "bg-green-600 hover:bg-green-700"
                    : status === "error"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle2 size={20} />
                    Pesan Terkirim!
                  </>
                ) : status === "error" ? (
                  <>
                    <AlertCircle size={20} />
                    Gagal, Coba Lagi
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Kirim Pesan
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}