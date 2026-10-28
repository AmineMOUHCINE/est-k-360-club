"use client";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}

export default function MagneticButton({ href, children, primary }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = e.clientX - (left + width / 2);
    const y = e.clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <Link
        href={href}
        className={`inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 ${
          primary
            ? "bg-emerald-400 text-[#1B2550] hover:bg-emerald-300 hover:shadow-[0_0_40px_rgba(52,211,153,0.5)]"
            : "bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:border-emerald-400/50"
        }`}
      >
        {children}
      </Link>
    </motion.div>
  );
}
