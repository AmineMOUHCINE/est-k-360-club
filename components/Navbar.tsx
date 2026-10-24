"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#1B2550]/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="relative w-12 h-12">
             <Image src="/logo-estk.png" alt="EST-K 360 Logo" fill className="object-contain" />
          </div>
          <span className="text-2xl font-black text-white tracking-tighter hidden sm:block">
            EST-K 360
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10 font-medium text-slate-300">
          <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
          <Link href="/le-club" className="hover:text-white transition-colors">Le Club</Link>
          <Link href="/nos-poles" className="hover:text-white transition-colors">Nos Pôles</Link>
          <Link href="/activites" className="hover:text-white transition-colors">Activités</Link>
          <Link href="/rejoindre" className="bg-[#10B981] hover:bg-emerald-400 text-[#1B2550] px-6 py-3 rounded-full font-bold transition-all shadow-lg hover:scale-105">
            Rejoindre le club
          </Link>
        </div>

        <button className="md:hidden text-white p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#1B2550] border-t border-white/10 absolute w-full shadow-2xl">
          <div className="flex flex-col px-6 py-6 space-y-6 font-medium text-slate-300">
            <Link href="/" onClick={() => setIsOpen(false)}>Accueil</Link>
            <Link href="/le-club" onClick={() => setIsOpen(false)}>Le Club</Link>
            <Link href="/nos-poles" onClick={() => setIsOpen(false)}>Nos Pôles</Link>
            <Link href="/activites" onClick={() => setIsOpen(false)}>Activités</Link>
            <Link href="/rejoindre" onClick={() => setIsOpen(false)} className="bg-[#10B981] text-[#1B2550] text-center px-6 py-4 rounded-xl font-bold">
              Rejoindre le club
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
