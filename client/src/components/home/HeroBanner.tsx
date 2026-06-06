import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Heart, Star } from "lucide-react";

const heroImage = "./keyring.jpg";

// ── Animated Crown Logo ──
const PrachiLogo = ({ size = 1 }: { size?: number }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    {/* Icon mark */}
    <div style={{
      width: 36 * size, height: 36 * size,
      background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
      borderRadius: 10 * size,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 4px 14px rgba(147,51,234,0.35)",
      flexShrink: 0,
    }}>
      <svg width={20 * size} height={20 * size} viewBox="0 0 24 24" fill="none">
        {/* Needle */}
        <line x1="12" y1="3" x2="12" y2="16" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        {/* Thread loop */}
        <path d="M12 16 Q8 19 10 21 Q12 22.5 14 21 Q16 19 12 16Z" fill="white" opacity="0.9"/>
        {/* Flower petals */}
        {[0,72,144,216,288].map((deg, i) => (
          <ellipse key={i}
            cx={12 + 3.8 * Math.cos((deg * Math.PI) / 180)}
            cy={8  + 3.8 * Math.sin((deg * Math.PI) / 180)}
            rx="1.6" ry="2.4"
            transform={`rotate(${deg} ${12 + 3.8 * Math.cos((deg*Math.PI)/180)} ${8 + 3.8*Math.sin((deg*Math.PI)/180)})`}
            fill="white" opacity="0.75"
          />
        ))}
        <circle cx="12" cy="8" r="2" fill="white"/>
      </svg>
    </div>
    {/* Wordmark */}
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

const StitchDashes = () => (
  <svg viewBox="0 0 120 6" fill="none" style={{ width: 96, height: 6, display: "block" }}>
    {[0,14,28,42,56,70,84,98,112].map((x) => (
      <line key={x} x1={x} y1="3" x2={x+9} y2="3"
        stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.35"/>
    ))}
  </svg>
);

const GradientCard = ({ gradient, icon: Icon, label, sub, rotate, style }: {
  gradient: string; icon: React.ElementType; label: string; sub: string;
  rotate: number; style?: React.CSSProperties;
}) => (
  <div style={{
    background: gradient, borderRadius: 20, padding: "20px 18px",
    boxShadow: "0 10px 32px rgba(147,51,234,.12), 0 2px 8px rgba(0,0,0,.06)",
    border: "2.5px solid rgba(255,255,255,0.85)",
    transform: `rotate(${rotate}deg)`,
    display: "flex", flexDirection: "column", gap: 8, ...style,
  }}>
    <div style={{
      width: 38, height: 38, borderRadius: 12,
      background: "rgba(255,255,255,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <Icon style={{ width: 18, height: 18, color: "#9333ea" }} />
    </div>
    <div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "#1a0a2e", lineHeight: 1.2 }}>{label}</div>
      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#6b7280", marginTop: 2 }}>{sub}</div>
    </div>
  </div>
);

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

const HeroGallery = () => (
  <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 520 }}>
    <div style={{ position: "absolute", top: "5%", right: "10%", width: 260, height: 260, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(221,180,255,0.40) 0%, transparent 70%)", pointerEvents: "none" }}/>
    <div style={{ position: "absolute", bottom: "10%", left: "5%", width: 180, height: 180, borderRadius: "50%",
      background: "radial-gradient(circle, rgba(253,164,205,0.35) 0%, transparent 70%)", pointerEvents: "none" }}/>

    {/* Main card */}
    <motion.div initial={{ opacity: 0, y: 30, rotate: -4 }} animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.22,1,0.36,1] }}
      style={{ position: "absolute", left: "4%", top: "10%", width: 240, height: 270, zIndex: 3 }}>
      <motion.div animate={{ y: [0,-7,0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: "100%", height: "100%" }}>
        <div style={{
          width: "100%", height: "100%", borderRadius: 24, overflow: "hidden",
          boxShadow: "0 24px 64px rgba(147,51,234,.22), 0 8px 24px rgba(0,0,0,.10)",
          border: "4px solid rgba(255,255,255,0.95)",
        }}>
          <img src={heroImage} alt="Handmade keyrings"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}/>
        </div>
        <div style={{
          position: "absolute", bottom: -14, right: -14,
          background: "white", borderRadius: 12, padding: "7px 12px",
          boxShadow: "0 6px 20px rgba(147,51,234,.15)",
          fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 700, color: "#9333ea",
          border: "1.5px solid rgba(147,51,234,.12)",
          display: "flex", alignItems: "center", gap: 4, zIndex: 5,
        }}>
          <Heart style={{ width: 12, height: 12, fill: "#ec4899", color: "#ec4899" }}/>
          ₹249 · Keyrings
        </div>
      </motion.div>
    </motion.div>

    <motion.div initial={{ opacity: 0, x: 20, rotate: 8 }} animate={{ opacity: 1, x: 0, rotate: 7 }}
      transition={{ duration: 0.85, delay: 0.35, ease: [0.22,1,0.36,1] }}
      style={{ position: "absolute", right: "6%", top: "6%", width: 160, zIndex: 2 }}>
      <motion.div animate={{ y: [0,5,0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <GradientCard gradient="linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)"
          icon={Sparkles} label="Crochet Posies" sub="From ₹399" rotate={0}/>
      </motion.div>
    </motion.div>

    <motion.div initial={{ opacity: 0, x: 20, rotate: 4 }} animate={{ opacity: 1, x: 0, rotate: 5 }}
      transition={{ duration: 0.85, delay: 0.55, ease: [0.22,1,0.36,1] }}
      style={{ position: "absolute", right: "4%", bottom: "14%", width: 155, zIndex: 2 }}>
      <motion.div animate={{ y: [0,-5,0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
        <GradientCard gradient="linear-gradient(135deg, #fef3c7 0%, #fce7f3 100%)"
          icon={FlowerSvg as React.ElementType} label="Floral Frames" sub="From ₹699" rotate={0}/>
      </motion.div>
    </motion.div>

    {/* Bestseller badge */}
    <motion.div initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.75 }}
      style={{
        position: "absolute", top: "34%", right: "2%", zIndex: 5,
        background: "white", borderRadius: 14, padding: "8px 13px",
        boxShadow: "0 6px 24px rgba(147,51,234,.14)",
        display: "flex", alignItems: "center", gap: 7,
        border: "1.5px solid rgba(147,51,234,.08)",
      }}>
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
        style={{ position: "absolute", zIndex: 4, width: p.size, height: p.size, borderRadius: "50%", background: p.color, ...p }}/>
    ))}
  </div>
);

