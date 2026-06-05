import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;
const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("admin-token")}` });

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${API}/admin/users`, { headers: authHeader() }).then(r => setUsers(r.data));
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 24 }}>Users</h2>
      <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f3f4f6" }}>
            <tr>{["Name","Email","Phone","Joined"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={tdStyle}>{u.name}</td>
                <td style={tdStyle}>{u.email}</td>
                <td style={tdStyle}>{u.phone || "—"}</td>
                <td style={tdStyle}>{new Date(u.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {users.length === 0 && <tr><td colSpan={4} style={{ padding: 24, textAlign: "center", color: "#9ca3af" }}>No users yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const thStyle = { padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 600 };
const tdStyle = { padding: "12px 16px", fontSize: 14, color: "#374151" };