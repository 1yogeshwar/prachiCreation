import React, { useEffect, useState } from "react";
import { Link } from "wouter";
import { HeroBanner } from "@/components/home/HeroBanner";
import { FounderSection } from "@/components/home/FounderSection";
import { CategoryCard } from "@/components/common/CategoryCard";
import { ProductCarousel } from "@/components/common/ProductCarousel";
import { ProductGrid } from "@/components/common/ProductGrid";
import categoriesData from "@/data/categories.json";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const SectionChip = ({ children }: { children: React.ReactNode }) => (
  <span className="chip-label">{children}</span>
);

const StarFill = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="#f59e0b">
    <path d="M8 1l1.8 5.6H16l-4.9 3.6 1.8 5.6L8 11.2l-4.9 3.6L4.9 9.2 0 5.6h6.2z" />
  </svg>
);

const WaveDown = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 1440 36" preserveAspectRatio="none" className="w-full h-7 block -mb-px" fill={fill}>
    <path d="M0,18 C360,36 720,0 1080,18 C1260,27 1380,22 1440,18 L1440,36 L0,36 Z" />
  </svg>
);
const WaveUp = ({ fill }: { fill: string }) => (
  <svg viewBox="0 0 1440 36" preserveAspectRatio="none" className="w-full h-7 block -mt-px" fill={fill}>
    <path d="M0,18 C360,0 720,36 1080,18 C1260,9 1380,14 1440,18 L1440,0 L0,0 Z" />
  </svg>
);

