import { createContext, useContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export const WishListProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(data);
  }, []);

  // Save to storage
  const save = (items) => {
    setWishlist(items);
    localStorage.setItem("wishlist", JSON.stringify(items));
  };

  // Toggle wishlist
  const toggleWishlist = (product) => {
    const exists = wishlist.find((i) => i.id === product.id);

    let updated;
    if (exists) {
      updated = wishlist.filter((i) => i.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }

    save(updated);
  };

  // Remove item
  const removeWishlist = (id) => {
    const updated = wishlist.filter((i) => i.id !== id);
    save(updated);
  };

  return (
    <WishListContext.Provider
      value={{ wishlist, toggleWishlist, removeWishlist }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export const useWishList = () => useContext(WishListContext);
