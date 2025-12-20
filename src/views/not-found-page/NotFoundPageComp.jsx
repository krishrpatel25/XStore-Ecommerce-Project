import { useNavigate } from "react-router-dom";

const NotFoundPageComp = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full pt-30 px-6 py-10 bg-background overflow-hidden z-0">
      {/* ─── 1. BACKGROUND EFFECTS (Lowest Layer) ─── */}

      {/* 404 Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none z-0">
        <h2 className="text-[45vw] font-[1000] leading-none tracking-tighter italic">
          404
        </h2>
      </div>

      {/* SCAN LINE EFFECT: 
          Crucial Change: Reduced Z-index to z-[1] so it stays behind the text 
          and won't overlap a z-[100] Navbar.
      */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.04)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[length:100%_4px,4px_100%]" />

      {/* Vignette Shadow */}
      <div className="absolute inset-0 pointer-events-none z-[2] shadow-[inset_0_0_150px_rgba(0,0,0,0.15)]" />

      {/* ─── 2. MAIN CONTENT (Middle Layer) ─── */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-[320px] md:max-w-none text-foreground">
        {/* Error Header */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex items-center gap-2 px-3 py-1 border border-red-500 bg-primary/5 mb-3">
            <span className="w-1.5 h-1.5 bg-red-500 animate-ping" />
            <p className="text-[8px] md:text-[8px] font-mono font-bold text-red-500 uppercase tracking-[0.3em]">
              ERR_CODE: 0x404_NOT_FOUND
            </p>
          </div>
          <p className="text-[7px] font-mono opacity-30 uppercase tracking-[0.4em]">
            Memory_Dump: 0x882_MISSING_PTR
          </p>
        </div>

        {/* Main Text */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-[6rem] font-[1000] uppercase italic tracking-tighter leading-[0.8] mb-4">
            Page_Not
            <br />
            <span className="bg-accent text-background px-4">Found</span>
          </h1>

          <div className="max-w-md mx-auto space-y-4">
            <p className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-foreground/50 leading-relaxed">
              The requested directory path{" "}
              <span className="text-foreground font-black italic">
                "
                {typeof window !== "undefined"
                  ? window.location.pathname
                  : "/null"}
                "
              </span>{" "}
              does not exist in the primary server nodes.
            </p>
            <p className="text-[9px] font-mono text-primary/60 uppercase animate-pulse">
              [SYSTEM_SUGGESTION]: Return to master navigation.
            </p>
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          className="group relative bg-primary text-background px-10 py-4 transition-all active:scale-95"
        >
          <div className="flex items-center gap-6 relative z-10">
            <span className="text-[11px] font-black uppercase tracking-[0.3em]">
              Go_To_Home
            </span>
            <span className="text-lg font-bold group-hover:translate-x-2 transition-transform duration-300">
              ❯❯
            </span>
          </div>
          <div className="absolute -bottom-2 -right-2 w-full h-full border-2 border-primary -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
        </button>

        {/* System Logs */}
        <div className="mt-20 w-full max-w-[300px] border-t border-foreground/10 pt-6 flex flex-col gap-2 opacity-40 font-mono text-[8px] uppercase tracking-tighter">
          <div className="flex justify-between items-center">
            <span>Query_Path</span>
          </div>
          <div className="flex justify-between">
            <span>Access_Level</span>
            <span className="text-red-500 font-bold">Unauthorized_Entry</span>
          </div>
          <div className="flex justify-between">
            <span>Terminal</span>
            <span>T-08_XSTORE_V2</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPageComp;
