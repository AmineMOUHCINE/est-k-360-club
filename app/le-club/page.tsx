"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

function AnimatedWord({ word, progress, start, end }: { word: string; progress: any; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const color = useTransform(progress, [start, end], ["#475569", "#34d399"]);
  return (
    <motion.span style={{ opacity, color }} className="inline-block mx-2">
      {word}
    </motion.span>
  );
}

export default function LeClub() {
  const [data, setData] = useState<{ title: string; content: string } | null>(null);
  const [particles, setParticles] = useState<{ x: number; y: number; delay: number; duration: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });

  useEffect(() => {
    supabase
      .from("site_content")
      .select("title, content")
      .eq("page_name", "le-club")
      .single()
      .then(({ data }) => setData(data));

    // Hna l'particules kaytsaybo f l'client ghir (bla window)
    const newParticles = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * 100, // N3tiwha pourcentage (0-100%)
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
    }));
    setParticles(newParticles);
  }, []);

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);

  const words = (data?.content || "La page de présentation du club arrive bientôt !").split(" ");

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center px-6 overflow-hidden">
        <motion.div
          style={{ scale, opacity: fadeOut }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-black mb-12 tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            {data?.title || "Le Club"}
          </h1>
          <p className="text-2xl md:text-4xl leading-relaxed flex flex-wrap justify-center gap-x-2 gap-y-2">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + 1 / words.length;
              return (
                <AnimatedWord
                  key={i}
                  word={word}
                  progress={scrollYProgress}
                  start={start}
                  end={end}
                />
              );
            })}
          </p>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%` }} // Hna kheddama b %
            animate={{
              y: [-20, -200],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
