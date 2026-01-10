import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [item, setItem] = useState(null);

  // Helper to prevent double slashes and handle missing Base URL
  const getImageUrl = (path) => {
    if (!path) return "/sample/default.jpg";
    const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${cleanBase}${cleanPath}`;
  };

  useEffect(() => {
    api.get(`/items/${id}`).then((res) => setItem(res.data));
  }, [id]);

  if (!item) return <Loader />;

  const isOwner = user && (user.id === item.owner?._id || user._id === item.owner?._id);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-zinc-900 dark:text-white py-16 px-6 transition-colors duration-500">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Cinematic Image Container */}
        <div className="relative group rounded-[40px] overflow-hidden border border-zinc-200 dark:border-white/10 shadow-2xl">
          <img
            src={getImageUrl(item.photo)}
            alt={item.title}
            className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-6 left-6 px-4 py-1 bg-black/60 backdrop-blur-md rounded-full text-[#D91656] font-black uppercase text-xs tracking-widest border border-[#D91656]/30">
            {item.type}
          </div>
        </div>

        {/* Details Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-4 leading-none uppercase text-black dark:text-white">
              {item.title}
            </h1>
            
            {/* UPDATED: Vector Location Icon */}
            <div className="flex items-center gap-2 text-2xl font-bold text-[#D91656] tracking-tight">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                className="w-6 h-6 stroke-[2.5px]"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              <span>{item.location || "Unknown Location"}</span>
            </div>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-900/50 p-8 rounded-[30px] border border-zinc-200 dark:border-white/5">
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-400 dark:text-gray-500 mb-4">Description</h4>
            <p className="text-zinc-700 dark:text-gray-300 leading-relaxed text-lg">
              {item.description || "No additional details provided for this entry."}
            </p>
          </div>

          <div className="flex items-center gap-4 p-6 bg-zinc-100 dark:bg-[#4A102A]/20 rounded-2xl border border-zinc-200 dark:border-[#D91656]/20">
            <div className="w-10 h-10 bg-[#D91656] rounded-full flex items-center justify-center font-black text-white">
              {item.owner?.name?.charAt(0) || "H"}
            </div>
            <div>
              <p className="text-xs text-zinc-500 uppercase font-black">Posted By</p>
              <p className="font-bold text-black dark:text-white">{item.owner?.name || "Hive Member"}</p>
            </div>
          </div>

          {isOwner && (
            <div className="flex gap-4 pt-6">
              <Link
                to={`/items/${id}/edit`}
                className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-black text-center py-4 rounded-2xl font-black hover:scale-105 transition-transform uppercase tracking-tighter"
              >
                Modify Entry
              </Link>
              <button
                onClick={async () => {
                  if(window.confirm("Delete this entry permanently?")) {
                    await api.delete(`/items/${id}`);
                    navigate("/");
                  }
                }}
                className="flex-1 border-2 border-[#D91656] text-[#D91656] py-4 rounded-2xl font-black hover:bg-[#D91656] hover:text-white transition-all uppercase tracking-tighter"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}