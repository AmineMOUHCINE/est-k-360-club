import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic"; // <-- LIGNE IMPORTANTE (pas de cache)

export default async function LeClub() {
  const { data } = await supabase
    .from("site_content")
    .select("title, content")
    .eq("page_name", "le-club")
    .single();

  return (
    <div className="max-w-4xl mx-auto py-24 px-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-white drop-shadow-lg">
        {data?.title || "Le Club"}
      </h1>
      <p className="text-slate-200 text-lg whitespace-pre-line">
        {data?.content || "La page de présentation du club arrive bientôt !"}
      </p>
    </div>
  );
}