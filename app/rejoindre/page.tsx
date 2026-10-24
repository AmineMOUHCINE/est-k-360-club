"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function Rejoindre() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    filiere: "",
    niveau: "",
    pole: "",
    motivation: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("applications").insert([
      {
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        telephone: form.telephone,
        filiere: form.filiere,
        niveau: form.niveau,
        pole: form.pole,
        motivation: form.motivation,
        status: "en_attente",
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Erreur : " + error.message);
    } else {
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-32 px-6 text-center">
        <div className="bg-green-50 text-green-700 p-8 rounded-3xl border border-green-200">
          <h2 className="text-2xl font-bold mb-2">Merci pour votre candidature !</h2>
          <p>Votre demande a bien été enregistrée. Nous vous contacterons bientôt.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <div className="bg-white/95 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Rejoindre le club</h1>
        <p className="text-slate-600 mb-8">Remplissez ce formulaire pour soumettre votre candidature.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom *</label>
              <input type="text" required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Prénom *</label>
              <input type="text" required value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email *</label>
              <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Téléphone *</label>
              <input type="tel" required value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Filière *</label>
              <input type="text" required value={form.filiere} onChange={(e) => setForm({ ...form, filiere: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Niveau d'étude *</label>
              <input type="text" required value={form.niveau} onChange={(e) => setForm({ ...form, niveau: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Pôle souhaité *</label>
            <select required value={form.pole} onChange={(e) => setForm({ ...form, pole: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
              <option value="">Sélectionnez un pôle</option>
              <option value="GROW">GROW - Compétences & Carrière</option>
              <option value="CONNECT">CONNECT - Liens & Communauté</option>
              <option value="EXPERIENCE">EXPERIENCE - Vie universitaire</option>
              <option value="IMPACT">IMPACT - Engagement social</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Motivation *</label>
            <textarea required rows={4} value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          </div>
          <button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? "Envoi en cours..." : "Envoyer ma candidature"} <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}