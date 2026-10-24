import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "EST-K 360 CLUB",
  description: "Un club, quatre dimensions. GROW, CONNECT, EXPERIENCE, IMPACT.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="relative min-h-screen bg-[#0F172A]"> {/* Fond sombre de base */}
        
        {/* 1. L'IMAGE DE FOND - Bien visible et fixe */}
        <div 
          className="fixed inset-0 -z-20 pointer-events-none"
          style={{ 
            backgroundImage: "url('/background-logo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.25, // 25% d'opacité pour bien la voir
            filter: "blur(2px)" // Un léger flou pour que ça fasse pro
          }}
        />

        {/* 2. VOILE DÉGRADÉ - Pour assombrir un peu le fond et faire ressortir le texte */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 pointer-events-none" />

        {/* 3. LA NAVBAR */}
        <Navbar />

        {/* 4. LE CONTENU */}
        <main className="relative z-10 pt-8">
          {children}
        </main>
        
      </body>
    </html>
  );
}