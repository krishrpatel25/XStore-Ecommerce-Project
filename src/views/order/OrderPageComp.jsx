import React from "react";
import { useOrders } from "@/context/OrdersContext";
import { useNavigate } from "react-router-dom";

const OrderPageComp = () => {
  const { orders } = useOrders();
  const navigate = useNavigate();

  if (!orders || orders.length === 0) {
    return (
      <div className="pt-32 text-center">
        <h1 className="text-2xl font-semibold text-gray-700">
          No orders found
        </h1>
      </div>
    );
  }

  return (
    <section className="pt-28 px-4 md:px-10 lg:px-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Order History</h1>

      <div className="flex flex-col divide-y p-4 divide-gray-200">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="
              flex flex-col sm:flex-row
              sm:items-center
              sm:justify-between
              py-5
              gap-4
            "
          >
            {/* LEFT */}
            <div className="flex flex-col gap-1">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold text-primary">{order.orderId}</p>

              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            {/* CENTER */}
            <div className="flex flex-col sm:items-center">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-lg font-bold text-accent">
                ${Number(order.total || 0).toFixed(2)}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-start sm:items-end gap-2">
              <span
                className="
                  px-3 py-1
                  rounded-full
                  text-xs
                  font-semibold
                  bg-blue-100
                  text-blue-700
                "
              >
                {order.status}
              </span>

              <button
                onClick={() => navigate(`/order/${order.orderId}`)}
                className="
                  text-sm
                  font-medium
                  text-primary
                  hover:text-accent
                  transition
                "
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
