import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoMdCheckmark } from "react-icons/io";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function ProductAditionalInfo({ products }) {
  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-0">
      <section className="pt-20 pb-32">
        <Tabs
          defaultValue="Description"
          className="flex flex-col lg:flex-row gap-0 border-4 border-foreground bg-background shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)]"
        >
          {/* --- SIDEBAR NAVIGATION --- */}
          <TabsList className="w-full lg:w-[300px] h-auto bg-secondary flex flex-col items-stretch rounded-none p-0 gap-0 z-20">
            <div className="p-8 border-b border-background/20 hidden lg:block bg-foreground">
              <p className="text-[10px] font-mono text-primary font-bold tracking-[0.4em] uppercase mb-2">
                // CORE_STORAGE
              </p>
              <h2 className="text-background text-3xl font-[1000] italic tracking-tighter uppercase leading-none">
                ASSET_LOG
              </h2>
            </div>

            {[
              {
                id: "Description",
                label: "01. SCHEMATIC",
                sub: "Structural Breakdown",
              },
              { id: "info", label: "02. TELEMETRY", sub: "Technical Specs" },
              { id: "reviews", label: "03. VALIDATION", sub: "User Feedback" },
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="rounded-none border-b border-background/10 px-8 py-10 flex flex-col items-start gap-1 transition-all
              data-[state=active]:bg-primary data-[state=active]:text-background
              text-foreground/60 hover:bg-background/10 group relative"
              >
                <span className="text-xl font-black italic uppercase leading-none group-data-[state=active]:translate-x-3 transition-transform duration-300">
                  {tab.label}
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.2em] opacity-50">
                  {tab.sub}
                </span>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-data-[state=active]:opacity-100 group-data-[state=active]:translate-x-0 translate-x-4 transition-all">
                  <div className="w-3 h-3 bg-background rotate-45" />
                </div>
              </TabsTrigger>
            ))}

            <div className="mt-auto p-8 hidden lg:block bg-secondary/5 border-t border-background/10">
              <div className="flex gap-1.5 mb-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-full h-1 bg-primary/20" />
                ))}
              </div>
              <p className="text-[9px] font-mono text-background/30 leading-tight uppercase tracking-widest">
                Protocol: Secure_Buy <br />
                Host: {window.location.hostname}
              </p>
            </div>
          </TabsList>

          {/* --- CONTENT AREA (The "Viewport") --- */}
          <div className="flex-grow relative overflow-hidden bg-background">
            {/* Technical Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="relative z-10 p-6 md:p-16">
              {/* TAB: DESCRIPTION */}
              <TabsContent
                value="Description"
                className="m-0 focus-visible:outline-none animate-in fade-in slide-in-from-right-8 duration-500"
              >
                <div className="flex flex-col gap-16">
                  <div className="flex items-center gap-6">
                    <h3 className="text-8xl font-[1000] italic uppercase tracking-tighter leading-none text-foreground/5 select-none">
                      DATA
                    </h3>
                    <div className="h-[2px] flex-grow bg-foreground/10" />
                    <span className="text-[10px] font-mono font-bold text-primary tracking-widest uppercase">
                      Rev_2.05
                    </span>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-16">
                    <div className="space-y-8">
                      <p className="text-2xl font-bold italic leading-[1.1] text-foreground border-l-8 border-accent pl-8">
                        "
                        {products?.description ||
                          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto structural integrity."}
                        "
                      </p>
                      <div className="h-px w-full bg-gradient-to-r from-foreground/20 to-transparent" />
                      <p className="text-sm text-foreground/50 font-medium leading-relaxed">
                        Automated asset extraction reveals high-density
                        performance parameters. This unit has been stress-tested
                        for 2025 consumer environments.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        "Quos corporis quibusdam assumenda eligendi non ratione.",
                        "Necessitatibus, eius laudantium maxime iste.",
                        "System optimized for spatial fluid dynamics.",
                        "Hardened chassis for extreme environment use.",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-6 p-4 border border-foreground/5 hover:border-accent/50 transition-all bg-secondary/5 group"
                        >
                          <span className="text-2xl font-black italic text-foreground/10 group-hover:text-accent/20 transition-colors">
                            0{i + 1}
                          </span>
                          <p className="text-[11px] font-black uppercase tracking-tight">
                            {item}
                          </p>
                          <IoMdCheckmark className="ml-auto text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* TAB: ADDITIONAL INFO (High Density Grid) */}
              <TabsContent
                value="info"
                className="m-0 focus-visible:outline-none animate-in zoom-in-95 duration-500"
              >
                {/* Header Status Bar */}
                <div className="flex justify-between items-center px-6 py-3 border-x-2 border-t-2 border-foreground bg-foreground text-background font-mono text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent animate-pulse" />{" "}
                    {/* Use accent as a status light */}
                    <span>Asset_Telemetry_Report</span>
                  </div>
                  <span className="opacity-50">
                    Ref_ID: {products?.id || "00"}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-foreground bg-background">
                  {[
                    { k: "MODEL_ID", v: products?.title, tag: "ID" },
                    { k: "CATEGORY", v: products?.category, tag: "CAT" },
                    { k: "MASS_METRIC", v: `${products?.weight}kg`, tag: "WT" },
                    {
                      k: "DIMENSIONS",
                      v: `${products?.dimensions?.width}x${products?.dimensions?.height}cm`,
                      tag: "DIM",
                    },
                    { k: "SKU_SERIAL", v: products?.sku, tag: "SKU" },
                    {
                      k: "AVAILABILITY",
                      v: products?.availabilityStatus,
                      tag: "STK",
                    },
                    {
                      k: "STOCK_LEVEL",
                      v: `${products?.stock} UNITS`,
                      tag: "QTY",
                    },
                    {
                      k: "SHIPPING_EST",
                      v: products?.shippingInformation,
                      tag: "LOG",
                    },
                    {
                      k: "BRAND_NODE",
                      v: products?.brand || "GENERIC",
                      tag: "BRD",
                    },
                    {
                      k: "WARRANTY",
                      v: products?.warrantyInformation,
                      tag: "WRT",
                    },
                    {
                      k: "RETURN_POLICY",
                      v: products?.returnPolicy,
                      tag: "RET",
                    },
                    {
                      k: "DISCOUNT",
                      v: `${products?.discountPercentage}% REDUCED`,
                      tag: "OFF",
                    },
                    {
                      k: "RATING_INDEX",
                      v: `${products?.rating} / 5.0`,
                      tag: "RTG",
                    },
                    {
                      k: "MIN_ORDER",
                      v: `${products?.minimumOrderQuantity} PCS`,
                      tag: "MOQ",
                    },
                    { k: "FIRMWARE", v: "v4.0.2_STABLE", tag: "VER" },
                    { k: "STATUS", v: "VERIFIED_ASSET", tag: "OK" },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="p-6 border border-foreground/5 flex flex-col gap-2 relative group"
                    >
                      {/* Subtle Accent Corner Decor */}
                      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-accent/30 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Minimal Label */}
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[9px] font-mono font-bold text-foreground/40 tracking-tighter uppercase">
                          {item.k}
                        </span>
                        <span className="text-[8px] font-mono text-accent font-black bg-accent/10 px-1 px-0.5 rounded-[2px]">
                          {item.tag}
                        </span>
                      </div>

                      {/* Value Text */}
                      <span className="text-[13px] font-black uppercase tracking-tight leading-tight text-foreground">
                        {item.v || "N/A"}
                      </span>

                      {/* Bottom Detail Line */}
                      <div className="mt-2 h-[1px] w-full bg-foreground/5" />
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* TAB: REVIEWS (The Viewport Carousel) */}
              <TabsContent
                value="reviews"
                className="m-0 focus-visible:outline-none animate-in slide-in-from-bottom-8 duration-500"
              >
                <Carousel className="w-full">
                  <div className="mb-12 flex justify-between items-center border-b-2 border-foreground pb-6">
                    <div>
                      <h4 className="text-5xl font-black italic uppercase leading-none tracking-tighter">
                        Validation
                        <br />
                        Streams.
                      </h4>
                      <p className="text-[10px] font-mono opacity-40 mt-2 uppercase tracking-[0.2em]">
                        Source: Verified_External_Nodes
                      </p>
                    </div>
                    {/* FIXED: Controls are now inside the Carousel wrapper */}
                    <div className="flex gap-2">
                      <CarouselPrevious className="static translate-y-0 h-14 w-14 border-2 border-foreground rounded-none bg-background hover:bg-primary hover:text-background transition-all" />
                      <CarouselNext className="static translate-y-0 h-14 w-14 border-2 border-foreground rounded-none bg-background hover:bg-primary hover:text-background transition-all" />
                    </div>
                  </div>

                  <CarouselContent className="-ml-4">
                    {products?.reviews?.map((review, i) => (
                      <CarouselItem
                        key={i}
                        className="md:basis-1/2 lg:basis-1/2 pl-4"
                      >
                        <div className="border-2 border-foreground p-8 bg-background h-full relative group hover:bg-secondary/10 transition-colors">
                          <div className="absolute top-4 right-6 font-mono text-[9px] opacity-20 uppercase tracking-widest font-bold">
                            Encrypted_Log_{i + 1}
                          </div>

                          <div className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 bg-foreground relative overflow-hidden grayscale group-hover:grayscale-0 transition-all">
                              <img
                                src="/src/assets/ProfilePic2.jpg"
                                alt="user"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-black uppercase tracking-tight leading-none mb-1">
                                {review.reviewerName}
                              </p>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <div
                                    key={star}
                                    className={`w-3 h-1 ${
                                      star <= 4
                                        ? "bg-accent"
                                        : "bg-foreground/10"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-lg font-bold italic text-foreground/80 leading-snug">
                            "{review.comment}"
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </TabsContent>
            </div>
          </div>
        </Tabs>

        {/* Footer Terminal Bar */}
        <div className="w-full h-10 bg-foreground flex items-center px-8 justify-between mt-0 border-x-4 border-b-4 border-foreground">
          <div className="flex gap-8 items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase italic">
                Node_Active
              </span>
            </div>
            <span className="text-[10px] font-mono text-background/30 uppercase tracking-tighter">
              Packets_Loaded: 2,048kb
            </span>
          </div>
          <div className="text-[10px] font-mono text-background/30 uppercase tracking-[0.4em] font-bold">
            Auth: 0x{products?.id || "FF"}_SYS
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductAditionalInfo;
