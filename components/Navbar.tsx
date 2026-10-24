"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            EST-K <span className="text-blue-600">360</span>
          </span>
        </Link>

        {/* Liens Desktop (cachés sur mobile) */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">Accueil</Link>
          <Link href="/le-club" className="hover:text-slate-900 transition-colors">Le Club</Link>
          <Link href="/nos-poles" className="hover:text-slate-900 transition-colors">Nos Pôles</Link>
          <Link href="/activites" className="hover:text-slate-900 transition-colors">Activités</Link>
          <Link href="/rejoindre" className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md">
            Rejoindre le club
          </Link>
        </div>

        {/* Bouton Menu Mobile (visible uniquement sur mobile) */}
        <button 
          className="md:hidden text-slate-900 p-2" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Menu déroulant Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-xl">
          <div className="flex flex-col px-6 py-4 space-y-4 font-medium text-slate-700">
            <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Accueil</Link>
            <Link href="/le-club" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Le Club</Link>
            <Link href="/nos-poles" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Nos Pôles</Link>
            <Link href="/activites" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Activités</Link>
            <Link href="/rejoindre" onClick={() => setIsOpen(false)} className="bg-slate-900 text-white text-center px-6 py-3 rounded-xl mt-2">
              Rejoindre le club
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}