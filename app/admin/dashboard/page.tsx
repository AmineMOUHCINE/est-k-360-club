"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, CheckCircle, XCircle, Clock, Users, Save, Edit3, Download, Eye, X, Trash2, Zap, MessageCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

type Application = {
  id: string; nom: string; prenom: string; email: string; telephone: string;
  filiere: string; niveau: string; pole: string; motivation: string; status: string; created_at: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"candidatures" | "contenu">("candidatures");
  
  const [apps, setApps] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const [leClubContent, setLeClubContent] = useState({ title: "", content: "" });
  const [activitesContent, setActivitesContent] = useState({ title: "", content: "" });
  const [loadingContent, setLoadingContent] = useState(true);
  const [savingContent, setSavingContent] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) router.push("/admin/login");
    };
    checkAuth();
  }, [router]);

  async function fetchApps() {
    const { data } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
    setApps(data || []);
    setLoadingApps(false);
  }

  async function fetchContent() {
    const { data } = await supabase.from("site_content").select("*");
    if (data) {
      const lc = data.find((d) => d.page_name === "le-club");
      const act = data.find((d) => d.page_name === "activites");
      if (lc) setLeClubContent({ title: lc.title, content: lc.content });
      if (act) setActivitesContent({ title: act.title, content: act.content });
    }
    setLoadingContent(false);
  }

  useEffect(() => { fetchApps(); fetchContent(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("applications").update({ status }).eq("id", id);
    if (!error) fetchApps();
    else alert("Erreur : " + error.message);
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Supprimer cette candidature ?")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (!error) fetchApps();
  };

  // ⚠️ FONCTION JDIDA: WHATSAPP
  const sendWhatsAppMessage = (app: Application) => {
    // 1. Format dyal l'numéro (7ayed les espaces, l'0 f l'awal, zid 212)
    let cleaned = app.telephone.replace(/\D/g, "");
    if (cleaned.startsWith("0")) {
      cleaned = "212" + cleaned.substring(1);
    } else if (!cleaned.startsWith("212")) {
      cleaned = "212" + cleaned;
    }

    // 2. L'message dyal l'acceptation
    const message = `Félicitations ${app.prenom} ${app.nom} ! 🎉\n\nVotre candidature pour le pôle ${app.pole} au sein du club EST-K 360 a bien été acceptée.\n\nBienvenue parmi nous ! Nous vous contacterons très bientôt pour les prochaines étapes.\n\nL'équipe EST-K 360 Club`;

    // 3. Fta7 WhatsApp
    const url = `https://wa.me/${cleaned}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const saveContent = async (pageName: string, title: string, content: string) => {
    setSavingContent(true);
    const { data, error } = await supabase.from("site_content")
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq("page_name", pageName).select();
    setSavingContent(false);
    if (error) alert("Erreur Supabase : " + error.message);
    else if (!data || data.length === 0) alert("❌ Échec : La page n'existe pas.");
    else alert("✅ Page " + pageName + " sauvegardée !");
  };

  const downloadExcel = () => {
    if (apps.length === 0) return alert("Aucune candidature.");
    let html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"><style>table{border-collapse:collapse;width:100%}th{background:#1B2550;color:#fff;padding:10px}td{border:1px solid #ccc;padding:8px;text-align:center}</style></head>
      <body><h2 style="text-align:center;color:#1B2550">EST-K 360 CLUB</h2><table><thead><tr><th>Nom</th><th>Email</th><th>Téléphone</th><th>Pôle</th><th>Statut</th></tr></thead><tbody>
    `;
    apps.forEach((a) => { html += `<tr><td>${a.nom} ${a.prenom}</td><td>${a.email}</td><td>${a.telephone}</td><td>${a.pole}</td><td>${a.status}</td></tr>`; });
    html += `</tbody></table></body></html>`;
    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Candidatures_ESTK360.xls`;
    link.click();
  };

  const stats = {
    total: apps.length,
    attente: apps.filter((a) => a.status === "en_attente").length,
    accepte: apps.filter((a) => a.status === "accepte").length,
    refuse: apps.filter((a) => a.status === "refuse").length,
  };

  const badge = (status: string) => {
    const map: Record<string, { label: string; cls: string }> = {
      en_attente: { label: "En attente", cls: "bg-amber-500/20 text-amber-400 border border-amber-500/30" },
      accepte: { label: "Accepté", cls: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" },
      refuse: { label: "Refusé", cls: "bg-rose-500/20 text-rose-400 border border-rose-500/30" },
    };
    const b = map[status] || map.en_attente;
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.cls}`}>{b.label}</span>;
  };

  if (loadingApps || loadingContent) return (
    <div className="min-h-screen flex items-center justify-center bg-[#1B2550] text-cyan-400">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
        <Zap size={48} />
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1B2550] p-8 relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none -z-10">
        <motion.div animate={{ x: [0, 100, 0], y: [0, -100, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
        <motion.div animate={{ x: [0, -100, 0], y: [0, 100, 0] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter mb-1">Tableau de Bord</h1>
            <p className="text-cyan-400 font-semibold tracking-widest uppercase text-xs">EST-K 360 Admin</p>
          </div>
          <button onClick={async () => { await supabase.auth.signOut(); router.push("/admin/login"); }} className="flex items-center gap-2 bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-3 rounded-full font-bold hover:bg-red-500 hover:text-white transition-all shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <LogOut size={18} /> Déconnexion
          </button>
        </div>

        <div className="flex gap-4 mb-10">
          <button onClick={() => setActiveTab("candidatures")} className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === "candidatures" ? "bg-cyan-400 text-[#1B2550] shadow-[0_0_30px_rgba(6,182,212,0.5)]" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}>
            <Users size={18} /> Candidatures
          </button>
          <button onClick={() => setActiveTab("contenu")} className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${activeTab === "contenu" ? "bg-purple-500 text-white shadow-[0_0_30px_rgba(139,92,246,0.5)]" : "bg-white/5 text-slate-400 hover:bg-white/10"}`}>
            <Edit3 size={18} /> Gestion du Contenu
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "candidatures" && (
            <motion.div key="candidatures" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                {[
                  { label: "Total", val: stats.total, icon: Users, color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/30", glow: "shadow-[0_0_30px_rgba(6,182,212,0.15)]" },
                  { label: "En attente", val: stats.attente, icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", glow: "shadow-[0_0_30px_rgba(245,158,11,0.15)]" },
                  { label: "Acceptés", val: stats.accepte, icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", glow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]" },
                  { label: "Refusés", val: stats.refuse, icon: XCircle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/30", glow: "shadow-[0_0_30px_rgba(244,63,94,0.15)]" }
                ].map((s, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.02 }} className={`p-6 rounded-3xl bg-white/5 backdrop-blur-xl border ${s.border} ${s.glow} relative overflow-hidden`}>
                    <div className={`absolute top-0 right-0 w-24 h-24 ${s.bg} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2`} />
                    <div className="text-slate-400 mb-2 font-semibold">{s.label}</div>
                    <div className={`text-4xl font-black ${s.color} flex items-center gap-3 relative z-10`}>
                      <s.icon size={28} /> {s.val}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-bold text-white">Liste des Candidatures</h2>
                  <button onClick={downloadExcel} className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-6 py-3 rounded-xl hover:bg-emerald-500 hover:text-white transition-all font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Download size={18} /> Télécharger Excel
                  </button>
                </div>
                
                {apps.length === 0 ? (
                  <p className="text-slate-400 text-center py-12">Aucune candidature pour le moment.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-xs">
                          <th className="p-4 text-left font-semibold">Nom</th>
                          <th className="p-4 text-left font-semibold">Email</th>
                          <th className="p-4 text-left font-semibold">Pôle</th>
                          <th className="p-4 text-left font-semibold">Statut</th>
                          <th className="p-4 text-left font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {apps.map((a, i) => (
                          <motion.tr key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                            <td className="p-4 font-bold text-white">{a.nom} {a.prenom}</td>
                            <td className="p-4 text-slate-300">{a.email}</td>
                            <td className="p-4 text-slate-300"><span className="px-2 py-1 bg-white/10 rounded-md text-xs">{a.pole}</span></td>
                            <td className="p-4">{badge(a.status)}</td>
                            <td className="p-4 flex gap-2 flex-wrap">
                              <button onClick={() => updateStatus(a.id, "accepte")} className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-500 hover:text-white transition-all">Accepter</button>
                              <button onClick={() => updateStatus(a.id, "refuse")} className="bg-rose-500/10 text-rose-400 border border-rose-500/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-500 hover:text-white transition-all">Refuser</button>
                              
                              {/* ⚠️ BOUTON WHATSAPP */}
                              <button onClick={() => sendWhatsAppMessage(a)} className="bg-green-500/10 text-green-400 border border-green-500/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-green-500 hover:text-white transition-all flex items-center gap-1">
                                <MessageCircle size={14} /> WhatsApp
                              </button>

                              <button onClick={() => setSelectedApp(a)} className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-cyan-500 hover:text-white transition-all flex items-center gap-1"><Eye size={14} /> Détails</button>
                              <button onClick={() => deleteApp(a.id)} className="bg-red-500/10 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition-all flex items-center gap-1"><Trash2 size={14} /> Suppr.</button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === "contenu" && (
            <motion.div key="contenu" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="space-y-8">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="w-2 h-8 bg-cyan-400 rounded-full"></span> Page "Le Club"</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Titre de la page</label>
                    <input type="text" value={leClubContent.title} onChange={(e) => setLeClubContent({ ...leClubContent, title: e.target.value })} className="w-full p-4 rounded-xl bg-[#1B2550]/50 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Contenu (texte)</label>
                    <textarea rows={5} value={leClubContent.content} onChange={(e) => setLeClubContent({ ...leClubContent, content: e.target.value })} className="w-full p-4 rounded-xl bg-[#1B2550]/50 border border-white/10 text-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"></textarea>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => saveContent("le-club", leClubContent.title, leClubContent.content)} disabled={savingContent} className="flex items-center gap-2 bg-cyan-400 text-[#1B2550] px-8 py-3 rounded-xl font-bold hover:bg-cyan-300 transition-all shadow-[0_0_30px_rgba(6,182,212,0.4)] disabled:opacity-50">
                    <Save size={18} /> {savingContent ? "Sauvegarde..." : "Sauvegarder"}
                  </motion.button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><span className="w-2 h-8 bg-purple-500 rounded-full"></span> Page "Nos Activités"</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Titre de la page</label>
                    <input type="text" value={activitesContent.title} onChange={(e) => setActivitesContent({ ...activitesContent, title: e.target.value })} className="w-full p-4 rounded-xl bg-[#1B2550]/50 border border-white/10 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">Contenu (texte)</label>
                    <textarea rows={5} value={activitesContent.content} onChange={(e) => setActivitesContent({ ...activitesContent, content: e.target.value })} className="w-full p-4 rounded-xl bg-[#1B2550]/50 border border-white/10 text-white focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 outline-none transition-all"></textarea>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => saveContent("activites", activitesContent.title, activitesContent.content)} disabled={savingContent} className="flex items-center gap-2 bg-purple-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-400 transition-all shadow-[0_0_30px_rgba(139,92,246,0.4)] disabled:opacity-50">
                    <Save size={18} /> {savingContent ? "Sauvegarde..." : "Sauvegarder"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      <AnimatePresence>
        {selectedApp && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={() => setSelectedApp(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={(e) => e.stopPropagation()} className="bg-[#1B2550] border border-cyan-500/30 rounded-[2rem] shadow-[0_0_80px_rgba(6,182,212,0.2)] max-w-lg w-full p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <button onClick={() => setSelectedApp(null)} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors z-10"><X size={24} /></button>
              <h2 className="text-2xl font-black text-white mb-6 relative z-10">Détails du Candidat</h2>
              <div className="space-y-4 text-slate-300 relative z-10">
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-400">Nom complet</span> <span className="font-bold text-white">{selectedApp.nom} {selectedApp.prenom}</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-400">Email</span> <span className="font-bold text-cyan-400">{selectedApp.email}</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-400">Téléphone</span> <span className="font-bold text-white">{selectedApp.telephone}</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-400">Filière</span> <span className="font-bold text-white">{selectedApp.filiere} ({selectedApp.niveau})</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-400">Pôle</span> <span className="font-bold text-white">{selectedApp.pole}</span></div>
                <div className="flex justify-between border-b border-white/10 pb-2"><span className="text-slate-400">Statut</span> {badge(selectedApp.status)}</div>
                <div className="bg-white/5 p-4 rounded-xl mt-6 border border-white/5">
                  <p className="text-xs font-bold text-cyan-400 mb-2 uppercase tracking-wider">Motivation :</p>
                  <p className="text-sm leading-relaxed">{selectedApp.motivation}</p>
                </div>
                
                {/* BOUTON WHATSAPP F L'MODAL */}
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => sendWhatsAppMessage(selectedApp)} className="w-full mt-6 bg-green-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
                  <MessageCircle size={20} /> Envoyer un message WhatsApp
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
