import React, { useState, useMemo, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { ProductGrid, ProductGridSkeleton } from "@/components/common/ProductGrid";
import categoriesData from "@/data/categories.json";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, SlidersHorizontal, X } from "lucide-react";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";




/* ── helpers ── */
type Product = {
  _id: string;
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number | null;
  discount?: number;
  images?: string[];
  category: string;
  subcategory?: string;
  stock: number;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  categorySlug?: string;
  subcategorySlug?: string;
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);

const ALL_SLUG = "__all__";



export const Shop = () => {
  const params = useParams<{ slug?: string; subslug?: string }>();
  const [, setLocation] = useLocation();

  const [sort, setSort]           = useState("featured");
  const [priceMax, setPriceMax]   = useState<number>(999999);
  const [inStockOnly, setInStock] = useState(false);
  const [onSaleOnly, setOnSale]   = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading, setLoading]     = useState(true);

  const activeCatSlug  = params.slug    ?? ALL_SLUG;
  const activeSubSlug  = params.subslug ?? ALL_SLUG;

  const activeCategory = categoriesData.find(c => c.slug === activeCatSlug) ?? null;

  useEffect(() => {
    const slugify = (value?: string) =>
      value ? value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") : "";

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        const normalized = data.map((p: any) => ({
          ...p,
          id: p._id,
          images: p.images || [],
          categorySlug: slugify(p.category),
          subcategorySlug: slugify(p.subcategory),
        }));
        setProducts(normalized);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  /* ── Filtered + sorted products ── */
  const filteredProducts = useMemo<Product[]>(() => {
    let list = [...products];

    if (activeCatSlug !== ALL_SLUG) {
      list = list.filter(p => p.categorySlug === activeCatSlug);
    }
    if (activeSubSlug !== ALL_SLUG) {
      list = list.filter(p => p.subcategorySlug === activeSubSlug);
    }
    if (inStockOnly)  list = list.filter(p => p.stock > 0);
    if (onSaleOnly)   list = list.filter(p => (p.discount ?? 0) > 0);
    list = list.filter(p => p.price <= priceMax);

    switch (sort) {
      case "newest":    return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      case "price-asc": return list.sort((a, b) => a.price - b.price);
      case "price-desc":return list.sort((a, b) => b.price - a.price);
      case "rating":    return list.sort((a, b) => b.rating - a.rating);
      default:          return list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  },  [products, activeCatSlug, activeSubSlug, sort, priceMax, inStockOnly, onSaleOnly]);

  const navigateTo = (catSlug: string, subSlug?: string) => {
    if (catSlug === ALL_SLUG) { setLocation("/shop"); return; }
    if (!subSlug || subSlug === ALL_SLUG) { setLocation(`/shop/category/${catSlug}`); return; }
    setLocation(`/shop/category/${catSlug}/${subSlug}`);
  };

  /* ── Page title ── */
  const pageTitle  = activeCategory
    ? activeSubSlug !== ALL_SLUG
      ? activeCategory.subcategories?.find(s => s.slug === activeSubSlug)?.name ?? activeCategory.name
      : activeCategory.name
    : "All Products";
  const pageCount = filteredProducts.length;



  useEffect(() => {
  console.log("params:", params);
  console.log("activeCatSlug:", activeCatSlug);
  console.log("products:", products);
  console.log("filtered:", filteredProducts.length);
}, [products, filteredProducts]);

  return (
    <div style={{ background: "#fff0f7", minHeight: "100vh" }}>
      {/* ── Top band ── */}
      <div style={{ background: "#fff0f7", paddingTop: 40, paddingBottom: 0 }}>
        <div className="container mx-auto px-4 lg:px-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 mb-5"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9ca3af" }}>
            <Link href="/" style={{ color: "#9ca3af" }} className="hover:text-purple-600 transition-colors">Home</Link>
            <ChevronRight style={{ width: 12, height: 12 }} />
            <Link href="/shop" style={{ color: activeCatSlug === ALL_SLUG ? "#9333ea" : "#9ca3af" }}
              className="hover:text-purple-600 transition-colors">Shop</Link>
            {activeCategory && (
              <>
                <ChevronRight style={{ width: 12, height: 12 }} />
                <span style={{ color: activeSubSlug === ALL_SLUG ? "#9333ea" : "#9ca3af" }}
                  className="cursor-pointer hover:text-purple-600 transition-colors"
                  onClick={() => navigateTo(activeCatSlug)}>
                  {activeCategory.name}
                </span>
              </>
            )}
            {activeSubSlug !== ALL_SLUG && activeCategory && (
              <>
                <ChevronRight style={{ width: 12, height: 12 }} />
                <span style={{ color: "#9333ea" }}>
                  {activeCategory.subcategories?.find(s => s.slug === activeSubSlug)?.name}
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif" style={{ fontSize: 36, fontWeight: 700, color: "#1a0a2e", lineHeight: 1.15, marginBottom: 6 }}>
            {pageTitle}
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6b7280", marginBottom: 28 }}>
            {pageCount} handmade {pageCount === 1 ? "piece" : "pieces"} — each one made with love
          </p>

          {/* ── CATEGORY TABS (horizontal scroll) ── */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
            {/* ALL */}
            <button
              onClick={() => navigateTo(ALL_SLUG)}
              style={{
                flexShrink: 0,
                padding: "8px 18px", borderRadius: 999,
                fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                border: activeCatSlug === ALL_SLUG ? "2px solid #9333ea" : "2px solid transparent",
                background: activeCatSlug === ALL_SLUG ? "#9333ea" : "white",
                color: activeCatSlug === ALL_SLUG ? "white" : "#374151",
                cursor: "pointer", transition: "all 0.2s",
                boxShadow: activeCatSlug === ALL_SLUG ? "0 4px 16px rgba(147,51,234,.25)" : "0 1px 6px rgba(0,0,0,.06)",
              }}>
              All
            </button>
            {categoriesData.map(cat => (
              <button key={cat.id}
                onClick={() => navigateTo(cat.slug)}
                style={{
                  flexShrink: 0,
                  padding: "8px 18px", borderRadius: 999,
                  fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600,
                  border: activeCatSlug === cat.slug ? "2px solid #9333ea" : "2px solid transparent",
                  background: activeCatSlug === cat.slug ? "#9333ea" : "white",
                  color: activeCatSlug === cat.slug ? "white" : "#374151",
                  cursor: "pointer", transition: "all 0.2s",
                  boxShadow: activeCatSlug === cat.slug
                    ? "0 4px 16px rgba(147,51,234,.25)"
                    : "0 1px 6px rgba(0,0,0,.06)",
                }}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* ── SUBCATEGORY CHIPS ── */}
          <AnimatePresence>
            {activeCategory && activeCategory.subcategories && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center gap-2 flex-wrap overflow-hidden"
              >
                {/* All subcategory */}
                <button
                  onClick={() => navigateTo(activeCatSlug, ALL_SLUG)}
                  style={{
                    padding: "5px 14px", borderRadius: 999,
                    fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500,
                    background: activeSubSlug === ALL_SLUG ? "#f3e8ff" : "transparent",
                    color: activeSubSlug === ALL_SLUG ? "#7e22ce" : "#6b7280",
                    border: activeSubSlug === ALL_SLUG ? "1.5px solid #d8b4fe" : "1.5px solid #e5e7eb",
                    cursor: "pointer", transition: "all 0.2s",
                  }}>
                  All {activeCategory.name}
                </button>
                {activeCategory.subcategories.map(sub => (
                  <button key={sub.slug}
                    onClick={() => navigateTo(activeCatSlug, sub.slug)}
                    style={{
                      padding: "5px 14px", borderRadius: 999,
                      fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500,
                      background: activeSubSlug === sub.slug ? "#f3e8ff" : "transparent",
                      color: activeSubSlug === sub.slug ? "#7e22ce" : "#6b7280",
                      border: activeSubSlug === sub.slug ? "1.5px solid #d8b4fe" : "1.5px solid #e5e7eb",
                      cursor: "pointer", transition: "all 0.2s",
                    }}>
                    {sub.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ── CONTENT AREA ── */}
      <div style={{ background: "#ffffff", marginTop: 24 }}>
        <div className="container mx-auto px-4 lg:px-12 py-8">
          {/* Sort bar */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Quick filter pills */}
              {[
                { label: "In stock", active: inStockOnly, toggle: () => setInStock(v => !v) },
                { label: "On sale", active: onSaleOnly,  toggle: () => setOnSale(v => !v) },
              ].map(({ label, active, toggle }) => (
                <button key={label} onClick={toggle} style={{
                  padding: "5px 14px", borderRadius: 999,
                  fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 500,
                  background: active ? "#f3e8ff" : "transparent",
                  color: active ? "#7e22ce" : "#6b7280",
                  border: active ? "1.5px solid #d8b4fe" : "1.5px solid #e5e7eb",
                  cursor: "pointer", display: "flex", alignItems: "center", gap: 5,
                }}>
                  {label}
                  {active && <X style={{ width: 11, height: 11 }} />}
                </button>
              ))}

              {/* Price max filter */}
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#6b7280" }}>
                  Up to {fmt(priceMax)}
                </span>
                <input type="range" min={149} max={999999} step={50}
                  value={priceMax} onChange={e => setPriceMax(+e.target.value)}
                  style={{ width: 80, accentColor: "#9333ea" }} />
              </div>
            </div>

            {/* Sort select */}
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px] h-9 rounded-full border-border/60"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 13 }}>
                <div className="flex items-center gap-2">
                  <SlidersHorizontal style={{ width: 14, height: 14, color: "#9333ea" }} />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Products */}
          {loading ? (
            <ProductGridSkeleton />
          ) : filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} columns={3} />
          ) : (
            <div className="text-center py-24">
              <div style={{ fontSize: 48, marginBottom: 16 }}>🌸</div>
              <h3 className="font-serif" style={{ fontSize: 22, color: "#1a0a2e", marginBottom: 8 }}>
                Nothing here yet
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6b7280", marginBottom: 24 }}>
                This style is coming soon — check back or explore another category.
              </p>
              <button className="btn-primary-craft" onClick={() => navigateTo(ALL_SLUG)}>
                Browse all products
              </button>
            </div>
          )}
        </div>
      </div>

     
    </div>
  );
};
