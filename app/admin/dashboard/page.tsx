"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, CheckCircle, XCircle, Clock, Users, Save, Edit3 } from "lucide-react";
import { supabase } from "@/lib/supabase";

type Application = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  filiere: string;
  niveau: string;
  pole: string;
  motivation: string;
  status: string;
  created_at: string;
};

type Content = {
  page_name: string;
  title: string;
  content: string;
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"candidatures" | "contenu">("candidatures");
  
  // States dyal les candidatures
  const [apps, setApps] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(true);

  // States dyal l'contenu
  const [leClubContent, setLeClubContent] = useState({ title: "", content: "" });
  const [activitesContent, setActivitesContent] = useState({ title: "", content: "" });
  const [loadingContent, setLoadingContent] = useState(true);
  const [savingContent, setSavingContent] = useState(false);

  // Fetch Candidatures
  async function fetchApps() {
    const { data } = await supabase
      .from("applications")
      .select("*")
      .order("created_at", { ascending: false });
    setApps(data || []);
    setLoadingApps(false);
  }

  // Fetch Contenu
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

  useEffect(() => {
    fetchApps();
    fetchContent();
  }, []);

  // Actions Candidatures
  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("applications")
      .update({ status })
      .eq("id", id);
    if (!error) fetchApps();
    else alert("Erreur : " + error.message);
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Supprimer cette candidature ?")) return;
    const { error } = await supabase.from("applications").delete().eq("id", id);
    if (!error) fetchApps();
  };

  // Actions Contenu
  const saveContent = async (pageName: string, title: string, content: string) => {
    setSavingContent(true);
    const { error } = await supabase
      .from("site_content")
      .update({ title, content, updated_at: new Date().toISOString() })
      .eq("page_name", pageName);
    setSavingContent(false);
    if (error) alert("Erreur : " + error.message);
    else alert("✅ Page " + pageName + " sauvegardée !");
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

  if (loadingApps || loadingContent) return <div className="min-h-screen flex items-center justify-center text-white bg-slate-900">Chargement...</div>;

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Tableau de Bord</h1>
          <button onClick={() => router.push("/admin/login")} className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600">
            <LogOut size={18} /> Déconnexion
          </button>
        </div>

        {/* Tabs / Onglets */}
        <div className="flex gap-4 mb-8">
          <button 
            onClick={() => setActiveTab("candidatures")} 
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "candidatures" ? "bg-white text-slate-900" : "bg-slate-800 text-white hover:bg-slate-700"}`}
          >
            <Users size={18} className="inline mr-2" /> Candidatures
          </button>
          <button 
            onClick={() => setActiveTab("contenu")} 
            className={`px-6 py-3 rounded-xl font-bold transition-all ${activeTab === "contenu" ? "bg-white text-slate-900" : "bg-slate-800 text-white hover:bg-slate-700"}`}
          >
            <Edit3 size={18} className="inline mr-2" /> Gestion du Contenu
          </button>
        </div>

        {/* SECTION 1 : CANDIDATURES */}
        {activeTab === "candidatures" && (
          <>
            {/* Stats */}
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

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Liste des Candidatures</h2>
              {apps.length === 0 ? (
                <p className="text-slate-500 text-center py-8">Aucune candidature pour le moment.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-100">
                      <tr>
                        <th className="p-3 text-left">Nom</th>
                        <th className="p-3 text-left">Email</th>
                        <th className="p-3 text-left">Filière</th>
                        <th className="p-3 text-left">Pôle</th>
                        <th className="p-3 text-left">Date</th>
                        <th className="p-3 text-left">Statut</th>
                        <th className="p-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apps.map((a) => (
                        <tr key={a.id} className="border-b hover:bg-slate-50">
                          <td className="p-3 font-medium">{a.nom} {a.prenom}</td>
                          <td className="p-3">{a.email}</td>
                          <td className="p-3">{a.filiere} ({a.niveau})</td>
                          <td className="p-3">{a.pole}</td>
                          <td className="p-3">{new Date(a.created_at).toLocaleDateString("fr-FR")}</td>
                          <td className="p-3">{badge(a.status)}</td>
                          <td className="p-3 flex gap-2">
                            <button onClick={() => updateStatus(a.id, "accepte")} className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-emerald-600">Accepter</button>
                            <button onClick={() => updateStatus(a.id, "refuse")} className="bg-rose-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-rose-600">Refuser</button>
                            <button onClick={() => deleteApp(a.id)} className="bg-slate-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-slate-600">Suppr.</button>
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

        {/* SECTION 2 : CONTENU DES PAGES */}
        {activeTab === "contenu" && (
          <div className="space-y-8">
            
            {/* Le Club */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Page "Le Club"</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Titre de la page</label>
                  <input 
                    type="text" 
                    value={leClubContent.title} 
                    onChange={(e) => setLeClubContent({ ...leClubContent, title: e.target.value })} 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contenu (texte)</label>
                  <textarea 
                    rows={6} 
                    value={leClubContent.content} 
                    onChange={(e) => setLeClubContent({ ...leClubContent, content: e.target.value })} 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  ></textarea>
                </div>
                <button 
                  onClick={() => saveContent("le-club", leClubContent.title, leClubContent.content)} 
                  disabled={savingContent}
                  className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50"
                >
                  <Save size={18} /> {savingContent ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>

            {/* Activités */}
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Page "Nos Activités"</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Titre de la page</label>
                  <input 
                    type="text" 
                    value={activitesContent.title} 
                    onChange={(e) => setActivitesContent({ ...activitesContent, title: e.target.value })} 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contenu (texte)</label>
                  <textarea 
                    rows={6} 
                    value={activitesContent.content} 
                    onChange={(e) => setActivitesContent({ ...activitesContent, content: e.target.value })} 
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
                  ></textarea>
                </div>
                <button 
                  onClick={() => saveContent("activites", activitesContent.title, activitesContent.content)} 
                  disabled={savingContent}
                  className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50"
                >
                  <Save size={18} /> {savingContent ? "Sauvegarde..." : "Sauvegarder"}
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}