import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function CreateItem() {
  const navigate = useNavigate();
  // Added description to the initial state
  const [form, setForm] = useState({ title: "", description: "", location: "", type: "lost" });
  const [photo, setPhoto] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (photo) fd.append("photo", photo);

    await api.post("/items", fd);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-20 relative transition-colors duration-500">
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_#85193C_0%,_transparent_50%)] opacity-10 dark:opacity-30 -z-10" />
      
      <div className="bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 backdrop-blur-2xl w-full max-w-xl p-10 rounded-[40px] shadow-2xl">
        <h2 className="text-4xl font-black text-black dark:text-white mb-2 tracking-tighter uppercase">NEW <span className="text-[#D91656]">ENTRY.</span></h2>
        <p className="text-zinc-500 dark:text-gray-400 mb-8 font-medium">Broadcast your item to the community hive.</p>

        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-[#D91656] ml-2">Title</label>
            <input
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white outline-none focus:border-[#D91656] transition"
              placeholder="What was lost or found?"
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>

          {/* NEW DESCRIPTION FIELD */}
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-[#D91656] ml-2">Description</label>
            <textarea
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white outline-none focus:border-[#D91656] transition min-h-[100px]"
              placeholder="Provide more details about the item..."
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-[#D91656] ml-2">Location</label>
            <input
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white outline-none focus:border-[#D91656] transition"
              placeholder="Where did it happen?"
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-[#D91656] ml-2">Category</label>
            <select
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white outline-none focus:border-[#D91656] transition cursor-pointer"
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="lost">LOST ITEM</option>
              <option value="found">FOUND ITEM</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-[#D91656] ml-2">Attachment</label>
            <input 
              type="file" 
              className="w-full bg-zinc-100 dark:bg-zinc-800/50 text-gray-500 dark:text-gray-400 p-4 rounded-2xl border border-dashed border-zinc-300 dark:border-white/20 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-black file:bg-[#D91656] file:text-white cursor-pointer"
              onChange={(e) => setPhoto(e.target.files[0])} 
            />
          </div>

          <button className="w-full bg-[#D91656] text-white py-5 rounded-2xl font-black text-xl hover:shadow-[0_0_30px_rgba(217,22,86,0.4)] transition-all mt-4 uppercase tracking-tighter">
            Submit Entry
          </button>
        </form>
      </div>
    </div>
  );
}