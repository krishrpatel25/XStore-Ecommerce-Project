import React from "react";
import { useNavigate } from "react-router-dom";

const NoOrderFoundComp = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] md:h-[85vh] bg-background relative overflow-hidden">
      {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-foreground/5 rounded-full animate-[ping_5s_linear_infinite]" />

      {/* --- ERROR CODE LABEL --- */}
      <div className="flex items-center gap-2 mb-4 opacity-50">
        <div className="w-2 h-2 bg-accent animate-pulse" />
        <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-foreground">
          Error_Log: 404_NULL_REFERENCE
        </span>
      </div>

      {/* --- MAIN MESSAGE --- */}
      <div className="relative mb-12">
        {/* Background Ghost Text */}
        <h2 className="absolute -top-10 left-1/2 -translate-x-1/2 text-[120px] font-black text-foreground/[0.03] select-none italic tracking-tighter">
          VOID
        </h2>

        <h2 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter text-foreground leading-none text-center relative z-10">
          No_Order
          <br />
          FOUND_
        </h2>

        {/* Technical Crosshairs */}
        <div className="absolute -inset-6 border border-foreground/10 pointer-events-none">
          <div className="absolute top-0 left-0 w-2 h-2 bg-foreground" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-foreground" />
        </div>
      </div>

      {/* --- REDIRECT ACTION --- */}
      <button
        onClick={() => navigate("/allproducts")}
        className="group relative flex flex-col items-center gap-2 transition-all"
      >
        {/* Stylized Action Text */}
        <div className="relative px-10 py-4 bg-primary text-background overflow-hidden flex items-center gap-4 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
          <span className="text-xs font-black uppercase tracking-[0.3em]">
            Return_to_Shop
          </span>
          <span className="text-lg group-hover:translate-x-2 transition-transform duration-500">
            ❯❯
          </span>

          {/* Animated Scanning Line */}
          <div className="absolute inset-0 w-full h-[1px] bg-background/20 -translate-y-full group-hover:translate-y-[40px] transition-all duration-[1s] ease-in-out" />
        </div>

        {/* Metadata Subtext */}
        <span className="text-[8px] font-mono opacity-30 uppercase tracking-widest mt-2 group-hover:opacity-100 group-hover:text-primary transition-all">
          Re-routing to Main_Distributor_Node
        </span>
      </button>

      {/* --- CORNER COORDINATES --- */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="text-[8px] font-mono opacity-20 uppercase flex flex-col gap-1">
          <span>LAT: 40.7128° N</span>
          <span>LNG: 74.0060° W</span>
        </div>
      </div>
    </div>
  );
};

export default NoOrderFoundComp;
