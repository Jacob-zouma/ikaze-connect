import { useEffect, useState } from "react";
import { listingsService, Listing } from "@/lib/api/services";
import { useAuth } from "@/lib/auth/AuthContext";
import { ListingCard } from "@/components/ikaze/ListingCard";
import { Newspaper, TrendingUp, Users, Image as ImageIcon, Video, Briefcase, ShoppingBag, LogIn } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function FeedPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    listingsService
      .list()
      .then((r) => setListings(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isAuthenticated]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <aside className="hidden lg:block lg:col-span-3 space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-[#101B2D] via-[#087E8B] to-[#20B8A8]" />
          <div className="p-4 text-center -mt-12">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#20B8A8] text-white flex items-center justify-center font-bold text-4xl border-4 border-white shadow-lg">
              {user?.name?.charAt(0) || "?"}
            </div>
            <h3 className="mt-3 font-bold text-[#101B2D] text-lg">{user?.name || "Invité"}</h3>
            <p className="text-sm text-gray-500">{user?.email || "Non connecté"}</p>
            <p className="text-xs text-gray-400 mt-1">Bujumbura, Burundi</p>
            {isAuthenticated && (
              <button onClick={logout} className="mt-3 text-xs text-red-500 hover:underline">
                Se déconnecter
              </button>
            )}
          </div>
          <div className="border-t border-gray-100 p-4 text-sm space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Annonces publiées</span>
              <span className="font-bold text-[#087E8B] text-base">{listings.length}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-bold text-[#101B2D] mb-3 flex items-center gap-2">
            <Newspaper size={18} className="text-[#087E8B]" /> Actualités IKAZE
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="text-gray-600 flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#20B8A8] mt-1.5 shrink-0" />
              <span>Nouvelle version d'IKAZE Delivery disponible</span>
            </li>
            <li className="text-gray-600 flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E3A83B] mt-1.5 shrink-0" />
              <span>+2 500 utilisateurs cette semaine</span>
            </li>
          </ul>
        </div>
      </aside>

      <main className="lg:col-span-6">
        {!isAuthenticated && (
          <div className="bg-[#E3A83B]/10 border border-[#E3A83B]/30 rounded-xl p-4 mb-4 flex items-center gap-3">
            <LogIn size={20} className="text-[#E3A83B]" />
            <p className="text-sm text-[#243041] flex-1">
              Connectez-vous pour réagir, commenter et publier des annonces.
            </p>
            <Link to="/connexion" className="px-3 py-1.5 bg-[#087E8B] text-white text-sm rounded-md hover:bg-[#20B8A8]">
              Se connecter
            </Link>
          </div>
        )}

        {isAuthenticated && (
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#20B8A8] text-white flex items-center justify-center font-bold">
                {user?.name?.charAt(0)}
              </div>
              <button className="flex-1 text-left px-4 py-2.5 bg-[#F5F7FA] rounded-full text-sm text-gray-500 hover:bg-gray-100">
                Publier une annonce, un service, un emploi...
              </button>
            </div>
            <div className="flex justify-around mt-3 pt-3 border-t border-gray-100 text-sm text-gray-600">
              <button className="flex items-center gap-1.5 hover:text-[#087E8B] font-medium"><ImageIcon size={18} className="text-[#20B8A8]" /> Photo</button>
              <button className="flex items-center gap-1.5 hover:text-[#087E8B] font-medium"><Video size={18} className="text-[#E3A83B]" /> Vidéo</button>
              <button className="flex items-center gap-1.5 hover:text-[#087E8B] font-medium"><Briefcase size={18} className="text-[#087E8B]" /> Emploi</button>
              <button className="flex items-center gap-1.5 hover:text-[#087E8B] font-medium"><ShoppingBag size={18} className="text-[#101B2D]" /> Produit</button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="text-center py-8 text-gray-500">Chargement...</p>
        ) : !isAuthenticated ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
            <p className="text-gray-500 mb-4">Connectez-vous pour voir le fil d'actualité.</p>
            <Link to="/connexion" className="inline-block px-6 py-2 bg-[#087E8B] text-white rounded-md font-semibold hover:bg-[#20B8A8]">
              Se connecter
            </Link>
          </div>
        ) : listings.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center shadow-sm">
            <p className="text-gray-500 mb-2">Aucune annonce pour le moment.</p>
            <button className="text-[#087E8B] font-semibold hover:underline">Publier la première annonce</button>
          </div>
        ) : (
          listings.map((l) => <ListingCard key={l.id} listing={l} />)
        )}
      </main>

      <aside className="hidden lg:block lg:col-span-3 space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-bold text-[#101B2D] mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-[#E3A83B]" /> Tendances
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="cursor-pointer hover:text-[#087E8B]">
              <p className="font-semibold text-[#243041]">#Bujumbura</p>
              <p className="text-xs text-gray-500">1 245 publications</p>
            </li>
            <li className="cursor-pointer hover:text-[#087E8B]">
              <p className="font-semibold text-[#243041]">#Emploi</p>
              <p className="text-xs text-gray-500">876 publications</p>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
          <h3 className="font-bold text-[#101B2D] mb-3 flex items-center gap-2">
            <Users size={18} className="text-[#087E8B]" /> Suggestions
          </h3>
          <div className="space-y-3">
            {["IKAZE Services", "IKAZE Market", "IKAZE Jobs", "IKAZE Delivery"].map((n, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#087E8B] to-[#20B8A8] flex items-center justify-center text-white font-bold text-sm">
                  {n.charAt(6)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#243041]">{n}</p>
                  <p className="text-xs text-gray-500">Module IKAZE</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}