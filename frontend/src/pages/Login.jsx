import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios.js";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      navigate("/");
    } catch { setError("Authentication Failed"); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4 relative transition-colors duration-500">
       <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_#4A102A_0%,_transparent_60%)] opacity-20 dark:opacity-50 -z-10" />
      
      <form onSubmit={submit} className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 backdrop-blur-xl w-full max-w-md p-10 rounded-[40px] shadow-2xl relative">
        <h2 className="text-4xl font-black text-black dark:text-white mb-2 tracking-tighter uppercase">Welcome <span className="text-crimson">Back.</span></h2>
        <p className="text-zinc-500 dark:text-gray-400 mb-8 text-sm font-medium">Enter your credentials to access the hive.</p>

        {error && <p className="text-crimson text-xs font-bold uppercase mb-4 tracking-widest">{error}</p>}

        <input
          className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 mb-4 rounded-2xl text-black dark:text-white focus:border-crimson outline-none transition"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-white/10 p-4 mb-6 rounded-2xl text-black dark:text-white focus:border-crimson outline-none transition"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-crimson text-white py-4 rounded-2xl font-black text-lg hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(217,22,86,0.4)] transition-all uppercase">
          LOG IN
        </button>

        <p className="text-sm text-center mt-8 text-zinc-500">
          New to the community? <Link to="/signup" className="text-black dark:text-white font-bold hover:text-crimson transition-colors">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}