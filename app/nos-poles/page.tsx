"use client";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Users, Star, HeartHandshake } from "lucide-react";

const poles = [
  {
    icon: Briefcase, name: "GROW", subtitle: "Compétences & Carrière",
    desc: "Développement personnel, ateliers CV, préparation aux entretiens et opportunités professionnelles.",
    gradient: "from-emerald-500/30 via-emerald-900/30 to-[#0a0f1f]",
    border: "border-emerald-400/40",
    textColor: "text-emerald-400",
    iconBg: "bg-emerald-500/20",
    iconBorder: "border-emerald-400/30",
    glow: "rgba(52,211,153,0.4)",
  },
  {
    icon: Users, name: "CONNECT", subtitle: "Liens & Communauté",
    desc: "Intégration, speed-friending, parrainage, team building et création d'une communauté étudiante soudée.",
    gradient: "from-blue-500/30 via-blue-900/30 to-[#0a0f1f]",
    border: "border-blue-400/40",
    textColor: "text-blue-400",
    iconBg: "bg-blue-500/20",
    iconBorder: "border-blue-400/30",
    glow: "rgba(96,165,250,0.4)",
  },
  {
    icon: Star, name: "EXPERIENCE", subtitle: "Vie universitaire",
    desc: "Movie Nights, EST Got Talent, tournois gaming, Quiz Nights, Escape Games, sorties et événements mémorables.",
    gradient: "from-amber-500/30 via-amber-900/30 to-[#0a0f1f]",
    border: "border-amber-400/40",
    textColor: "text-amber-400",
    iconBg: "bg-amber-500/20",
    iconBorder: "border-amber-400/30",
    glow: "rgba(251,191,36,0.4)",
  },
  {
    icon: HeartHandshake, name: "IMPACT", subtitle: "Engagement social",
    desc: "Bénévolat, collectes, actions environnementales, plantation d'arbres, soutien scolaire et projets à impact local.",
    gradient: "from-rose-500/30 via-rose-900/30 to-[#0a0f1f]",
    border: "border-rose-400/40",
    textColor: "text-rose-400",
    iconBg: "bg-rose-500/20",
    iconBorder: "border-rose-400/30",
    glow: "rgba(251,113,133,0.4)",
  },
];

// ✅ FIX: n3tiw l'isActive type dyal number
function ProgressDot({ i, n, progress }: { i: number; n: number; progress: MotionValue<number> }) {
  const isActive = useTransform(progress, (v): number => {
    const idx = Math.min(Math.floor(v * n + 0.3), n - 1);
    return idx === i ? 1 : 0;
  });
  const bg = useTransform(isActive, [0, 1], ["rgba(255,255,255,0.2)", "rgb(52,211,153)"]);
  const scale = useTransform(isActive, [0, 1], [1, 1.6]);
  return <motion.div style={{ backgroundColor: bg, scale }} className="w-2 h-2 rounded-full" />;
}

function PoleCard({ pole, i, n, progress }: {
  pole: any; i: number; n: number; progress: MotionValue<number>;
}) {
  const Icon = pole.icon;
  const progressPerCard = 1 / n;
  const cardStart = i * progressPerCard;
  const cardEnd = (i + 1) * progressPerCard;

  const y = useTransform(progress, (v) => {
    if (v < cardStart) return 800;
    if (v < cardEnd) {
      const slideProgress = (v - cardStart) / progressPerCard;
      return 800 * (1 - slideProgress);
    }
    const stackProgress = (v - cardEnd) / Math.max(1 - cardEnd, 0.01);
    return -(n - i - 1) * 25 * Math.min(stackProgress, 1);
  });

  const opacity = useTransform(progress, (v) => {
    if (v < cardStart) return 0;
    if (v < cardEnd) return (v - cardStart) / progressPerCard;
    return 1;
  });

  const endClamped = Math.min(cardEnd, 0.99);
  const scale = useTransform(progress, [endClamped, 1], [1, 1 - (n - i - 1) * 0.05]);
  const rotate = useTransform(progress, [endClamped, 1], [0, (n - i - 1) * 2]);

  return (
    <motion.div style={{ y, opacity, scale, rotate, boxShadow: `0 0 80px ${pole.glow}`, zIndex: i + 1 }}
      className={`absolute inset-0 p-8 md:p-14 rounded-[2.5rem] bg-gradient-to-br ${pole.gradient} border ${pole.border} backdrop-blur-xl flex flex-col justify-between origin-top`}
    >
      <div>
        <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}
          className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl ${pole.iconBg} border ${pole.iconBorder} flex items-center justify-center mb-6`}>
          <Icon size={40} className={pole.textColor} />
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-black text-white mb-3 tracking-tighter">{pole.name}</h2>
        <p className={`text-lg md:text-xl ${pole.textColor} font-bold uppercase tracking-widest`}>{pole.subtitle}</p>
      </div>
      <p className="text-lg md:text-xl text-slate-200 leading-relaxed">{pole.desc}</p>
    </motion.div>
  );
}

export default function NosPoles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const n = poles.length;

  return (
    <section ref={containerRef} style={{ height: `${n * 100}vh` }} className="relative bg-[#1B2550]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] border border-emerald-400/10 rounded-full pointer-events-none" />
        <motion.div animate={{ rotate: -360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute w-[450px] h-[450px] md:w-[650px] md:h-[650px] border border-emerald-400/5 rounded-full pointer-events-none" />

        <div className="absolute top-10 md:top-16 left-1/2 -translate-x-1/2 z-30 text-center">
          <p className="text-emerald-400 font-semibold tracking-[0.3em] uppercase text-xs mb-2">Explorez</p>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Nos 4 Pôles</h1>
        </div>

        <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
          {poles.map((p, i) => (
            <ProgressDot key={p.name} i={i} n={n} progress={scrollYProgress} />
          ))}
        </div>

        <div className="relative w-full max-w-4xl h-[500px] md:h-[600px] mx-auto px-6 z-10">
          {poles.map((pole, i) => (
            <PoleCard key={pole.name} pole={pole} i={i} n={n} progress={scrollYProgress} />
          ))}
        </div>

        <motion.p
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-widest text-emerald-400 font-semibold z-30"
        >
          ↓ Scroll
        </motion.p>
      </div>
    </section>
  );
}
