import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();
  const logout = () => { localStorage.clear(); navigate("/login"); };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 220, background: "#1e1e2e", color: "#fff", padding: 20 }}>
        <h2 style={{ marginBottom: 32, fontSize: 20 }}>⚒ CraftWorld</h2>
        {[
          { to: "/", label: "📊 Dashboard" },
          { to: "/products", label: "📦 Products" },
          { to: "/orders", label: "🧾 Orders" },
          { to: "/users", label: "👥 Users" },
        ].map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === "/"}
            style={({ isActive }) => ({
              display: "block", padding: "10px 12px", marginBottom: 8,
              borderRadius: 8, textDecoration: "none",
              background: isActive ? "#7c3aed" : "transparent",
              color: "#fff", fontSize: 15,
            })}>
            {label}
          </NavLink>
        ))}
        <button onClick={logout} style={{
          marginTop: 40, width: "100%", padding: 10,
          background: "#ef4444", color: "#fff", border: "none",
          borderRadius: 8, cursor: "pointer"
        }}>Logout</button>
      </aside>
      <main style={{ flex: 1, padding: 32, background: "#f9fafb" }}>
        <Outlet />
      </main>
    </div>
  );
}