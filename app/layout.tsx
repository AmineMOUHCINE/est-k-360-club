import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <body className="relative min-h-screen bg-[#0F172A] flex flex-col">
        
        {/* 1. L'IMAGE DE FOND (la chouette) */}
        <div 
          className="fixed inset-0 -z-20 pointer-events-none"
          style={{ 
            backgroundImage: "url('/background-logo.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.15, 
            filter: "blur(1px)" 
          }}
        />

        {/* 2. UN VOILE DÉGRADÉ (pour que le texte soit lisible) */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900/90 pointer-events-none" />

        {/* 3. LA NAVBAR */}
        <Navbar />

        {/* 4. LE CONTENU */}
        <main className="relative z-10 flex-grow pt-8">
          {children}
        </main>

        {/* 5. LE FOOTER */}
        <Footer />
        
      </body>
    </html>
  );
}