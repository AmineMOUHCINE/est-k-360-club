import Link from "next/link";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo & Nom */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-slate-900 tracking-tighter">
            EST-K <span className="text-blue-600">360</span>
          </span>
        </Link>

        {/* Liens Desktop */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <Link href="/" className="hover:text-slate-900 transition-colors">Accueil</Link>
          <Link href="/le-club" className="hover:text-slate-900 transition-colors">Le Club</Link>
          <Link href="/nos-poles" className="hover:text-slate-900 transition-colors">Nos Pôles</Link>
          <Link href="/activites" className="hover:text-slate-900 transition-colors">Activités</Link>
        </div>

        {/* Bouton CTA */}
        <div className="hidden md:block">
          <Link 
            href="/rejoindre" 
            className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-md"
          >
            Rejoindre le club
          </Link>
        </div>

        {/* Menu Mobile (icône) */}
        <button className="md:hidden text-slate-900">
          <Menu size={28} />
        </button>
        
      </div>
    </nav>
  );
}