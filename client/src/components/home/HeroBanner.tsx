import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Heart, Star } from "lucide-react";

const heroImage = "./keyring.jpg";

const FlowerSvg = ({ size = 20, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
    <circle cx="12" cy="12" r="2.8"/>
    {[0,60,120,180,240,300].map((deg,i) => (
      <ellipse key={i}
        cx={12+5.2*Math.cos((deg*Math.PI)/180)}
        cy={12+5.2*Math.sin((deg*Math.PI)/180)}
        rx="2" ry="3.2"
        transform={`rotate(${deg} ${12+5.2*Math.cos((deg*Math.PI)/180)} ${12+5.2*Math.sin((deg*Math.PI)/180)})`}
        opacity="0.72"/>
    ))}
  </svg>
);

const StitchDashes = () => (
  <svg viewBox="0 0 120 6" fill="none" style={{ width: 96, height: 6, display: "block" }}>
    {[0,14,28,42,56,70,84,98,112].map((x) => (
      <line key={x} x1={x} y1="3" x2={x+9} y2="3"
        stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.35"/>
    ))}
  </svg>
);

// ── Slide 1 — existing beautiful hero ──
const Slide1 = () => (
  <section className="relative overflow-hidden flex items-stretch"
    style={{ background: "#fff0f7", minHeight: 520 }}>

    <div className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(ellipse 75% 85% at 15% 50%, rgba(253,196,253,0.28) 0%, transparent 65%)" }}/>
    <div className="pointer-events-none absolute top-10 right-0 grid grid-cols-4 gap-2 opacity-[0.10]" style={{ marginRight: "2%" }}>
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#9333ea" }}/>
      ))}
    </div>

    {/* LEFT */}
    <div className="relative z-10 flex-1 flex items-center px-8 md:px-14 lg:px-20 py-20">
      <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
        style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>

        <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }} className="chip-label" style={{ width: "fit-content" }}>
          <FlowerSvg size={12} style={{ color: "#7e22ce" }}/>
          Handmade in small batches
        </motion.span>

        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 4.5vw, 52px)",
            fontWeight: 700, lineHeight: 1.1, color: "#1a0a2e", margin: 0 }}>
            Little things,
          </h1>
          <h1 style={{ fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 4.5vw, 52px)",
            fontWeight: 700, fontStyle: "italic", lineHeight: 1.1, color: "#9333ea", margin: 0 }}>
            made with love.
          </h1>
        </div>

        <StitchDashes />

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, paddingTop: 4 }}>
          <Link href="/shop">
            <button className="btn-primary-craft">
              Shop the collection <ArrowRight style={{ width: 16, height: 16 }}/>
            </button>
          </Link>
          <Link href="/about">
            <button className="btn-outline-craft">Our story</button>
          </Link>
        </div>
      </motion.div>
    </div>

    {/* RIGHT — floating product collage */}
    <div className="hidden md:block flex-none relative" style={{ width: "46%", minHeight: 520 }}>
      {/* Blobs */}
      <div style={{ position: "absolute", top: "5%", right: "10%", width: 260, height: 260,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(221,180,255,0.40) 0%, transparent 70%)",
        pointerEvents: "none" }}/>
      <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 180, height: 180,
        borderRadius: "50%", background: "radial-gradient(circle, rgba(253,164,205,0.35) 0%, transparent 70%)",
        pointerEvents: "none" }}/>

      {/* Main product card */}
      <motion.div initial={{ opacity: 0, y: 30, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -3 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22,1,0.36,1] }}
        style={{ position: "absolute", left: "4%", top: "10%", width: 240, height: 270, zIndex: 3 }}>
        <motion.div animate={{ y: [0,-7,0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: 24, overflow: "hidden",
            boxShadow: "0 24px 64px rgba(147,51,234,.22), 0 8px 24px rgba(0,0,0,.10)",
            border: "4px solid rgba(255,255,255,0.95)" }}>
            <img src={heroImage} alt="Handmade keyrings"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}/>
          </div>
          <div style={{ position: "absolute", bottom: -14, right: -14,
            background: "white", borderRadius: 12, padding: "7px 12px",
            boxShadow: "0 6px 20px rgba(147,51,234,.15)",
            fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#9333ea",
            border: "1.5px solid rgba(147,51,234,.12)",
            display: "flex", alignItems: "center", gap: 4, zIndex: 5 }}>
            <Heart style={{ width: 12, height: 12, fill: "#ec4899", color: "#ec4899" }}/>
            ₹249 · Keyrings
          </div>
        </motion.div>
      </motion.div>

      {/* Crochet Posies card */}
      <motion.div initial={{ opacity: 0, x: 20, rotate: 8 }} animate={{ opacity: 1, x: 0, rotate: 7 }}
        transition={{ duration: 0.85, delay: 0.35, ease: [0.22,1,0.36,1] }}
        style={{ position: "absolute", right: "6%", top: "6%", width: 160, zIndex: 2 }}>
        <motion.div animate={{ y: [0,5,0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
          <div style={{
            background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)",
            borderRadius: 20, padding: "20px 18px",
            boxShadow: "0 10px 32px rgba(147,51,234,.12), 0 2px 8px rgba(0,0,0,.06)",
            border: "2.5px solid rgba(255,255,255,0.85)",
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 12,
              background: "rgba(255,255,255,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Sparkles style={{ width: 18, height: 18, color: "#9333ea" }}/>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#1a0a2e", lineHeight: 1.2 }}>Crochet Posies</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#9333ea", marginTop: 2, fontWeight: 600 }}>From ₹399</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floral Frames card */}
      <motion.div initial={{ opacity: 0, x: 20, rotate: 4 }} animate={{ opacity: 1, x: 0, rotate: 5 }}
        transition={{ duration: 0.85, delay: 0.55, ease: [0.22,1,0.36,1] }}
        style={{ position: "absolute", right: "4%", bottom: "14%", width: 155, zIndex: 2 }}>
        <motion.div animate={{ y: [0,-5,0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
          <div style={{
            background: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)",
            borderRadius: 20, padding: "20px 18px",
            boxShadow: "0 10px 32px rgba(147,51,234,.12), 0 2px 8px rgba(0,0,0,.06)",
            border: "2.5px solid rgba(255,255,255,0.85)",
            display: "flex", flexDirection: "column", gap: 8,
          }}>
            <div style={{ width: 38, height: 38, borderRadius: 12,
              background: "rgba(255,255,255,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FlowerSvg size={18} style={{ color: "#9333ea" }}/>
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#1a0a2e", lineHeight: 1.2 }}>Floral Frames</div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#ec4899", marginTop: 2, fontWeight: 600 }}>From ₹699</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bestseller badge */}
      <motion.div initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        style={{ position: "absolute", top: "34%", right: "2%", zIndex: 5,
          background: "white", borderRadius: 14, padding: "8px 13px",
          boxShadow: "0 6px 24px rgba(147,51,234,.14)",
          display: "flex", alignItems: "center", gap: 7,
          border: "1.5px solid rgba(147,51,234,.08)" }}>
        <span style={{ fontSize: 18 }}>🏆</span>
        <div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: "#9333ea" }}>Bestseller</div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "#9ca3af" }}>200+ sold</div>
        </div>
      </motion.div>

      {/* Spinning flower */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: "3%", left: "2%", zIndex: 4 }}>
        <FlowerSvg size={30} style={{ color: "#c084fc", opacity: 0.55 }}/>
      </motion.div>

      {/* Sparkle dots */}
      {[
        { top: "15%", left: "40%", size: 7, color: "#9333ea" },
        { top: "62%", right: "1%", size: 5, color: "#ec4899" },
        { bottom: "20%", left: "30%", size: 5, color: "#9333ea" },
      ].map((p, i) => (
        <motion.div key={i}
          animate={{ scale: [1,1.6,1], opacity: [0.35,0.85,0.35] }}
          transition={{ duration: 2.5+i, repeat: Infinity, delay: i*0.8 }}
          style={{ position: "absolute", zIndex: 4, width: p.size, height: p.size,
            borderRadius: "50%", background: p.color, ...p }}/>
      ))}
    </div>
  </section>
);

// ── Slide 2 — Floral Frames ──
const Slide2 = () => (
  <section className="relative overflow-hidden flex items-stretch"
    style={{ background: "linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #fff8f0 100%)", minHeight: 520 }}>
    <div className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(253,164,205,0.20) 0%, transparent 65%)" }}/>

    <div className="relative z-10 flex-1 flex items-center px-8 md:px-14 lg:px-20 py-20">
      <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>

        <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(236,72,153,0.1)", borderRadius: 999,
            padding: "5px 14px", width: "fit-content",
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
            color: "#ec4899", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          🏆 Bestseller
        </motion.span>

        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 4vw, 50px)",
            fontWeight: 700, lineHeight: 1.1, color: "#1a0a2e", margin: 0 }}>
            Floral Memory
          </h1>
          <h1 style={{ fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 4vw, 50px)",
            fontWeight: 700, fontStyle: "italic", lineHeight: 1.1, color: "#ec4899", margin: 0 }}>
            Frames
          </h1>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15,
          color: "#6b7280", lineHeight: 1.7, margin: 0, maxWidth: 380 }}>
          Dried petals, pressed greenery & wildflowers — handset in beautiful frames, one at a time.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/shop/category/frames">
            <button style={{ padding: "12px 24px",
              background: "linear-gradient(135deg, #ec4899, #9333ea)",
              color: "#fff", border: "none", borderRadius: 12,
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              Shop Frames <ArrowRight style={{ width: 16, height: 16 }}/>
            </button>
          </Link>
          <span style={{ fontFamily: "'Playfair Display', serif",
            fontSize: 20, fontWeight: 700, color: "#ec4899" }}>
            From ₹699
          </span>
        </div>
      </motion.div>
    </div>

    {/* Right side illustration */}
    <div className="hidden md:flex flex-none items-center justify-center relative"
      style={{ width: "42%", minHeight: 520 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22,1,0.36,1] }}
        animate-custom={{ y: [0,-8,0] }}
      >
        <motion.div animate={{ y: [0,-8,0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
          <div style={{ width: 220, height: 260, borderRadius: 20,
            background: "linear-gradient(135deg, #fce7f3, #fef3c7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 20px 60px rgba(236,72,153,0.2)",
            border: "3px solid rgba(255,255,255,0.9)", fontSize: 80 }}>
            🖼️
          </div>
        </motion.div>
      </motion.div>

      {/* Floating tags */}
      {[
        { text: "Pressed flowers", top: "15%", left: "-10%", bg: "#fce7f3", color: "#ec4899" },
        { text: "Handframed",      bottom: "20%", right: "-5%", bg: "#ede9fe", color: "#9333ea" },
        { text: "₹699+",          top: "55%", left: "-15%", bg: "#fef3c7", color: "#d97706" },
      ].map(({ text, bg, color, ...pos }) => (
        <motion.div key={text}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{ position: "absolute", ...pos,
            background: "white", borderRadius: 10, padding: "6px 12px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
            color, border: `1.5px solid ${bg}`, whiteSpace: "nowrap" }}>
          {text}
        </motion.div>
      ))}
    </div>
  </section>
);

// ── Slide 3 — Custom & Resin ──
const Slide3 = () => (
  <section className="relative overflow-hidden flex items-stretch"
    style={{ background: "linear-gradient(135deg, #ede9fe 0%, #d1fae5 50%, #fdf4ff 100%)", minHeight: 520 }}>
    <div className="pointer-events-none absolute inset-0"
      style={{ background: "radial-gradient(ellipse 60% 70% at 20% 50%, rgba(147,51,234,0.12) 0%, transparent 65%)" }}/>

    <div className="relative z-10 flex-1 flex items-center px-8 md:px-14 lg:px-20 py-20">
      <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
        style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>

        <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(147,51,234,0.1)", borderRadius: 999,
            padding: "5px 14px", width: "fit-content",
            fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700,
            color: "#7c3aed", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          ✨ Custom orders open
        </motion.span>

        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 4vw, 50px)",
            fontWeight: 700, lineHeight: 1.1, color: "#1a0a2e", margin: 0 }}>
            Made just for
          </h1>
          <h1 style={{ fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 4vw, 50px)",
            fontWeight: 700, fontStyle: "italic", lineHeight: 1.1, color: "#7c3aed", margin: 0 }}>
            you.
          </h1>
        </div>

        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15,
          color: "#6b7280", lineHeight: 1.7, margin: 0, maxWidth: 380 }}>
          Resin gifts, embroidery hoops, personalized keyrings — tell Prachi what you have in mind.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <Link href="/custom">
            <button style={{ padding: "12px 24px",
              background: "linear-gradient(135deg, #7c3aed, #ec4899)",
              color: "#fff", border: "none", borderRadius: 12,
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
              cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              Request Custom <ArrowRight style={{ width: 16, height: 16 }}/>
            </button>
          </Link>
          <Link href="/shop">
            <button style={{ padding: "12px 24px",
              background: "transparent",
              color: "#7c3aed", border: "2px solid rgba(124,58,237,0.3)", borderRadius: 12,
              fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600,
              cursor: "pointer" }}>
              Browse all
            </button>
          </Link>
        </div>
      </motion.div>
    </div>

    <div className="hidden md:flex flex-none items-center justify-center relative"
      style={{ width: "42%", minHeight: 520 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, padding: 20 }}>
        {[
          { emoji: "💎", label: "Resin Gifts",     bg: "linear-gradient(135deg, #ede9fe, #d1fae5)", color: "#7c3aed" },
          { emoji: "🧵", label: "Embroidery",      bg: "linear-gradient(135deg, #fce7f3, #fef3c7)", color: "#ec4899" },
          { emoji: "🔑", label: "Custom Keyrings", bg: "linear-gradient(135deg, #fef3c7, #ede9fe)", color: "#d97706" },
          { emoji: "🌸", label: "Floral Art",      bg: "linear-gradient(135deg, #fce7f3, #ede9fe)", color: "#ec4899" },
        ].map(({ emoji, label, bg, color }, i) => (
          <motion.div key={label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            style={{ background: bg, borderRadius: 16, padding: "20px 16px",
              textAlign: "center",
              boxShadow: "0 8px 24px rgba(147,51,234,0.10)",
              border: "2px solid rgba(255,255,255,0.9)" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>{emoji}</div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12,
              fontWeight: 700, color }}>{label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// ── Mobile Hero ──
const MobileHero = () => (
  <section style={{ background: "linear-gradient(160deg, #fff0f7 0%, #fdf4ff 100%)",
    padding: "28px 20px 24px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200,
      borderRadius: "50%", background: "radial-gradient(circle, rgba(221,180,255,0.4), transparent 70%)",
      pointerEvents: "none" }}/>
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
      style={{ display: "inline-flex", alignItems: "center", gap: 6,
        background: "rgba(147,51,234,0.08)", borderRadius: 999,
        padding: "5px 12px", marginBottom: 14 }}>
      <FlowerSvg size={10} style={{ color: "#7e22ce" }}/>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
        color: "#7e22ce", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        Handmade in small batches
      </span>
    </motion.div>
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32,
        fontWeight: 700, lineHeight: 1.15, color: "#1a0a2e", margin: "0 0 4px" }}>
        Little things,
      </h1>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32,
        fontWeight: 700, fontStyle: "italic", lineHeight: 1.15, color: "#9333ea", margin: "0 0 14px" }}>
        made with love.
      </h1>
    </motion.div>
    <StitchDashes />
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      style={{ margin: "18px 0", borderRadius: 18, overflow: "hidden",
        boxShadow: "0 16px 48px rgba(147,51,234,0.18)",
        border: "3px solid rgba(255,255,255,0.9)",
        position: "relative", height: 200 }}>
      <img src={heroImage} alt="Handmade keyrings"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}/>
      <div style={{ position: "absolute", bottom: 10, right: 10,
        background: "white", borderRadius: 10, padding: "5px 10px",
        boxShadow: "0 4px 14px rgba(147,51,234,.2)",
        fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: "#9333ea",
        display: "flex", alignItems: "center", gap: 4 }}>
        <Heart style={{ width: 10, height: 10, fill: "#ec4899", color: "#ec4899" }}/>
        ₹249 · Keyrings
      </div>
    </motion.div>
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }} style={{ display: "flex", gap: 10 }}>
      <Link href="/shop" style={{ flex: 1 }}>
        <button style={{ width: "100%", padding: "12px 0",
          background: "linear-gradient(135deg, #9333ea, #ec4899)",
          color: "#fff", border: "none", borderRadius: 12,
          fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
          display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          cursor: "pointer" }}>
          Shop now <ArrowRight style={{ width: 15, height: 15 }}/>
        </button>
      </Link>
      <Link href="/about">
        <button style={{ padding: "12px 16px", background: "transparent",
          color: "#9333ea", border: "2px solid rgba(147,51,234,0.3)",
          borderRadius: 12, fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
          Our story
        </button>
      </Link>
    </motion.div>
  </section>
);

// ── Main Slider ──
const slides = [Slide1, Slide2, Slide3];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((idx: number, dir: number) => {
    setDirection(dir);
    setCurrent(idx);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      go((current + 1) % slides.length, 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, paused, go]);

  const prev = () => go((current - 1 + slides.length) % slides.length, -1);
  const next = () => go((current + 1) % slides.length, 1);

  const SlideComponent = slides[current];

  return (
    <div
      style={{ position: "relative", width: "100%", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          initial={{ opacity: 0, x: direction * 80 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -80 }}
          transition={{ duration: 0.5, ease: [0.22,1,0.36,1] }}
        >
          <SlideComponent />
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      {[
        { dir: -1, side: "left", icon: ChevronLeft, action: prev },
        { dir:  1, side: "right", icon: ChevronRight, action: next },
      ].map(({ side, icon: Icon, action }) => (
        <button key={side} onClick={action} style={{
          position: "absolute", [side]: 16, top: "50%", transform: "translateY(-50%)",
          width: 40, height: 40, borderRadius: "50%",
          background: "rgba(255,255,255,0.92)", border: "1.5px solid rgba(147,51,234,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", zIndex: 20,
          boxShadow: "0 4px 16px rgba(147,51,234,0.12)",
          transition: "transform 0.15s",
        }}
          onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-50%) scale(1.08)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "translateY(-50%) scale(1)")}
        >
          <Icon style={{ width: 20, height: 20, color: "#9333ea" }}/>
        </button>
      ))}

      {/* Dot indicators */}
      <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 6, zIndex: 20 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i, i > current ? 1 : -1)} style={{
            width: i === current ? 24 : 8, height: 8,
            borderRadius: 999, border: "none", cursor: "pointer",
            background: i === current ? "#9333ea" : "rgba(147,51,234,0.25)",
            transition: "all 0.3s", padding: 0,
          }}/>
        ))}
      </div>
    </div>
  );
};

