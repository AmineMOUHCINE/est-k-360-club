import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import GrainOverlay from "@/components/GrainOverlay";
import PageTransition from "@/components/PageTransition";
import BackgroundAnimation from "@/components/BackgroundAnimation";

export const metadata: Metadata = {
  title: "EST-K 360 CLUB",
  description: "Un club, quatre dimensions.",
  icons: {
    icon: "/logo-estk1.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="relative min-h-screen bg-[#1B2550] text-white flex flex-col overflow-x-hidden">
        
        <Preloader />
        <CustomCursor />
        <ScrollProgress />
        <GrainOverlay />
        
        <BackgroundAnimation />

        <SmoothScroll>
          <Navbar />
          <main className="relative z-10 flex-grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </SmoothScroll>
        
      </body>
    </html>
  );
}
