import React from "react";
import { Link } from "wouter";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number | null;
    rating: number;
    reviewCount: number;
    images: string[];
    category: string;
    isNew?: boolean;
    isBestseller?: boolean;
    discount?: number;
  };
  className?: string;
}

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 16 16" fill="#f59e0b">
    <path d="M8 1l1.8 5.6H16l-4.9 3.6 1.8 5.6L8 11.2l-4.9 3.6L4.9 9.2 0 5.6h6.2z" />
  </svg>
);

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [hovered, setHovered] = React.useState(false);
  const inWishlist = isInWishlist(product.id);
  const imageUrl = product.images?.[0] || "https://via.placeholder.com/500x500?text=No+Image";
  const hoverImageUrl = product.images?.[1];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    addItem({ productId: product.id, name: product.name, price: product.price, quantity: 1, image: imageUrl });
  };
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <motion.div
        className={cn("group flex flex-col cursor-pointer product-card-hover transition-all duration-300", className)}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-testid={`card-product-${product.id}`}
      >
        {/* ── Image container ── */}
        <div className="relative aspect-square overflow-hidden rounded-2xl"
          style={{ background: "linear-gradient(145deg, #fce7f3 0%, #ede9fe 100%)" }}>

          <img src={imageUrl} alt={product.name}
            className={cn("absolute inset-0 h-full w-full object-cover transition-all duration-500",
              hovered && hoverImageUrl ? "opacity-0 scale-105" : "opacity-100 scale-100")} />
          {hoverImageUrl && (
            <img src={hoverImageUrl} alt={`${product.name} alt`}
              className={cn("absolute inset-0 h-full w-full object-cover transition-all duration-500",
                hovered ? "opacity-100 scale-100" : "opacity-0 scale-105")} />
          )}

          {/* FAVE badge — top-left absolute */}
          {product.isBestseller && (
            <span className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-full text-white font-bold"
              style={{ fontSize: 10, background: "#ec4899", letterSpacing: "0.04em" }}>
              FAVE
            </span>
          )}
          {product.isNew && !product.isBestseller && (
            <span className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-full text-white font-bold"
              style={{ fontSize: 10, background: "#9333ea", letterSpacing: "0.04em" }}>
              NEW
            </span>
          )}
          {product.discount && product.discount > 0 && !product.isBestseller && !product.isNew && (
            <span className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-full text-white font-bold"
              style={{ fontSize: 10, background: "#ec4899", letterSpacing: "0.04em" }}>
              SALE
            </span>
          )}

          {/* Wishlist */}
          <button
            className={cn(
              "absolute top-2 right-2 z-10 h-8 w-8 rounded-full flex items-center justify-center bg-white/90 shadow-sm transition-all duration-200",
              inWishlist ? "text-pink-500" : "text-gray-400 hover:text-pink-500",
              hovered || inWishlist ? "opacity-100" : "opacity-0"
            )}
            onClick={handleWishlist}
            data-testid={`button-wishlist-${product.id}`}
          >
            <Heart className={cn("h-3.5 w-3.5", inWishlist && "fill-current")} />
          </button>

          {/* Add to bag — slides up */}
          <div className={cn(
            "absolute bottom-0 inset-x-0 p-2.5 transition-all duration-300",
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          )}>
            <button
              className="w-full h-9 rounded-xl flex items-center justify-center gap-1.5 text-xs font-semibold text-white"
              style={{ background: "#9333ea", boxShadow: "0 4px 16px rgba(147,51,234,.35)" }}
              onClick={handleAddToCart}
              data-testid={`button-addtocart-${product.id}`}
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Add to bag
            </button>
          </div>
        </div>

        {/* ── Info — gap-2 (8px) from image ── */}
        <div className="flex flex-col gap-1 mt-2 px-0.5">
          {/* Rating row — single line: star score · count */}
          <div className="flex items-center gap-1" style={{ fontSize: 12, color: "#6b7280" }}>
            <StarIcon />
            <span style={{ fontWeight: 600, color: "#374151" }}>{product.rating}</span>
            <span style={{ color: "#d1d5db" }}>·</span>
            <span>{product.reviewCount} reviews</span>
          </div>

          {/* Name */}
          <h3 className="font-serif line-clamp-1 leading-snug" style={{ fontSize: 15, fontWeight: 600, color: "#1a0a2e" }}>
            {product.name}
          </h3>

          {/* Price row */}
          <div className="flex items-center gap-2 flex-wrap">
            <span style={{ fontSize: 15, fontWeight: 700, color: "#1a0a2e" }}>{fmt(product.price)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span style={{ fontSize: 12, color: "#9ca3af", textDecoration: "line-through" }}>
                {fmt(product.originalPrice)}
              </span>
            )}
            {product.discount && product.discount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full font-bold"
                style={{ fontSize: 10, background: "#dcfce7", color: "#166534" }}>
                {product.discount}% off
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
};
