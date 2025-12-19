import React from "react";
const ProductNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full min-h-screen relative overflow-hidden">
      {/* BACKGROUND ACCENT */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
        <h2 className="text-[40vw] font-black leading-none">00</h2>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-[320px] md:max-w-none">
        {/* MICRO-LABELS (Perfect for Mobile) */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-1.5 px-2 py-0.5 border border-red-600/40 bg-red-600/5 mb-2">
            <span className="w-1 h-1 bg-red-600 animate-pulse" />
            <p className="text-[8px] md:text-[10px] font-mono font-bold text-red-600 uppercase tracking-tighter">
              System.Alert_Empty_cart
            </p>
          </div>
          <p className="text-[7px] font-mono opacity-30 uppercase tracking-[0.3em]">
            Code_Ref: 0x00021
          </p>
        </div>

        {/* MAIN TEXT: Scaled for narrow screens */}
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-foreground">
            Product_Not
            <br />
            Found
          </h1>
          <p className="mt-4 font-mono text-[9px] md:text-[11px] uppercase tracking-widest leading-loose text-foreground/60 px-4">
            Manifest index is currently{" "}
            <span className="text-primary font-bold">Empty</span>.
            Re-synchronize with primary asset database to continue.
          </p>
        </div>

        {/* SYSTEM LOGS (Tiny side-notes) */}
        <div className="mt-12 w-full border-t border-foreground/5 pt-4 flex flex-col gap-1 items-center opacity-40">
          <div className="flex justify-between w-full max-w-[200px] text-[7px] font-mono uppercase tracking-tighter">
            <span>Log_Path</span>
            <span>/root/cart/null</span>
          </div>
          <div className="flex justify-between w-full max-w-[200px] text-[7px] font-mono uppercase tracking-tighter">
            <span>Thread_Status</span>
            <span className="text-green-600">Active</span>
          </div>
        </div>
      </div>

      {/* SCAN LINE EFFECT */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default ProductNotFound;
