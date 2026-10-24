import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "EST-K 360 CLUB",
  description: "Un club, quatre dimensions. GROW, CONNECT, EXPERIENCE, IMPACT.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="relative min-h-screen bg-[#1B2550] text-white flex flex-col overflow-x-hidden">
        
        <div 
          className="fixed inset-0 -z-20 pointer-events-none"
          style={{ 
            backgroundImage: "url('/logo-estk.png')",
            backgroundSize: "80%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.03,
          }}
        />

        <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a3875] via-[#1B2550] to-[#1B2550] opacity-80 pointer-events-none" />

        <Navbar />
        <main className="relative z-10 flex-grow">
          {children}
        </main>
        <Footer />
        
      </body>
    </html>
  );
}
