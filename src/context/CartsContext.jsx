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
      console.error("Failed to load cart from localStorage:", err);
      setCart([]);
    }
  }, []);

  // Save cart to localStorage
  const saveToLocal = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ADD PRODUCT (full product object)
  const addProduct = (product, qty) => {
    console.log("ADDING PRODUCT:", product);
    // CORRECT EXIST CHECK
    const exist = cart.find((item) => item.id === product.id);

    let updatedCart;

    if (exist) {
      // Update only that specific product
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + qty } : item
      );
    } else {
      // Add new product (qty starts at current qty)
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

  // UPDATE CART QTY
  // UPDATE CART QTY
  const updateCart = (id, newQty) => {
    if (newQty <= 0) {
      const filtered = cart.filter((item) => item.id !== id);
      saveToLocal(filtered);
      return;
    }

    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: newQty } : item
    );

    saveToLocal(updated);
  };

  // REMOVE PRODUCT
  const removeProduct = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    saveToLocal(updatedCart);
  };

  return (
    <CartsContext.Provider
      value={{ cart, addProduct, updateCart, removeProduct }}
    >
      {children}
    </CartsContext.Provider>
  );
};

// Hook
export const useCart = () => useContext(CartsContext);
