import { useEffect, useState, useContext } from "react";
import { useSearchParams, Link } from "react-router-dom"; // Add useSearchParams
import api from "../api/axios.js";
import ItemCard from "../components/ItemCard.jsx";
import Loader from "../components/Loader.jsx";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext); // Get current user
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Initialize filter from URL if present (e.g., /items?filter=mine)
  const [filter, setFilter] = useState(searchParams.get("filter") || "all");

  useEffect(() => {
    api.get("/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching items:", err))
      .finally(() => setLoading(false));
  }, []);

  // Update URL when filter changes manually
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchParams({ filter: newFilter });
  };

  const filteredItems = items.filter(item => {
    if (filter === "all") return true;
    if (filter === "lost") return item.type === "lost";
    if (filter === "found") return item.type === "found";
    if (filter === "mine") {
      // Compare item owner ID with current logged-in user ID
      return item.owner?._id === user?._id || item.owner === user?._id;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-500">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_#4A102A_0%,_transparent_70%)] opacity-10 dark:opacity-40 -z-10" />
        <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">
          THE <span className="text-crimson">ARCHIVE</span>
        </h1>
        
        <div className="flex justify-center flex-wrap gap-3 mt-8">
          {["all", "lost", "found", "mine"].map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
              className={`px-8 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all ${
                filter === type 
                  ? "bg-crimson text-white shadow-lg" 
                  : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-gray-400 border border-zinc-200 dark:border-white/5"
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
              <div key={item._id} className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 rounded-3xl overflow-hidden hover:border-crimson/50 transition-all">
                <Link to={`/items/${item._id}`}>
                  <ItemCard 
                    title={item.title} 
                    img={item.photo ? `${import.meta.env.VITE_API_BASE_URL}${item.photo}` : "/sample/default.jpg"}
                    location={item.location}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}