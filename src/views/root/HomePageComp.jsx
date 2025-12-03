import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import "bootstrap-icons/font/bootstrap-icons.css"; // IMPORTANT

const HomePageComp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch products
  const getProductData = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=8&skip=0`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleViewProduct = (id) => navigate(`/products/${id}`);

  return (
    <div className="px-8">
      {/* ---------------------------------------- */}
      {/* HERO SLIDER */}
      {/* ---------------------------------------- */}

      <div className="w-full pt-8 overflow-hidden">
        <Carousel
          className="w-full"
          opts={{
            loop: true,
            align: "start",
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
            }),
          ]}
        >
          <CarouselContent className="flex w-full h-[450px] p-0 m-0">
            {/* SLIDE 1 */}
            <CarouselItem className="min-w-full flex-none h-[450px] p-0">
              <div className="w-full h-full flex items-center bg-primary">
                {/* TEXT */}
                <div className="w-1/2 h-full flex flex-col justify-center px-16">
                  <p className="text-gray-600 mb-3">
                    Amazing Products From Store
                  </p>
                  <h1 className="text-4xl font-bold leading-tight mb-6">
                    Explore Our Awesome Collection...
                  </h1>
                  <button className="px-6 py-2 bg-accent text-white rounded-lg w-fit">
                    Shop Now
                  </button>
                </div>

                {/* IMAGE */}
                <div className="w-1/2 h-full flex justify-center items-end">
                  <img
                    src="/src/assets/hero-1.png"
                    className="h-[90%] object-contain"
                  />
                </div>
              </div>
            </CarouselItem>

            {/* SLIDE 2 */}
            <CarouselItem className="min-w-full flex-none h-[450px] p-0">
              <div className="w-full h-full flex items-center bg-primary">
                <div className="w-1/2 h-full flex flex-col justify-center px-16">
                  <p className="text-gray-600 mb-3">
                    Amazing Products From Store
                  </p>
                  <h1 className="text-4xl font-bold leading-tight mb-6">
                    Explore Our New Designs...
                  </h1>
                  <button className="px-6 py-2 bg-accent text-white rounded-lg w-fit">
                    Shop Now
                  </button>
                </div>

                <div className="w-1/2 h-full flex justify-center items-end">
                  <img
                    src="/src/assets/hero-2.png"
                    className="h-[90%] object-contain"
                  />
                </div>
              </div>
            </CarouselItem>

            {/* SLIDE 3 */}
            <CarouselItem className="min-w-full flex-none h-[450px] p-0">
              <div className="w-full h-full flex items-center bg-primary">
                <div className="w-1/2 h-full flex flex-col justify-center px-16">
                  <p className="text-gray-600 mb-3">Trending Now</p>
                  <h1 className="text-4xl font-bold leading-tight mb-6">
                    Upgrade Your Lifestyle...
                  </h1>
                  <button className="px-6 py-2 bg-accent text-white rounded-lg w-fit">
                    Shop Now
                  </button>
                </div>

                <div className="w-1/2 h-full flex justify-center items-end">
                  <img
                    src="/src/assets/hero-3.png"
                    className="h-[90%] object-contain"
                  />
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </div>

      {/* ---------------------------------------- */}
      {/* HERO SUPPORT FEATURES */}
      {/* ---------------------------------------- */}

      <div className="w-full flex flex-wrap justify-between items-center bg-secondary mt-6 rounded-xl">
        {/* 1 */}
        <div className="flex p-6 flex-row items-center justify-center gap-4 min-w-[250px]">
          <div className="p-4 text-4xl text-accent">
            <i className="bi bi-send-check-fill"></i>
          </div>
          <div>
            <h1 className="font-semibold">Fast & Secure Delivery</h1>
            <p className="text-[14px]">Tell about your service</p>
          </div>
        </div>

        {/* 2 */}
        <div className="flex p-6 flex-row items-center justify-center gap-4 min-w-[250px]">
          <div className="p-4 text-4xl text-accent">
            <i className="bi bi-patch-check-fill"></i>
          </div>
          <div>
            <h1 className="font-semibold">Money Back Guarantee</h1>
            <p className="text-[14px]">Within 10 days</p>
          </div>
        </div>

        {/* 3 */}
        <div className="flex p-6 flex-row items-center justify-center gap-4 min-w-[250px]">
          <div className="p-4 text-4xl text-accent">
            <i className="bi bi-arrow-left-square-fill"></i>
          </div>
          <div>
            <h1 className="font-semibold">24 Hour Return Policy</h1>
            <p className="text-[14px]">No questions asked</p>
          </div>
        </div>

        {/* 4 */}
        <div className="flex p-6 flex-row items-center justify-center gap-4 min-w-[250px]">
          <div className="p-4 text-4xl text-accent">
            <i className="bi bi-question-octagon-fill"></i>
          </div>
          <div>
            <h1 className="font-semibold">Pro Quality Support</h1>
            <p className="text-[14px]">24/7 Live support</p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------- */}
      {/* divider FEATURES */}
      {/* ---------------------------------------- */}

      <div className="flex items-center justify-center gap-3 my-12">
        <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
        <span className="mx-4 text-primary font-semibold tracking-wide">
          All Products
        </span>
        <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
      </div>

      {/* ---------------------------------------- */}
      {/* PRODUCT LISTING */}
      {/* ---------------------------------------- */}

      {loading ? (
        // LOADING UI
        <div className="w-full h-[392px] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
        </div>
      ) : products.length > 0 ? (
        // PRODUCT GRID
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => handleViewProduct(product.id)}
              className="bg-white rounded-4xl border border-accent shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden"
            >
              {/* Image */}
              <div className="relative w-full h-56 bg-secondary flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 text-xs font-medium text-background  backdrop-blur-md border bg-primary px-3 py-1 rounded-full">
                  {product.category}
                </span>

                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-full object-contain p-4"
                />
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col gap-3">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.title}
                </h2>

                <p className="text-gray-600 text-sm line-clamp-2">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const rating = product.rating;

                    if (i < Math.floor(rating)) {
                      // FULL STAR
                      return (
                        <i
                          key={i}
                          className="bi bi-star-fill text-yellow-500 text-lg"
                        ></i>
                      );
                    } else if (i < rating) {
                      // HALF STAR
                      return (
                        <i
                          key={i}
                          className="bi bi-star-half text-yellow-500 text-lg"
                        ></i>
                      );
                    } else {
                      // EMPTY STAR
                      return (
                        <i
                          key={i}
                          className="bi bi-star text-gray-400 text-lg"
                        ></i>
                      );
                    }
                  })}

                  <span className="text-gray-500 text-sm ml-1">
                    {product.rating.toFixed(1)}
                  </span>
                </div>

                {/* Price + Delete */}
                <div className="flex justify-between items-center pt-2">
                  <p className="text-2xl font-bold text-accent">
                    ${product.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // NO PRODUCTS
        <div className="w-full h-[392px] flex items-center justify-center">
          <h1>No product found!! Try another page!</h1>
        </div>
      )}
    </div>
  );
};

export default HomePageComp;
