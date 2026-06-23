import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Sparkles, Upload } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const CATEGORIES = ["Keyrings", "Crochet flowers", "Floral frames", "Hair clips", "Other"];

export const CustomOrderPage = () => {
  const [step, setStep]       = useState(1); // 1=details, 2=customization, 3=success
  const [loading, setLoading] = useState(false);
  const [token, setToken]     = useState("");

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    category: "", productReference: "",
    description: "",
    parameters: { size: "", color: "", name: "", quantity: 1, extraNotes: "" },
    referenceImage: "",
  });

  const set = (field: string, value: any) => setForm(prev => ({ ...prev, [field]: value }));
  const setParam = (field: string, value: any) =>
    setForm(prev => ({ ...prev, parameters: { ...prev.parameters, [field]: value } }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.phone || !form.description) {
      toast.error("Please fill all required fields");
      return;
    }
    setLoading(true);
    try {
      const res  = await fetch(`${API}/custom-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setToken(data.trackingToken);
      setStep(3);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit");
    } finally {
      setLoading(false);
    }
  };

  // Step 3 — Success
  if (step === 3) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          style={{ fontSize: 80, marginBottom: 24 }}>
          🎨
        </motion.div>
        <h2 className="font-serif font-bold" style={{ fontSize: 32, color: "#1a0a2e", marginBottom: 12 }}>
          Request Received!
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#6b7280", maxWidth: 440, lineHeight: 1.7, marginBottom: 24 }}>
          Pragya will review your custom order and get back to you within 24 hours
          via phone or email with a quote and timeline.
        </p>
        <div style={{
          background: "#fdf4ff", borderRadius: 16, padding: 20,
          border: "1px solid rgba(147,51,234,0.15)", marginBottom: 32, width: "100%", maxWidth: 400,
        }}>
          <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 4 }}>Your request token</p>
          <p style={{ fontFamily: "monospace", fontSize: 14, color: "#7c3aed", fontWeight: 700, wordBreak: "break-all" }}>
            {token}
          </p>
          <p style={{ fontSize: 12, color: "#9ca3af", marginTop: 8 }}>
            Save this to follow up on your request
          </p>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/"
            style={{ padding: "12px 24px", background: "#9333ea", color: "#fff", borderRadius: 12,
              textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600 }}>
            Back to Home
          </a>
          <a href="/shop"
            style={{ padding: "12px 24px", border: "1px solid rgba(147,51,234,0.3)", color: "#9333ea",
              borderRadius: 12, textDecoration: "none", fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 600 }}>
            Browse Shop
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 space-y-3">
        <span className="chip-label">
          <Sparkles className="h-3 w-3" /> Made just for you
        </span>
        <h1 className="font-serif font-bold" style={{ fontSize: "clamp(28px, 4vw, 40px)", color: "#1a0a2e" }}>
          Request a Custom Order
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: "#6b7280", lineHeight: 1.7 }}>
          Want something personalised? Tell Pragya exactly what you have in mind —
          size, color, name, anything. She'll make it happen!
        </p>
      </motion.div>

      {/* Step indicator */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 32 }}>
        {["Your details", "Customization"].map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {i > 0 && <div style={{ width: 40, height: 2, background: step > i ? "#9333ea" : "#e5e7eb" }}/>}
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700,
                background: step > i ? "#9333ea" : step === i + 1 ? "#9333ea" : "#e5e7eb",
                color: step >= i + 1 ? "#fff" : "#9ca3af",
              }}>{i + 1}</div>
              <span style={{ fontSize: 13, fontWeight: 500,
                color: step >= i + 1 ? "#9333ea" : "#9ca3af",
                fontFamily: "'Inter', sans-serif" }}>{label}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        background: "#fff", borderRadius: 20, padding: 32,
        border: "1px solid rgba(147,51,234,0.1)",
        boxShadow: "0 4px 24px rgba(147,51,234,0.06)",
      }}>

        {/* Step 1 — Contact details */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <h2 className="font-serif font-semibold" style={{ fontSize: 20, color: "#1a0a2e", marginBottom: 20 }}>
              Your contact details
            </h2>
            {[
              ["name",  "Full Name *",         "text",  "Jane Doe"],
              ["email", "Email Address *",      "email", "jane@example.com"],
              ["phone", "Phone / WhatsApp *",   "tel",   "+91 9999999999"],
            ].map(([key, label, type, placeholder]) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input type={type} placeholder={placeholder}
                  value={(form as any)[key]}
                  onChange={e => set(key, e.target.value)}
                  style={inputStyle} />
              </div>
            ))}
            <button onClick={() => {
              if (!form.name || !form.email || !form.phone) { toast.error("Please fill all fields"); return; }
              setStep(2);
            }} style={btnStyle}>
              Continue →
            </button>
          </motion.div>
        )}

        {/* Step 2 — Customization */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 className="font-serif font-semibold" style={{ fontSize: 20, color: "#1a0a2e" }}>
                Tell us what you want
              </h2>
              <button onClick={() => setStep(1)}
                style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 13 }}>
                ← Back
              </button>
            </div>

            <div>
              <label style={labelStyle}>Product Category</label>
              <select value={form.category} onChange={e => set("category", e.target.value)} style={inputStyle}>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label style={labelStyle}>Based on a product? (optional)</label>
              <input placeholder='e.g. "Wildflower Keyring" or leave blank for new idea'
                value={form.productReference}
                onChange={e => set("productReference", e.target.value)}
                style={inputStyle}/>
            </div>

            <div>
              <label style={labelStyle}>Describe what you want *</label>
              <textarea placeholder="e.g. I want a pressed rose keyring with a silver chain, my name 'Priya' and approx 6cm size..."
                value={form.description}
                onChange={e => set("description", e.target.value)}
                style={{ ...inputStyle, height: 100, resize: "vertical" }} />
            </div>

            {/* Parameters grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                ["size",  "Size / Dimensions",    "e.g. 5cm, small, large"],
                ["color", "Color Preference",      "e.g. pink, pastel, silver"],
                ["name",  "Name / Text to add",    "e.g. Priya, Happy Birthday"],
              ].map(([key, label, placeholder]) => (
                <div key={key}>
                  <label style={labelStyle}>{label}</label>
                  <input placeholder={placeholder}
                    value={(form.parameters as any)[key]}
                    onChange={e => setParam(key, e.target.value)}
                    style={inputStyle}/>
                </div>
              ))}
              <div>
                <label style={labelStyle}>Quantity</label>
                <input type="number" min={1} max={50}
                  value={form.parameters.quantity}
                  onChange={e => setParam("quantity", Number(e.target.value))}
                  style={inputStyle}/>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Reference Image URL (optional)</label>
              <input placeholder="Paste an image link for reference (Pinterest, Instagram etc)"
                value={form.referenceImage}
                onChange={e => set("referenceImage", e.target.value)}
                style={inputStyle}/>
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                💡 You can also share images via WhatsApp after submitting
              </p>
            </div>

            <div>
              <label style={labelStyle}>Any other notes</label>
              <textarea placeholder="Occasion, deadline, budget range, anything else..."
                value={form.parameters.extraNotes}
                onChange={e => setParam("extraNotes", e.target.value)}
                style={{ ...inputStyle, height: 70, resize: "vertical" }}/>
            </div>

            {/* What happens next */}
            <div style={{
              padding: 16, borderRadius: 12,
              background: "linear-gradient(135deg, #fce7f3, #ede9fe)",
              border: "1px solid rgba(147,51,234,0.1)",
            }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#7c3aed", marginBottom: 6 }}>
                📞 What happens next?
              </p>
              <p style={{ fontSize: 12, color: "#6b7280", lineHeight: 1.6 }}>
                Pragya will review your request and contact you within <strong>24 hours</strong> with
                a price quote and estimated timeline. No payment needed now!
              </p>
            </div>

            <button onClick={handleSubmit} disabled={loading} style={{
              ...btnStyle,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}>
              {loading ? "Submitting..." : "Submit Custom Request 💜"}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "10px 14px", borderRadius: 10,
  border: "1px solid rgba(147,51,234,0.2)",
  fontSize: 14, background: "#fafafa", outline: "none",
  boxSizing: "border-box", fontFamily: "'Inter', sans-serif", color: "#374151",
};
const labelStyle: React.CSSProperties = {
  display: "block", marginBottom: 6, fontSize: 13,
  fontWeight: 600, color: "#374151",
};
const btnStyle: React.CSSProperties = {
  width: "100%", padding: "13px 0",
  background: "linear-gradient(135deg, #9333ea, #ec4899)",
  color: "#fff", border: "none", borderRadius: 12,
  fontFamily: "'Inter', sans-serif", fontSize: 15, fontWeight: 600,
  cursor: "pointer", marginTop: 8,
};