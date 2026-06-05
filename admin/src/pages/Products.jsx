import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API = process.env.REACT_APP_API_URL;
const authHeader = () => ({ Authorization: `Bearer ${localStorage.getItem("admin-token")}` });

const empty = { name: "", slug: "", description: "", price: "", originalPrice: "", category: "", subcategory: "", stock: "", images: "", isFeatured: false, isBestseller: false, isNew: false, isOnSale: false };

export default function Products() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const load = () => axios.get(`${API}/products`).then(r => setProducts(r.data));
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        images: form.images
          .split(",")
          .map((image) => image.trim())
          .filter(Boolean),
      };
      if (editing) {
        await axios.put(`${API}/admin/products/${editing}`, payload, { headers: authHeader() });
        toast.success("Product updated!");
      } else {
        await axios.post(`${API}/admin/products`, payload, { headers: authHeader() });
        toast.success("Product created!");
      }
      setForm(empty); setEditing(null); setShowForm(false); load();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await axios.delete(`${API}/admin/products/${id}`, { headers: authHeader() });
    toast.success("Deleted!"); load();
  };

  const handleEdit = (p) => {
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice || "",
      category: p.category,
      subcategory: p.subcategory || "",
      stock: p.stock,
      images: Array.isArray(p.images) ? p.images.join(", ") : "",
      isFeatured: p.isFeatured,
      isBestseller: p.isBestseller,
      isNew: p.isNew,
      isOnSale: p.isOnSale,
    });
    setEditing(p._id); setShowForm(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
        <h2>Products</h2>
        <button onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }} style={btnStyle}>
          {showForm ? "Cancel" : "+ Add Product"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: "#fff", padding: 24, borderRadius: 12, marginBottom: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[["name","Name"],["slug","Slug"],["price","Price"],["originalPrice","Original Price"],["category","Category"],["subcategory","Subcategory"],["stock","Stock"],["images","Images (comma-separated URLs)"]].map(([key, label]) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}
                style={inputStyle} placeholder={label} required={["name","price","category"].includes(key)} />
            </div>
          ))}
          <div style={{ gridColumn: "span 2" }}>
            <label style={labelStyle}>Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
              style={{ ...inputStyle, height: 80 }} required />
          </div>
          <div style={{ gridColumn: "span 2", display: "flex", gap: 24 }}>
            {["isFeatured","isBestseller","isNew","isOnSale"].map(key => (
              <label key={key} style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                <input type="checkbox" checked={form[key]} onChange={e => setForm({ ...form, [key]: e.target.checked })} />
                {key.replace("is", "Is ")}
              </label>
            ))}
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <button type="submit" style={btnStyle}>{editing ? "Update Product" : "Create Product"}</button>
          </div>
        </form>
      )}

      <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f3f4f6" }}>
            <tr>{["Name","Category","Price","Stock","Actions"].map(h => <th key={h} style={thStyle}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p._id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={tdStyle}>{p.name}</td>
                <td style={tdStyle}>{p.category}</td>
                <td style={tdStyle}>₹{p.price}</td>
                <td style={tdStyle}>{p.stock}</td>
                <td style={tdStyle}>
                  <button onClick={() => handleEdit(p)} style={{ ...smallBtn, background: "#0ea5e9" }}>Edit</button>
                  <button onClick={() => handleDelete(p._id)} style={{ ...smallBtn, background: "#ef4444" }}>Delete</button>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={5} style={{ padding: 24, textAlign: "center", color: "#9ca3af" }}>No products yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd", fontSize: 14, boxSizing: "border-box" };
const labelStyle = { display: "block", marginBottom: 4, fontSize: 13, color: "#374151", fontWeight: 600 };
const btnStyle = { padding: "10px 20px", background: "#7c3aed", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14 };
const smallBtn = { padding: "6px 12px", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, marginRight: 6 };
const thStyle = { padding: "12px 16px", textAlign: "left", fontSize: 13, fontWeight: 600, color: "#374151" };
const tdStyle = { padding: "12px 16px", fontSize: 14, color: "#374151" };