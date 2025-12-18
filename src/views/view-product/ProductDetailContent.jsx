import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartsContext";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import QuantityControl from "./component/QuantityControl";
import { useWishList } from "@/context/WishListContext";

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
    toast("Product Added to Cart", {
      icon: <i class="bi bi-bag-check-fill text-primary text-xl"></i>,
      style: {
        color: "var(--primary)",
      },
    });
  };

  const handleWishlist = () => {
    toggleWishlist(products);

    if (isWishlisted) {
      toast("Product remove from wishlist", {
        icon: <i class="bi bi-heartbreak-fill text-accent text-xl"></i>,
        style: {
          color: "var(--accent)",
        },
      });
    } else {
      toast("Product add to wishlist", {
        icon: <i class="bi bi-heart-fill text-primary text-xl"></i>,
        style: {
          color: "var(--primary)",
        },
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
          {/* ─── 01. IMAGE SECTION (Height Reduced) ─── */}
          <div className="relative w-full lg:w-[45%] overflow-hidden flex flex-col md:flex-row items-center justify-center p-4 md:p-8 gap-4">
            {/* Thumbnails: Smaller sizes */}
            <div className="flex flex-row md:flex-col gap-4 z-20 order-2 md:order-1">
              {products?.images?.map((img, index) => (
                <div
                  key={index}
                  onClick={() => setSelectImage(img)}
                  className="relative cursor-pointer group/item"
                >
                  {/* Background Decorative Block (The "Shadow") */}
                  <div
                    className={`absolute inset-0 bg-primary/10 -rotate-3 transition-transform duration-300 group-hover/item:rotate-0
        ${selectImage === img ? "opacity-100" : "opacity-0"}`}
                  />

                  {/* Main Thumbnail Container */}
                  <div
                    className={`relative p-1 border-2 transition-all duration-500 bg-background
        ${
          selectImage === img
            ? "border-primary translate-x-1 -translate-y-1 shadow-[4px_4px_0px_0px_rgba(var(--primary),1)]"
            : "border-foreground/10 opacity-60 hover:opacity-100 hover:border-foreground/30"
        }`}
                  >
                    <img
                      src={img}
                      // Size increased from w-12 to w-16/w-20
                      className="w-14 h-14 md:w-20 md:h-20 object-cover"
                      alt={`Thumbnail ${index}`}
                    />

                    {/* Technical index tag inside the image */}
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
            {/* Ghost Text: Scaled down from 15vw to 10vw */}
            <span className="absolute text-[10vw] font-black text-foreground/[0.03] select-none uppercase italic leading-none z-0">
              {products?.category?.slice(0, 4) || "TECH"}
            </span>

            {/* Main Image: Max-height limited to 300px */}
            <div className="relative z-10 w-full h-full flex items-center justify-center order-1 md:order-2 group/img">
              <div className="absolute top-0 left-0 text-[7px] font-mono opacity-20 flex flex-col">
                <span>RES_1080px</span>
                <span>MNTR_V2</span>
              </div>

              <img
                src={selectImage}
                alt={products?.title}
                className="max-h-[300px] w-auto object-contain transition-all duration-500 group-hover/img:scale-105"
              />
            </div>

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
                    View
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
