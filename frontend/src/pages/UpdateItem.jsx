import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function UpdateItem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", location: "", type: "lost" });

  useEffect(() => {
    api.get(`/items/${id}`).then((res) => {
      const { title, description, location, type } = res.data;
      setForm({ title, description: description || "", location, type });
    });
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    await api.put(`/items/${id}`, form);
    navigate(`/items/${id}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex items-center justify-center px-4 py-20 transition-colors duration-500">
      <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 w-full max-w-lg p-10 rounded-[40px] shadow-2xl">
        <h2 className="text-3xl font-black text-black dark:text-white mb-8 tracking-tighter uppercase">Modify <span className="text-[#D91656]">Record</span></h2>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-[#D91656] ml-2">Title</label>
            <input
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white focus:border-[#D91656] outline-none"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-[#D91656] ml-2">Description</label>
            <textarea
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white focus:border-[#D91656] outline-none min-h-[100px]"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-[#D91656] ml-2">Location</label>
            <input
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white focus:border-[#D91656] outline-none"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-[#D91656] ml-2">Category</label>
            <select
              className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white focus:border-[#D91656] outline-none"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              <option value="lost">LOST</option>
              <option value="found">FOUND</option>
            </select>
          </div>

          <button className="w-full bg-[#D91656] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#C5172E] transition-all uppercase tracking-widest mt-4">
            Sync Changes
          </button>
        </form>
      </div>
    </div>
  );
}