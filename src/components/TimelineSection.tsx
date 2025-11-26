// src/components/TimelineSection.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Briefcase, Calendar, X, Download, FileText, ChevronRight, Award } from "lucide-react";
import { useState } from "react";

// Tipe data untuk multi-dokumen
interface TimelineDocument {
  title: string;
  url: string;
}

interface TimelineItem {
  id: number;
  type: "education" | "experience" | "award";
  title: string;
  institution: string;
  period: string;
  location: string;
  description: string;
  documents?: TimelineDocument[]; 
  color: string;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    type: "education",
    title: "Sekolah Dasar",
    institution: "SDN 02 MOJOREJO",
    period: "2007 - 2013",
    location: "Kota Madiun",
    description: "Menelesaikan pendidikan dasar di SDN 02 Mojorejo.",
    documents: [
      { title: "Ijazah Kelulusan SD", url: "/dokumen/ijazah-sd.pdf" }
    ],
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    type: "education",
    title: "Sekolah Menengah Pertama",
    institution: "MTsN KOTA MADIUN",
    period: "2013 - 2016",
    location: "Kota Madiun",
    description: "Menempuh pendidikan menengah pertama di Madrasah Tsanawiyah Negeri Kota Madiun.",
    documents: [
      { title: "Ijazah Kelulusan SMP", url: "/dokumen/ijazah-smp.pdf" }
    ],
    color: "from-cyan-500 to-teal-500",
  },
  {
    id: 3,
    type: "experience",
    title: "Praktek Kerja Lapangan (PKL)",
    institution: "PT. INKA (Persero)",
    period: "2018 (3 Bulan)",
    location: "Madiun",
    description: "Praktek kerja lapangan mempelajari maintenance hardware dan jaringan industri kereta api.",
    documents: [
      { title: "Sertifikat PKL PT. INKA", url: "/sertifikat/pkl-inka.pdf" }
    ],
    color: "from-orange-500 to-red-500",
  },
  {
    id: 4,
    type: "award",
    title: "Pengembangan Entrepreneurship",
    institution: "Seminar & Pelatihan",
    period: "2018",
    location: "Nasional",
    description: "Aktif mengikuti kegiatan pengembangan diri di bidang kewirausahaan dan direct selling.",
    documents: [
      { title: "Peserta Motivasi Nasional Entrepreneur Series", url: "/sertifikat/motivasi-entrepreneur-2018.pdf" },
      { title: "Sertifikat Direct Selling (Memuaskan)", url: "/sertifikat/direct-selling-2018.pdf" }
    ],
    color: "from-yellow-500 to-orange-500",
  },
  {
    id: 5,
    type: "education",
    title: "SMK - Teknik & Informatika",
    institution: "SMKN 5 KOTA MADIUN",
    period: "2016 - 2019",
    location: "Kota Madiun",
    description: "Lulus tahun 2019 dari jurusan Teknik dan Informatika.",
    documents: [
      { title: "Ijazah Kelulusan SMK", url: "/dokumen/ijazah-smk.pdf" }
    ],
    color: "from-green-500 to-emerald-500",
  },
  {
    id: 6,
    type: "award",
    title: "Pelatihan Akuntansi & Manajemen",
    institution: "PP. Wali Barokah Kediri",
    period: "2020",
    location: "Kediri",
    description: "Mengikuti pelatihan intensif kompetensi Keuangan dan Manajemen organisasi.",
    documents: [
      { title: "Sertifikat Pelatihan Akuntansi", url: "/sertifikat/wali-barokah.pdf" }
    ],
    color: "from-teal-600 to-green-600",
  },
  {
    id: 7,
    type: "education",
    title: "Pondok Pesantren & Pengabdian",
    institution: "PP. BUDI UTOMO & Masyarakat",
    period: "2019 - 2022",
    location: "Surakarta & Lamongan",
    description: "Pendidikan agama, Diklat Guru Al-Quran, serta Pengabdian Mubaligh di Lamongan.",
    documents: [
      { title: "Ijazah Kelulusan Pondok (2021)", url: "/sertifikat/lulus-mondok.pdf" },
      { title: "Syahadah Diklat Guru Al-Quran Tilawati Level 1", url: "/sertifikat/syahadah-tilawati.pdf" },
      { title: "Sertifikat Pembinaan Mubaligh", url: "/sertifikat/mubaligh.pdf" },
      { title: "Surat Selesai Tugas Pengabdian (2022)", url: "/sertifikat/tugas-lamongan.pdf" }
    ],
    color: "from-indigo-500 to-purple-500",
  },
  {
    id: 8,
    type: "education",
    title: "Eksplorasi Karir & Kompetensi",
    institution: "Pelatihan & Webinar Series",
    period: "2022",
    location: "Nasional",
    description: "Aktif mengikuti berbagai seminar teknologi, pelatihan kompetensi Barista (Karier.mu), data science, dan persiapan karir profesional.",
    documents: [
      { title: "Sertifikat Kompetensi: Barista & Kopi (Karier.mu)", url: "/sertifikat/barista-kariermu.pdf" },
      { title: "Seminar Karir Tren Industri", url: "/sertifikat/seminar-karir-2022.pdf" },
      { title: "Seminar Transformasi Digital", url: "/sertifikat/seminar-digital.pdf" },
      { title: "Seminar PING (HIMASTER UNS)", url: "/sertifikat/ping-uns-2022.pdf" },
      { title: "Practicum X INSPIGO: Data Science Portfolio", url: "/sertifikat/inspigo-data.pdf" },
      { title: "Pelatihan Entrepreneur Writer (Disbudpar Surakarta)", url: "/sertifikat/writer-solo.pdf" },
      { title: "Webinar Content Creator (Sahabat Cuan)", url: "/sertifikat/content-creator.pdf" },
      { title: "Webinar Game Industry Career (Kitalulus)", url: "/sertifikat/game-career.pdf" },
      { title: "Talkshow: Mahasiswa Kreatif (Dunia Kampus)", url: "/sertifikat/dunia-kampus.pdf" },
      { title: "Webinar Management Trainee (Kitalulus x Vivo)", url: "/sertifikat/mt-vivo.pdf" },
      { title: "Webinar Financial 101 (Kitalulus x Ekuid)", url: "/sertifikat/financial-101.pdf" },
      { title: "Webinar Golang Career 2023", url: "/sertifikat/webinar-golang.pdf" }
    ],
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    id: 9,
    type: "award",
    title: "Sertifikasi & Diklat Nasional",
    institution: "Berbagai Institusi",
    period: "2023",
    location: "Nasional",
    description: "Pengembangan kompetensi teknis database dan metodologi pendidikan nasional.",
    documents: [
      { title: "Profisiensi Database Systems", url: "/sertifikat/database-2023.pdf" },
      { title: "Webinar Publikasi Hibah Dikti", url: "/sertifikat/hibah-dikti.pdf" },
      { title: "Diklat Nasional: Asesmen Kurikulum Merdeka", url: "/sertifikat/diklat-asesmen.pdf" },
      { title: "Diklat Nasional: Kelas Berbasis Proyek", url: "/sertifikat/diklat-proyek.pdf" },
      { title: "Webinar AI untuk Pembelajaran", url: "/sertifikat/webinar-ai-guru.pdf" },
      { title: "Diklat Pendidikan Moral & Etika", url: "/sertifikat/diklat-moral.pdf" }
    ],
    color: "from-pink-500 to-rose-500",
  },
  {
    id: 10,
    type: "award",
    title: "Organisasi & Kepanitiaan",
    institution: "HIMSI & KMS",
    period: "2024",
    location: "Surakarta & Sragen",
    description: "Aktif dalam organisasi kemahasiswaan dan kepanitiaan event daerah.",
    documents: [
      { title: "Piagam Penghargaan Staf HIMSI", url: "/sertifikat/piagam-himsi.pdf" },
      { title: "Staf Divisi Perkab Sragen University Expo", url: "/sertifikat/sragen-expo.pdf" }
    ],
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 11,
    type: "education",
    title: "Wawasan Teknologi & Keamanan Siber",
    institution: "I2RI & Widya Security",
    period: "2024",
    location: "Online",
    description: "Memperdalam wawasan tentang digitalisasi konstruksi (Smart Construction) dan strategi keamanan siber melawan Ransomware.",
    documents: [
      { title: "Project Retrospective: Concrete Goes Digital", url: "/sertifikat/i2ri-smart-construction.pdf" },
      { title: "Webinar Ransomware Attack Strategy", url: "/sertifikat/ransomware-vodjo.pdf" }
    ],
    color: "from-blue-400 to-indigo-400",
  },
  {
    id: 12,
    type: "award",
    title: "Sertifikasi Profesi BNSP",
    institution: "Badan Nasional Sertifikasi Profesi",
    period: "2024",
    location: "Indonesia",
    description: "Kompetensi diakui negara melalui Sertifikasi Profesi Programmer.",
    documents: [
      { title: "Sertifikat Kompetensi BNSP Programmer", url: "/sertifikat/bnsp-programmer.pdf" },
      { title: "Sertifikat Software Quality Assurance", url: "/sertifikat/sqa-2024.pdf" }
    ],
    color: "from-emerald-600 to-green-600",
  },
  {
    id: 13,
    type: "award",
    title: "Alibaba Cloud Certified",
    institution: "Alibaba Cloud",
    period: "2024",
    location: "International",
    description: "Meraih sertifikasi Associate dan 10 sertifikat spesialisasi cloud computing.",
    documents: [
      { title: "Alibaba Cloud Certified Associate (ACA)", url: "/sertifikat/alibaba-aca.pdf" },
      { title: "Operate and Manage a Cloud Server", url: "/sertifikat/alibaba-1.pdf" },
      { title: "Operate and Manage Object Storage on the Cloud", url: "/sertifikat/alibaba-2.pdf" },
      { title: "Using ESC to Construct a Dynamic Website", url: "/sertifikat/alibaba-3.pdf" },
      { title: "Using OSS to Publish a Static Website", url: "/sertifikat/alibaba-4.pdf" },
      { title: "MySQL for Beginners - Basic Queries", url: "/sertifikat/alibaba-5.pdf" },
      { title: "MySQL Database Concepts and Operations", url: "/sertifikat/alibaba-6.pdf" },
      { title: "Operate and Manage a Relational Database", url: "/sertifikat/alibaba-7.pdf" },
      { title: "Network Series Courses", url: "/sertifikat/alibaba-8.pdf" },
    ],
    color: "from-orange-600 to-red-600",
  },
  {
    id: 14,
    type: "education",
    title: "Seminar Teknologi & Karir IT",
    institution: "Seminar Series",
    period: "Januari 2025",
    location: "Online / Surakarta",
    description: "Update wawasan teknologi terbaru untuk persiapan karir profesional.",
    documents: [
      { title: "Seminar Acceleration Of IT Career", url: "/sertifikat/seminar-it-career-2025.pdf" }
    ],
    color: "from-sky-500 to-blue-500",
  },
  {
    id: 15,
    type: "experience",
    title: "Praktek Kerja Lapangan",
    institution: "PT. MITRA DATA ABADI",
    period: "2024 - 2025",
    location: "Surakarta",
    description: "Melakukan pengembangan sistem informasi dan web development selama 1 tahun.",
    documents: [
      { title: "Surat Keterangan PKL", url: "/sertifikat/pkl-mda.pdf" }
    ],
    color: "from-teal-500 to-cyan-600",
  },
  {
    id: 16,
    type: "award",
    title: "Uji Kompetensi Bahasa",
    institution: "Language Center",
    period: "2025",
    location: "Surakarta",
    description: "Persiapan karir global dengan uji kemampuan Bahasa Inggris.",
    documents: [
      { title: "Sertifikat TOEFL Prediction Test", url: "/sertifikat/toefl-2025.pdf" }
    ],
    color: "from-blue-600 to-indigo-600",
  },
  {
    id: 17,
    type: "experience",
    title: "Programmer (Full-time)",
    institution: "PT. MITRA DATA ABADI",
    period: "2025 - Sekarang",
    location: "Surakarta",
    description: "Bekerja secara profesional sebagai Programmer Web & Sistem Informasi.",
    documents: [
      { title: "Kontrak Kerja / Surat Keterangan", url: "/sertifikat/kerja-programmer.pdf" }
    ],
    color: "from-violet-600 to-purple-600",
  },
  {
    id: 18,
    type: "education",
    title: "Lulus D3 Sistem Informasi",
    institution: "UBSI (Fakultas Teknik & Informatika)",
    period: "2025",
    location: "Surakarta",
    description: "Menyelesaikan pendidikan Diploma 3 Sistem Informasi dengan predikat memuaskan.",
    documents: [
      { title: "Ijazah D3 Sistem Informasi", url: "/dokumen/ijazah-d3.pdf" },
      { title: "Transkrip Nilai Akademik", url: "/dokumen/transkrip-d3.pdf" }
    ],
    color: "from-yellow-500 to-amber-500",
  },
];

