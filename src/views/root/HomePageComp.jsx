import React, {  useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { FiImage, FiMail, FiStar } from "react-icons/fi";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonCard from "@/components/ui/skeletonCard";
import { useQuery } from "@tanstack/react-query";

const HomePageComp = () => {
  const [imageLoaded, setImageLoaded] = useState({});
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await axios.get(
      "https://dummyjson.com/products?limit=8&skip=78"
    );
    return res.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ["home-products"],
    queryFn: fetchProducts,
  });

  const products = data?.products ?? [];
  const handleImageLoad = (id) => {
    setTimeout(() => {
      setImageLoaded((prev) => ({
        ...prev,
        [id]: true,
      }));
    }, 300); 
  };

  const handleViewProduct = (id) => navigate(`/product/${id}`);

  const reviews = [
    {
      name: "Aarav Sharma",
      avatar: "https://i.pravatar.cc/100?img=12",
      rating: 5,
      review:
        "Amazing shopping experience! The delivery was fast and the packaging was premium.",
    },
    {
      name: "Sophia Patel",
      avatar: "https://i.pravatar.cc/100?img=32",
      rating: 4,
      review:
        "Great product quality. Customer support helped me choose the perfect headphones!",
    },
    {
      name: "Rohan Verma",
      avatar: "https://i.pravatar.cc/100?img=51",
      rating: 5,
      review:
        "Super easy returns and exchange. Definitely my favorite store to shop from!",
    },
  ];
