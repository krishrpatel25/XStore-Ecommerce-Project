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
    toggleWishlist(products)

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
  }

  if (!products) {
    return <div> no data found </div>;
  }
  return (
    <div>
      <section className="pt-14 px-0 lg:pt-24 lg:px-14">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:items-start gap-6 p-4 lg:p-0">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            {/* Thumbnails */}
            <div
              className="
                  grid grid-cols-3 grid-rows-2 gap-3        /* MOBILE (default) */
                  sm:flex sm:flex-row sm:gap-3              /* TABLET AND ABOVE */
                  lg:flex-col lg:order-1 lg:overflow-visible
                "
            >
              {products?.images ? (
                Array.isArray(products.images) &&
                products.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`product-${index}`}
                    className="
                      w-full h-20                 /* MOBILE IMAGE SIZE */
                      sm:w-20 sm:h-20             /* TABLET+ USES OLD SIZE */
                      lg:w-24 lg:h-24
                      rounded-xl object-cover cursor-pointer
                        "
                    onClick={() => setSelectImage(img)}
                  />
                ))
              ) : (
                <div className="flex justify-center items-center py-10 col-span-3">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 rounded-full animate-bounce [animation-delay:-0.2s]"></div>
                    <div className="w-3 h-3 rounded-full animate-bounce [animation-delay:-0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Image */}
            <div className="border-none flex justify-center items-center order-1 lg:order-2 w-full lg:w-auto">
              <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[300px] md:h-[300px] flex justify-center items-center rounded-2xl  overflow-hidden">
                <img
                  src={selectImage}
                  alt={products?.title}
                  className="w-full h-full object-contain transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col  sm:p-6 lg:px-16 gap-2  w-full lg:w-[60%] order-3">
            <span className="text-sm sm:text-base text-gray-700">
              {products?.category}
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {products?.title}
            </h1>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }, (_, i) => {
                const rating = products.rating;

                if (i < Math.floor(rating)) {
                  return (
                    <i
                      key={i}
                      className="bi bi-star-fill text-green-500 text-[12px]"
                    ></i>
                  );
                } else if (i < rating) {
                  return (
                    <i
                      key={i}
                      className="bi bi-star-half text-green-500 text-[12px]"
                    ></i>
                  );
                } else {
                  return (
                    <i
                      key={i}
                      className="bi bi-star text-gray-300 text-[12px]"
                    ></i>
                  );
                }
              })}
              <p className="px-4 text-[12px]">30,856 Ratings & 3,851 Reviews</p>
            </div>
            <div>
              <p className="text-primary">
                Extra {products?.discountPercentage}% off
              </p>
            </div>
            <p className="text-gray-600 font-medium text-[12px] sm:text-[14px]">
              {products?.description}
            </p>

            <p className="text-2xl sm:text-3xl font-extrabold text-accent mt-2">
              ${products?.price}
            </p>
            <div className="w-full h-0.5 bg-primary"></div>

            <div className="flex flex-col sm:flex-row w-full gap-4 pt-4">
              <div className="flex gap-4 w-full">
                {!showQtyControl ? (
                  <>
                    {/* Add Cart Button */}
                    <Button
                      className="w-[200px] text-white bg-accent hover:bg-primary hover:text-background "
                      onClick={handleAddToCart}
                    >
                      Add Cart
                    </Button>
                  </>
                ) : (
                  <>
                    {/* Quantity Control */}
                    <QuantityControl
                      qty={qty}
                      onIncrease={handleIncrease}
                      onDecrease={handleDecrease}
                    />

                    {/* View Cart Button */}
                    <Button
                      className="w-[100px] text-white bg-accent hover:bg-primary hover:text-background"
                      onClick={() => navigate("/cart")}
                    >
                      View Cart
                    </Button>
                  </>
                )}
              </div>
              <div>
                <button
                  onClick={handleWishlist}
                  className="px-5 py-2 bg-secondary rounded-full flex items-center gap-2 
                  hover:bg-primary/20 transition font-medium"
                >
                  {isWishlisted ? (
                    <>
                      <i className="bi bi-heart-fill text-red-500"></i>
                      Remove
                    </>
                  ) : (
                    <>
                      <i className="bi bi-heart"></i>
                      Wishlist
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailContent;
