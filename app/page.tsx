import Link from "next/link";
import { ArrowRight, Briefcase, Users, Star, HeartHandshake } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col items-start gap-6 max-w-4xl">
          <span className="text-[#10B981] font-semibold tracking-widest uppercase text-sm border border-[#10B981]/30 px-4 py-2 rounded-full bg-[#10B981]/10">
            EST-K 360 CLUB
          </span>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white">
            Un club, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10B981] to-blue-400">
              quatre dimensions.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl font-light mt-4">
            Grandir dans sa carrière, se lier aux autres, vivre des souvenirs, et agir pour plus large que soi.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/rejoindre" className="bg-[#10B981] text-[#1B2550] px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-400 hover:scale-105 transition-all flex items-center justify-center gap-2">
              Rejoindre le club <ArrowRight size={20} />
            </Link>
            <Link href="/le-club" className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Découvrir le club
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Nos 4 Pôles</h2>
          <p className="text-slate-400 text-lg">Quatre dimensions complémentaires pour une expérience à 360°.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Briefcase size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">GROW</h3>
            <p className="text-emerald-400 font-medium mb-4">Compétences & Carrière</p>
            <p className="text-slate-400 text-lg">Développement personnel, ateliers CV, préparation aux entretiens et opportunités professionnelles.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
            <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Users size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">CONNECT</h3>
            <p className="text-blue-400 font-medium mb-4">Liens & Communauté</p>
            <p className="text-slate-400 text-lg">Intégration, speed-friending, parrainage et création d'une communauté étudiante soudée.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
            <div className="w-16 h-16 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <Star size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">EXPERIENCE</h3>
            <p className="text-purple-400 font-medium mb-4">Vie universitaire</p>
            <p className="text-slate-400 text-lg">Movie Nights, EST Got Talent, tournois gaming, sorties et événements mémorables.</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all group">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
              <HeartHandshake size={32} />
            </div>
            <h3 className="text-3xl font-bold text-white mb-3">IMPACT</h3>
            <p className="text-rose-400 font-medium mb-4">Engagement social</p>
            <p className="text-slate-400 text-lg">Bénévolat, collectes, actions environnementales et projets à impact local.</p>
          </div>
        </div>
      </section>

    </main>
  );
}