const itemProduct = [
  {
    id: "01",
    name: "CORE_SHELL",
    price: "$420",
    category: "Outerwear",
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "02",
    name: "FLUID_AXIS",
    price: "$180",
    category: "Base Layer",
    img: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "03",
    name: "VOID_MESH",
    price: "$310",
    category: "Technical",
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "04",
    name: "THERMAL_GRIP",
    price: "$95",
    category: "Accessories",
    img: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&q=80&w=800",
  },
];

  return (
    <>
      <div className="relative min-h-screen bg-secondary text-black font-sans overflow-hidden">
        {/* 1. BACKGROUND LAYER: THE HYBRID VOID */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Massive Rotating Teal Blob */}
          <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-[#649b9b] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-40 blur-[100px] animate-liquid" />

          {/* The Structural Teal Block */}
          <div className="absolute right-0 top-0 w-1/3 h-full bg-[#649b9b] opacity-100 hidden lg:block" />

          {/* The Dynamic Orange Beam */}
          <div
            style={{ backgroundColor: "oklch(67.221% 0.20974 33.259)" }}
            className="absolute top-[-20%] left-[35%] w-[8vw] h-[150%] rotate-[25deg] opacity-90 shadow-[0_0_80px_rgba(0,0,0,0.1)]"
          />

          {/* Background Typography */}
          <h2 className="absolute top-1/2 left-[10%] -translate-y-1/2 text-[25vw] font-black text-black/[0.03] select-none tracking-tighter italic">
            AXIS
          </h2>
        </div>

        {/* 2. THE FLOATING SCANNER (OKLCH Orange) */}
        <div
          style={{ backgroundColor: "oklch(67.221% 0.20974 33.259)" }}
          className="absolute top-0 left-[20%] w-[1px] h-full z-20 opacity-30 hidden lg:block"
        >
          <div
            style={{ backgroundColor: "oklch(67.221% 0.20974 33.259)" }}
            className="w-3 h-3 rounded-full -translate-x-1 animate-scan shadow-[0_0_20px_#ff6b00]"
          />
        </div>

        {/* 3. MAIN CONTENT GRID */}
        <main className="relative z-30 grid grid-cols-1 lg:grid-cols-12 min-h-screen">
          {/* SPACER FOR LEFT NAV (If you decide to add it back) */}
          <div className="lg:col-span-2 hidden lg:block"></div>

          {/* CENTER TITLE SECTION */}
          <div className="lg:col-span-6 flex flex-col justify-center px-10 lg:px-20">
            <div className="relative">
              <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.75] tracking-tighter mix-blend-difference text-white lg:text-black">
                GRAV
                <br />
                <span className="relative inline-block">
                  ITY.
                  <span className="absolute -right-16 top-4 text-[10px] tracking-[1em] font-light opacity-30 rotate-90 origin-left whitespace-nowrap">
                    EDITION_2025
                  </span>
                </span>
              </h1>

              <div className="mt-16 flex items-start gap-10">
                <div className="w-16 h-[2px] bg-black mt-3 shrink-0"></div>
                <p className="max-w-xs text-sm font-medium leading-relaxed opacity-60">
                  A radical deconstruction of space. Forged between the fluid
                  void of{" "}
                  <span className="text-[#649b9b] font-bold">#649B9B</span> and
                  thermal orange energy.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT PRODUCT DISPLAY (SQUARE STATIC IMAGE REPLACEMENT) */}
          <div className="lg:col-span-4 relative flex items-center justify-center p-10 lg:p-0">
            <div className="relative w-full max-w-sm">
              {/* The Floating Frame */}
              <div className="relative aspect-square overflow-hidden shadow-[0_80px_100px_rgba(0,0,0,0.4)] animate-float group z-10 bg-black">
                {/* STATIC SQUARE CONTENT: A CSS PATTERN INSTEAD OF IMAGE */}
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#649b9b_1.5px,transparent_1.5px)] [background-size:24px_24px] group-hover:scale-110 transition-transform duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-[#649b9b]/20" />

                {/* Center Icon/Graphic */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 border border-white/10 flex items-center justify-center rotate-45 group-hover:rotate-90 transition-transform duration-[1.5s]">
                    <div
                      style={{
                        backgroundColor: "oklch(67.221% 0.20974 33.259)",
                      }}
                      className="w-1 h-20"
                    />
                  </div>
                </div>

                {/* Glass Overlay */}
                <div className="absolute -inset-2 border border-white/20 backdrop-blur-[2px] z-30 pointer-events-none group-hover:opacity-0 transition-opacity" />

                {/* Interactive Purchase Button */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-40">
                  <button
                    style={{ backgroundColor: "oklch(67.221% 0.20974 33.259)" }}
                    className="px-10 py-5 text-white font-black text-[10px] uppercase tracking-[0.5em] shadow-2xl hover:scale-105 transition-transform"
                  >
                    Acquire: $1,200
                  </button>
                </div>
              </div>

              {/* Background Decorative "01" */}
              <span className="absolute -bottom-10 -right-20 text-[18rem] font-black text-white/10 pointer-events-none select-none z-0">
                01
              </span>

              {/* Circular Path Detail */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] border border-white/10 rounded-full -rotate-12 pointer-events-none"></div>
            </div>
          </div>
        </main>

        {/* 4. FOOTER MARQUEE */}
        <footer className="absolute bottom-0 left-0 w-full h-16 border-t border-black/5 bg-secondary/50 backdrop-blur-sm z-50 flex items-center px-10">
          <div className="flex gap-8 overflow-hidden whitespace-nowrap opacity-30 text-[9px] font-black uppercase tracking-[0.5em]">
            <div className="animate-marquee shrink-0">
              Limited Release • #649B9B Structural Core • Engineered Form •
              Global Logistics • 2025 Archive •
            </div>
            <div className="animate-marquee shrink-0" aria-hidden="true">
              Limited Release • #649B9B Structural Core • Engineered Form •
              Global Logistics • 2025 Archive •
            </div>
          </div>
        </footer>

        {/* ANIMATION ENGINE */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes liquid {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: rotate(0deg) scale(1); }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(180deg) scale(1.1); }
        }
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100vh); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-30px) rotate(1deg); }
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-liquid { animation: liquid 15s ease-in-out infinite; }
        .animate-scan { animation: scan 4s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `,
          }}
        />
      </div>

      
      <main className="">
        {/* ---------------------------------------- */}
        {/* HERO SLIDER */}
        {/* ---------------------------------------- */}

        {/* ---------------------------------------- */}
        {/* HERO SUPPORT FEATURES */}
        {/* ---------------------------------------- */}
        <section className="w-full bg-secondary mt-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2">
          {/* 1 */}
          <div className="flex p-2 items-center gap-4 bg-secondary rounded-lg">
            <div className="p-4 text-4xl text-accent">
              <i className="bi bi-send-check-fill"></i>
            </div>
            <div>
              <h1 className="font-semibold">Fast & Secure Delivery</h1>
              <p className="text-[14px]">Tell about your service</p>
            </div>
          </div>

          {/* 2 */}
          <div className="flex p-2 items-center gap-4 bg-secondary rounded-lg">
            <div className="p-4 text-4xl text-accent">
              <i className="bi bi-patch-check-fill"></i>
            </div>
            <div>
              <h1 className="font-semibold">Money Back Guarantee</h1>
              <p className="text-[14px]">Within 10 days</p>
            </div>
          </div>

          {/* 3 */}
          <div className="flex p-2 items-center gap-4 bg-secondary rounded-lg">
            <div className="p-4 text-4xl text-accent">
              <i className="bi bi-arrow-left-square-fill"></i>
            </div>
            <div>
              <h1 className="font-semibold">24 Hour Return Policy</h1>
              <p className="text-[14px]">No questions asked</p>
            </div>
          </div>

          {/* 4 */}
          <div className="flex p-2 items-center gap-4 bg-secondary rounded-lg">
            <div className="p-4 text-4xl text-accent">
              <i className="bi bi-question-octagon-fill"></i>
            </div>
            <div>
              <h1 className="font-semibold">Pro Quality Support</h1>
              <p className="text-[14px]">24/7 Live support</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------- */}
        {/* divider FEATURES */}
        {/* ---------------------------------------- */}
        <section className="flex flex-col text-center">
          <div className="flex pt-30 items-center justify-center gap-3">
            <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <h2 className="mx-4 text-primary text-xl md:text-2xl  font-semibold tracking-wide">
              Best Selling
            </h2>

            <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
          <div>
            <p className="text-foreground font-medium mt-3 text-[12px] md:text-sm px-2 md:px-40">
              Our most-loved products are here. From everyday essentials to
              premium picks, explore the items that consistently top the charts
              and win customer trust day after day.
            </p>
          </div>
        </section>

        {/* ---------------------------------------- */}
        {/* PRODUCT LISTING */}
        {/* ---------------------------------------- */}

        {isLoading ? (
          // ✅ Skeleton grid
          <SkeletonCard count={8} />
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-px bg-black/5 mt-10 border-t border-black/5">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleViewProduct(product.id)}
                className="group relative bg-secondary p-6 cursor-pointer transition-all duration-500 hover:bg-white border-b border-black/5 sm:border-r"
              >
                {/* TOP DATA TAG (UI Enhancement) */}
                <div className="flex justify-between items-center mb-4 opacity-40 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] font-mono font-bold tracking-widest">
                    REF: 00{product.id}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-black/20" />
                    <div
                      style={{ backgroundColor: "#649b9b" }}
                      className="w-1 h-1"
                    />
                  </div>
                </div>

                {/* IMAGE BOX */}
                <div className="relative w-full h-72 bg-neutral-100 overflow-hidden border border-black/5 transition-transform duration-700 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)]">
                  {/* IMAGE SKELETON */}
                  {!imageLoaded[product.id] && (
                    <>
                      <Skeleton className="absolute inset-0" />
                      <FiImage className="absolute inset-0 m-auto text-gray-300 text-4xl" />
                    </>
                  )}

                  {/* OVERLAY SCANLINE (Visual Only) */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-[#649b9b]/30 opacity-0 group-hover:opacity-100 group-hover:top-full transition-all duration-[1.5s] ease-in-out z-10" />

                  {/* IMAGE */}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    loading="lazy"
                    decoding="async"
                    width="256"
                    height="256"
                    onLoad={() => handleImageLoad(product.id)}
                    className={`h-full w-full object-contain p-6 grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110
            ${imageLoaded[product.id] ? "opacity-100" : "opacity-0"}`}
                  />

                  {/* TACTICAL CORNER ACCENT */}
                  <div
                    style={{ borderColor: "oklch(67.221% 0.20974 33.259)" }}
                    className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                {/* TITLE + PRICE */}
                <div className="mt-6 space-y-1">
                  <div className="flex justify-between items-start gap-4">
                    <h2 className="text-sm font-black italic uppercase tracking-tighter leading-tight group-hover:text-[#649b9b] transition-colors">
                      {product.title}
                    </h2>
                    <p
                      style={{ color: "oklch(67.221% 0.20974 33.259)" }}
                      className="text-lg font-black tracking-tighter"
                    >
                      ${product.price}
                    </p>
                  </div>
                </div>

                {/* RATING & FOOTER */}
                <div className="mt-4 flex justify-between items-center border-t border-black/[0.03] pt-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-3 ${
                          i < Math.floor(product.rating)
                            ? "bg-black"
                            : "bg-black/10"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono opacity-30 uppercase tracking-widest group-hover:opacity-100">
                    Available_Stock
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center">
            <h1 className="text-[10px] font-black uppercase tracking-[0.5em] opacity-20">
              No product found
            </h1>
          </div>
        )}

        {/* ---------------------------------------- */}
        {/* PRODUCT Review */}
        {/* ---------------------------------------- */}
        <section className="w-full py-20">
          <section className="flex  flex-col text-center">
            <div className="flex pt-30 items-center justify-center gap-3">
              <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <h2 className="mx-4 text-primary text-xl md:text-2xl font-semibold tracking-wide">
                What Our Customers Say
              </h2>

              <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <div>
              <p className="text-foreground font-medium mt-3 text-[12px] md:text-sm px-2 md:px-40">
                Every purchase tells a story — and our customers choose XStore
                not just for the products, but for the experience. Their words
                reflect the quality and trust we work tirelessly to deliver.
              </p>
            </div>
          </section>

          {/* Heading */}

          {/* REVIEW GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 pt-16 gap-10">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-4xl rounded-t-[10px] bg-primary "
              >
                {/* Accent Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-white rounded-t-3xl" />

                {/* Avatar + Name + Stars */}
                <div className="flex items-center gap-4 mb-5 ">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover shadow-md border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {r.name}
                    </h3>

                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, idx) => (
                        <FiStar
                          key={idx}
                          size={12}
                          className="text-accent fill-accent"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="text-accent text-4xl opacity-30 absolute right-6 top-6">
                  “
                </div>

                {/* Review Text */}
                <p className="text-white text-[12px] leading-relaxed mt-2">
                  {r.review}
                </p>

                {/* Footnote */}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------- */}
        {/* feedback section */}
        {/* ---------------------------------------- */}
        <section className="py-20">
          <div
            className="w-full rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/src/assets/feedback.png')",
            }}
          >
            <div className="rounded-3xl w-full sm:w-fit mx-auto sm:ml-10 p-6 sm:p-8 lg:p-12">
              {/* Newsletter Label */}
              <div className="flex items-center gap-2 text-gray-700 mb-3">
                <FiMail className="text-background" size={22} />
                <span className="font-medium text-background">Newsletter</span>
              </div>

              {/* Heading */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-6">
                Get Weekly Updated about Products
              </h2>

              {/* Input + Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
                <input
                  type="email"
                  placeholder="xyz@abc.com"
                  className="px-3 py-2 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition  w-full sm:w-72"
                />

                <button className=" px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-primary hover:text-foreground transition font-medium w-full sm:w-auto">
                  Subscribe
                </button>
              </div>

              {/* Subtext */}
              <p className="text-background text-sm max-w-sm">
                Get weekly updates, discounts & product news. No spam.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePageComp;
