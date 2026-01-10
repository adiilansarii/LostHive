import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.js";
import ItemCard from "../components/ItemCard";
import Loader from "../components/Loader";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const [items, setItems] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const { user, loading: authLoading } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      api.get("/items")
        .then((res) => setItems(res.data.slice(0, 6)))
        .finally(() => setLoadingItems(false));
    } else {
      setLoadingItems(false);
    }
  }, [user]);

  // Robust URL Builder
  const getImageUrl = (path) => {
    if (!path) return "/sample/default.jpg";
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  };

  if (authLoading) return <Loader />;

  return (
    <div className="bg-white dark:bg-black min-h-screen text-zinc-900 dark:text-white transition-colors duration-500">
      <section className="relative pt-24 pb-32 px-6 overflow-hidden text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D91656]/10 dark:from-[#85193C]/20 via-transparent to-transparent -z-10" />
        <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none uppercase">
          RECLAIM WHAT IS <span className="text-[#D91656] italic">YOURS.</span>
        </h1>
        <p className="text-zinc-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium">
          The community-driven hub for lost and found items. Secure, fast, and modern.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link to="/create" className="bg-[#D91656] text-white px-10 py-4 rounded-xl font-black text-lg hover:bg-[#C5172E] transition-all shadow-lg dark:shadow-[0_0_30px_rgba(217,22,86,0.3)]">
            REPORT LOST
          </Link>
          <Link to="/create" className="bg-zinc-100 dark:bg-white text-black px-10 py-4 rounded-xl font-black text-lg hover:bg-zinc-200 transition-all">
            POST FOUND
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {!user ? (
          <div className="bg-zinc-50 dark:bg-[#4A102A]/30 border border-zinc-200 dark:border-[#D91656]/40 p-12 rounded-[40px] text-center">
            <h2 className="text-2xl font-bold mb-4 dark:text-white">The Hive is Locked.</h2>
            <p className="text-zinc-500 dark:text-gray-400 mb-6 font-medium">You must be a member to see the latest community findings.</p>
            <Link to="/login" className="text-[#D91656] font-bold border-b-2 border-[#D91656] hover:text-[#85193C] transition-colors">Login to Enter</Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tighter dark:text-white">New Entrees</h2>
              <Link to="/items" className="text-[#D91656] font-bold hover:underline">View Full Archive →</Link>
            </div>
            {loadingItems ? <Loader /> : (
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => (
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
          </>
        )}
      </section>
    </div>
  );
}