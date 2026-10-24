import Link from "next/link";
import { ArrowRight, Briefcase, Users, Star, HeartHandshake } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section - Carte blanche sur fond sombre */}
      <section className="relative py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-lg p-12 rounded-[3rem] shadow-2xl border border-white/20">
          <span className="text-sm font-bold tracking-widest text-blue-600 uppercase">
            EST-K 360 CLUB
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mt-4 mb-6 tracking-tight text-slate-900">
            Un club, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">quatre dimensions.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-700 mb-10 max-w-2xl mx-auto font-medium">
            Grandir dans sa carrière, se lier aux autres, vivre des souvenirs, et agir pour plus large que soi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/rejoindre" 
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              Rejoindre le club <ArrowRight size={20} />
            </Link>
            <Link 
              href="/le-club" 
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 px-8 py-4 rounded-full font-bold transition-all shadow-sm"
            >
              Découvrir le club
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4 Pôles */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 bg-white/90 backdrop-blur-sm inline-block px-8 py-4 rounded-3xl mx-auto border border-white/20 shadow-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Nos 4 Pôles</h2>
          <p className="text-slate-600">Quatre dimensions complémentaires pour une expérience à 360°.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Carte GROW */}
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20 hover:scale-105 transition-transform">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <Briefcase size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">GROW</h3>
            <p className="text-sm font-semibold text-emerald-600 mb-4">Compétences & Carrière</p>
            <p className="text-slate-600 text-sm">Développement personnel, ateliers CV, préparation aux entretiens et opportunités.</p>
          </div>

          {/* Carte CONNECT */}
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20 hover:scale-105 transition-transform">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <Users size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">CONNECT</h3>
            <p className="text-sm font-semibold text-blue-600 mb-4">Liens & Communauté</p>
            <p className="text-slate-600 text-sm">Intégration, speed-friending, parrainage et création d'une communauté soudée.</p>
          </div>

          {/* Carte EXPERIENCE */}
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20 hover:scale-105 transition-transform">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Star size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">EXPERIENCE</h3>
            <p className="text-sm font-semibold text-amber-600 mb-4">Vie universitaire</p>
            <p className="text-slate-600 text-sm">Movie Nights, EST Got Talent, tournois gaming, sorties et événements.</p>
          </div>

          {/* Carte IMPACT */}
          <div className="bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/20 hover:scale-105 transition-transform">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
              <HeartHandshake size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">IMPACT</h3>
            <p className="text-sm font-semibold text-rose-600 mb-4">Engagement social</p>
            <p className="text-slate-600 text-sm">Bénévolat, collectes, actions environnementales et projets à impact local.</p>
          </div>
        </div>
      </section>
    </main>
  );
}