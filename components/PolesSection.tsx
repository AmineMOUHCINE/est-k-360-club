"use client";
import { motion } from "framer-motion";
import { Briefcase, Users, Star, HeartHandshake } from "lucide-react";
import TiltCard from "./TiltCard";

const poles = [
  {
    icon: Briefcase,
    name: "GROW",
    subtitle: "Compétences & Carrière",
    desc: "Développement personnel, ateliers CV, préparation aux entretiens et opportunités professionnelles.",
    color: "emerald",
    gradient: "from-emerald-400/20 to-emerald-600/5",
    border: "border-emerald-400/30",
    glow: "rgba(52,211,153,0.4)",
  },
  {
    icon: Users,
    name: "CONNECT",
    subtitle: "Liens & Communauté",
    desc: "Intégration, speed-friending, parrainage et création d'une communauté étudiante soudée.",
    color: "blue",
    gradient: "from-blue-400/20 to-blue-600/5",
    border: "border-blue-400/30",
    glow: "rgba(96,165,250,0.4)",
  },
  {
    icon: Star,
    name: "EXPERIENCE",
    subtitle: "Vie universitaire",
    desc: "Movie Nights, EST Got Talent, tournois gaming, sorties et événements mémorables.",
    color: "amber",
    gradient: "from-amber-400/20 to-amber-600/5",
    border: "border-amber-400/30",
    glow: "rgba(251,191,36,0.4)",
  },
  {
    icon: HeartHandshake,
    name: "IMPACT",
    subtitle: "Engagement social",
    desc: "Bénévolat, collectes, actions environnementales et projets à impact local.",
    color: "rose",
    gradient: "from-rose-400/20 to-rose-600/5",
    border: "border-rose-400/30",
    glow: "rgba(251,113,133,0.4)",
  },
];

export default function PolesSection() {
  return (
    <section className="relative py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-20 text-center"
      >
        <p className="text-emerald-400 font-semibold tracking-[0.3em] uppercase text-xs mb-4">
          Explorez nos dimensions
        </p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
          Nos 4 Pôles
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Quatre univers complémentaires pour une expérience à 360°.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {poles.map((pole, i) => {
          const Icon = pole.icon;
          return (
            <motion.div
              key={pole.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <TiltCard>
                <div
                  className={`relative p-10 rounded-3xl bg-gradient-to-br ${pole.gradient} border ${pole.border} backdrop-blur-sm overflow-hidden group transition-all duration-500 hover:shadow-[0_0_60px_${pole.glow}]`}
                >
                  <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ background: pole.glow }} />
                  
                  <div className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-16 h-16 rounded-2xl bg-${pole.color}-400/10 flex items-center justify-center mb-8`}
                    >
                      <Icon size={32} className={`text-${pole.color}-400`} />
                    </motion.div>
                    <h3 className="text-3xl font-black mb-2 tracking-tight">{pole.name}</h3>
                    <p className={`text-${pole.color}-400 font-semibold text-sm mb-4 uppercase tracking-wider`}>
                      {pole.subtitle}
                    </p>
                    <p className="text-slate-300 leading-relaxed">{pole.desc}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" 
                    style={{ color: pole.glow, width: "100%" }} />
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
