import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext(null);

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  // Load orders from localStorage
  useEffect(() => {
    try {
      const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
      setOrders(Array.isArray(storedOrders) ? storedOrders : []);
    } catch (err) {
      console.error("Failed to load orders:", err);
      setOrders([]);
    }
  }, []);

  const saveOrders = (updatedOrders) => {
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // CREATE ORDER (Order 1, 2, 3...)
  const createOrder = (cart, extraData) => {
    if (!cart || cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const newOrder = {
      orderId: `ORD-${Date.now()}`, // ✅ SAFE ID
      items: cart,
      total,
      status: "panding",
      createdAt: Date.now(),
      ...extraData,
    };

    saveOrders([newOrder ,...orders]);
  };

  return (
    <OrdersContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders must be used inside OrdersProvider");
  }
  return context;
};
