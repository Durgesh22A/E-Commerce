import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const toggleWishlist = (product) => {
    setWishlistItems((prev) => {
      const isExisting = prev.find((item) => item.id === product.id);
      if (isExisting) {
        // Notification logic
        toast.dismiss(); 
        toast.info("Removed from Wishlist", { theme: "light" });
        return prev.filter((item) => item.id !== product.id);
      } else {
        // Notification logic
        toast.dismiss(); 
        toast.success("Added to Wishlist ❤️", { theme: "light" });
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
