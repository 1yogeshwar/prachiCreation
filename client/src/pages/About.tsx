import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Heart, Sparkles, Star } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export const About = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API}/events`)
      .then(r => r.json())
      .then(data => setEvents(Array.isArray(data) ? data.slice(0, 3) : []));
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #fff0f7 0%, #fdf4ff 100%)", padding: "80px 0" }}>
        <div className="container mx-auto px-4 lg:px-12 max-w-4xl text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} className="space-y-6">
            <span className="chip-label">Our Story</span>
            <h1 className="font-serif font-bold" style={{ fontSize: "clamp(36px, 5vw, 56px)", color: "#1a0a2e", lineHeight: 1.1 }}>
              Made by hand,<br />
              <em style={{ color: "#9333ea" }}>sent with love.</em>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "#6b7280", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
              Prachi Creation started as a quiet passion — pressing flowers, looping threads,
              framing memories. What began in a small room in Nagpur has grown into a little
              world of handmade treasures shared across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder */}
      <section style={{ background: "#ffffff", padding: "80px 0" }}>
        <div className="container mx-auto px-4 lg:px-12 max-w-5xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="flex-none">
              <div style={{
                width: 260, height: 300, borderRadius: 24,
                background: "linear-gradient(135deg, #fce7f3, #ede9fe)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 20px 60px rgba(147,51,234,0.15)",
                border: "4px solid rgba(255,255,255,0.8)",
                fontSize: 80,
              }}>
                🌸
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} className="space-y-5">
              <span className="chip-label">Meet the maker</span>
              <h2 className="font-serif font-bold" style={{ fontSize: 32, color: "#1a0a2e" }}>
                Hi, I'm Prachi 👋
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#6b7280", lineHeight: 1.8 }}>
                I've always believed that the smallest things carry the most meaning —
                a pressed flower sealed in resin, a crochet posy made from soft yarn,
                a frame filled with petals picked by hand.
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#6b7280", lineHeight: 1.8 }}>
                Every piece in this shop is made by me, in my studio, with care and intention.
                No factories, no shortcuts — just slow, deliberate craft.
              </p>
              <div style={{ display: "flex", gap: 20, paddingTop: 8 }}>
                {[["200+", "Happy customers"], ["3+", "Years crafting"], ["500+", "Pieces made"]].map(([num, label]) => (
                  <div key={label} className="text-center">
                    <p className="font-serif font-bold" style={{ fontSize: 28, color: "#9333ea" }}>{num}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9ca3af" }}>{label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "#fdf4ff", padding: "80px 0" }}>
        <div className="container mx-auto px-4 lg:px-12 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="text-center mb-12 space-y-3">
            <span className="chip-label">What we believe</span>
            <h2 className="font-serif font-semibold" style={{ fontSize: 28, color: "#1a0a2e" }}>
              The Prachi Creation way
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "🌸", title: "Slow craft", desc: "Every piece takes time. We never rush the process — quality over quantity, always." },
              { icon: "♻️", title: "Mindful making", desc: "We use eco-friendly packaging and source materials thoughtfully and responsibly." },
              { icon: "💜", title: "Made with love", desc: "Each item is touched by human hands — imperfectly perfect, just like handmade should be." },
            ].map(({ icon, title, desc }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{
                  background: "#fff", borderRadius: 20, padding: 32, textAlign: "center",
                  border: "1px solid rgba(147,51,234,0.1)",
                  boxShadow: "0 4px 20px rgba(147,51,234,0.06)",
                }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{icon}</div>
                <h3 className="font-serif font-semibold" style={{ fontSize: 20, color: "#1a0a2e", marginBottom: 8 }}>{title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6b7280", lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events from DB */}
      {events.length > 0 && (
        <section style={{ background: "#ffffff", padding: "80px 0" }}>
          <div className="container mx-auto px-4 lg:px-12 max-w-5xl">
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} className="mb-10 space-y-2">
              <span className="chip-label">From the studio</span>
              <h2 className="font-serif font-semibold" style={{ fontSize: 28, color: "#1a0a2e" }}>
                Events & appearances
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map(ev => (
                <motion.div key={ev._id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  style={{ background: "#fdf4ff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(147,51,234,0.1)" }}>
                  {ev.image && (
                    <img src={ev.image} alt={ev.title}
                      style={{ width: "100%", height: 160, objectFit: "cover" }} />
                  )}
                  <div style={{ padding: 20 }}>
                    <span style={{
                      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                      background: "#ede9fe", color: "#7c3aed", textTransform: "capitalize",
                      display: "inline-block", marginBottom: 8,
                    }}>{ev.tag}</span>
                    <h3 className="font-serif font-semibold" style={{ fontSize: 17, color: "#1a0a2e", marginBottom: 4 }}>{ev.title}</h3>
                    <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>
                      📍 {ev.location} · {new Date(ev.date).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}
                    </p>
                    <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.6 }}>{ev.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)", padding: "80px 0" }}>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} className="space-y-5">
            <h2 className="font-serif font-bold" style={{ fontSize: 32, color: "#1a0a2e" }}>
              Ready to find your piece?
            </h2>
            <Link href="/shop">
              <button className="btn-primary-craft">Shop the collection →</button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};