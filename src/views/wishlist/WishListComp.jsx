import { useWishList } from "@/context/WishListContext";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import NoWishListFound from "./component/NoWishListFound";

const Wishlist = () => {
  const { wishlist, removeWishlist } = useWishList();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return <NoWishListFound />;
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