// ── Category Strip ──
const categories = [
  { label: "Frames",          slug: "frames",          emoji: "🖼️" },
  { label: "Keyrings",        slug: "keyrings",        emoji: "🔑" },
  { label: "Embroidery Hoop", slug: "embroidery-hoop", emoji: "🧵" },
  { label: "Resin Gifts",     slug: "resin-gifts",     emoji: "💎" },
];

const CategoryStrip = () => (
  <div style={{ background: "#fff", borderBottom: "1px solid #f0e6ff", borderTop: "1px solid #f0e6ff" }}>
    <div style={{ display: "flex", justifyContent: "center", maxWidth: 900, margin: "0 auto" }}>
      {categories.map(({ label, slug, emoji }, idx) => (
        <Link key={slug} href={`/shop/category/${slug}`} style={{ flex: 1 }}>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
            padding: "14px 8px", cursor: "pointer",
            borderRight: idx < categories.length - 1 ? "1px solid #f0e6ff" : "none",
            transition: "background 0.15s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "#fdf4ff")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: 22 }}>{emoji}</span>
            <span style={{ fontFamily: "'Inter', sans-serif",
              fontSize: 12, fontWeight: 600, color: "#374151",
              textAlign: "center", whiteSpace: "nowrap" }}>
              {label}
            </span>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

// ── Marquee ──
const tickerItems = [
  { emoji: "🌸", text: "Handmade with love" },
  { emoji: "✨", text: "Limited edition drops" },
  { emoji: "🎀", text: "Perfect for gifting" },
  { emoji: "💜", text: "Each piece is unique" },
  { emoji: "🌿", text: "Eco-friendly packaging" },
  { emoji: "⭐", text: "4.9 star rated" },
  { emoji: "🎨", text: "Custom orders welcome" },
  { emoji: "🪡", text: "100% handcrafted" },
  { emoji: "🌺", text: "Ships across India" },
  { emoji: "💝", text: "Made by Prachi" },
];

const MarqueeTicker = () => {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div style={{ background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
      overflow: "hidden", padding: "11px 0", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, zIndex: 2,
        background: "linear-gradient(to right, #9333ea, transparent)", pointerEvents: "none" }}/>
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, zIndex: 2,
        background: "linear-gradient(to left, #ec4899, transparent)", pointerEvents: "none" }}/>
      <motion.div animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 0, width: "max-content" }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10,
            padding: "0 24px", borderRight: "1px solid rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}>
            <span style={{ fontSize: 14 }}>{item.emoji}</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 600,
              color: "rgba(255,255,255,0.95)", letterSpacing: "0.04em" }}>
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ── Logo export ──
export const PrachiLogo = ({ size = 1 }: { size?: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <div style={{
      width: 36 * size, height: 36 * size,
      background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
      borderRadius: 10 * size,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 14px rgba(147,51,234,0.35)", flexShrink: 0,
    }}>
      <svg width={20 * size} height={20 * size} viewBox="0 0 24 24" fill="none">
        <line x1="12" y1="3" x2="12" y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M12 16 Q8 19 10 21 Q12 22.5 14 21 Q16 19 12 16Z" fill="white" opacity="0.9"/>
        {[0,72,144,216,288].map((deg, i) => (
          <ellipse key={i}
            cx={12 + 3.8 * Math.cos((deg * Math.PI) / 180)}
            cy={8  + 3.8 * Math.sin((deg * Math.PI) / 180)}
            rx="1.6" ry="2.4"
            transform={`rotate(${deg} ${12 + 3.8 * Math.cos((deg*Math.PI)/180)} ${8 + 3.8*Math.sin((deg*Math.PI)/180)})`}
            fill="white" opacity="0.75"/>
        ))}
        <circle cx="12" cy="8" r="2" fill="white"/>
      </svg>
    </div>
    <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
      <span style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 22 * size, fontWeight: 700,
        background: "linear-gradient(135deg, #1a0a2e 0%, #7c3aed 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        letterSpacing: "-0.02em",
      }}>Prachi</span>
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 8 * size, fontWeight: 700,
        letterSpacing: "0.28em", color: "#9333ea",
        textTransform: "uppercase", marginTop: 1,
      }}>Creation</span>
    </div>
  </div>
);

// ── Main Export ──
export const HeroBanner = () => (
  <>
    {/* Mobile — compact hero first, then slider */}
    <div className="md:hidden">
      <MobileHero />
      <HeroSlider />
    </div>

    {/* Desktop — slider IS the hero */}
    <div className="hidden md:block">
      <HeroSlider />
    </div>

    {/* Category strip + marquee — all screens */}
    <CategoryStrip />
    <MarqueeTicker />
  </>
);