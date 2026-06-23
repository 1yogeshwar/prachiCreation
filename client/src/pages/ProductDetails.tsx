import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, ChevronRight, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import { ProductCarousel } from "@/components/common/ProductCarousel";
import { toast } from "sonner";

const API_URL    = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const WA_NUMBER  = "918269511699";

export const ProductDetails = () => {
  const { slug }  = useParams();
  const [, setLocation] = useLocation();
  const [product, setProduct]               = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [activeImage, setActiveImage]       = useState(0);
  const [quantity, setQuantity]             = useState(1);
  const [selectedSize, setSelectedSize]     = useState<string | null>(null);
  const [selectedColor, setSelectedColor]   = useState<string | null>(null);
  const [loading, setLoading]               = useState(true);

  const { addItem }                       = useCart();
  const { isInWishlist, toggleWishlist }  = useWishlist();

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/products/${slug}`)
      .then(r => r.json())
      .then(data => {
        setProduct({ ...data, id: data._id, images: data.images || [] });
        setSelectedSize(data.sizes?.[0] || null);
        setSelectedColor(data.colors?.[0] || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    fetch(`${API_URL}/products`)
      .then(r => r.json())
      .then(all => setRelatedProducts(
        all.filter((p: any) => p.category === product.category && p._id !== product.id).slice(0, 8)
      ))
      .catch(console.error);
  }, [product]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        style={{ width: 32, height: 32, borderRadius: "50%",
          border: "3px solid #ede9fe", borderTopColor: "#9333ea" }}/>
    </div>
  );

  if (!product) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <p className="text-muted-foreground">Product not found</p>
      <Button onClick={() => setLocation("/shop")}>Back to Shop</Button>
    </div>
  );

  const images    = product.images?.length ? product.images : ["https://via.placeholder.com/500x500?text=No+Image"];
  const inWishlist = isInWishlist(product.id);
  const discount  = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAddToCart = () => {
    addItem({ productId: product.id, name: product.name, price: product.price,
      quantity, image: images[0], variant: selectedSize || selectedColor || undefined });
    toast.success("Added to cart!");
  };

  const waMessage = encodeURIComponent(
    `Hi Prachi! 👋 I'm interested in *${product.name}* (₹${product.price}).\n\n` +
    (selectedColor ? `🎨 Color: ${selectedColor}\n` : "") +
    (selectedSize  ? `📐 Size: ${selectedSize}\n`   : "") +
    `🔢 Qty: ${quantity}\n\n✏️ Custom request:\n_[describe customization]_\n\n🔗 ${window.location.href}`
  );

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">

      {/* Breadcrumbs — compact */}
      <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6 flex-wrap">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href={`/shop/category/${product.category.toLowerCase()}`}
          className="hover:text-primary transition-colors capitalize">{product.category}</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-foreground truncate max-w-[120px]">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">

        {/* ── Images ── */}
        <div className="space-y-3">
          {/* Main image */}
          <div className="relative rounded-2xl overflow-hidden bg-muted"
            style={{ aspectRatio: "1/1", maxHeight: 480 }}>
            <AnimatePresence mode="wait">
              <motion.img key={activeImage} src={images[activeImage]} alt={product.name}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full h-full object-cover"/>
            </AnimatePresence>
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew && (
                <span style={{ background: "#7c3aed", color: "white", fontSize: 11,
                  fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>New</span>
              )}
              {discount && (
                <span style={{ background: "#ec4899", color: "white", fontSize: 11,
                  fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>{discount}% off</span>
              )}
            </div>
            {/* Share + Wishlist overlay */}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button onClick={handleShare}
                className="h-9 w-9 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors">
                <Share2 className="h-4 w-4 text-gray-600"/>
              </button>
            </div>
          </div>

          {/* Thumbnails — horizontal scroll on mobile */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
              {images.map((img: string, i: number) => (
                <button key={i} onClick={() => setActiveImage(i)}
                  style={{ flexShrink: 0, width: 64, height: 64 }}
                  className={cn("rounded-lg overflow-hidden border-2 transition-all",
                    activeImage === i ? "border-primary" : "border-transparent opacity-60 hover:opacity-90")}>
                  <img src={img} alt="" className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Product Info ── */}
        <div className="flex flex-col gap-4">

          {/* Category + Name */}
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-1">
              {product.category}
            </p>
            <h1 className="font-serif font-bold text-foreground leading-tight"
              style={{ fontSize: "clamp(22px, 3.5vw, 32px)" }}>
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-3.5 w-3.5",
                    i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted")}/>
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{product.reviewCount} reviews</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="font-bold text-foreground" style={{ fontSize: "clamp(22px, 3vw, 28px)" }}>
              ₹{product.price.toFixed(0)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-muted-foreground line-through text-base">
                ₹{product.originalPrice.toFixed(0)}
              </span>
            )}
            {discount && (
              <span style={{ fontSize: 12, fontWeight: 700, color: "#ec4899",
                background: "#fce7f3", padding: "2px 8px", borderRadius: 999 }}>
                {discount}% off
              </span>
            )}
          </div>

          {/* Description — compact */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {product.description}
          </p>

          {/* Divider */}
          <div className="border-t border-border"/>

          {/* Options */}
          <div className="space-y-4">
            {/* Colors */}
            {product.colors?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                  Color
                  {selectedColor && <span className="ml-2 font-normal normal-case text-muted-foreground">{selectedColor}</span>}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <button key={color} onClick={() => setSelectedColor(color)}
                      className={cn("h-7 w-7 rounded-full border-2 ring-offset-1 transition-all",
                        selectedColor === color ? "ring-2 ring-primary border-background scale-110" : "border-white/50")}
                      style={{ backgroundColor: color }}/>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button key={size} onClick={() => setSelectedSize(size)}
                      className={cn("px-3 h-8 rounded-lg text-xs font-semibold border transition-all",
                        selectedSize === size
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-transparent border-border text-foreground hover:border-primary/50")}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity + Stock */}
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">Qty</p>
                <div className="flex items-center border border-border rounded-lg h-9 w-28">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-full flex items-center justify-center text-muted-foreground hover:text-foreground text-lg">
                    −
                  </button>
                  <span className="flex-1 text-center text-sm font-semibold">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-9 h-full flex items-center justify-center text-muted-foreground hover:text-foreground text-lg">
                    +
                  </button>
                </div>
              </div>
              <div className="pt-5">
                <span className={cn("text-xs font-medium px-2 py-1 rounded-lg",
                  product.stock > 10 ? "bg-green-50 text-green-700"
                  : product.stock > 0 ? "bg-amber-50 text-amber-700"
                  : "bg-red-50 text-red-700")}>
                  {product.stock > 10 ? "In stock" : product.stock > 0 ? `Only ${product.stock} left` : "Out of stock"}
                </span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border"/>

          {/* Action buttons */}
          <div className="space-y-2.5">
            <div className="flex gap-2">
              <Button size="lg" className="flex-1 h-11 text-sm gap-2 font-semibold"
                onClick={handleAddToCart} disabled={product.stock === 0}>
                <ShoppingBag className="h-4 w-4"/>
                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </Button>
              <Button variant="outline" size="icon"
                className={cn("h-11 w-11 shrink-0",
                  inWishlist && "text-destructive border-destructive bg-destructive/5")}
                onClick={() => toggleWishlist(product.id)}>
                <Heart className={cn("h-4 w-4", inWishlist && "fill-current")}/>
              </Button>
            </div>

            {/* WhatsApp */}
            <a href={`https://wa.me/${WA_NUMBER}?text=${waMessage}`}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 rounded-xl text-sm font-semibold"
              style={{ background: "#25d366", color: "#fff", textDecoration: "none" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Customise on WhatsApp
            </a>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {[
              { icon: Truck,        text: "Free shipping over ₹500" },
              { icon: ShieldCheck,  text: "30-day returns" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 p-2.5 rounded-xl bg-muted/50">
                <Icon className="h-3.5 w-3.5 text-primary shrink-0"/>
                <span className="text-xs text-muted-foreground">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description + Details — below on mobile */}
      <div className="mb-12 p-5 rounded-2xl bg-muted/30 border border-border/50">
        <h3 className="font-serif font-semibold text-base mb-3">About this piece</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.description}</p>
        <ul className="space-y-1.5">
          {[
            "Handmade with care and attention to detail",
            "Premium quality materials sourced responsibly",
            "Unique piece — no two items are exactly alike",
          ].map(item => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span style={{ color: "#9333ea", marginTop: 2, flexShrink: 0 }}>✦</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="mt-8">
          <ProductCarousel title="You May Also Like" products={relatedProducts}/>
        </div>
      )}
    </div>
  );
};