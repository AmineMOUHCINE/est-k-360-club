import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-10 mt-16 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Ligne du haut : Liens */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-1">EST-K 360 CLUB</h3>
            <p className="text-slate-400 text-sm">Un club, quatre dimensions.</p>
          </div>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="/le-club" className="hover:text-white transition-colors">Le Club</a>
            <a href="/nos-poles" className="hover:text-white transition-colors">Nos Pôles</a>
            <a href="/activites" className="hover:text-white transition-colors">Activités</a>
            <a href="/rejoindre" className="hover:text-white transition-colors">Rejoindre</a>
          </div>
        </div>

        {/* Ligne du milieu : Signature au centre */}
        <div className="border-t border-slate-800 pt-8 pb-8 flex flex-col items-center justify-center text-center">
          <p className="text-sm text-slate-400 mb-3">
            Développé par <span className="text-white font-bold text-lg">Amine MOUHCINE</span>
          </p>
          <div className="flex gap-4">
            <a 
              href="https://github.com/AmineMOUHCINE" 
              target="_blank" 
              rel="noreferrer"
              className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700 hover:text-white text-slate-400 transition-all hover:scale-110"
              title="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/amine-mouhcine-29453a405/" 
              target="_blank" 
              rel="noreferrer"
              className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700 hover:text-blue-400 text-slate-400 transition-all hover:scale-110"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:aminemohcine379@gmail.com" 
              className="bg-slate-800 p-3 rounded-xl hover:bg-slate-700 hover:text-rose-400 text-slate-400 transition-all hover:scale-110"
              title="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Ligne du bas : Copyright */}
        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} EST-K 360 CLUB. Tous droits réservés.
          </p>
        </div>

      </div>
    </footer>
  );
}