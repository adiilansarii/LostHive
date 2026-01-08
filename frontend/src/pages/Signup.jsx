import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", form);
      setUser(res.data.user);
      navigate("/");
    } catch { setError("Registration failed. Try a different email."); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4 relative transition-colors duration-500 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-deep-red rounded-full blur-[150px] opacity-10 dark:opacity-20 -z-10" />
      
      <form onSubmit={submit} className="bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 backdrop-blur-xl w-full max-w-md p-10 rounded-[40px] shadow-2xl">
        <h2 className="text-4xl font-black text-black dark:text-white mb-2 tracking-tighter uppercase">CREATE <span className="text-crimson">ID.</span></h2>
        <p className="text-zinc-500 dark:text-gray-400 mb-8 text-sm font-medium">Join the Hive to start recovering your belongings.</p>

        {error && <p className="text-crimson text-xs font-bold mb-4 uppercase tracking-widest">{error}</p>}

        <div className="space-y-4">
          <input className="w-full bg-white dark:bg-black/60 border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white outline-none focus:border-crimson transition" placeholder="Full Name" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full bg-white dark:bg-black/60 border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white outline-none focus:border-crimson transition" placeholder="Email Address" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <input type="password" className="w-full bg-white dark:bg-black/60 border border-zinc-200 dark:border-white/10 p-4 rounded-2xl text-black dark:text-white outline-none focus:border-crimson transition" placeholder="Create Password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>

        <button className="w-full bg-crimson text-white py-4 rounded-2xl font-black text-lg mt-8 hover:shadow-lg transition-all uppercase tracking-tighter">
          Initialize Account
        </button>
      </form>
    </div>
  );
}