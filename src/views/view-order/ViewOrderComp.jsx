import GoBackButton from "@/components/ui/GoBackButton";
import { useOrders } from "@/context/OrdersContext";
import React from "react";
import { FiPackage, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
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
    <div className="pt-32 pb-20 px-4 md:px-10 lg:px-24 min-h-screen bg-background text-foreground">
      {/* NAVIGATION */}
      <div className="mb-10">
        <GoBackButton to="/order" label="BACK_TO_LOG" />
      </div>

      {/* HEADER SECTION */}
      <div className="mb-12 border-b border-foreground/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6 overflow-hidden">
        <div className="max-w-full">
          <h1 className="text-3xl md:text-5xl font-[1000] italic uppercase tracking-tighter text-foreground leading-none">
            Manifest_<span className="text-primary">Details</span>
          </h1>

          <p className="text-[9px] md:text-[10px] font-mono text-primary font-bold mt-3 uppercase tracking-[0.2em] md:tracking-[0.3em] flex flex-wrap gap-2">
            <span>Verified_Shipment</span>
            <span className="opacity-20 hidden sm:inline">//</span>
            <span className="bg-primary/10 px-1 md:bg-transparent md:p-0">
              ID: {order?.orderId || "N/A"}
            </span>
            <span
              className={`px-2 py-0.5 text-[8px] border ${
                order?.status === "panding"
                  ? "border-yellow-500/50 text-yellow-500"
                  : "border-green-500/50 text-green-500"
              }`}
            >
              STATUS_{order?.status?.toUpperCase()}
            </span>
          </p>
        </div>

        <div className="flex flex-col md:items-end border-l-2 md:border-l-0 border-primary/20 pl-4 md:pl-0">
          <span className="text-[9px] font-mono opacity-30 uppercase tracking-widest">
            System_Message
          </span>
          <p className="text-[10px] md:text-xs font-mono uppercase tracking-tighter opacity-60">
            Reviewing items in active transit...
          </p>
        </div>
      </div>

      {/* RECIPIENT & LOGISTICS DATA SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* USER DETAILS - Accessing via order.customer */}
        <div className="border-l-2 border-primary pl-6 py-2">
          <h3 className="text-[10px] font-mono font-black text-primary uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
            Coustomer_Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-[8px] font-mono opacity-40 uppercase tracking-widest">
                Legal_Identity
              </p>
              <p className="text-lg md:text-xl font-black italic uppercase tracking-tighter text-foreground">
                {order?.customer?.firstName} {order?.customer?.lastName}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
              <div>
                <p className="text-[8px] font-mono opacity-40 uppercase tracking-widest flex items-center gap-1">
                  <FiMail size={8} /> Comm_Link
                </p>
                <p className="text-xs font-mono font-bold">
                  {order?.customer?.email}
                </p>
              </div>
              <div>
                <p className="text-[8px] font-mono opacity-40 uppercase tracking-widest flex items-center gap-1">
                  <FiPhone size={8} /> Mobile_Node
                </p>
                <p className="text-xs font-mono font-bold">
                  {order?.customer?.mobile}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SHIPPING ADDRESS - Accessing via order.address */}
        <div className="bg-secondary/10 border border-foreground/5 p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 -rotate-45 translate-x-8 -translate-y-8 transition-transform group-hover:scale-110" />

          <h3 className="text-[10px] font-mono font-black text-foreground/40 uppercase tracking-[0.4em] mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-primary animate-pulse" />
            Destination_Coordinates
          </h3>

          <div className="font-mono text-[11px] md:text-xs leading-relaxed uppercase">
            <p className="text-foreground/80 flex items-start gap-2">
              <FiMapPin className="mt-1 text-primary" />
              <span>
                {order?.address?.address}
                <br />
                {order?.address?.city}, {order?.address?.state}
              </span>
            </p>
            <div className="mt-4 inline-block bg-foreground text-background px-2 py-0.5 text-[9px] font-black tracking-[0.2em]">
              REG: {order?.address?.country || "GLOBAL_TRANSIT"}
            </div>
          </div>
        </div>
      </div>

      {/* ITEMS GRID */}
      <div className="border border-foreground/10 bg-secondary/5">
        {/* Desktop Table Header */}
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
              onClick={() => navigate(`/product/${item.id}`)}
              key={item.id || index}
              className="flex flex-col md:flex-row md:items-center px-6 md:px-8 py-8 gap-6 group hover:bg-background transition-colors"
            >
              {/* IMAGE */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 md:w-24 md:h-24 bg-background border border-foreground/10 p-2 object-contain "
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
                <div className="md:w-32 text-left md:text-center">
                  <p className="text-[8px] font-mono opacity-30 uppercase md:hidden">
                    Price
                  </p>
                  <p className="text-sm font-mono font-bold text-foreground/80">
                    ${item.price?.toFixed(2)}
                  </p>
                </div>
                <div className="md:w-20 text-left md:text-center">
                  <p className="text-[8px] font-mono opacity-30 uppercase md:hidden">
                    Qty
                  </p>
                  <p className="text-sm font-mono font-bold">x{item.qty}</p>
                </div>
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
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 md:flex-none px-6 py-2 text-[10px] font-black uppercase tracking-widest bg-primary text-background hover:bg-primary/70 transition-all duration-300"
                >
                  Track
                </button>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className="flex-1 md:flex-none px-6 py-2 text-[10px] font-black uppercase tracking-widest border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER SUMMARY */}
      {/* Footer Summary */}
      <div className="mt-12 flex justify-end">
        {/* Changed w-80 to max-w-md and added responsive flex direction */}
        <div className="w-full md:w-80 border-t-2 border-foreground pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-2">
          <span className="text-[10px] font-mono font-black uppercase tracking-[0.2em] md:tracking-[0.4em] opacity-70">
            Final_Grand_Total
          </span>
          <div className="flex items-baseline gap-1">
            {/* Currency symbol can be smaller for better focus on the amount */}
            <span className="text-xl font-mono font-bold text-primary sm:hidden">
              $
            </span>
            <span className="text-4xl md:text-4xl font-[1000] italic tracking-tighter text-accent leading-none">
              ${order?.total?.toFixed(2) || "0.00"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderComp;
