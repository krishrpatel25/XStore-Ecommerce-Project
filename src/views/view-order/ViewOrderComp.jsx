import GoBackButton from "@/components/ui/GoBackButton";
import { useOrders } from "@/context/OrdersContext";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewOrderComp = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();

  const order = orders.find((o) => String(o.orderId) === String(orderId));

  if (!order || order.length === 0) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center h-[80vh] md:h-[85vh] bg-background relative overflow-hidden">
        {/* --- DECORATIVE BACKGROUND ELEMENTS --- */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-foreground/5 rounded-full animate-[ping_5s_linear_infinite]" />

        {/* --- ERROR CODE LABEL --- */}
        <div className="flex items-center gap-2 mb-4 opacity-50">
          <div className="w-2 h-2 bg-accent animate-pulse" />
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-foreground">
            Error_Log: 404_NULL_REFERENCE
          </span>
        </div>

        {/* --- MAIN MESSAGE --- */}
        <div className="relative mb-12">
          {/* Background Ghost Text */}
          <h2 className="absolute -top-10 left-1/2 -translate-x-1/2 text-[120px] font-black text-foreground/[0.03] select-none italic tracking-tighter">
            VOID
          </h2>

          <h2 className="text-6xl md:text-8xl font-[1000] italic uppercase tracking-tighter text-foreground leading-none text-center relative z-10">
            ID_NOT_
            <br />
            FOUND_
          </h2>

          {/* Technical Crosshairs */}
          <div className="absolute -inset-6 border border-foreground/10 pointer-events-none">
            <div className="absolute top-0 left-0 w-2 h-2 bg-foreground" />
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-foreground" />
          </div>
        </div>

        {/* --- REDIRECT ACTION --- */}
        <button
          onClick={() => navigate("/allproducts")}
          className="group relative flex flex-col items-center gap-2 transition-all"
        >
          {/* Stylized Action Text */}
          <div className="relative px-10 py-4 bg-foreground text-background overflow-hidden flex items-center gap-4 group-hover:bg-primary group-hover:text-background transition-colors duration-300">
            <span className="text-xs font-black uppercase tracking-[0.3em]">
              Return_to_Shop
            </span>
            <span className="text-lg group-hover:translate-x-2 transition-transform duration-500">
              ❯❯
            </span>

            {/* Animated Scanning Line */}
            <div className="absolute inset-0 w-full h-[1px] bg-background/20 -translate-y-full group-hover:translate-y-[40px] transition-all duration-[1s] ease-in-out" />
          </div>

          {/* Metadata Subtext */}
          <span className="text-[8px] font-mono opacity-30 uppercase tracking-widest mt-2 group-hover:opacity-100 group-hover:text-primary transition-all">
            Re-routing to Main_Distributor_Node
          </span>
        </button>

        {/* --- CORNER COORDINATES --- */}
        <div className="absolute bottom-10 left-10 hidden md:block">
          <div className="text-[8px] font-mono opacity-20 uppercase flex flex-col gap-1">
            <span>LAT: 40.7128° N</span>
            <span>LNG: 74.0060° W</span>
          </div>
        </div>
      </div>
    );
  } 
  return (
    <div className="p-32 px-4 md:px-10 lg:px-24 min-h-screen bg-background min-h-screen">
      <div className="mb-10">
        <GoBackButton to="/order" label="BACK_TO_LOG" />
      </div>

      {/* HEADER SECTION */}
      <div className="mb-12 border-b border-foreground/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div className="max-w-full">
          {/* Title: Added break-words and leading-tight for mobile safety */}
          <h1 className="text-4xl font-[1000] italic uppercase tracking-tighter text-foreground leading-none">
            Manifest_<span className="text-primary">Details</span>
          </h1>

          {/* Sub-label: Adjusted tracking for better readability on small screens */}
          <p className="text-[9px] md:text-[10px] font-mono text-primary font-bold mt-3 uppercase tracking-[0.2em] md:tracking-[0.3em] flex flex-wrap gap-2">
            <span>Verified_Shipment</span>
            <span className="opacity-20 hidden sm:inline">//</span>
            <span className="bg-primary/10 px-1 md:bg-transparent md:p-0">
              ID: {order?.orderId?.slice(-8) || "N/A"}
            </span>
          </p>
        </div>

        {/* System Message Section */}
        <div className="flex flex-col md:items-end border-l-2 md:border-l-0 md:border-r-0 border-primary/20 pl-4 md:pl-0">
          <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">
            System_Message
          </span>
          <p className="text-[10px] md:text-xs font-mono uppercase tracking-tighter opacity-60">
            Reviewing items in active transit...
          </p>
        </div>
      </div>

      {/* ITEMS GRID */}
      <div className="border border-foreground/10 bg-secondary/5">
        {/* Table Header (Hidden on Mobile) */}
        <div className="hidden md:flex items-center px-8 py-4 bg-foreground/5 border-b border-foreground/10 text-[9px] font-mono uppercase tracking-[0.2em] opacity-50">
          <div className="w-24">Asset</div>
          <div className="flex-1 ml-10">Description</div>
          <div className="w-32 text-center">Unit_Price</div>
          <div className="w-20 text-center">Qty</div>
          <div className="w-32 text-right">Subtotal</div>
        </div>

        <div className="divide-y divide-foreground/10">
          {order?.items?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row md:items-center px-6 md:px-8 py-8 gap-6 group hover:bg-background transition-colors"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 md:w-24 md:h-24 bg-background border border-foreground/10 p-2 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute -top-2 -left-2 bg-primary text-background text-[8px] font-mono px-1">
                  0{index + 1}
                </div>
              </div>

              {/* PRODUCT INFO */}
              <div className="flex-1 min-w-[180px]">
                <h2 className="text-xl font-black uppercase tracking-tighter italic text-foreground group-hover:text-primary transition-colors">
                  {item.title}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[9px] font-mono opacity-40 uppercase">
                    Class:
                  </span>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* DATA COLS */}
              <div className="grid grid-cols-3 md:flex md:items-center gap-4 md:gap-0">
                {/* PRICE */}
                <div className="md:w-32 text-left md:text-center">
                  <p className="text-[8px] font-mono opacity-30 uppercase md:hidden">
                    Price
                  </p>
                  <p className="text-sm font-mono font-bold text-foreground/80">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* QTY */}
                <div className="md:w-20 text-left md:text-center">
                  <p className="text-[8px] font-mono opacity-30 uppercase md:hidden">
                    Qty
                  </p>
                  <p className="text-sm font-mono font-bold">x{item.qty}</p>
                </div>

                {/* TOTAL */}
                <div className="md:w-32 text-left md:text-right">
                  <p className="text-[8px] font-mono opacity-30 uppercase md:hidden">
                    Total
                  </p>
                  <p className="text-lg font-black italic tracking-tighter text-accent">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="flex flex-row md:flex-col gap-2 md:ml-6">
                <button className="flex-1 md:flex-none px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-foreground text-background hover:bg-primary transition-all duration-300">
                  Track
                </button>
                <button className="flex-1 md:flex-none px-6 py-2 text-[10px] font-black uppercase tracking-widest border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Summary */}
      <div className="mt-12 flex justify-end">
        <div className="w-full md:w-80 border-t-2 border-foreground pt-6 flex justify-between items-baseline">
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em]">
            Final_Grand_Total
          </span>
          <span className="text-4xl font-black italic tracking-tighter text-foreground">
            ${order?.total?.toFixed(2) || "0.00"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderComp;
