import { Briefcase, Users, Star, HeartHandshake } from "lucide-react";

export default function NosPoles() {
  return (
    <div className="max-w-6xl mx-auto py-24 px-6">
      <div className="text-center mb-16">
        {/* TITRE EN BLANC */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">Nos 4 Pôles</h1>
        {/* SOUS-TITRE EN GRIS CLAIR */}
        <p className="text-slate-200 max-w-2xl mx-auto text-lg">Quatre dimensions complémentaires pour une expérience à 360°.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Cartes (gardent leur fond blanc) */}
        <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/20">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6"><Briefcase size={32} /></div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900">GROW</h2>
          <p className="text-emerald-600 font-semibold mb-4">Compétences & Carrière</p>
          <p className="text-slate-600">Ateliers CV et LinkedIn, préparation aux entretiens, prise de parole, leadership, langues, entrepreneuriat, rencontres professionnelles et conférences.</p>
        </div>
        
        <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/20">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Users size={32} /></div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900">CONNECT</h2>
          <p className="text-blue-600 font-semibold mb-4">Liens & Communauté</p>
          <p className="text-slate-600">Activités d'intégration, Coffee & Connect, speed-friending, parrainage, team building et rencontres entre filières.</p>
        </div>
        
        <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/20">
          <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6"><Star size={32} /></div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900">EXPERIENCE</h2>
          <p className="text-amber-600 font-semibold mb-4">Vie universitaire & souvenirs</p>
          <p className="text-slate-600">Movie Nights, EST Got Talent, tournois gaming, Quiz Nights, Escape Games, Paint & Chill, activités sportives et excursions.</p>
        </div>
        
        <div className="bg-white/95 backdrop-blur-md p-10 rounded-3xl shadow-xl border border-white/20">
          <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6"><HeartHandshake size={32} /></div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900">IMPACT</h2>
          <p className="text-rose-600 font-semibold mb-4">Engagement social</p>
          <p className="text-slate-600">Bénévolat, collectes, actions environnementales, plantation d'arbres, soutien scolaire et projets à impact local.</p>
        </div>
      </div>
    </div>
  );
}