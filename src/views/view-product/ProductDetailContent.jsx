import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartsContext";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuantityControl from "./component/QuantityControl";
import { useWishList } from "@/context/WishListContext";
import { customToast } from "@/components/ui/CustomToast";

function ProductDetailContent({ products }) {
  const navigate = useNavigate();
  const { addProduct } = useCart();
  const { cart, updateCart, removeProduct } = useCart();
  const { wishlist, toggleWishlist } = useWishList();
  const isWishlisted = wishlist.some((i) => i.id === products.id);

  const existingItem = cart.find((i) => i.id === products.id);
  const qty = existingItem ? existingItem.qty : 1;
  const showQtyControl = existingItem && existingItem.qty > 0;

  const [selectImage, setSelectImage] = useState(products?.thumbnail || "");
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    setImgLoaded(false);
  }, [selectImage]);

  const handleIncrease = () => {
    updateCart(products.id, qty + 1);
  };

  const handleDecrease = () => {
    if (qty > 1) {
      updateCart(products.id, qty - 1);
    } else {
      removeProduct(products.id);
    }
  };

  const handleAddToCart = () => {
    addProduct(products, qty);
    customToast({
      text: "Product added to cart",
      icon: <i class="bi bi-bag-check-fill text-primary text-xl"></i>,
      color: "var(--primary)",
    });
  };

  const handleWishlist = () => {
    toggleWishlist(products);

    if (isWishlisted) {
      customToast({
        text: "Product remove from wishlist",
        icon: <i class="bi bi-heartbreak-fill text-accent text-xl"></i>,
        color: "var(--accent)",
      });
    } else {
      customToast({
        text: "Product add to wishlist",
        icon: <i class="bi bi-heart-fill text-primary text-xl"></i>,
        color: "var(--primary)",
      });
    }
  };

  if (!products) {
    return <div> no data found </div>;
  }
  return (
    <div className=" text-foreground group/section max-w-7xl mx-auto">
      <section className="border-t border-foreground/10">
        <div className="flex flex-col lg:flex-row border-b border-foreground/10 min-h-[450px]">
          {/* ─── 01. IMAGE SECTION ─── */}
          <div className="relative w-full lg:w-[50%] min-h-[500px] lg:h-full overflow-hidden flex flex-col lg:flex-row items-center justify-center p-4 md:p-8 gap-8 border-b-2 lg:border-b-0 lg:border-r-2 border-foreground/10 group/section">
            <div className="grid grid-cols-3 md:grid-cols-2 gap-2 z-20 order-2 lg:order-1 shrink-0">
              {products?.images?.slice(0, 6).map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectImage(img)}
                  className="relative md:w-22 md:h-22 cursor-pointer group/item"
                >
                  {/* Decorative Shadow */}
                  <div
                    className={`absolute inset-0 bg-primary/10 -rotate-3 transition-transform duration-300 group-hover/item:rotate-0
            ${selectImage === img ? "opacity-100" : "opacity-0"}`}
                  />

                  {/* Thumbnail Box */}
                  <div
                    className={`relative p-1 border-2 transition-all duration-500 bg-background
            ${
              selectImage === img
                ? "border-primary translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(var(--primary),1)]"
                : "border-foreground/10 opacity-60 hover:opacity-100"
            }`}
                  >
                    <img
                      src={img}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 p-1 object-cover"
                      alt={`Thumbnail ${index}`}
                    />

                    <div
                      className={`absolute bottom-0 right-0 px-1 text-[8px] font-mono leading-none
              ${
                selectImage === img
                  ? "bg-primary text-background"
                  : "bg-foreground/10 text-foreground"
              }`}
                    >
                      0{index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* --- GHOST TEXT --- */}
            <span className="absolute text-[12vw] lg:text-[10vw] font-black text-foreground/[0.03] select-none uppercase italic leading-none z-0 pointer-events-none">
              {products?.category?.slice(0, 4) || "TECH"}
            </span>

            {/* --- MAIN IMAGE VIEWPORT --- */}
            <div className="relative z-10 w-full flex-1 flex items-center justify-center order-1 lg:order-2 group/img">
              {/* Technical Metadata Labels */}
              <div className="absolute top-0 left-0 text-[7px] font-mono opacity-30 flex flex-col uppercase">
                <span>REF_DATA_SRC</span>
                <span>IMG_BUFF_ENABLED</span>
              </div>

              <img
                src={selectImage}
                onLoad={() => setImgLoaded(true)}
                className={`max-h-[300px] md:max-h-[400px] w-auto object-contain transition-all duration-500
                ${imgLoaded ? "opacity-100" : "opacity-0"}
                group-hover/img:scale-105`}
                decoding="async"
                loading="eager"
              />
            </div>

            {/* Bottom Accent Line */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover/section:scale-x-100 transition-transform duration-500 origin-right" />
          </div>

          {/* ─── 02. INFO SECTION (Reduced Padding & Font) ─── */}
          <div className="w-full lg:w-[55%] p-6 md:p-10 flex flex-col justify-center border-l border-foreground/10 bg-background relative">
            <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-primary" />

            {/* Label: Tighter spacing */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-mono text-primary font-bold">
                [DATA_01]
              </span>
              <div className="h-[1px] w-8 bg-foreground/20"></div>
              <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">
                {products?.category}
              </span>
            </div>

            {/* Title: Scaled down from 7xl to 4xl/5xl */}
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter italic text-foreground mb-4 leading-none hover:text-primary transition-colors cursor-default">
              {products?.title}
            </h1>

            <p className="text-[12px] text-foreground/60 uppercase leading-snug tracking-tight max-w-md mb-6 line-clamp-3">
              {products?.description}
            </p>

            {/* Price & Rating: Compact Grid */}
            <div className="flex items-center gap-8 mb-8 py-4 border-y border-foreground/5">
              <div className="flex flex-col">
                <span className="text-[9px] font-mono opacity-30 uppercase">
                  Value
                </span>
                <span className="text-2xl font-black text-accent italic">
                  ${products?.price}
                </span>
              </div>

              <div className="w-[1px] h-8 bg-foreground/10" />

              <div className="flex flex-col">
                <span className="text-[9px] font-mono opacity-30 uppercase mb-1">
                  Rating
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-1 ${
                        i < Math.floor(products?.rating)
                          ? "bg-primary"
                          : "bg-foreground/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons: Height reduced from h-14 to h-11 */}
            <div className="flex flex-wrap gap-3">
              {!showQtyControl ? (
                <button
                  onClick={handleAddToCart}
                  className="h-11 px-8 bg-foreground text-background flex items-center justify-center text-[10px] font-black uppercase tracking-widest hover:bg-primary transition-all"
                >
                  Add_To_Cart
                </button>
              ) : (
                <div className="flex gap-2">
                  {/* Assuming QuantityControl has internal height padding, adjust accordingly */}
                  <QuantityControl
                    qty={qty}
                    onIncrease={handleIncrease}
                    onDecrease={handleDecrease}
                  />
                  <button
                    onClick={() => navigate("/cart")}
                    className="h-11 px-5 border border-primary text-primary font-black uppercase text-[10px] tracking-widest"
                  >
                    View_cart
                  </button>
                </div>
              )}

              <button
                onClick={handleWishlist}
                className="h-11 px-5 border border-foreground/10 flex items-center justify-center gap-2 hover:bg-foreground/5 transition font-mono text-[9px] uppercase tracking-tighter"
              >
                {isWishlisted ? (
                  <>
                    <i className="bi bi-heart-fill text-red-500"></i> Saved
                  </>
                ) : (
                  <>
                    <i className="bi bi-heart"></i> Wishlist
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailContent;
