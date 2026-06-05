import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type WishlistContextType = {
  productIds: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [productIds, setProductIds] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const local = localStorage.getItem("craftly-wishlist");
      if (local) {
        try {
          return JSON.parse(local);
        } catch {}
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("craftly-wishlist", JSON.stringify(productIds));
  }, [productIds]);

  const toggleWishlist = (productId: string) => {
    setProductIds((prev) => {
      if (prev.includes(productId)) {
        toast.success("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        toast.success("Added to wishlist");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => productIds.includes(productId);

  return (
    <WishlistContext.Provider value={{ productIds, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
