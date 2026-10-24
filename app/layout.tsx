import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // <-- IMPORT

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
      <body className="relative min-h-screen flex flex-col">
        
        <Navbar />

        <main className="relative z-10 pt-8 flex-grow">
          {children}
        </main>
        
        <Footer /> {/* <-- FOOTER */}
        
      </body>
    </html>
  );
}