export default function TimelineSection() {
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);

  const openModal = (item: TimelineItem) => {
    setSelectedItem(item);
    setActiveDocIndex(0);
    setShowCertificate(true);
  };

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="timeline" className="max-w-6xl mt-32 px-6">
      <motion.h2
        className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Perjalanan Akademik & Profesional
      </motion.h2>

      <motion.p
        className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        viewport={{ once: true }}
      >
        Rekam jejak pendidikan, pengalaman kerja, serta sertifikasi kompetensi.
      </motion.p>

      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 via-pink-600 to-blue-600 hidden md:block" />

        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            className={`relative mb-12 ${
              index % 2 === 0 ? "md:pr-[50%] md:pl-0" : "md:pl-[50%] md:pr-0"
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-r ${item.color} border-4 border-white dark:border-gray-900 z-10 hidden md:block`}
            />

            <motion.div
              className={`relative p-6 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 cursor-pointer group hover:shadow-xl transition-all duration-300 ${
                index % 2 === 0 ? "md:mr-8" : "md:ml-8"
              }`}
              whileHover={{ y: -5, scale: 1.02 }}
              onClick={() => item.documents && openModal(item)}
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${item.color} text-white mb-4`}
              >
                {item.type === "education" ? (
                  <GraduationCap size={24} />
                ) : item.type === "experience" ? (
                  <Briefcase size={24} />
                ) : (
                  <Award size={24} />
                )}
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {item.title}
              </h3>

              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                <Calendar size={16} />
                <span>{item.period}</span>
              </div>

              <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
                {item.institution}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {item.location}
              </p>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                {item.description}
              </p>

              {item.documents && item.documents.length > 0 && (
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full text-sm font-semibold hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(item);
                  }}
                >
                  <FileText size={16} />
                  {item.documents.length > 1
                    ? `Lihat ${item.documents.length} Dokumen`
                    : "Lihat Dokumen"}
                </motion.button>
              )}

              <div
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${item.color}`}
              >
                {item.type === "education"
                  ? "Pendidikan"
                  : item.type === "experience"
                  ? "Pengalaman"
                  : "Prestasi"}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* MODAL SECTION */}
      <AnimatePresence>
        {selectedItem && selectedItem.documents && showCertificate && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowCertificate(false);
              setSelectedItem(null);
            }}
          >
            <motion.div
              className="relative w-full max-w-3xl h-[85vh] bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
              initial={{ scale: 0.8, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center shrink-0 bg-white dark:bg-gray-900 z-10">
                <div className="pr-4">
                  <h3 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 line-clamp-1">
                    {selectedItem.documents[activeDocIndex].title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {selectedItem.institution} • Dokumen {activeDocIndex + 1} /{" "}
                    {selectedItem.documents.length}
                  </p>
                </div>

                <div className="flex gap-2 shrink-0">
                  <motion.button
                    className="p-2 md:p-3 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-full hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() =>
                      handleDownload(
                        selectedItem.documents![activeDocIndex].url,
                        selectedItem.documents![activeDocIndex].title
                      )
                    }
                    title="Unduh Dokumen Ini"
                  >
                    <Download size={18} />
                  </motion.button>

                  <motion.button
                    className="p-2 md:p-3 bg-red-600 text-white rounded-full hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      setShowCertificate(false);
                      setSelectedItem(null);
                    }}
                  >
                    <X size={18} />
                  </motion.button>
                </div>
              </div>

              {/* PDF Viewer Area */}
              <div className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 md:p-4 overflow-hidden relative">
                <iframe
                  src={selectedItem.documents[activeDocIndex].url}
                  className="w-full h-full rounded-lg bg-white shadow-inner"
                  title="Document Viewer"
                />
              </div>

              {/* Document Navigation */}
              {selectedItem.documents.length > 1 && (
                <div className="p-3 md:p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 overflow-x-auto shrink-0">
                  <div className="flex gap-2 md:gap-3 justify-start md:justify-center min-w-max px-2">
                    {selectedItem.documents.map((doc, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveDocIndex(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium whitespace-nowrap transition-all border ${
                          activeDocIndex === idx
                            ? "bg-purple-600 text-white border-purple-600 shadow-md"
                            : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                      >
                        {idx + 1}. {doc.title.length > 15 ? doc.title.substring(0, 15) + "..." : doc.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}