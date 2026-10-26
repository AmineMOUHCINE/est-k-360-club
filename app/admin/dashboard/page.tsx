"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, CheckCircle, XCircle, Clock, Users, Save, Edit3, Download, Eye, X, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

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

  // ⚠️ FONCTION JDIDA DYAL SUPPRESSION
  const deleteApp = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer définitivement cette candidature ?")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (!error) fetchApps();
    else alert("Erreur lors de la suppression : " + error.message);
  };

  const saveContent = async (pageName: string, title: string, content: string) => {
    setSavingContent(true);
    const { data, error } = await supabase.from("site_content")
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq("page_name", pageName).select();
    setSavingContent(false);
    if (error) alert("Erreur Supabase : " + error.message);
    else if (!data || data.length === 0) alert("❌ Échec : La page '" + pageName + "' n'existe pas dans la base.");
    else alert("✅ Succès : Page " + pageName + " sauvegardée !");
  };

  const downloadExcel = () => {
    if (apps.length === 0) return alert("Aucune candidature à télécharger.");
    let html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th { background-color: #1B2550; color: #ffffff; padding: 12px; border: 1px solid #cccccc; text-align: center; font-weight: bold; }
          td { padding: 10px; border: 1px solid #cccccc; color: #333333; text-align: center; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .header-container { text-align: center; margin-bottom: 30px; }
          .logo { width: 120px; height: 120px; margin-bottom: 10px; }
          .club-name { font-size: 28px; font-weight: bold; color: #1B2550; margin: 0; padding: 0; letter-spacing: 1px; }
          .subtitle { font-size: 16px; color: #000000; margin-top: 5px; font-weight: normal; }
        </style>
      </head>
      <body>
        <div class="header-container">
          <img src="logo-estk.png" class="logo" alt="Logo" />
          <div class="club-name">EST-K 360 CLUB</div>
          <div class="subtitle">Liste des Candidatures - ${new Date().toLocaleDateString("fr-FR")}</div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nom & Prénom</th><th>Email</th><th>Téléphone</th><th>Filière</th>
              <th>Niveau</th><th>Pôle</th><th>Statut</th><th>Date d'inscription</th>
            </tr>
          </thead>
          <tbody>
    `;
    apps.forEach((a) => {
      const statusColors: Record<string, string> = { en_attente: "color: #F59E0B; font-weight: bold;", accepte: "color: #10B981; font-weight: bold;", refuse: "color: #EF4444; font-weight: bold;" };
      const statusLabels: Record<string, string> = { en_attente: "En attente", accepte: "Accepté", refuse: "Refusé" };
      html += `
        <tr>
          <td>${a.nom} ${a.prenom}</td><td>${a.email}</td><td>${a.telephone}</td>
          <td>${a.filiere}</td><td>${a.niveau}</td><td>${a.pole}</td>
          <td style="${statusColors[a.status] || ""}">${statusLabels[a.status] || a.status}</td>
          <td>${new Date(a.created_at).toLocaleDateString("fr-FR")}</td>
        </tr>
      `;
    });
    html += `</tbody></table></body></html>`;
    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Candidatures_ESTK360_${new Date().toISOString().split("T")[0]}.xls`;
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
      en_attente: { label: "En attente", cls: "bg-amber-100 text-amber-700" },
      accepte: { label: "Accepté", cls: "bg-emerald-100 text-emerald-700" },
      refuse: { label: "Refusé", cls: "bg-rose-100 text-rose-700" },
    };
    const b = map[status] || map.en_attente;
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${b.cls}`}>{b.label}</span>;
  };

  if (loadingApps || loadingContent) return <div className="min-h-screen flex items-center justify-center text-white bg-[#1B2550]">Chargement...</div>;

  return (
    <div className="min-h-screen bg-[#1B2550] p-8 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Tableau de Bord</h1>
          <button onClick={async () => { await supabase.auth.signOut(); router.push("/admin/login"); }} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600">
            <LogOut size={18} /> Déconnexion
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button onClick={() => setActiveTab("candidatures")} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "candidatures" ? "bg-white text-[#1B2550]" : "bg-white/10 text-white hover:bg-white/20"}`}>
            <Users size={18} className="inline mr-2" /> Candidatures
          </button>
          <button onClick={() => setActiveTab("contenu")} className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "contenu" ? "bg-white text-[#1B2550]" : "bg-white/10 text-white hover:bg-white/20"}`}>
            <Edit3 size={18} className="inline mr-2" /> Gestion du Contenu
          </button>
        </div>

        {activeTab === "candidatures" && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-slate-500 mb-2">Total</div>
                <div className="text-3xl font-bold text-slate-900 flex items-center gap-2"><Users size={24} /> {stats.total}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-slate-500 mb-2">En attente</div>
                <div className="text-3xl font-bold text-amber-500 flex items-center gap-2"><Clock size={24} /> {stats.attente}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-slate-500 mb-2">Acceptés</div>
                <div className="text-3xl font-bold text-emerald-500 flex items-center gap-2"><CheckCircle size={24} /> {stats.accepte}</div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="text-slate-500 mb-2">Refusés</div>
                <div className="text-3xl font-bold text-rose-500 flex items-center gap-2"><XCircle size={24} /> {stats.refuse}</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-slate-900">Liste des Candidatures</h2>
                <button onClick={downloadExcel} className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors text-sm font-bold">
                  <Download size={18} /> Télécharger Excel
                </button>
              </div>
              
              {apps.length === 0 ? (
                <p className="text-slate-500 text-center py-8">Aucune candidature pour le moment.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100 text-slate-700">
                      <tr>
                        <th className="p-3 text-left">Nom</th><th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Filière</th><th className="p-3 text-left">Pôle</th>
                        <th className="p-3 text-left">Statut</th><th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-900">
                      {apps.map((a) => (
                        <tr key={a.id} className="border-b border-slate-200 hover:bg-slate-50">
                          <td className="p-3 font-medium">{a.nom} {a.prenom}</td>
                          <td className="p-3">{a.email}</td>
                          <td className="p-3">{a.filiere} ({a.niveau})</td>
                          <td className="p-3">{a.pole}</td>
                          <td className="p-3">{badge(a.status)}</td>
                          <td className="p-3 flex gap-2 flex-wrap">
                            <button onClick={() => updateStatus(a.id, "accepte")} className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-emerald-600">Accepter</button>
                            <button onClick={() => updateStatus(a.id, "refuse")} className="bg-rose-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-rose-600">Refuser</button>
                            <button onClick={() => setSelectedApp(a)} className="bg-slate-700 text-white px-3 py-1 rounded-lg text-xs hover:bg-slate-800 flex items-center gap-1"><Eye size={12} /> Détails</button>
                            {/* ⚠️ BOUTON JDID DYAL SUPPRESSION */}
                            <button onClick={() => deleteApp(a.id)} className="bg-red-700 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-800 flex items-center gap-1"><Trash2 size={12} /> Supprimer</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}

        {activeTab === "contenu" && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Page "Le Club"</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Titre de la page</label>
                  <input type="text" value={leClubContent.title} onChange={(e) => setLeClubContent({ ...leClubContent, title: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contenu (texte)</label>
                  <textarea rows={6} value={leClubContent.content} onChange={(e) => setLeClubContent({ ...leClubContent, content: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"></textarea>
                </div>
                <button onClick={() => saveContent("le-club", leClubContent.title, leClubContent.content)} disabled={savingContent} className="flex items-center gap-2 bg-[#1B2550] text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50">
                  <Save size={18} /> {savingContent ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Page "Nos Activités"</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Titre de la page</label>
                  <input type="text" value={activitesContent.title} onChange={(e) => setActivitesContent({ ...activitesContent, title: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contenu (texte)</label>
                  <textarea rows={6} value={activitesContent.content} onChange={(e) => setActivitesContent({ ...activitesContent, content: e.target.value })} className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"></textarea>
                </div>
                <button onClick={() => saveContent("activites", activitesContent.title, activitesContent.content)} disabled={savingContent} className="flex items-center gap-2 bg-[#1B2550] text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50">
                  <Save size={18} /> {savingContent ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 relative">
            <button onClick={() => setSelectedApp(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800"><X size={24} /></button>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Détails du Candidat</h2>
            <div className="space-y-4 text-slate-700">
              <p><strong>Nom :</strong> {selectedApp.nom} {selectedApp.prenom}</p>
              <p><strong>Email :</strong> {selectedApp.email}</p>
              <p><strong>Téléphone :</strong> {selectedApp.telephone}</p>
              <p><strong>Filière :</strong> {selectedApp.filiere} ({selectedApp.niveau})</p>
              <p><strong>Pôle :</strong> {selectedApp.pole}</p>
              <p><strong>Date :</strong> {new Date(selectedApp.created_at).toLocaleString("fr-FR")}</p>
              <p><strong>Statut :</strong> {badge(selectedApp.status)}</p>
              <div className="bg-slate-100 p-4 rounded-xl mt-4">
                <p className="text-sm font-bold mb-2">Motivation :</p>
                <p className="text-sm">{selectedApp.motivation}</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
