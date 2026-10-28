import { Github, Linkedin, Mail, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#1B2550]/30 backdrop-blur-xl border-t border-white/10 mt-10 py-6">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ROW 1: Logo & Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white tracking-tight">EST-K 360 CLUB</h3>
            <p className="text-slate-400 text-xs">Un club, quatre dimensions.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400 font-medium">
            <Link href="/le-club" className="hover:text-cyan-400 transition-colors">Le Club</Link>
            <Link href="/nos-poles" className="hover:text-cyan-400 transition-colors">Nos Pôles</Link>
            <Link href="/activites" className="hover:text-cyan-400 transition-colors">Activités</Link>
            <Link href="/rejoindre" className="hover:text-cyan-400 transition-colors">Rejoindre</Link>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mb-6"></div>

        {/* ROW 2: DEVELOPPEUR vs CLUB (Centrés) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* PARTIE GAUCHE : DÉVELOPPEUR */}
          <div className="flex flex-col items-center md:items-end md:pr-10 md:border-r border-white/10">
            <p className="text-xs text-slate-400 mb-1 uppercase tracking-widest font-semibold">Développé par</p>
            <h4 className="text-lg font-bold text-white mb-3">Amine MOUHCINE</h4>
            <div className="flex gap-2">
              <a 
                href="https://github.com/AmineMOUHCINE" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/5 p-2.5 rounded-xl hover:bg-cyan-500/20 hover:text-cyan-400 text-slate-400 transition-all hover:scale-110"
                title="GitHub"
              >
                <Github size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/amine-mouhcine-29453a405/" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/5 p-2.5 rounded-xl hover:bg-blue-500/20 hover:text-blue-400 text-slate-400 transition-all hover:scale-110"
                title="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="mailto:aminemohcine379@gmail.com" 
                className="bg-white/5 p-2.5 rounded-xl hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-all hover:scale-110"
                title="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* PARTIE DROITE : CONTACT DU CLUB */}
          <div className="flex flex-col items-center md:items-start md:pl-10 mt-4 md:mt-0">
            <p className="text-xs text-slate-400 mb-1 uppercase tracking-widest font-semibold">Contactez le Club</p>
            <h4 className="text-lg font-bold text-white mb-3">EST-K 360 CLUB</h4>
            <div className="flex gap-2">
              <a 
                href="https://www.instagram.com/360club_estk/" 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/5 p-2.5 rounded-xl hover:bg-pink-500/20 hover:text-pink-400 text-slate-400 transition-all hover:scale-110"
                title="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="mailto:estk.club360@gmail.com" 
                className="bg-white/5 p-2.5 rounded-xl hover:bg-rose-500/20 hover:text-rose-400 text-slate-400 transition-all hover:scale-110"
                title="Email du Club"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* ROW 3: Copyright */}
        <div className="border-t border-white/10 mt-6 pt-4 text-center">
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} EST-K 360 CLUB. Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  );
}
