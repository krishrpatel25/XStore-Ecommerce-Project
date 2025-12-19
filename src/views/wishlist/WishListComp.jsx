import { useWishList } from "@/context/WishListContext";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const Wishlist = () => {
  const { wishlist, removeWishlist } = useWishList();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
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
  }

  return (
    <div className="px-4 md:px-6 lg:px-20 py-10 min-h-screen">
      {/* ───────── HEADER SECTION ───────── */}
      <div className="pt-24 mb-10">
        {/* --- TOP ROW: Title & Decorative Line --- */}
        <div className="flex flex-col sm:flex-row sm:items-baseline gap-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-[1000] italic uppercase tracking-tighter text-foreground leading-none whitespace-nowrap">
            Wishlist_<span className="text-primary">Archive</span>
          </h1>
          {/* Line hides on very small screens or stays thin to prevent layout break */}
          <div className="hidden sm:block h-px flex-grow bg-foreground/10" />
        </div>

        {/* --- BOTTOM ROW: Metadata & Navigation --- */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 sm:mt-4 gap-4 sm:gap-0 border-l-2 sm:border-l-0 border-primary/20 pl-4 sm:pl-0">
          <div className="text-[9px] md:text-[10px] font-mono font-bold text-foreground/40 uppercase tracking-[0.2em] leading-relaxed">
            Total_Units: {wishlist.length} <br className="sm:hidden" />
            <span className="hidden sm:inline"> // </span> Storage_Active
          </div>

          <div
            onClick={() => navigate("/allproducts")}
            className="group flex items-center gap-2 text-[11px] md:text-xs font-black uppercase italic cursor-pointer hover:text-primary transition-colors self-end sm:self-auto"
          >
            <span>Explore_More</span>
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </div>
        </div>
      </div>

      {/* ───────── THE GRID (Same as your reference) ───────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-foreground/10">
        {wishlist.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="group relative flex flex-col p-6 cursor-pointer border-b border-r border-foreground/10 transition-all duration-300 hover:bg-background hover:-translate-y-1"
          >
            {/* ───────── TOP META + REMOVE BUTTON ───────── */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest leading-none">
                  {product.category || "General_Asset"}
                </span>
                <span className="text-[9px] font-mono opacity-40 mt-1">
                  00{product.id}
                </span>
              </div>

              {/* Functional Remove Button */}
              <button
                className="p-2 text-red-500 transition-colors z-20"
                onClick={(e) => {
                  e.stopPropagation();
                  removeWishlist(product.id);
                }}
              >
                <FiTrash2 className="text-sm" />
              </button>
            </div>

            {/* ───────── IMAGE (Same aspect & transition) ───────── */}
            <div className="relative aspect-[4/5] w-full mb-8 flex items-center justify-center overflow-hidden">
              <img
                src={product.thumbnail}
                alt={product.title}
                loading="lazy"
                className="h-[80%] w-[85%] object-contain transition-all duration-500 group-hover:scale-[1.04]"
              />

              {/* Subtle Glow Overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
            </div>

            {/* ───────── TEXT CONTENT ───────── */}
            <div className="mt-auto space-y-4">
              <h2 className="text-sm font-bold uppercase leading-tight text-foreground/90 transition-colors duration-300 group-hover:text-primary">
                {product.title}
              </h2>

              {/* RATING (Functionality Unchanged) */}
              <div className="flex items-center gap-1 pt-1">
                {Array.from({ length: 5 }, (_, i) => {
                  const rating = product.rating || 4.5;
                  if (i < Math.floor(rating)) {
                    return (
                      <i
                        key={i}
                        className="bi bi-star-fill text-green-500 text-[11px]"
                      />
                    );
                  } else if (i < rating) {
                    return (
                      <i
                        key={i}
                        className="bi bi-star-half text-green-500 text-[11px]"
                      />
                    );
                  } else {
                    return (
                      <i
                        key={i}
                        className="bi bi-star text-foreground/20 text-[11px]"
                      />
                    );
                  }
                })}
              </div>

              {/* PRICE + ARROW REVEAL */}
              <div className="flex items-end justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] opacity-30 font-mono uppercase">
                    Price
                  </span>
                  <span className="text-lg text-accent font-semibold tracking-tighter italic leading-none">
                    ${product.price}
                  </span>
                </div>

                {/* Arrow Reveal Circle */}
                <div className="w-8 h-8 rounded-full border border-foreground/10 flex items-center justify-center opacity-0 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:border-foreground/30">
                  <span className="text-xs">→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
