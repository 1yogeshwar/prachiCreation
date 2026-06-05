import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Package } from "lucide-react";
import { useLocation } from "wouter";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

type Product = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  images: string[];
  category: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export const SearchBar = ({ open, onClose }: Props) => {
  const [query, setQuery]         = useState("");
  const [results, setResults]     = useState<Product[]>([]);
  const [loading, setLoading]     = useState(false);
  const [focused, setFocused]     = useState(false);
  const inputRef                  = useRef<HTMLInputElement>(null);
  const [, setLocation]           = useLocation();

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  // Live search with debounce
  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res  = await fetch(`${API}/products?search=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350); // debounce 350ms
    return () => clearTimeout(timer);
  }, [query]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSelect = (slug: string) => {
    setLocation(`/product/${slug}`);
    onClose();
  };

  const handleViewAll = () => {
    setLocation(`/shop?search=${encodeURIComponent(query)}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(2px)",
            }}
          />

          {/* Search panel */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: 58, left: 0, right: 0,
              zIndex: 50,
              background: "rgba(255,240,247,0.98)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(147,51,234,0.12)",
              boxShadow: "0 8px 32px rgba(147,51,234,0.10)",
            }}
          >
            {/* Input row */}
            <div style={{
              maxWidth: 680, margin: "0 auto",
              padding: "16px 20px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <Search style={{ width: 18, height: 18, color: "#9333ea", flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search keyrings, crochet, frames..."
                style={{
                  flex: 1, border: "none", outline: "none",
                  background: "transparent",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 16, color: "#1a0a2e",
                  caretColor: "#9333ea",
                }}
              />
              {query && (
                <button onClick={() => setQuery("")} style={{
                  background: "none", border: "none", cursor: "pointer",
                  padding: 4, borderRadius: 6, color: "#9ca3af",
                  display: "flex", alignItems: "center",
                }}>
                  <X style={{ width: 16, height: 16 }} />
                </button>
              )}
              <button onClick={onClose} style={{
                background: "none", border: "1px solid rgba(147,51,234,0.2)",
                borderRadius: 6, padding: "4px 10px", cursor: "pointer",
                fontFamily: "'Inter', sans-serif", fontSize: 11,
                color: "#9333ea", letterSpacing: "0.04em",
              }}>
                ESC
              </button>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(147,51,234,0.08)", margin: "0 20px" }} />

            {/* Results */}
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "8px 20px 16px" }}>

              {/* Loading */}
              {loading && (
                <div style={{ padding: "16px 0", textAlign: "center" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    style={{ display: "inline-block" }}
                  >
                    <Search style={{ width: 16, height: 16, color: "#9333ea" }} />
                  </motion.div>
                </div>
              )}

              {/* No results */}
              {!loading && query && results.length === 0 && (
                <div style={{ padding: "16px 0", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#9ca3af" }}>
                    No products found for "<strong style={{ color: "#9333ea" }}>{query}</strong>"
                  </p>
                </div>
              )}

              {/* Results list */}
              {!loading && results.length > 0 && (
                <>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600,
                    color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase",
                    marginBottom: 8, marginTop: 8 }}>
                    Products
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {results.map(product => (
                      <motion.button
                        key={product._id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => handleSelect(product.slug)}
                        style={{
                          display: "flex", alignItems: "center", gap: 12,
                          padding: "10px 12px", borderRadius: 12,
                          border: "none", background: "transparent",
                          cursor: "pointer", textAlign: "left", width: "100%",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(147,51,234,0.06)")}
                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                      >
                        {/* Product image */}
                        {product.images?.[0]
                          ? <img src={product.images[0]} alt={product.name}
                              style={{ width: 44, height: 44, borderRadius: 10, objectFit: "cover",
                                border: "1.5px solid rgba(147,51,234,0.1)", flexShrink: 0 }}/>
                          : <div style={{ width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                              background: "rgba(147,51,234,0.08)", display: "flex",
                              alignItems: "center", justifyContent: "center" }}>
                              <Package style={{ width: 18, height: 18, color: "#c084fc" }}/>
                            </div>
                        }

                        {/* Name + category */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14,
                            fontWeight: 500, color: "#1a0a2e", margin: 0,
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {product.name}
                          </p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12,
                            color: "#9ca3af", margin: 0, textTransform: "capitalize" }}>
                            {product.category}
                          </p>
                        </div>

                        {/* Price */}
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14,
                          fontWeight: 700, color: "#9333ea", margin: 0, flexShrink: 0 }}>
                          ₹{product.price}
                        </p>
                      </motion.button>
                    ))}
                  </div>

                  {/* View all */}
                  <button onClick={handleViewAll} style={{
                    width: "100%", marginTop: 10, padding: "10px 0",
                    background: "rgba(147,51,234,0.06)",
                    border: "1px solid rgba(147,51,234,0.15)",
                    borderRadius: 10, cursor: "pointer",
                    fontFamily: "'Inter', sans-serif", fontSize: 13,
                    fontWeight: 600, color: "#9333ea",
                  }}>
                    View all results for "{query}" →
                  </button>
                </>
              )}

              {/* Empty state — no query yet */}
              {!query && (
                <div style={{ padding: "12px 0", display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Keyrings", "Crochet", "Frames", "Gifts"].map(tag => (
                    <button key={tag} onClick={() => setQuery(tag)} style={{
                      padding: "6px 14px", borderRadius: 20,
                      border: "1px solid rgba(147,51,234,0.2)",
                      background: "rgba(147,51,234,0.05)",
                      fontFamily: "'Inter', sans-serif", fontSize: 13,
                      color: "#9333ea", cursor: "pointer",
                    }}>
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};