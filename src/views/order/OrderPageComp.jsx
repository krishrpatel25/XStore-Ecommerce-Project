import React from "react";
import { useOrders } from "@/context/OrdersContext";
import { useNavigate } from "react-router-dom";

const OrderPageComp = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (!orders || orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center h-[80vh] md:h-[85vh]">
        <div>
          <p className="text-center text-gray-500 text-2xl md:text-3xl font-medium">
            No orders found
          </p>
        </div>
        <div
          onClick={() => navigate("/allproducts")}
          className="relative w-fit cursor-pointer text-accent hover:text-primary transition
                  before:content-[''] before:absolute before:-bottom-1 before:left-0 
                  before:w-0 before:h-[2px] before:bg-primary 
                  before:transition-all before:duration-500 
                  hover:before:w-full"
        >
          <p>Shop Now ❯</p>
        </div>
      </div>
    );
  } 

  return (
    <section className="pt-32 px-4 md:px-10 lg:px-24 min-h-screen bg-background">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end gap-2 md:gap-4 mb-12 border-b border-foreground/10 pb-6 overflow-hidden">
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic text-foreground leading-[0.8]">
          Order_Log
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
