"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Music, Gamepad2, PartyPopper, Sparkles, Camera, Trophy } from "lucide-react";

const activities = [
  { icon: Music, name: "Movie Nights", desc: "Soirées cinéma sous les étoiles", color: "from-purple-400/20 to-purple-900/10", border: "border-purple-400/30", textColor: "text-purple-400", glow: "rgba(192,132,252,0.5)" },
  { icon: Gamepad2, name: "Tournois Gaming", desc: "Compétitions e-sport endiablées", color: "from-blue-400/20 to-blue-900/10", border: "border-blue-400/30", textColor: "text-blue-400", glow: "rgba(96,165,250,0.5)" },
  { icon: PartyPopper, name: "EST Got Talent", desc: "Le show des talents cachés", color: "from-amber-400/20 to-amber-900/10", border: "border-amber-400/30", textColor: "text-amber-400", glow: "rgba(251,191,36,0.5)" },
  { icon: Trophy, name: "Quiz Nights", desc: "Défis culture et bonne humeur", color: "from-emerald-400/20 to-emerald-900/10", border: "border-emerald-400/30", textColor: "text-emerald-400", glow: "rgba(52,211,153,0.5)" },
  { icon: Camera, name: "Paint & Chill", desc: "Ateliers créatifs et détente", color: "from-rose-400/20 to-rose-900/10", border: "border-rose-400/30", textColor: "text-rose-400", glow: "rgba(251,113,133,0.5)" },
  { icon: Sparkles, name: "Surprises", desc: "Des événements inattendus", color: "from-cyan-400/20 to-cyan-900/10", border: "border-cyan-400/30", textColor: "text-cyan-400", glow: "rgba(34,211,238,0.5)" },
];

export default function Activites() {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  
  // L'x katbdel 3la 7sab l'scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  useEffect(() => {
    supabase.from("site_content").select("title, content").eq("page_name", "activites").single().then(({ data }) => setData(data));
  }, []);

  return (
    <div ref={containerRef} className="relative h-[300vh] bg-[#1B2550]">
      
      {/* Hna l'sticky container li kayb9a m7bos */}
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        
        {/* Titre l'fo9 */}
        <div className="absolute top-10 left-0 right-0 text-center z-20 px-6">
          <motion.p initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-400 font-semibold tracking-[0.3em] uppercase text-xs mb-2">
            Explorez la magie
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-4xl md:text-6xl font-black text-white tracking-tighter">
            {data?.title || "Nos Activités"}
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-slate-400 mt-2 max-w-xl mx-auto">
            {data?.content || "Découvrez bientôt toutes les activités organisées par le club."}
          </motion.p>
        </div>

        {/* Les cartes li kayt7arko horizontalement */}
        <motion.div style={{ x }} className="flex gap-8 px-6 pt-40">
          {activities.map((act, i) => {
            const Icon = act.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.05, y: -10, boxShadow: `0 0 60px ${act.glow}` }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className={`relative flex-shrink-0 w-[300px] md:w-[400px] h-[400px] md:h-[500px] p-8 md:p-10 rounded-[3rem] bg-gradient-to-br ${act.color} border ${act.border} backdrop-blur-md flex flex-col justify-between group overflow-hidden`}
              >
                {/* Glow f l'wesat */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: `radial-gradient(circle at 50% 50%, ${act.glow}, transparent 70%)` }} />
                
                <div className="relative z-10">
                  <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                    className={`w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8`}>
                    <Icon size={40} className={act.textColor} />
                  </motion.div>
                  <h2 className="text-3xl font-black text-white tracking-tight mb-2">{act.name}</h2>
                  <p className={`text-lg font-bold ${act.textColor} uppercase tracking-widest mb-4`}>{act.desc}</p>
                </div>

                {/* Numéro f l'asfal */}
                <div className="relative z-10 mt-auto flex items-end justify-between">
                  <span className={`text-6xl font-black opacity-20 ${act.textColor}`}>0{i + 1}</span>
                  <motion.div whileHover={{ scale: 1.2 }} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <Sparkles size={18} className="text-white" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Scroll hint f l'asfal */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
          <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }} className="text-xs uppercase tracking-[0.3em] text-emerald-400">
            → Scroll pour découvrir
          </motion.p>
        </div>
      </div>
    </div>
  );
}
