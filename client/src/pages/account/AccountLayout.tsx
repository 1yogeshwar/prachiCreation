import React, { useEffect, useState } from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Heart, MapPin, Bell, User, Package, Clock } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Separator } from "@/components/ui/separator";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// ─── Orders Page ─────────────────────────────────────────────────────────────
const OrdersPage = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${API}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
        else setError(data.message || "Failed to load orders");
      })
      .catch(() => setError("Could not connect to server"))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p className="text-muted-foreground">Loading orders...</p>;
  if (error)   return <p className="text-red-500">{error}</p>;
  if (orders.length === 0) return (
    <div className="text-center py-12">
      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <p className="text-muted-foreground">You haven't placed any orders yet.</p>
      <Link href="/shop"><Button className="mt-4">Start Shopping</Button></Link>
    </div>
  );

  const statusColor: Record<string, string> = {
    pending:    "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped:    "bg-purple-100 text-purple-800",
    delivered:  "bg-green-100 text-green-800",
    cancelled:  "bg-red-100 text-red-800",
  };

  const paymentColor: Record<string, string> = {
    paid:                   "bg-green-100 text-green-800",
    pending:                "bg-yellow-100 text-yellow-800",
    awaiting_confirmation:  "bg-orange-100 text-orange-800",
    failed:                 "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif font-bold">My Orders</h2>
      {orders.map(order => (
        <div key={order._id} className="border border-border rounded-xl overflow-hidden">
          {/* Order Header */}
          <div className="bg-muted/40 px-6 py-4 flex flex-wrap gap-4 justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Order ID</p>
              <p className="font-mono font-semibold text-sm">
                #{order._id.slice(-8).toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Placed On</p>
              <p className="text-sm font-medium">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric", month: "short", year: "numeric"
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-sm font-semibold">₹{order.total}</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[order.orderStatus] || "bg-gray-100"}`}>
                {order.orderStatus}
              </span>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${paymentColor[order.paymentStatus] || "bg-gray-100"}`}>
                {order.paymentStatus === "awaiting_confirmation" ? "awaiting payment" : order.paymentStatus}
              </span>
            </div>
          </div>

          {/* Order Items */}
          <div className="px-6 py-4 space-y-4">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-4 items-center">
                {item.image
                  ? <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover bg-muted" />
                  : <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center"><Package className="h-6 w-6 text-muted-foreground" /></div>
                }
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                    {item.selectedColor && ` · ${item.selectedColor}`}
                    {item.selectedSize  && ` · ${item.selectedSize}`}
                  </p>
                </div>
                <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <Separator />

          {/* Order Footer */}
          <div className="px-6 py-3 flex flex-wrap gap-4 justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Payment: <strong className="text-foreground capitalize">
                {order.paymentMethod === "phone_confirm" ? "Phone Confirmation" : order.paymentMethod.toUpperCase()}
              </strong></span>
            </div>
            <div>
              <span>Subtotal: ₹{order.subtotal} · Shipping: {order.shipping === 0 ? "Free" : `₹${order.shipping}`} · Tax: ₹{order.tax}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── Profile Page ─────────────────────────────────────────────────────────────
const ProfilePage = () => {
  const { user, token } = useAuth();
  const [name, setName]   = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg]     = useState("");

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${API}/auth/me`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name, phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMsg("Profile updated successfully!");
    } catch (err: any) {
      setMsg(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-md">
      <h2 className="text-2xl font-serif font-bold">Profile Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1">Full Name</label>
          <input value={name} onChange={e => setName(e.target.value)}
            className="w-full border border-border rounded-lg px-4 py-2 bg-background text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Email</label>
          <input value={user?.email} disabled
            className="w-full border border-border rounded-lg px-4 py-2 bg-muted text-sm text-muted-foreground" />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Phone</label>
          <input value={phone} onChange={e => setPhone(e.target.value)}
            placeholder="+91 9999999999"
            className="w-full border border-border rounded-lg px-4 py-2 bg-background text-sm" />
        </div>
        {msg && <p className="text-sm text-green-600">{msg}</p>}
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};

// ─── Placeholder pages ────────────────────────────────────────────────────────
const WishlistPage     = () => <div><h2 className="text-2xl font-serif mb-4">Wishlist</h2><p className="text-muted-foreground">Your wishlist is empty.</p></div>;
const AddressesPage    = () => <div><h2 className="text-2xl font-serif mb-4">Addresses</h2><p className="text-muted-foreground">No saved addresses.</p></div>;
const NotificationsPage= () => <div><h2 className="text-2xl font-serif mb-4">Notifications</h2><p className="text-muted-foreground">No new notifications.</p></div>;

// ─── Main Layout ──────────────────────────────────────────────────────────────
export const AccountLayout = () => {
  const [location] = useLocation();
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="p-20 text-center">
        <p className="text-muted-foreground mb-4">Please log in to view your account.</p>
        <Link href="/login"><Button>Login</Button></Link>
      </div>
    );
  }

  const tabs = [
    { label: "Orders",        href: "/account/orders",        icon: ShoppingBag },
    { label: "Wishlist",      href: "/account/wishlist",      icon: Heart },
    { label: "Addresses",     href: "/account/addresses",     icon: MapPin },
    { label: "Notifications", href: "/account/notifications", icon: Bell },
    { label: "Profile",       href: "/account/profile",       icon: User },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-serif font-bold">My Account</h1>
        <div className="text-right">
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <div className="flex flex-col gap-2 p-4 bg-card rounded-xl border border-border">
            {tabs.map((tab) => {
              const active = location === tab.href;
              const Icon = tab.icon;
              return (
                <Link key={tab.href} href={tab.href}>
                  <Button variant={active ? "secondary" : "ghost"} className="w-full justify-start gap-3">
                    <Icon className="h-4 w-4" /> {tab.label}
                  </Button>
                </Link>
              );
            })}
            <Separator className="my-2" />
            <Button variant="ghost" className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
              onClick={logout}>
              Logout
            </Button>
          </div>
        </aside>

        <main className="flex-1 bg-card rounded-xl border border-border p-6 sm:p-8">
          <Switch>
            <Route path="/account/orders"        component={OrdersPage} />
            <Route path="/account/wishlist"      component={WishlistPage} />
            <Route path="/account/addresses"     component={AddressesPage} />
            <Route path="/account/notifications" component={NotificationsPage} />
            <Route path="/account/profile"       component={ProfilePage} />
            <Route component={OrdersPage} />
          </Switch>
        </main>
      </div>
    </div>
  );
};