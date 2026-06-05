import React from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Craft Fair, Pune",
    date: "March 2025",
    location: "Koregaon Park, Pune",
    caption: "Our biggest stall yet! Met so many wonderful crafters and customers. The floral resin pieces flew off the table ✨",
    image: "https://picsum.photos/seed/event1craft/600/480",
    tag: "Exhibition",
    tagColor: "#9333ea",
  },
  {
    id: 2,
    title: "College Art Festival",
    date: "February 2025",
    location: "Mumbai University",
    caption: "Took Prachi Creation to a college fest for the first time. The students absolutely loved the crochet keyrings! 🌸",
    image: "https://picsum.photos/seed/event2fest/600/480",
    tag: "Pop-up",
    tagColor: "#ec4899",
  },
  {
    id: 3,
    title: "Handmade Market Nagpur",
    date: "January 2025",
    location: "Ambazari Garden, Nagpur",
    caption: "Winter market vibes — warm chai, fairy lights and so many beautiful handmade pieces from across Maharashtra 💜",
    image: "https://picsum.photos/seed/event3market/600/480",
    tag: "Market",
    tagColor: "#f59e0b",
  },
];

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const fadeUp  = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export const FounderSection = () => (
  <section style={{ background: "#fdf4ff", paddingTop: 80, paddingBottom: 80 }}>
    <div className="container mx-auto px-4 lg:px-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-end justify-between mb-10"
      >
        <div className="space-y-2.5">
          <span className="chip-label">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="#7e22ce">
              <circle cx="12" cy="12" r="2.8"/>
              {[0,60,120,180,240,300].map((d,i)=>(
                <ellipse key={i}
                  cx={12+5.2*Math.cos(d*Math.PI/180)} cy={12+5.2*Math.sin(d*Math.PI/180)}
                  rx="2" ry="3.2"
                  transform={`rotate(${d} ${12+5.2*Math.cos(d*Math.PI/180)} ${12+5.2*Math.sin(d*Math.PI/180)})`}
                  opacity="0.72"/>
              ))}
            </svg>
            From the Studio
          </span>
          <h2 className="font-serif font-semibold text-foreground tracking-tight" style={{ fontSize: 28 }}>
            Prachi's Featured Moments
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#6b7280", maxWidth: 480 }}>
            Events, exhibitions and pop-ups — places where our little handmade world meets yours.
          </p>
        </div>

        {/* Founder avatar */}
        <div className="hidden md:flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/56?img=47"
            alt="Prachi"
            style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover",
              border: "3px solid white", boxShadow: "0 4px 16px rgba(147,51,234,.15)" }}
          />
          <div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: "#1a0a2e" }}>
              Prachi
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#9ca3af" }}>
              Founder & maker
            </p>
          </div>
        </div>
      </motion.div>

      {/* Event cards */}
      <motion.div
        variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-5"
      >
        {events.map((ev) => (
          <motion.div key={ev.id} variants={fadeUp}
            className="group bg-white rounded-2xl overflow-hidden border border-border/30"
            style={{ boxShadow: "0 2px 16px rgba(147,51,234,.06)", transition: "transform 0.25s, box-shadow 0.25s" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(147,51,234,.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(147,51,234,.06)"; }}
          >
            {/* Image */}
            <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
              <img src={ev.image} alt={ev.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={{ display: "block" }} />
              {/* Tag badge */}
              <span style={{
                position: "absolute", top: 12, left: 12,
                background: ev.tagColor, color: "white",
                fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700,
                padding: "4px 10px", borderRadius: 999, letterSpacing: "0.06em",
              }}>
                {ev.tag}
              </span>
            </div>

            {/* Content */}
            <div style={{ padding: "18px 20px 20px" }}>
              <div style={{ display: "flex", gap: 14, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Calendar style={{ width: 12, height: 12, color: "#9333ea" }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#9ca3af" }}>{ev.date}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <MapPin style={{ width: 12, height: 12, color: "#9333ea" }} />
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "#9ca3af" }}>{ev.location}</span>
                </div>
              </div>

              <h3 className="font-serif" style={{ fontSize: 17, fontWeight: 600, color: "#1a0a2e", marginBottom: 8, lineHeight: 1.3 }}>
                {ev.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.65, color: "#6b7280" }}>
                {ev.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        style={{ textAlign: "center", marginTop: 40 }}
      >
        <Link href="/about">
          <button
            className="btn-outline-craft"
            style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
          >
            See all events <ArrowRight style={{ width: 16, height: 16 }} />
          </button>
        </Link>
      </motion.div>
    </div>
  </section>
);
