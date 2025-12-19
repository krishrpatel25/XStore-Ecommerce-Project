import React from "react";
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
import heroImg from "@/assets/hero.jpg";

const HomePageComp = () => {
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

  return (
    <>
      {/* ---------------------------------------- */}
      {/* HERO SLIDER */}
      {/* ---------------------------------------- */}

      <section className="relative min-h-screen bg-primary text-foreground overflow-hidden flex flex-col pt-10 justify-center">
        {/* 1. CYBER GRID LAYER */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
            maskImage:
              "radial-gradient(ellipse at center, black, transparent 80%)",
          }}
        />

        {/* 2. GLOWING ORBS (Blur Layers) */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-background/70 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-background/50 rounded-full blur-[120px]" />

        <main className="relative z-10 container mx-auto px-10 lg:px-22 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-20">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="h-[2px] w-8 bg-background"></span>
                <span className="font-mono text-[10px] tracking-[0.5em] text-background uppercase font-bold">
                  Smart Shopping Hub
                </span>
              </div>

              <h1 className="text-5xl md:text-8xl  font-black tracking-tighter uppercase italic leading-[0.85]">
                Shop <br />
                <span
                  className="text-transparent"
                  style={{ WebkitTextStroke: "1px var(--background)" }}
                >
                  Without
                </span>{" "}
                <br />
                <span className="text-background">Limits.</span>
              </h1>
            </div>

            <p className="max-w-md text-sm md:text-base font-light text-foreground/60 leading-relaxed border-l border-primary/30 pl-6">
              One platform. Unlimited choices. Shop across categories, find the
              best deals, and experience shopping reimagined for the modern
              world.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => navigate("/allproducts")}
                className="px-8 py-4 bg-accent text-background font-black uppercase text-[11px] tracking-widest hover:bg-accent/80 transition-colors"
              >
                Initialize_Shop
              </button>
              <button
                onClick={() => navigate("/allproducts")}
                className="px-8 py-4 border border-background/50 hover:border-background text-background uppercase text-[11px] tracking-widest transition-colors relative group"
              >
                View_Specs
                <span className="absolute inset-0 bg-background/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </button>
            </div>
          </div>

          {/* RIGHT MEDIA (The Device Window) */}
          <div className="relative group">
            {/* Glass Card Container */}
            <div className="relative z-20 border border-foreground/10 bg-background backdrop-blur-xl p-2 rounded-sm shadow-2xl">
              {/* Window Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-foreground/5 bg-background/50">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                </div>
                <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">
                  Model_Neo_X
                </span>
              </div>

              {/* Content Area */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={heroImg}
                  alt="Product"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Scanline Overlay */}
                <div className="absolute" />
              </div>

              {/* Specs Footer */}
              <div className="p-6 font-mono space-y-2">
                <div className="flex justify-between text-[10px] opacity-50">
                  <span>// NEW_ARRIVAL</span>
                  <span>//SECURE_CHECKOUT</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-[14px] md:text-xl font-semibold text-primary italic">
                    FEATURED_PRODUCT
                  </span>
                  <span className="text-accent text-[14px] md:text-xl font-bold">
                    $149.00
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Back Elements */}
            <div className="absolute -top-6 -right-6 w-full h-full border border-background/30 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform" />
            <div className="absolute -bottom-6 -left-6 w-full h-full border border-primary/20 -z-10 group-hover:-translate-x-2 group-hover:-translate-y-2 transition-transform" />
          </div>
        </main>

        {/* FOOTER MARQUEE */}
        <div className="mt-auto py-6 border-t border-foreground/5 bg-secondary/20">
          <div className="flex gap-12  text-background animate-footer-scroll whitespace-nowrap overflow-hidden text-[9px] font-mono opacity-70 uppercase tracking-[0.5em]">
            <span>// Smart_Shopping: Enabled</span>
            <span>// Global_Products: Live</span>
            <span>// Secure_Checkout: Active</span>
            <span>// Instant_Delivery: Online</span>
            <span>// Exclusive_Deals: Unlocked</span>
            <span>// NextGen_Commerce</span>
            <span>// Smart_Shopping: Enabled</span>
            <span>// Global_Products: Live</span>
            <span>// Secure_Checkout: Active</span>
            <span>// Instant_Delivery: Online</span>
            <span>// Exclusive_Deals: Unlocked</span>
            <span>// NextGen_Commerce</span>
          </div>
        </div>
      </section>

      <main className="px-4 md:px-10 lg:px-30 pt-20">
        {/* ---------------------------------------- */}
        {/* HERO SUPPORT FEATURES */}
        {/* ---------------------------------------- */}
        <section className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: "bi-send-check-fill",
              title: "Fast Delivery",
              desc: "Global_Sync_Active",
              num: "01",
            },
            {
              icon: "bi-patch-check-fill",
              title: "Secure Pay",
              desc: "Encryption_Level_H",
              num: "02",
            },
            {
              icon: "bi-arrow-left-square-fill",
              title: "Easy Return",
              desc: "24H_Window_Open",
              num: "03",
            },
            {
              icon: "bi-question-octagon-fill",
              title: "Live Support",
              desc: "24/7_Core_Uplink",
              num: "04",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="relative h-32 bg-background border-l-8 border-accent group overflow-hidden flex items-center transition-all hover:border-secondary"
            >
              {/* BACKGROUND DECOR: Massive Number */}
              <span className="absolute -right-2 -bottom-4 text-8xl font-black text-accent/[0.04] italic group-hover:text-primary/[0.08] transition-colors">
                {item.num}
              </span>

              {/* LEFT ACCENT BAR */}
              <div className="h-full w-2 bg-foreground/10 group-hover:bg-primary transition-colors" />

              {/* MAIN CONTENT */}
              <div className="flex p-4 items-center gap-4 z-10">
                <div className="w-14 h-14 bg-accent flex items-center justify-center text-background text-2xl  group-hover:scale-110 transition-all duration-300">
                  <i className={item.icon}></i>
                </div>

                <div className="flex flex-col">
                  <h1 className="font-black uppercase tracking-tighter text-sm leading-tight text-foreground">
                    {item.title}
                  </h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-[2px] bg-accent animate-pulse" />
                    <p className="font-mono text-[9px] font-bold uppercase tracking-widest text-foreground/40">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* CORNER BRACKET */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-foreground/10" />
            </div>
          ))}
        </section>

        {/* ---------------------------------------- */}
        {/* divider FEATURES */}
        {/* ---------------------------------------- */}
        <section className="flex flex-col text-center">
          <div className="w-full pt-20 pb-10 flex flex-col">
            {/* Top Geometric Notch */}
            <div className="w-32 h-1.5 bg-primary ml-10"></div>

            <div className="flex items-center gap-4">
              {/* Left Line */}
              <div className="h-[1px] grow bg-foreground/10"></div>

              {/* MAIN HEADING BLOCK */}
              <div className="flex flex-col items-center text-center px-4">
                <span className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase mb-1">
                  Top_Demand
                </span>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground leading-none">
                  Best <span className="text-primary">Selling</span>
                </h2>

                {/* Small Detail Label under the title */}
                <div className="mt-4 px-3 py-1 border border-foreground/10 bg-foreground/5 flex items-center gap-3">
                  <div className="w-1 h-1 bg-accent animate-pulse"></div>
                  <span className="text-[9px] font-black font-mono tracking-tighter text-foreground/60 uppercase">
                    System_Transition_v.02
                  </span>
                </div>
              </div>

              {/* Right Line (Primary Color for contrast) */}
              <div className="h-[1px] w-24 md:w-64 bg-primary"></div>
            </div>

            {/* Optional: Descriptive sub-text aligned to the right line */}
            <div className="flex justify-end pr-10 mt-2">
              <p className="max-w-[300px] text-[10px] text-right font-medium opacity-40 uppercase leading-tight">
                Explore the items that consistently top the charts and win
                customer trust day after day.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------- */}
        {/* PRODUCT LISTING */}
        {/* ---------------------------------------- */}

        {isLoading ? (
          <SkeletonCard count={8} />
        ) : products.length > 0 ? (
          <div
            className="
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
              mt-10
              border-t border-l border-foreground/10
            "
          >
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleViewProduct(product.id)}
                className="
                  group relative flex flex-col p-6
                  border-b border-r border-foreground/10
                  transition-all duration-300
                  hover:bg-background
                  hover:-translate-y-1
                "
              >
                <div className="flex justify-between items-center mb-8">
                  <span className="text-[9px] font-mono opacity-40 uppercase tracking-widest">
                    {product.category || "General_Asset"}
                  </span>
                  <span className="text-[9px] font-mono opacity-40">
                    00{product.id}
                  </span>
                </div>

                {/* IMAGE CONTAINER */}
                <div className="relative aspect-[4/5] w-full mb-8 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    loading="lazy"
                    className="
                      h-full w-full object-contain
                      opacity-0 transition-all duration-500
                      group-hover:scale-[1.04]
                    "
                    onLoad={(e) => (e.currentTarget.style.opacity = "1")}
                  />

                  {/* subtle glow */}
                  <div
                    className="
                      pointer-events-none absolute inset-0
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-300
                      shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]
                    "
                  />
                </div>

                {/* TEXT CONTENT */}
                <div className="mt-auto space-y-4">
                  <h2
                    className="
                      text-sm font-bold uppercase leading-tight
                      text-foreground/90
                      transition-colors duration-300
                      group-hover:text-primary
                    "
                  >
                    {product.title}
                  </h2>

                  <div className="flex items-end justify-between">
                    <div className="flex  flex-col">
                      <span className="text-[10px] opacity-30 font-mono uppercase">
                        Price
                      </span>
                      <span className="text-lg text-accent font-semi tracking-tighter italic">
                        ${product.price}
                      </span>
                    </div>

                    {/* ARROW – reveal on hover */}
                    <div
                      className="
                        w-8 h-8 rounded-full
                        border border-foreground/10
                        flex items-center justify-center
                        opacity-0 translate-x-1
                        transition-all duration-300
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        group-hover:border-foreground/30
                      "
                    >
                      <span className="text-xs">→</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-60 flex items-center justify-center border-t border-foreground/10">
            <span className="text-[10px] font-mono opacity-20 uppercase tracking-[1em]">
              Zero_Results
            </span>
          </div>
        )}

        {/* ---------------------------------------- */}
        {/* divider FEATURES */}
        {/* ---------------------------------------- */}
        <section className="flex flex-col text-center">
          <div className="w-full pt-20 pb-10 flex flex-col">
            {/* Top Geometric Notch */}
            <div className="w-32 h-1.5 bg-primary ml-10"></div>

            <div className="flex items-center gap-4">
              {/* Left Line */}
              <div className="h-[1px] grow bg-foreground/10"></div>

              {/* MAIN HEADING BLOCK */}
              <div className="flex flex-col items-center text-center px-4">
                <span className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase mb-1">
                  Community_Reports
                </span>
                <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-foreground leading-none">
                  USER <span className="text-primary">FEEDBACK</span>
                </h2>

                {/* Small Detail Label under the title */}
                <div className="mt-4 px-3 py-1 border border-foreground/10 bg-foreground/5 flex items-center gap-3">
                  <div className="w-1 h-1 bg-accent animate-pulse"></div>
                  <span className="text-[9px] font-black font-mono tracking-tighter text-foreground/60 uppercase">
                    System_Transition_v.02
                  </span>
                </div>
              </div>

              {/* Right Line (Primary Color for contrast) */}
              <div className="h-[1px] w-24 md:w-64 bg-primary"></div>
            </div>

            {/* Optional: Descriptive sub-text aligned to the right line */}
            <div className="flex justify-end pr-10 mt-2">
              <p className="max-w-[300px] text-[10px] text-right font-medium opacity-40 uppercase leading-tight">
                PRIORITY INVENTORY: RANKED BY SYSTEM METRICS FOR RELIABILITY AND
                CONSISTENT USER SATISFACTION.
              </p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------- */}
        {/* PRODUCT Review */}
        {/* ---------------------------------------- */}
        <section className="w-full py-20">
          {/* REVIEW GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 px-6">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="group relative bg-secondary/30 border-2 border-foreground/10 transition-all duration-300 hover:bg-background"
              >
                {/* TOP HEADER SECTION (Stenciled look) */}
                <div className="border-b-2 border-foreground/10 p-2 flex justify-between items-center bg-primary text-background">
                  <span className="text-[10px] font-mono font-black tracking-[.3em]">
                    DATA_PACKET_{i + 1}
                  </span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-background rounded-full animate-pulse" />
                    <div className="w-2 h-2 bg-background/30 rounded-full" />
                  </div>
                </div>

                {/* CONTENT AREA */}
                <div className="p-6">
                  {/* AVATAR & RATING GRID */}
                  <div className="flex justify-between items-start mb-8">
                    <div className="relative group/img">
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-16 h-16 grayscale sepia-[.5] border-2 border-foreground group-hover/img:sepia-0 transition-all"
                      />
                      {/* The "Crosshair" Overlay */}
                      <div className="absolute inset-0 border border-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                        <div className="w-full h-[1px] bg-primary absolute" />
                        <div className="h-full w-[1px] bg-primary absolute" />
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-mono opacity-40 mb-1">
                        QUALITY_SCORE
                      </p>
                      <div className="text-2xl font-black italic tracking-tighter text-accent leading-none">
                        {r.rating}.0
                      </div>
                    </div>
                  </div>

                  {/* REVIEW TEXT - Boxed with "Lines" background */}
                  <div className="relative bg-foreground/[0.03] p-4 border-l-4 border-primary italic">
                    <p className="font-mono text-[11px] leading-relaxed text-foreground/80 uppercase">
                      {r.review}
                    </p>
                  </div>

                  {/* AUTHOR NAME - Stenciled */}
                  <div className="mt-8">
                    <h3 className="text-lg font-black uppercase tracking-tighter leading-none border-b-2 border-foreground w-fit mb-1">
                      {r.name}
                    </h3>
                    <p className="text-[8px] font-mono opacity-40 tracking-widest uppercase">
                      Verified_Customer_0{i}
                    </p>
                  </div>
                </div>

                {/* BOTTOM ACTION BAR */}
                <div className="border-t-2 border-foreground/10 p-3 flex justify-between items-center overflow-hidden">
                  <div className="flex -space-x-1">
                    {[...Array(3)].map((_, j) => (
                      <div
                        key={j}
                        className="w-6 h-2 border border-foreground/20 skew-x-[30deg]"
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono font-bold tracking-widest text-primary animate-pulse">
                    // STATUS: SECURE
                  </span>
                </div>

                {/* DECORATIVE BRACKETS AROUND THE ENTIRE CARD (Only visible on hover) */}
                <div className="absolute -top-4 -left-4 w-6 h-6 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------- */}
        {/* join with us  */}
        {/* ---------------------------------------- */}
        <section className="py-24 px-4  relative">
          {/* GLOBAL DECOR: Structural Measurements */}
          <div className="absolute top-0 left-10 h-full w-[1px] bg-foreground/5 hidden md:block" />
          <div className="absolute top-10 left-0 w-full h-[1px] bg-foreground/5 hidden md:block" />

          <div className="max-w-6xl mx-auto flex flex-col md:flex-row border-2 border-foreground relative bg-background shadow-[15px_15px_0px_0px_var(--primary)]">
            {/* 1. THE HARDWARE ID (Left Side - Static Info) */}
            <div className="w-full md:w-1/3 bg-accent p-8 md:p-12 text-background flex flex-col justify-between border-b-2 md:border-b-0 md:border-r-2 border-foreground">
              <div>
                <div className="flex items-center gap-2 mb-10">
                  <div className="w-3 h-3 bg-accent" />
                  <span className="text-[10px] font-mono font-black uppercase tracking-[.4em]">
                    Sub_Module_v9
                  </span>
                </div>

                <h2 className="text-5xl font-black italic uppercase tracking-tighter leading-[0.8] mb-6">
                  Join
                  <br />
                  with Us
                </h2>

                <p className="text-[9px] font-medium uppercase tracking-widest leading-loose opacity-90">
                  Establish a persistent data link to receive priority manifest
                  updates and hardware allocation reports.
                </p>
              </div>

              <div className="mt-12 hidden md:block">
                <div className="text-[40px] font-black opacity-10 leading-none">
                  00_X_FF
                </div>
              </div>
            </div>

            {/* 2. THE LIVE CONSOLE (Right Side - Input Area) */}
            <div className="flex-1 p-8 md:p-16 relative overflow-hidden bg-[radial-gradient(circle_at_top_right,var(--secondary)_0%,transparent_150%)] bg-opacity-5">
              {/* Console Metadata */}
              <div className="flex justify-between items-center mb-12">
                <div className="flex flex-col">
                  <span className="text-[7px] font-mono opacity-40 uppercase">
                    Connection_Type
                  </span>
                  <span className="text-[9px] font-mono font-bold text-accent">
                    SECURE_TUNNEL_01
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-foreground/10" />
                <div className="flex flex-col text-right">
                  <span className="text-[7px] font-mono opacity-40 uppercase">
                    Status
                  </span>
                  <span className="text-[9px] font-mono font-bold text-green-500 animate-pulse">
                    AWAITING_INPUT
                  </span>
                </div>
              </div>

              {/* Input Module */}
              <div className="space-y-8 relative z-10">
                <div className="relative group">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-accent font-bold text-xs">{">"}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest ">
                      Enter_User_Email:
                    </span>
                  </div>
                  <input
                    type="email"
                    placeholder="NULL_PTR@SYSTEM.DOMAIN"
                    className="w-full bg-transparent border-l-2 border-accent/30 pl-6 py-4 font-mono text-sm text-foreground uppercase outline-none focus:border-accent focus:bg-accent/5 transition-all placeholder:opacity-20"
                  />
                </div>

                <button className="group relative w-full flex items-center justify-between border-2 border-foreground p-6 hover:bg-primary hover:text-background transition-all duration-300">
                  <span className="font-bold text-[11px] font-black uppercase tracking-[0.5em]">
                    SUBSCRIBE
                  </span>
                  <div className="flex gap-1 group-hover:gap-2 transition-all">
                    <div className="w-1 h-1 bg-accent" />
                    <div className="w-1 h-1 bg-accent" />
                    <div className="w-1 h-1 bg-accent" />
                  </div>
                </button>
              </div>

              {/* Background Decorative "01" Binary String */}
              <div className="absolute -bottom-10 right-0 font-mono text-[120px] font-black opacity-[0.02] pointer-events-none select-none italic">
                SYNC
              </div>
            </div>
          </div>

          {/* BOTTOM BAR: Technical Footer */}
          <div className="max-w-6xl mx-auto mt-6 flex justify-between items-center px-2 opacity-30 font-mono text-[7px] uppercase tracking-[0.4em]">
            <span>// Packet_Loss: 0.00%</span>
            <div className="flex gap-8">
              <span>Relay: North_Sector</span>
              <span>CRC: Verified</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePageComp;
