export default function ItemCard({ title, img, location }) {
  return (
    <div className="group cursor-pointer">
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        {/* Dark overlay specifically for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 dark:opacity-90" />
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-zinc-800 dark:text-white group-hover:text-[#D91656] transition-colors duration-300">
          {title}
        </h3>
        
        {/* NEW: SVG Location Icon Display */}
        <div className="flex items-center gap-1.5 mt-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className="w-4 h-4 text-[#D91656] stroke-[2.5px]"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" 
            />
          </svg>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-black truncate">
            {location || "Unknown Location"}
          </p>
        </div>
      </div>
    </div>
  );
}