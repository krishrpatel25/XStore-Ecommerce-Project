import React from "react";

const CategoryComp = () => {
  return (
    <div className="flex flex-col items-center min-h-screen justify-center h-[80vh] md:h-[85vh] bg-background relative overflow-hidden">
      {/* --- ANIMATED GRID BACKGROUND --- */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* --- TOP STATUS BAR --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-32 flex items-center gap-4 opacity-40">
        <div className="h-[1px] w-12 bg-foreground" />
        <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-foreground">
          Under_Construction
        </span>
        <div className="h-[1px] w-12 bg-foreground" />
      </div>

      {/* --- MAIN TERMINAL HEADING --- */}
      <div className="relative">
        {/* Decorative corner brackets */}
        <div className="absolute -top-10 -left-10 w-4 h-4 border-t-2 border-l-2 border-primary" />
        <div className="absolute -bottom-10 -right-10 w-4 h-4 border-b-2 border-r-2 border-primary" />

        <h1 className="text-6xl md:text-9xl font-[1000] italic uppercase tracking-tighter text-foreground leading-none text-center">
          COMING_
          <br />
          <span className="text-primary italic">SOON_</span>
        </h1>
      </div>

      {/* --- FOOTER METADATA --- */}
      <div className="mt-12 flex flex-col items-center gap-2">
        <p className="text-[10px] font-mono font-black text-accent uppercase tracking-[0.3em] animate-pulse">
          Initialising_Asset_Protocol...
        </p>
        <div className="flex gap-8 text-[8px] font-mono opacity-30 uppercase tracking-widest mt-4">
          <div className="flex flex-col">
            <span className="text-foreground/50 text-[6px]">Progress</span>
            <span>67.42%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-foreground/50 text-[6px]">Priority</span>
            <span>CRITICAL</span>
          </div>
          <div className="flex flex-col">
            <span className="text-foreground/50 text-[6px]">Node</span>
            <span>0x2A9F</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CategoryComp;
