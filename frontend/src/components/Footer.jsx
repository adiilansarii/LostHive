import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-white/5 pt-6 transition-colors duration-500">
  <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 pb-6">
    
    <div>
      <h3 className="text-2xl font-black tracking-tighter text-black dark:text-white mb-3 uppercase">
        GRAB<span className="text-crimson">IT</span>
      </h3>
      <p className="text-zinc-500 dark:text-gray-500 font-medium leading-relaxed text-sm">
        A community-driven platform dedicated to the secure and efficient recovery of lost and found items.
      </p>
    </div>

    <div>
      <h4 className="text-crimson text-xs font-black uppercase tracking-widest mb-4">Navigation</h4>
      <ul className="flex gap-6 text-zinc-600 dark:text-gray-400 font-bold text-sm">
        <li><Link to="/" className="hover:text-crimson transition">Home</Link></li>
        <li><Link to="/items" className="hover:text-crimson transition">Archives</Link></li>
        <li><Link to="/create" className="hover:text-crimson transition">Report</Link></li>
      </ul>
    </div>

    <div className="bg-zinc-100 dark:bg-zinc-900/50 p-4 rounded-3xl border border-zinc-200 dark:border-white/5">
      <h4 className="text-black dark:text-white text-sm font-black mb-3">STAY SYNCED</h4>
      <div className="flex gap-4">
        
        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/adil-ansari35830/"
          target="_blank"
          className="w-10 h-10 bg-zinc-200 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-crimson hover:text-white transition"
        >
          <svg className="w-44 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8.5h4v15h-4v-15zm7 0h3.8v2h.1c.53-.95 1.84-2 3.79-2 4.05 0 4.8 2.67 4.8 6.14v8.86h-4v-7.85c0-1.87-.03-4.28-2.61-4.28-2.61 0-3.01 2.04-3.01 4.15v7.98h-4v-15z"/>
          </svg>
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/adiilansarii"
          target="_blank"
          className="w-10 h-10 bg-zinc-200 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-crimson hover:text-white transition"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.1 3.29 9.41 7.86 10.94.57.1.78-.25.78-.56v-2c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.27-5.23-5.65 0-1.25.45-2.27 1.2-3.07-.12-.3-.52-1.52.12-3.17 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.64 1.65.24 2.87.12 3.17.75.8 1.2 1.82 1.2 3.07 0 4.39-2.69 5.35-5.25 5.64.41.36.78 1.08.78 2.18v3.24c0 .31.21.67.79.56A10.5 10.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"/>
          </svg>
        </a>
      </div>
    </div>
  </div>

  <div className="border-t border-zinc-200 dark:border-white/5 py-5 text-center">
    <p className="text-[10px] text-zinc-400 dark:text-gray-600 font-black uppercase tracking-[0.4em]">
      © 2026 GRABIT PROTOCOL | ALL RIGHTS RESERVED
    </p>
  </div>
</footer>
  );
}