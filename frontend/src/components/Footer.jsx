import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-white/5 pt-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 pb-20">
        <div>
          <h3 className="text-2xl font-black tracking-tighter text-black dark:text-white mb-6 uppercase">
            LOST<span className="text-crimson">HIVE</span>
          </h3>
          <p className="text-zinc-500 dark:text-gray-500 font-medium leading-relaxed">
            The elite community network for recovering personal assets. Fast, secure, and crimson-driven.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-crimson text-xs font-black uppercase tracking-widest mb-6">Navigation</h4>
            <ul className="space-y-4 text-zinc-600 dark:text-gray-400 font-bold text-sm">
              <li><Link to="/" className="hover:text-crimson transition">Home</Link></li>
              <li><Link to="/items" className="hover:text-crimson transition">Archives</Link></li>
              <li><Link to="/create" className="hover:text-crimson transition">Report</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-crimson text-xs font-black uppercase tracking-widest mb-6">Security</h4>
            <ul className="space-y-4 text-zinc-600 dark:text-gray-400 font-bold text-sm">
              <li className="hover:text-crimson cursor-pointer">Privacy</li>
              <li className="hover:text-crimson cursor-pointer">Protocol</li>
            </ul>
          </div>
        </div>

        <div className="bg-zinc-100 dark:bg-zinc-900/50 p-8 rounded-3xl border border-zinc-200 dark:border-white/5">
          <h4 className="text-black dark:text-white text-sm font-black mb-4">STAY SYNCED</h4>
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-zinc-200 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-crimson hover:text-white transition cursor-pointer">f</div>
            <div className="w-10 h-10 bg-zinc-200 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-crimson hover:text-white transition cursor-pointer">t</div>
            <div className="w-10 h-10 bg-zinc-200 dark:bg-white/5 rounded-full flex items-center justify-center hover:bg-crimson hover:text-white transition cursor-pointer">i</div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 dark:border-white/5 py-8 text-center">
        <p className="text-[10px] text-zinc-400 dark:text-gray-600 font-black uppercase tracking-[0.4em]">
          © 2026 LOSTHIVE PROTOCOL | ALL RIGHTS RESERVED
        </p>
      </div>
    </footer>
  );
}