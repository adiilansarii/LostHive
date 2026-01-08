export default function Loader() {
  return (
    /* Changes: 
       - Added 'fixed inset-0': Makes the loader cover the entire browser window regardless of scroll.
       - Added 'z-[9999]': Ensures it stays on top of the Navbar and all other content.
    */
    <div className="fixed inset-0 z-[9999] bg-white dark:bg-black flex flex-col items-center justify-center transition-colors duration-500">
      
      {/* Small refined circle */}
      <div className="relative w-10 h-10">
        {/* Outer Ring */}
        <div className="absolute inset-0 border-2 border-zinc-200 dark:border-maroon/30 rounded-full"></div>
        
        {/* Spinning Crimson Accent */}
        <div className="absolute inset-0 border-2 border-t-crimson rounded-full animate-spin shadow-[0_0_15px_rgba(217,22,86,0.3)]"></div>
      </div>

      {/* Loading Text */}
      <div className="mt-6 text-center">
        <p className="text-zinc-900 dark:text-white font-black text-[10px] uppercase tracking-[0.3em] animate-pulse">
          Accessing <span className="text-crimson">Hive</span>
        </p>
      </div>
    </div>
  );
}