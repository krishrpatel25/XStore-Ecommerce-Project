import React from "react";
import { useOrders } from "@/context/OrdersContext";
import { useNavigate } from "react-router-dom";

const OrderPageComp = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] md:h-[85vh] bg-background relative overflow-hidden">
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
            No_Order
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
    <section className="pt-32 px-4 md:px-10 lg:px-24 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-12 border-b border-foreground/10 pb-6 overflow-hidden">
        <h1 className="text-4xl font-[1000] italic uppercase tracking-tighter text-foreground leading-none">
          Order_<span className="text-primary">Log</span>
        </h1>

        <div className="flex items-center gap-2 mb-1">
          {/* Decorative line for mobile to fill space */}
          <div className="h-[1px] w-4 bg-primary md:hidden" />

          <span className="text-[10px] md:text-[12px] font-mono opacity-40 tracking-widest uppercase whitespace-nowrap">
            [ {orders.length} Entries_Found ]
          </span>
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col border-t border-foreground/10">
        {orders.map((order, index) => (
          <div
            key={order.orderId}
            className="group relative flex flex-col md:flex-row md:items-center justify-between py-8 px-2 border-b border-foreground/10 transition-all duration-300 hover:bg-secondary/5"
          >
            {/* Decorative Index */}
            <span className="absolute left-[-20px] top-1/2 -translate-y-1/2 text-[10px] font-mono text-primary font-bold opacity-0 group-hover:opacity-100 transition-all hidden lg:block">
              [{index + 1}]
            </span>

            {/* LEFT: IDENTIFICATION */}
            <div className="flex flex-col gap-1 mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono opacity-30 uppercase">
                  Transaction_ID
                </span>
                <div className="h-[1px] w-4 bg-foreground/10" />
              </div>
              <p className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors break-all">
                {order.orderId}
              </p>
              <p className="text-[10px] font-mono opacity-50 uppercase tracking-tighter">
                Timestamp: {new Date(order.createdAt).toLocaleDateString()} //{" "}
                {new Date(order.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* CENTER: VALUATION */}
            <div className="flex flex-col mb-4 md:mb-0 md:text-center">
              <span className="text-[9px] font-mono opacity-30 uppercase">
                Net_Value
              </span>
              <p className="text-2xl font-black italic tracking-tighter text-accent">
                ${Number(order.total || 0).toFixed(2)}
              </p>
            </div>

            {/* RIGHT: STATUS & ACTIONS */}
            <div className="flex items-center justify-between md:flex-col md:items-end gap-4">
              <div className="relative">
                <span
                  className={`px-3 py-1 text-[10px] font-mono font-bold uppercase border
              ${
                order.status === "Completed" || order.status === "Delivered"
                  ? "border-green-500/50 text-green-500 bg-green-500/5"
                  : "border-primary/50 text-primary bg-primary/5"
              }`}
                >
                  {order.status}
                </span>
                {/* Tiny corner mark for the badge */}
                <div className="absolute -top-1 -right-1 w-1 h-1 bg-foreground opacity-20" />
              </div>

              <button
                onClick={() => navigate(`/order/${order.orderId}`)}
                className="group/btn flex items-center gap-2 text-[10px] font-black uppercase tracking-widest border-b border-transparent hover:border-primary hover:text-primary transition-all pb-1"
              >
                Open_Details
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>

            {/* Hover Highlight Bar */}
            <div className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-500 group-hover:w-full" />
          </div>
        ))}

        {orders.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center opacity-20">
            <span className="text-[10px] font-mono uppercase tracking-[1em]">
              Log_Empty
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderPageComp;
