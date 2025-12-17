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
    <div className="pt-24 px-4 md:px-10 lg:px-24 min-h-screen">
      <GoBackButton to = "/order" label = "Back"  />

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
        <p className="text-sm text-gray-500 mt-1">
          Here are the items you ordered
        </p>
      </div>

      {/* ITEMS */}
      <div className="divide-y p-4 divide-secondary">
        {order?.items?.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center justify-center text-center gap-5 px-5 py-5"
          >
            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 bg-secondary p-2 rounded-xl object-cover"
            />

            {/* PRODUCT INFO */}
            <div className="flex-1 min-w-[180px]">
              <h2 className="text-base font-semibold text-gray-900 truncate">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 mt-1 truncate">
                Category: {item.category}
              </p>
            </div>

            {/* PRICE */}
            <div className="min-w-[80px] text-center">
              <p className="text-xs text-gray-400">Price</p>
              <p className="text-sm font-semibold text-gray-800">
                ${item.price.toFixed(2)}
              </p>
            </div>

            {/* QTY */}
            <div className="min-w-[60px] text-center">
              <p className="text-xs text-gray-400">Qty</p>
              <p className="text-sm font-medium text-gray-700">{item.qty}</p>
            </div>

            {/* TOTAL */}
            <div className="min-w-[90px] text-center">
              <p className="text-xs text-gray-400">Total</p>
              <p className="text-base font-bold text-primary">
                ${(item.price * item.qty).toFixed(2)}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-3 md:ml-auto">
              <button className="px-4 py-2 text-sm font-medium rounded-lg border border-primary text-background bg-primary transition">
                Track
              </button>
              <button className="px-4 py-2 text-sm font-medium rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewOrderComp;
