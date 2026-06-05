import React, { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { cn } from "@/lib/utils";
import { ProductCarousel } from "@/components/common/ProductCarousel";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API_URL}/products/${slug}`);
        if (!res.ok) return;
        const data = await res.json();
        setProduct({ ...data, id: data._id, images: data.images || [] });
        setSelectedSize(data.sizes?.[0] || null);
        setSelectedColor(data.colors?.[0] || null);
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };
    fetchProduct();
  }, [slug]);

  useEffect(() => {
    if (!product) return;
    const fetchRelated = async () => {
      try {
        const res = await fetch(`${API_URL}/products`);
        if (!res.ok) return;
        const all = await res.json();
        setRelatedProducts(all.filter((p: any) => p.category === product.category && p._id !== product.id));
      } catch (err) {
        console.error("Error loading related products:", err);
      }
    };
    fetchRelated();
  }, [product]);

  if (!product) return <div className="p-20 text-center text-lg">Product not found</div>;

  const images = product.images && product.images.length
    ? product.images
    : ["https://via.placeholder.com/500x500?text=No+Image"];
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: images[0],
      variant: selectedSize || selectedColor || undefined,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/shop/category/${product.category.toLowerCase()}`} className="hover:text-primary transition-colors">{product.category}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={images[activeImage]}
                alt={product.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            {product.isNew && <Badge className="absolute top-4 left-4">New Arrival</Badge>}
          </div>
          <div className="grid grid-cols-4 gap-4">
            {images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "relative aspect-square rounded-xl overflow-hidden bg-muted border-2 transition-all",
                  activeImage === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="text-sm font-medium text-primary uppercase tracking-wider mb-2">{product.category}</p>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("h-4 w-4", i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted")} />
                ))}
              </div>
              <span className="text-sm text-muted-foreground underline decoration-dashed underline-offset-4 cursor-pointer">
                {product.reviewCount} Reviews
              </span>
            </div>
          </div>

          <div className="flex items-end gap-4 mb-8">
            <span className="text-3xl font-semibold">₹{product.price.toFixed(2)}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-lg text-muted-foreground line-through mb-1">₹{product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>

          <div className="space-y-6 mb-8 border-t border-b border-border py-6">
            {/* Colors */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3">Color</h4>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "h-8 w-8 rounded-full border-2 ring-offset-background transition-all",
                        selectedColor === color ? "ring-2 ring-primary border-background" : "border-transparent"
                      )}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h4 className="font-medium text-sm mb-3">Size</h4>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size: string) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[3rem]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h4 className="font-medium text-sm mb-3">Quantity</h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-input rounded-md h-10 w-32">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.stock} items left
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1 h-14 text-base gap-2" onClick={handleAddToCart}>
              <ShoppingBag className="h-5 w-5" /> Add to Cart
            </Button>
            <Button
              variant="outline"
              size="icon"
              className={cn("h-14 w-14 shrink-0 transition-colors", inWishlist && "text-destructive border-destructive")}
              onClick={() => toggleWishlist(product.id)}
            >
              <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4" /> Free shipping over ₹50
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> 30-day returns
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="details" className="mt-16">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent mb-8">
          <TabsTrigger value="details" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3 text-base">Product Details</TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3 text-base">Reviews ({product.reviewCount})</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="prose dark:prose-invert max-w-none">
          <p>{product.description}</p>
          <ul>
            <li>Handmade with care and attention to detail.</li>
            <li>Premium quality materials sourced responsibly.</li>
            <li>Unique piece - no two items are exactly alike.</li>
          </ul>
        </TabsContent>
        <TabsContent value="reviews">
          <div className="p-8 text-center bg-muted rounded-xl">
            <p className="text-muted-foreground">Customer reviews will be displayed here.</p>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-24">
        <ProductCarousel title="You May Also Like" products={relatedProducts} />
      </div>
    </div>
  );
};
