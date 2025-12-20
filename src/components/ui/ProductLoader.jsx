import React from "react";

const ProductLoader = () => {
  return (
    <div className="h-screen w-full bg-background flex flex-col items-center justify-center relative overflow-hidden">
      {/* --- BACKGROUND GRID ACCENT --- */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="relative flex flex-col items-center">
        {/* --- THE LOADER CORE --- */}
        <div className="relative p-10 border border-foreground/10 bg-secondary/5 mb-8">
          {/* Corner Brackets */}
          <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary" />
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary" />

          {/* Animated SVG Icon */}
          <svg
            className="w-16 h-16 text-primary animate-[pulse_1.5s_ease-in-out_infinite]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 7V6a6 6 0 1112 0v1h3v15H3V7h3zm2 0h8V6a4 4 0 10-8 0v1z" />
          </svg>

          {/* Rotating Ring */}
          <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-[spin_4s_linear_infinite] m-4" />
        </div>

        {/* --- STATUS TEXT --- */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 bg-primary animate-ping" />
            <h2 className="text-[10px] font-mono font-black uppercase tracking-[0.5em] text-foreground">
              Initializing_Systems
            </h2>
          </div>

          {/* Fake Loading Progress Bar */}
          <div className="w-48 h-[2px] bg-foreground/5 relative overflow-hidden">
            <div className="absolute inset-y-0 left-0 bg-primary animate-[progress_2s_ease-in-out_infinite] w-1/2" />
          </div>

          <p className="text-[8px] font-mono text-foreground/30 uppercase tracking-widest mt-2">
            Fetching_Assets // Root.Wishlist.Secure
          </p>
        </div>
      </div>

      {/* --- SCAN LINE OVERLAY --- */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.02)_50%)] bg-[length:100%_4px]" />
    </div>
  );
};

export default ProductLoader;
