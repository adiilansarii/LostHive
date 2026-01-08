import { useEffect, useState } from "react";
import api from "../api/axios.js";
import ItemCard from "../components/ItemCard.jsx";
import Loader from "../components/Loader.jsx";
import { Link } from "react-router-dom";

export default function AllItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    api.get("/items").then((res) => setItems(res.data)).finally(() => setLoading(false));
  }, []);

  const filteredItems = items.filter(item => filter === "all" ? true : item.type === filter);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white transition-colors duration-500">
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top,_#4A102A_0%,_transparent_70%)] opacity-10 dark:opacity-40 -z-10" />
        <h1 className="text-5xl font-black tracking-tighter mb-4 uppercase">THE <span className="text-crimson">ARCHIVE</span></h1>
        
        <div className="flex justify-center gap-3 mt-8">
          {["all", "lost", "found"].map((type) => (
            <button key={type} onClick={() => setFilter(type)} className={`px-8 py-2 rounded-full font-bold uppercase text-[10px] tracking-widest transition-all ${filter === type ? "bg-crimson text-white shadow-lg" : "bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-gray-400 border border-zinc-200 dark:border-white/5"}`}>
              {type}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? <Loader /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
             <div key={item._id} className="relative group ...">
              <Link to={`/items/${item._id}`}>
                <ItemCard 
                  title={item.title} 
                  img={item.photo ? `${import.meta.env.VITE_API_BASE_URL}${item.photo}` : "/sample/default.jpg"}
                  location={item.location} // <--- ADD THIS LINE
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