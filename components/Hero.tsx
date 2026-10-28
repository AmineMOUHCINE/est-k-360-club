"use client";
import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Image from "next/image";

interface Particle {
  id: number; x: number; y: number; size: number; duration: number; delay: number; color: string;
}

export default function Hero() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const mouseX = useSpring(0, { stiffness: 80, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 80, damping: 20 });

  useEffect(() => {
    const colors = ["#06b6d4", "#8b5cf6", "#ffffff"]; // Cyan, Violet, Blanc
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i, x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 3 + 1, duration: Math.random() * 20 + 15, delay: Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x); mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateX = useTransform(mouseY, [-1, 1], [10, -10]);
  const rotateY = useTransform(mouseX, [-1, 1], [-10, 10]);
  const letters = "EST-K 360".split("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0 -z-20"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, #1a1a4a 0%, #0a0f1f 60%)",
            "radial-gradient(circle at 80% 80%, #1B2550 0%, #0a0f1f 60%)",
            "radial-gradient(circle at 50% 50%, #2a1a4a 0%, #0a0f1f 60%)",
            "radial-gradient(circle at 20% 20%, #1a1a4a 0%, #0a0f1f 60%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, backgroundColor: p.color, boxShadow: `0 0 10px ${p.color}` }}
          animate={{ y: [0, -100, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}

      <motion.div className="relative z-10 text-center px-6 max-w-6xl pb-32 md:pb-40 pt-24" style={{ perspective: 1200 }}>
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
          
          {/* ============ MAGIC ROBOT LOGO (BLA CERCLES) ============ */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 2.4, type: "spring", stiffness: 100 }}
            className="mb-10 flex justify-center relative"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] flex items-center justify-center">
              
              {/* Halo kayneffes (glow) f l'fond */}
              <motion.div
                animate={{
                  scale: [1, 1.4, 1, 1.2, 1],
                  opacity: [0.2, 0.6, 0.2, 0.4, 0.2],
                  backgroundColor: ["rgba(6,182,212,0.3)", "rgba(139,92,246,0.5)", "rgba(6,182,212,0.3)"]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 rounded-full"
                style={{ filter: "blur(60px)" }}
              />

              {/* Flottaison (Haut/Bas) + Rotation Globale */}
              <motion.div
                animate={{
                  y: [0, -25, 0, 15, 0],
                  rotateZ: [0, 8, 0, -8, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-full h-full flex items-center justify-center"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* L'Logo rasso : Pulsation, Rotation 3D (Robot/Insan) */}
                <motion.div
                  animate={{
                    rotateY: [0, 360], // Kaydour 360 f 3D
                    rotateX: [0, 20, 0, -20, 0], // Kaytilt
                    scaleX: [1, 1.15, 0.95, 1.05, 1], // Heartbeat / Squash
                    scaleY: [1, 0.9, 1.1, 0.95, 1], // Heartbeat / Stretch
                  }}
                  transition={{
                    rotateY: { duration: 6, repeat: Infinity, ease: "linear" }, // Rotation continue
                    rotateX: { duration: 3, repeat: Infinity, ease: "easeInOut" }, // Tilt
                    scaleX: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }, // D9a9 l'9alb
                    scaleY: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                  }}
                  className="relative w-[65%] h-[65%] z-10"
                  style={{
                    transformStyle: "preserve-3d",
                    filter: "drop-shadow(0 0 30px rgba(6,182,212,0.9)) drop-shadow(0 0 60px rgba(139,92,246,0.6))",
                  }}
                >
                  <Image
                    src="/logo-estk.png"
                    alt="EST-K 360"
                    fill
                    priority
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>

              {/* Étincelles kaytferg3o (Particles burst) */}
              {[...Array(10)].map((_, i) => {
                const color = i % 2 === 0 ? "#06b6d4" : "#8b5cf6";
                return (
                  <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full z-20"
                    style={{
                      backgroundColor: color,
                      boxShadow: `0 0 10px ${color}`,
                      top: "50%", left: "50%",
                    }}
                    animate={{
                      x: [0, (Math.random() - 0.5) * 400],
                      y: [0, (Math.random() - 0.5) * 400],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 1.5 + Math.random(),
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: i * 0.2,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
          {/* ============ FIN MAGIC LOGO ============ */}

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="text-cyan-400 font-semibold tracking-[0.3em] uppercase text-xs md:text-sm mb-6"
          >
            Club Étudiant — EST Kelaa des Sraghna
          </motion.p>

          <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter mb-8 leading-none">
            {letters.map((letter, i) => (
              <motion.span key={i}
                initial={{ opacity: 0, y: 120, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.9, delay: 2.8 + i * 0.06, ease: [0.215, 0.61, 0.355, 1] }}
                className={`inline-block ${letter === " " ? "w-6 md:w-10" : ""} ${i >= 6 ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500" : ""}`}
                style={{ textShadow: i >= 6 ? "0 0 60px rgba(139,92,246,0.6)" : "0 0 40px rgba(255,255,255,0.1)" }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 3.6 }}
            className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-12 font-light"
          >
            Un club, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-semibold">quatre dimensions</span>.
            <br />Grandis, connecte-toi, vis des souvenirs, et impacte.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <MagneticButton href="/rejoindre" primary>
              Rejoindre le club <ArrowRight size={20} />
            </MagneticButton>
            <MagneticButton href="/le-club">Découvrir le club</MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/10 py-4 bg-black/20 backdrop-blur-sm z-20">
        <motion.div animate={{ x: [0, -2000] }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap text-sm uppercase tracking-[0.3em] text-white/40 font-semibold">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="flex gap-12">
              <span>GROW</span><span className="text-cyan-400">•</span>
              <span>CONNECT</span><span className="text-purple-500">•</span>
              <span>EXPERIENCE</span><span className="text-cyan-400">•</span>
              <span>IMPACT</span><span className="text-purple-500">•</span>
            </span>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 12, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-24 right-10 z-10 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center pt-2">
          <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-2 bg-cyan-400 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
