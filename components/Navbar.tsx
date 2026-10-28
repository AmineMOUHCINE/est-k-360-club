"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagicLogo from "./MagicLogo";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/le-club", label: "Le Club" },
  { href: "/nos-poles", label: "Nos Pôles" },
  { href: "/activites", label: "Activités" },
];

function MagneticLink({ href, label }: { href: string; label: string }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPos({
          x: (e.clientX - (rect.left + rect.width / 2)) * 0.3,
          y: (e.clientY - (rect.top + rect.height / 2)) * 0.3,
        });
      }}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <Link href={href} className="hover:text-emerald-400 transition-colors font-medium">
        {label}
      </Link>
    </motion.div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1B2550]/70 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4" onClick={() => setIsOpen(false)}>
          <MagicLogo />
          <span className="text-3xl font-black text-white tracking-tighter hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-white to-emerald-400">
            EST-K 360
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 text-slate-300">
          {links.map((link) => (
            <MagneticLink key={link.href} {...link} />
          ))}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/rejoindre"
              className="bg-emerald-400 hover:bg-emerald-300 text-[#1B2550] px-6 py-3 rounded-full font-bold shadow-[0_0_30px_rgba(52,211,153,0.5)] transition-all"
            >
              Rejoindre
            </Link>
          </motion.div>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="md:hidden bg-[#1B2550] border-t border-white/10"
        >
          <div className="flex flex-col px-6 py-6 space-y-4 font-medium text-slate-300">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link href="/rejoindre" onClick={() => setIsOpen(false)} className="bg-emerald-400 text-[#1B2550] text-center px-6 py-4 rounded-xl font-bold">
              Rejoindre
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
