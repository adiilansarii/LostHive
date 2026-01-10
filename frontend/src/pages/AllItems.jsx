import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom";
import api from "../api/axios.js";
import ItemCard from "../components/ItemCard.jsx";
import Loader from "../components/Loader.jsx";
import { AuthContext } from "../context/AuthContext";

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "all");

  const getImageUrl = (path) => {
    if (!path) return "/sample/default.jpg";
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  };

  useEffect(() => {
    api.get("/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter(item => {
    if (filter === "all") return true;
    if (filter === "lost") return item.type === "lost";
    if (filter === "found") return item.type === "found";
    if (filter === "mine") {
      const currentUserId = user?._id || user?.id;
      const itemOwnerId = item.owner?._id || item.owner; // Handles populated or unpopulated
      return currentUserId && itemOwnerId && String(itemOwnerId) === String(currentUserId);
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-500">
      <section className="relative py-20 px-6 text-center">
        <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">
          THE <span className="text-crimson">ARCHIVE</span>
        </h1>
        <div className="flex justify-center flex-wrap gap-3 mt-8">
          {["all", "lost", "found", "mine"].map((type) => (
            <button
              key={type}
              onClick={() => { setFilter(type); setSearchParams({ filter: type }); }}
              className={`px-8 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all ${
                filter === type ? "bg-[#D91656] text-white shadow-lg" : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500"
              }`}
            >
              {type === "mine" ? "My Postings" : type}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <Link key={item._id} to={`/items/${item._id}`}>
                <ItemCard 
                  title={item.title} 
                  img={getImageUrl(item.photo)} 
                  location={item.location} 
                />
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}