const testimonials = [
  { id: 1, quote: "The pressed-flower keyring is the most beautiful thing I own. Like holding a little piece of a garden.", name: "Aanya Sharma", detail: "Wildflower Keyring", avatar: "https://i.pravatar.cc/80?img=21" },
  { id: 2, quote: "Gifted the lavender frame to my mum — she cried. The craftsmanship is extraordinary.", name: "Riya Mehta", detail: "Lavender Memory Frame", avatar: "https://i.pravatar.cc/80?img=25" },
  { id: 3, quote: "My crochet gajra arrived so beautifully packaged. It makes me smile every single day.", name: "Priya Nair", detail: "Crochet Gajra", avatar: "https://i.pravatar.cc/80?img=32" },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const fadeUp  = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/products`);
        const data = await res.json();
        const normalized = data.map((p: any) => ({
          ...p,
          id: p._id,
          images: p.images || [],
        }));
        setProducts(normalized);
      } catch (err) {
        console.error("Error loading home products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const featured    = products.filter(p => p.isFeatured).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestseller);
  const newArrivals = products.filter(p => p.isNew);
  const aiPicks     = products.slice(4, 8);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* HERO */}
      <HeroBanner />

      {/* ── CATEGORIES — bg #ffffff ── */}
      <section style={{ background: "#ffffff", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container mx-auto px-4 lg:px-12">
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="flex items-end justify-between mb-10">
            <div className="space-y-2.5">
              <SectionChip>Categories</SectionChip>
              <h2 className="font-serif font-semibold text-foreground tracking-tight" style={{ fontSize: 28 }}>
                Browse by craft
              </h2>
            </div>
            <Link href="/shop">
              <button className="hidden sm:flex items-center gap-1.5 font-medium transition-colors group"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6b7280" }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#9333ea")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "#6b7280")}>
                See all <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </Link>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categoriesData.slice(0,4).map(cat => (
              <motion.div key={cat.id} variants={fadeUp}><CategoryCard category={cat} /></motion.div>
            ))}
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
            {categoriesData.slice(4,9).map(cat => (
              <motion.div key={cat.id} variants={fadeUp}><CategoryCard category={cat} /></motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS — bg #fdf4ff ── */}
      <WaveDown fill="#fdf4ff" />
      <section style={{ background: "#fdf4ff", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container mx-auto px-4 lg:px-12">
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="mb-10 space-y-2.5">
            <SectionChip>Hand-picked</SectionChip>
            <h2 className="font-serif font-semibold text-foreground tracking-tight" style={{ fontSize: 28 }}>
              Featured pieces
            </h2>
          </motion.div>
          <ProductGrid products={featured} />
        </div>
      </section>
      <WaveUp fill="#fdf4ff" />

      {/* ── FOUNDER EVENTS SECTION (replaces trust bar) ── */}
      <WaveDown fill="#fdf4ff" />
      <FounderSection />
      <WaveUp fill="#fdf4ff" />

      {/* ── BEST SELLERS — bg #ffffff ── */}
      <section style={{ background: "#ffffff", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container mx-auto px-4 lg:px-12">
          <ProductCarousel title="Best Sellers" products={bestSellers} />
        </div>
      </section>

      {/* ── AI PICKS — bg #fff8f0 ── */}
      <WaveDown fill="#fff8f0" />
      <section style={{ background: "#fff8f0", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container mx-auto px-4 lg:px-12">
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="flex items-center gap-3 mb-10">
            <div className="h-8 w-8 rounded-full flex items-center justify-center"
              style={{ background: "#f3e8ff" }}>
              <Sparkles className="h-4 w-4" style={{ color: "#9333ea" }} />
            </div>
            <div>
              <SectionChip>Curated for you</SectionChip>
              <h2 className="font-serif font-semibold text-foreground tracking-tight mt-1.5" style={{ fontSize: 28 }}>
                You might also love
              </h2>
            </div>
          </motion.div>
          <ProductGrid products={aiPicks} />
        </div>
      </section>
      <WaveUp fill="#fff8f0" />

      {/* ── NEW ARRIVALS ── */}
      <section style={{ background: "#ffffff", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container mx-auto px-4 lg:px-12">
          <ProductCarousel title="New Arrivals" products={newArrivals} />
        </div>
      </section>

      {/* ── FOUNDER QUOTE ── */}
      <section style={{ background: "#ffffff", paddingBottom: 80 }}>
        <div className="container mx-auto px-4 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity:0, scale:0.97 }} whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }} transition={{ duration: 0.6 }}
            className="rounded-3xl px-10 py-14 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 50%, #fdf4ff 100%)" }}
          >
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full opacity-25 pointer-events-none"
              style={{ background: "radial-gradient(circle, #c084fc, transparent)" }} />
            <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-20 pointer-events-none"
              style={{ background: "radial-gradient(circle, #f9a8d4, transparent)" }} />
            <blockquote className="font-serif relative z-10"
              style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 500, color: "#1a0a2e", lineHeight: 1.4 }}>
              "Every piece carries the quiet hours it took to make it —{" "}
              <em className="italic" style={{ color: "#9333ea" }}>slow, soft, intentional</em>."
            </blockquote>
            <p className="mt-6 relative z-10"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#9ca3af" }}>
              — Prachi, Founder
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS — bg #fdf4ff ── */}
      <WaveDown fill="#fdf4ff" />
      <section style={{ background: "#fdf4ff", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container mx-auto px-4 lg:px-12">
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="text-center mb-12 space-y-3">
            <SectionChip>Community love</SectionChip>
            <h2 className="font-serif font-semibold text-foreground tracking-tight" style={{ fontSize: 28 }}>
              From our customers
            </h2>
          </motion.div>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once:true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <motion.div key={t.id} variants={fadeUp}
                className="bg-white rounded-2xl p-7 border border-border/40"
                style={{ boxShadow: "0 2px 12px rgba(147,51,234,.06)" }}>
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(5)].map((_,i) => <StarFill key={i} />)}
                </div>
                <p className="font-serif italic leading-relaxed mb-6"
                  style={{ fontSize: 17, color: "#374151" }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name}
                    className="h-10 w-10 rounded-full object-cover border-2 border-purple-100" />
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#1a0a2e" }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: "#9ca3af" }}>{t.detail}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      <WaveUp fill="#fdf4ff" />

      {/* ── NEWSLETTER ── */}
      <section style={{ background: "#fff0f7", paddingTop: 80, paddingBottom: 80 }}>
        <div className="container mx-auto px-4 lg:px-12 max-w-xl text-center">
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            className="space-y-5">
            <SectionChip>Newsletter</SectionChip>
            <h2 className="font-serif font-semibold text-foreground tracking-tight" style={{ fontSize: 28 }}>
              Little notes from the studio
            </h2>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, lineHeight: 1.7, color: "#6b7280" }}>
              New drops, behind-the-scenes moments and exclusive early access.
            </p>
            <form className="flex gap-2 max-w-sm mx-auto" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="your@email.com" required
                className="flex-1 h-11 rounded-full border border-border bg-white px-5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
                data-testid="newsletter-email" />
              <button type="submit" className="btn-primary-craft h-11 px-6 py-0 text-sm"
                data-testid="newsletter-submit">
                Join
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