// ── Marquee ticker ──
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
  const items = [...tickerItems, ...tickerItems]; // duplicate for seamless loop

  return (
    <div style={{
      background: "linear-gradient(135deg, #9333ea 0%, #ec4899 100%)",
      overflow: "hidden",
      padding: "12px 0",
      position: "relative",
    }}>
      {/* Fade edges */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(to right, #9333ea, transparent)",
        pointerEvents: "none",
      }}/>
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 2,
        background: "linear-gradient(to left, #ec4899, transparent)",
        pointerEvents: "none",
      }}/>

      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 0, width: "max-content" }}
      >
        {items.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "0 28px",
            borderRight: "1px solid rgba(255,255,255,0.2)",
            whiteSpace: "nowrap",
          }}>
            <span style={{ fontSize: 15 }}>{item.emoji}</span>
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13, fontWeight: 600,
              color: "rgba(255,255,255,0.95)",
              letterSpacing: "0.04em",
            }}>
              {item.text}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const HeroBanner = () => (
  <>
    <section className="relative overflow-hidden flex items-stretch" style={{ background: "#fff0f7", minHeight: 560 }}>

      {/* LEFT */}
      <div className="relative z-10 flex-1 flex items-center px-8 md:px-14 lg:px-20 py-20">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 75% 85% at 15% 50%, rgba(253,196,253,0.28) 0%, transparent 65%)" }}/>
        <div className="pointer-events-none absolute top-10 right-0 grid grid-cols-4 gap-2 opacity-[0.10]" style={{ marginRight: "2%" }}>
          {[...Array(12)].map((_, i) => (
            <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#9333ea" }}/>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: [0.22,1,0.36,1] }}
          style={{ position: "relative", display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}>

          {/* Chip */}
          <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }} className="chip-label" style={{ width: "fit-content" }}>
            <FlowerSvg size={12} style={{ color: "#7e22ce" }}/>
            Handmade in small batches
          </motion.span>

          {/* H1 */}
          <div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(38px, 4.5vw, 52px)",
              fontWeight: 700, lineHeight: 1.1, color: "#1a0a2e", margin: 0,
            }}>Little things,</h1>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(38px, 4.5vw, 52px)",
              fontWeight: 700, fontStyle: "italic", lineHeight: 1.1, color: "#9333ea", margin: 0,
            }}>made with love.</h1>
          </div>

          <StitchDashes />

          {/* CTAs */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12, paddingTop: 4 }}>
            <Link href="/shop">
              <button className="btn-primary-craft" data-testid="hero-cta-shop">
                Shop the collection <ArrowRight style={{ width: 16, height: 16 }}/>
              </button>
            </Link>
            <Link href="/about">
              <button className="btn-outline-craft" data-testid="hero-cta-story">
                Our story
              </button>
            </Link>
          </div>

          {/* Star rating — minimal, no avatars/text */}
          {/* <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 4 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} style={{ width: 14, height: 14, fill: "#f59e0b", color: "#f59e0b" }}/>
              ))}
            </div>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#9333ea" }}>
              4.9
            </span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#9ca3af" }}>
              · 128 reviews
            </span>
          </motion.div> */}

        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="hidden md:block flex-none relative" style={{ width: "46%", minHeight: 520 }}>
        <HeroGallery/>
      </div>
    </section>

    {/* Marquee ticker BELOW hero */}
    <MarqueeTicker/>
  </>
);

// Export logo separately so Navbar can use it
export { PrachiLogo };