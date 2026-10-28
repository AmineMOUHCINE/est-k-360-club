"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Send, User, Briefcase, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const steps = [
  { id: 0, title: "Identité", icon: User },
  { id: 1, title: "Formation", icon: Briefcase },
  { id: 2, title: "Motivation", icon: Sparkles },
];

export default function Rejoindre() {
  const [step, setStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: "", prenom: "", email: "", telephone: "",
    filiere: "", niveau: "", pole: "", motivation: "",
  });

  const handleNext = () => setStep((s) => Math.min(s + 1, 2));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("https://nvecedbwmurdypfzkzyi.supabase.co/functions/v1/super-handler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      
      setIsSubmitted(true);
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.5 }, colors: ["#34d399", "#60a5fa", "#fbbf24", "#fb7185", "#ffffff"] });
    } catch (err: any) {
      alert("Erreur : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ scale: 0.3, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 20, duration: 1 }}
          className="max-w-2xl mx-auto text-center bg-gradient-to-br from-emerald-500/15 to-emerald-700/5 border border-emerald-400/40 rounded-[3rem] p-16 backdrop-blur-md shadow-[0_0_120px_rgba(52,211,153,0.3)]"
        >
          <motion.div
            initial={{ scale: 0, rotate: -360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            className="w-28 h-28 mx-auto mb-8 rounded-full bg-emerald-400 flex items-center justify-center shadow-[0_0_80px_rgba(52,211,153,0.8)]"
          >
            <Check size={56} className="text-[#1B2550]" strokeWidth={3} />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">Merci pour votre candidature !</h2>
          <p className="text-slate-300 text-lg">Votre demande a bien été enregistrée. Nous vous contacterons bientôt.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 max-w-3xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex justify-between mb-4">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            const isDone = i < step;
            return (
              <motion.div key={s.id} animate={{ scale: isActive ? 1.1 : 1 }} className="flex flex-col items-center gap-2 flex-1">
                <motion.div
                  animate={{
                    backgroundColor: isActive || isDone ? "rgb(52, 211, 153)" : "rgba(255,255,255,0.05)",
                    boxShadow: isActive ? "0 0 40px rgba(52,211,153,0.8)" : "none",
                  }}
                  className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10"
                >
                  {isDone ? <Check size={20} className="text-[#1B2550]" strokeWidth={3} /> : <Icon size={20} className={isActive ? "text-[#1B2550]" : "text-slate-400"} />}
                </motion.div>
                <span className={`text-xs font-semibold uppercase tracking-wider ${isActive ? "text-emerald-400" : "text-slate-500"}`}>{s.title}</span>
              </motion.div>
            );
          })}
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div animate={{ width: `${((step + 1) / 3) * 100}%` }} transition={{ type: "spring", stiffness: 100, damping: 20 }} className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300 shadow-[0_0_20px_rgba(52,211,153,0.8)]" />
        </div>
      </motion.div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="step0" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md space-y-6">
              <h2 className="text-3xl font-black mb-8">Qui êtes-vous ?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Nom" value={form.nom} onChange={(v) => setForm({ ...form, nom: v })} />
                <Field label="Prénom" value={form.prenom} onChange={(v) => setForm({ ...form, prenom: v })} />
              </div>
              <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
              <Field label="Téléphone" type="tel" value={form.telephone} onChange={(v) => setForm({ ...form, telephone: v })} />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md space-y-6">
              <h2 className="text-3xl font-black mb-8">Votre parcours</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Filière" value={form.filiere} onChange={(v) => setForm({ ...form, filiere: v })} />
                <Field label="Niveau d'étude" value={form.niveau} onChange={(v) => setForm({ ...form, niveau: v })} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Pôle souhaité</label>
                <div className="grid grid-cols-2 gap-3">
                  {["GROW", "CONNECT", "EXPERIENCE", "IMPACT"].map((p) => (
                    <motion.button key={p} type="button" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => setForm({ ...form, pole: p })} className={`p-4 rounded-2xl border font-bold transition-all ${form.pole === p ? "bg-emerald-400 text-[#1B2550] border-emerald-400 shadow-[0_0_40px_rgba(52,211,153,0.6)]" : "bg-white/[0.03] border-white/10 text-white hover:border-emerald-400/50"}`}>{p}</motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-md space-y-6">
              <h2 className="text-3xl font-black mb-8">Dernière étape</h2>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">Motivation</label>
                <textarea required rows={6} value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} placeholder="Pourquoi rejoindre EST-K 360 ?" className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white placeholder-slate-500 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 outline-none transition-all resize-none" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between items-center mt-8 gap-4">
          <motion.button type="button" onClick={handlePrev} disabled={step === 0} whileHover={{ scale: step === 0 ? 1 : 1.05 }} whileTap={{ scale: step === 0 ? 1 : 0.95 }} className={`flex items-center gap-2 px-6 py-4 rounded-full font-bold transition-all ${step === 0 ? "opacity-0 pointer-events-none" : "bg-white/5 border border-white/10 text-white hover:bg-white/10"}`}>
            <ArrowLeft size={20} /> Précédent
          </motion.button>
          {step < 2 ? (
            <motion.button type="button" onClick={handleNext} whileHover={{ scale: 1.05, boxShadow: "0 0 50px rgba(52,211,153,0.8)" }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-emerald-400 text-[#1B2550] shadow-[0_0_30px_rgba(52,211,153,0.4)] transition-all">
              Suivant <ArrowRight size={20} />
            </motion.button>
          ) : (
            <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.05, boxShadow: "0 0 60px rgba(52,211,153,0.9)" }} whileTap={{ scale: loading ? 1 : 0.95 }} className="flex items-center gap-2 px-8 py-4 rounded-full font-bold bg-emerald-400 text-[#1B2550] shadow-[0_0_40px_rgba(52,211,153,0.6)] disabled:opacity-50 transition-all">
              {loading ? "Envoi..." : <>Envoyer <Send size={20} /></>}
            </motion.button>
          )}
        </div>
      </form>
    </div>
  );
}

function Field({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="relative">
      <label className="block text-sm font-semibold text-slate-400 mb-2 uppercase tracking-wider">{label}</label>
      <input type={type} required value={value} onChange={(e) => onChange(e.target.value)} className="w-full p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30 outline-none transition-all" />
    </div>
  );
}
