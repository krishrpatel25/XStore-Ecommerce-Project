import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { toast } from "sonner";

function ProductDetailContent({ products }) {
  const [selectImage, setSelectImage] = useState(products?.thumbnail || "");

  const handleAddToCart = () => {
     toast("Added to cart!", {
       icon: <span className="text-primary text-2xl animate-tick-pop">✔</span>,
     });


  }
  return (
    <div>
      <section className="pt-24 px-14">
        <div className="flex flex-col lg:flex-row items-center justify-between lg:items-start gap-6 p-4 lg:p-0">
          {/* Thumbnails */}
          <div className="flex lg:flex-col gap-3 lg:order-1 overflow-x-auto lg:overflow-x-visible">
            {products?.images ? (
              products.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`product-${index}`}
                  className="  p-2 rounded-2xl w-16 h-16 sm:w-25 sm:h-25 object-cover cursor-pointer flex-shrink-0"
                  onClick={() => setSelectImage(img)}
                />
              ))
            ) : (
              <div className="flex justify-center items-center py-10">
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
            <p className="text-gray-600 text-[12px] sm:text-[14px]">
              {products?.description}
            </p>

            <p className="text-2xl sm:text-3xl font-extrabold text-accent mt-2">
              ${products?.price}
            </p>
            <div class="w-full h-[2px] bg-primary"></div>

            <div className="w-full pt-4">
              <Button
                className="w-full sm:w-auto"
                onClick={() => handleAddToCart()}
              >
                Add Cart
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetailContent;
