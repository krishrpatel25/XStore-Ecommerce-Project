import { createContext, useContext, useEffect, useState } from "react";

export const CartsContext = createContext();

export const CartsProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on first render
  useEffect(() => {
    try {
      const storedCarts = JSON.parse(localStorage.getItem("cart")) || [];
      setCart(Array.isArray(storedCarts) ? storedCarts : []);
    } catch (err) {
      console.error("Failed to load cart:", err);
      setCart([]);
    }
  }, []);

  // Save cart
  const saveToLocal = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ⭐ ADD PRODUCT (REPLACE QTY if exists)
  const addProduct = (product, qty) => {
    const exist = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (exist) {
      // ⭐ Replace quantity instead of adding
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
          qty: qty,
        },
      ];
    }

    saveToLocal(updatedCart);
  };

  // ⭐ UPDATE QTY (+ / -)
  const updateCart = (id, newQty) => {
    if (newQty <= 0) {
      saveToLocal(cart.filter((item) => item.id !== id));
      return;
    }

    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    );

    saveToLocal(updated);
  };

  // REMOVE PRODUCT
  const removeProduct = (id) => {
    saveToLocal(cart.filter((item) => item.id !== id));
  };

  return (
    <CartsContext.Provider
      value={{ cart, addProduct, updateCart, removeProduct }}
    >
      {children}
    </CartsContext.Provider>
  );
};

export const useCart = () => useContext(CartsContext);
