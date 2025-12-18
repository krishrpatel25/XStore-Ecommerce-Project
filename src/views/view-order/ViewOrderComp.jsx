import GoBackButton from "@/components/ui/GoBackButton";
import { useOrders } from "@/context/OrdersContext";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewOrderComp = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { orders } = useOrders();

  const order = orders.find((o) => String(o.orderId) === String(orderId));

  return (
    <div className="p-32 px-4 md:px-10 lg:px-24 min-h-screen bg-background min-h-screen">
      <div className="mb-10">
        <GoBackButton to="/order" label="BACK_TO_LOG" />
      </div>

      {/* HEADER SECTION */}
      <div className="mb-12 border-b border-foreground/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div className="max-w-full">
          {/* Title: Added break-words and leading-tight for mobile safety */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-foreground leading-[0.9] break-words">
            Manifest_Details
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
