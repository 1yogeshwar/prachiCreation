import React from "react";
import { Link } from "wouter";
import { Instagram, Facebook, Mail } from "lucide-react";

const FlowerSvg = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#9333ea">
    <circle cx="12" cy="12" r="2.8" />
    {[0,60,120,180,240,300].map((deg, i) => (
      <ellipse key={i}
        cx={12 + 5.2 * Math.cos((deg * Math.PI) / 180)}
        cy={12 + 5.2 * Math.sin((deg * Math.PI) / 180)}
        rx="2" ry="3.2"
        transform={`rotate(${deg} ${12 + 5.2 * Math.cos((deg * Math.PI) / 180)} ${12 + 5.2 * Math.sin((deg * Math.PI) / 180)})`}
        opacity="0.7"
      />
    ))}
  </svg>
);

const shopLinks = [
  ["All products",   "/shop"],
  ["Keyrings",       "/shop/category/keyring"],
  ["Jewellery",      "/shop/category/jewellery"],
  ["Crochet",        "/shop/category/crochet"],
  ["Frames",         "/shop/category/frames"],
];
const helpLinks = [
  ["Our story",  "/about"],
  ["Contact",    "/contact"],
  ["Shipping",   "/shipping"],
  ["Care guide", "/faq"],
  ["Returns",    "/returns"],
];

export const Footer = () => (
  <footer style={{ background: "linear-gradient(160deg, #fce7f3 0%, #f3e8ff 50%, #fdf4ff 100%)" }}>
    <div className="container mx-auto px-4 lg:px-12 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        {/* ── Col 1: Brand tagline ── */}
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <FlowerSvg size={20} />
            <span className="font-serif font-bold" style={{ fontSize: 20, color: "#1a0a2e" }}>Pragya</span>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", color: "#9333ea", textTransform: "uppercase", marginLeft: 2 }}>
              Creation
            </span>
          </Link>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.7, color: "#6b7280", maxWidth: 240 }}>
            Handmade with patience and pastel hearts. Each piece is made-to-order from our home studio in India.
          </p>
          <div className="flex items-center gap-2">
            {[Instagram, Facebook, Mail].map((Icon, i) => (
              <button key={i}
                className="h-8 w-8 rounded-full flex items-center justify-center bg-white/70 border border-white/50 transition-all hover:bg-white"
                style={{ color: "#9333ea" }}>
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Col 2: Quick links ── */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#9333ea", marginBottom: 16 }}>
              Shop
            </h4>
            <ul className="space-y-2.5">
              {shopLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#374151" }}
                    className="hover:text-purple-600 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#9333ea", marginBottom: 16 }}>
              Help
            </h4>
            <ul className="space-y-2.5">
              {helpLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href}
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "#374151" }}
                    className="hover:text-purple-600 transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Col 3: Newsletter ── */}
        <div>
          <h4 style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.10em", textTransform: "uppercase", color: "#9333ea", marginBottom: 16 }}>
            Stay in touch
          </h4>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: "#6b7280", marginBottom: 14 }}>
            New drops and gentle studio notes — straight to your inbox.
          </p>
          <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="your@email.com" required
              className="flex-1 min-w-0 h-10 rounded-full border border-purple-200 bg-white/80 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300"
              style={{ fontFamily: "'Inter', sans-serif" }}
              data-testid="footer-newsletter-input" />
            <button type="submit" className="btn-primary-craft h-10 px-4 py-0 text-xs"
              data-testid="footer-newsletter-submit">
              Join
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-7 border-t border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9ca3af" }}>
          © {new Date().getFullYear()} Pragya Creation. All rights reserved.
        </p>
        <div className="flex gap-5">
          {[["Privacy", "/privacy"], ["Terms", "/terms"]].map(([l, h]) => (
            <Link key={l} href={h}
              style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: "#9ca3af" }}
              className="hover:text-purple-600 transition-colors">{l}</Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
