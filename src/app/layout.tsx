import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Welcome My Profile",
  description: "Personal portfolio with animations",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Preconnect untuk font (aman dipakai di App Router) */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* DNS Prefetch untuk percepat request */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />

        {/* Optional: bisa nambah preload font kalau mau */}
        {/* <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" /> */}
      </head>

      <body>
        <AnimatedBackground />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
