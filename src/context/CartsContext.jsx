import { createContext, useContext, useEffect, useState } from "react";

export const CartsContext = createContext(null);

export const CartsProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const storedCarts = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(Array.isArray(storedCarts) ? storedCarts : []);
    } catch (err) {
      console.error("Failed to load cart:", err);
      setCart([]);
    }
  }, []);

  const saveToLocal = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ADD PRODUCT
  const addProduct = (product, qty) => {
    const exist = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (exist) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty } : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.thumbnail,
          category: product.category,
          qty,
        },
      ];
    }

    saveToLocal(updatedCart);
  };

  // UPDATE QTY
  const updateCart = (id, newQty) => {
    if (newQty <= 0) {
      saveToLocal(cart.filter((item) => item.id !== id));
      return;
    }

    saveToLocal(
      cart.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
    );
  };

  // REMOVE PRODUCT
  const removeProduct = (id) => {
    saveToLocal(cart.filter((item) => item.id !== id));
  };

  // ✅ CLEAR CART (IMPORTANT)
  const clearCart = () => {
    saveToLocal([]);
  };

  return (
    <CartsContext.Provider
      value={{ cart, addProduct, updateCart, removeProduct, clearCart }}
    >
      {children}
    </CartsContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartsContext);
  if (!context) {
    throw new Error("useCart must be used inside CartsProvider");
  }
  return context;
};
