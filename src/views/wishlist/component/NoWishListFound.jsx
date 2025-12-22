import React from "react";
import { useNavigate } from "react-router-dom";

const NoWishListFound = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full min-h-screen px-6 py-10 bg-background relative overflow-hidden">
      {/* BACKGROUND ACCENT (Ghost Heart) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <i className="bi bi-heart-fill text-[40vw] leading-none"></i>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-[320px] md:max-w-none">
        {/* MICRO-LABELS */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-1.5 px-2 py-0.5 border border-accent/40 bg-accent/5 mb-2">
            <span className="w-1 h-1 bg-accent animate-pulse" />
            <p className="text-[8px] md:text-[10px] font-mono font-bold text-accent uppercase tracking-tighter">
              System.Alert_NO_Favorites
            </p>
          </div>
          <p className="text-[7px] font-mono opacity-30 uppercase tracking-[0.3em]">
            Storage_Ref: 0x000F4
          </p>
        </div>

        {/* MAIN TEXT */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-foreground">
            NO_
            <br />
            Favorites
          </h1>
          <p className="mt-4 font-mono text-[10px] md:text-[12px] uppercase tracking-widest leading-loose text-foreground/60 px-4">
            Your{" "}
            <span className="text-accent font-bold underline underline-offset-4">
              Wishlist
            </span>{" "}
            contains no items.
            <br />
            Explore our products and save your favorites here.
          </p>
        </div>

        {/* COMPACT TECHNICAL BUTTON */}
        <button
          onClick={() => navigate("/allproducts")}
          className="group relative w-[60%] md:w-auto bg-primary text-background px-6 py-4 transition-all active:scale-95"
        >
          <div className="flex items-center justify-between md:justify-center md:gap-6">
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              START_COLLECTION
            </span>
            <span className="text-sm font-bold">❯❯</span>
          </div>

          {/* Brutalist Shadow Accent */}
          <div className="absolute -bottom-1 -right-1 w-full h-full border border-foreground -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
        </button>

        {/* SYSTEM LOGS */}
        <div className="mt-12 w-full border-t border-foreground/5 pt-4 flex flex-col gap-1 items-center opacity-40">
          <div className="flex justify-between w-full max-w-[200px] text-[7px] font-mono uppercase tracking-tighter">
            <span>Vault_Path</span>
            <span>/usr/local/wishlist/0</span>
          </div>
          <div className="flex justify-between w-full max-w-[200px] text-[7px] font-mono uppercase tracking-tighter">
            <span>Sync_State</span>
            <span className="text-accent font-bold">Idle</span>
          </div>
        </div>
      </div>

      {/* SCAN LINE EFFECT */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default NoWishListFound;
