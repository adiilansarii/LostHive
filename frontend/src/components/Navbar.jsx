import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios.js";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, setUser, loading, theme, toggleTheme } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Create a ref for the entire header/navbar
  const navRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (open && navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      setOpen(false); // Close menu on logout
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <header ref={navRef} className="bg-white dark:bg-black border-b border-gray-200 dark:border-[#D91656]/30 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img 
            src="logo1.png" 
            alt="LostHive Logo" 
            className="w-16 h-auto object-contain transition-transform duration-300 group-hover:scale-110" 
          />
          <span className="text-2xl font-black tracking-tighter text-black dark:text-white leading-none">
            LOST<span className="text-[#D91656]">HIVE</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-300 font-semibold uppercase text-xs tracking-widest">
          <Link to="/create" className="hover:text-[#D91656]">Report Lost</Link>
          <Link to="/create" className="hover:text-[#D91656]">Post Found</Link>
          {user && <Link to="/account" className="hover:text-[#D91656]">My Hive</Link>}
        </nav>

        <div className="flex items-center gap-4">
          {/* THEME TOGGLE */}
          <button 
            onClick={toggleTheme}
            className="relative w-14 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-[#D91656]/30 transition-all duration-300 flex items-center px-1 group shadow-inner"
          >
            <div className={`w-5 h-5 rounded-full shadow-md transform transition-transform duration-500 flex items-center justify-center ${
              theme === "dark" ? "translate-x-7 bg-[#D91656]" : "translate-x-0 bg-white"
            }`}>
              {theme === "dark" ? (
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
              ) : (
                <svg className="w-3 h-3 text-[#D91656]" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              )}
            </div>
          </button>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-4">
            {!loading && (
              <>
                {!user ? (
                  <>
                    <Link to="/login" className="text-black dark:text-white hover:text-[#D91656] font-bold text-sm">Login</Link>
                    <Link to="/signup" className="bg-[#D91656] text-white px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition shadow-lg">Join Now</Link>
                  </>
                ) : (
                  <button onClick={handleLogout} className="border border-[#D91656] text-[#D91656] px-5 py-2 rounded-full font-bold text-sm hover:bg-[#D91656] hover:text-white transition">Logout</button>
                )}
              </>
            )}
          </div>

          {/* Hamburger Icon - Simplified to only show ☰ */}
          <button onClick={() => setOpen(!open)} className="md:hidden text-[#D91656] text-3xl transition-transform active:scale-90">
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-white dark:bg-black border-t border-gray-100 dark:border-zinc-800 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col p-4 space-y-4 font-bold uppercase text-xs tracking-widest text-gray-600 dark:text-gray-300">
            <Link to="/create" onClick={() => setOpen(false)} className="hover:text-[#D91656] p-2">Report Lost</Link>
            <Link to="/create" onClick={() => setOpen(false)} className="hover:text-[#D91656] p-2">Post Found</Link>
            
            {user ? (
              <>
                <Link to="/account" onClick={() => setOpen(false)} className="hover:text-[#D91656] p-2 border-t border-gray-50 dark:border-zinc-900 pt-4">My Hive</Link>
                <button 
                  onClick={handleLogout}
                  className="text-left text-[#D91656] p-2 uppercase font-bold"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2 border-t border-gray-50 dark:border-zinc-900">
                <Link to="/login" onClick={() => setOpen(false)} className="p-2">Login</Link>
                <Link 
                  to="/signup" 
                  onClick={() => setOpen(false)}
                  className="bg-[#D91656] text-white p-3 rounded-xl text-center"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}