"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { number: 4, suffix: "", label: "Pôles", desc: "Dimensions complémentaires" },
  { number: 50, suffix: "+", label: "Membres", desc: "Étudiants motivés" },
  { number: 20, suffix: "+", label: "Événements", desc: "Activités organisées" },
  { number: 360, suffix: "°", label: "Vision", desc: "Expérience complète" },
];

export default function StatsSection() {
  return (
    <section className="relative py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <p className="text-emerald-400 font-semibold tracking-[0.3em] uppercase text-xs mb-4">
          En chiffres
        </p>
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
          L'impact du club
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 text-center backdrop-blur-sm hover:border-emerald-400/50 hover:bg-white/[0.06] transition-all duration-500 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/0 via-emerald-400/0 to-emerald-400/0 group-hover:from-emerald-400/5 group-hover:to-emerald-400/10 transition-all duration-500" />
            <div className="relative z-10">
              <div className="text-5xl md:text-6xl font-black text-emerald-400 mb-2 tracking-tighter group-hover:scale-110 transition-transform duration-500 inline-block">
                <Counter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-xl font-bold text-white mb-1">{stat.label}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
