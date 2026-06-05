import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const token = () => localStorage.getItem("admin-token");

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`${API}/admin/analytics`, { headers: { Authorization: `Bearer ${token()}` } })
      .then(r => setStats(r.data));
  }, []);

  const cards = [
    { label: "Total Products", value: stats?.totalProducts, color: "#7c3aed" },
    { label: "Total Orders", value: stats?.totalOrders, color: "#0ea5e9" },
    { label: "Total Users", value: stats?.totalUsers, color: "#10b981" },
    { label: "Revenue (paid)", value: `₹${stats?.totalRevenue || 0}`, color: "#f59e0b" },
  ];

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Dashboard</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
        {cards.map(({ label, value, color }) => (
          <div key={label} style={{ background: "#fff", padding: 24, borderRadius: 12, borderTop: `4px solid ${color}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
            <p style={{ color: "#6b7280", marginBottom: 8 }}>{label}</p>
            <h3 style={{ fontSize: 28, color }}>{value ?? "..."}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}