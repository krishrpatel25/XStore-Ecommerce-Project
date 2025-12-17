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
    <section className="pt-28 px-4 md:px-10 lg:px-24 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>

      <div className="flex flex-col divide-y p-4 divide-gray-200">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-5 gap-4"
          >
            {/* LEFT */}
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold text-primary break-all sm:break-normal">
                {order.orderId}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* CENTER */}
            <div className="flex flex-row sm:flex-col items-center sm:items-center gap-2 sm:gap-0">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-bold text-accent">
                ${Number(order.total || 0).toFixed(2)}
              </p>
            </div>

            {/* RIGHT */}
            {/* RIGHT */}
            <div className="flex w-full justify-between sm:w-auto sm:flex-col sm:items-end gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                {order.status}
              </span>

              <button
                onClick={() => navigate(`/order/${order.orderId}`)}
                className="text-sm font-medium text-primary hover:text-accent transition whitespace-nowrap"
              >
                View details →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OrderPageComp;
