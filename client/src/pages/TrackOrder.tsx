import React, { useState } from "react";
import { useParams, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, Package, Truck, Check, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const statusSteps = ["pending", "processing", "shipped", "delivered"];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending:    { label: "Order Placed",   color: "text-yellow-600 bg-yellow-50 border-yellow-200", icon: Clock   },
  processing: { label: "Processing",     color: "text-blue-600 bg-blue-50 border-blue-200",       icon: Package },
  shipped:    { label: "Shipped",        color: "text-purple-600 bg-purple-50 border-purple-200", icon: Truck   },
  delivered:  { label: "Delivered",      color: "text-green-600 bg-green-50 border-green-200",    icon: Check   },
  cancelled:  { label: "Cancelled",      color: "text-red-600 bg-red-50 border-red-200",          icon: X       },
};

const paymentConfig: Record<string, string> = {
  paid:                  "✅ Paid",
  pending:               "⏳ Pending",
  awaiting_confirmation: "📞 Awaiting Confirmation",
  failed:                "❌ Failed",
};

export const TrackOrder = () => {
  const params = useParams<{ token?: string }>();
  const [, setLocation] = useLocation();
  const [token, setToken]     = useState(params.token || "");
  const [order, setOrder]     = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [searched, setSearched] = useState(false);

  // Auto-fetch if token in URL
  React.useEffect(() => {
    if (params.token) handleTrack(params.token);
  }, [params.token]);

  const handleTrack = async (tkn?: string) => {
    const trackToken = tkn || token.trim();
    if (!trackToken) return;
    setLoading(true);
    setError("");
    setOrder(null);
    setSearched(true);
    try {
      const res  = await fetch(`${API}/orders/track/${trackToken}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Order not found");
      setOrder(data);
    } catch (err: any) {
      setError(err.message || "Could not find order");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? statusSteps.indexOf(order.orderStatus) : -1;

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-serif font-bold mb-3">Track Your Order</h1>
        <p className="text-muted-foreground">
          Enter your tracking token to see the latest status of your order.
        </p>
      </div>

      {/* Search Box */}
      <div className="flex gap-3 mb-10">
        <Input
          placeholder="Enter your tracking token..."
          value={token}
          onChange={e => setToken(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleTrack()}
          className="flex-1 h-12"
        />
        <Button size="lg" onClick={() => handleTrack()} disabled={loading} className="px-6">
          {loading ? "Searching..." : <><Search className="h-4 w-4 mr-2" /> Track</>}
        </Button>
      </div>

      {/* Error */}
      {error && searched && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center mb-6">
          {error} — please check your token and try again.
        </motion.div>
      )}

      {/* Order Result */}
      {order && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="border border-border rounded-2xl overflow-hidden">

          {/* Header */}
          <div className="bg-muted/40 px-6 py-5">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Order ID</p>
                <p className="font-mono font-bold">#{order.orderId?.slice(-8).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Placed On</p>
                <p className="font-medium text-sm">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric", month: "short", year: "numeric"
                  })}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Total</p>
                <p className="font-bold">₹{order.total}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Payment</p>
                <p className="text-sm font-medium">
                  {paymentConfig[order.paymentStatus] || order.paymentStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          {order.orderStatus !== "cancelled" && (
            <div className="px-6 py-6">
              <div className="flex items-center justify-between relative">
                {/* Progress line */}
                <div className="absolute left-0 right-0 top-5 h-[2px] bg-border mx-8" />
                <div
                  className="absolute left-8 top-5 h-[2px] bg-primary transition-all duration-500"
                  style={{ width: currentStep >= 0 ? `${(currentStep / (statusSteps.length - 1)) * 100}%` : "0%" }}
                />

                {statusSteps.map((s, idx) => {
                  const cfg  = statusConfig[s];
                  const Icon = cfg.icon;
                  const done = idx <= currentStep;
                  return (
                    <div key={s} className="flex flex-col items-center gap-2 z-10">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all
                        ${done ? "bg-primary border-primary text-primary-foreground" : "bg-background border-border text-muted-foreground"}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className={`text-xs font-medium text-center ${done ? "text-primary" : "text-muted-foreground"}`}>
                        {cfg.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Cancelled state */}
          {order.orderStatus === "cancelled" && (
            <div className="px-6 py-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
                ❌ This order has been cancelled.
              </div>
            </div>
          )}

          <Separator />

          {/* Items */}
          <div className="px-6 py-5 space-y-4">
            <h3 className="font-semibold text-sm">Items Ordered</h3>
            {order.items?.map((item: any, idx: number) => (
              <div key={idx} className="flex gap-4 items-center">
                {item.image
                  ? <img src={item.image} alt={item.name} className="h-14 w-14 rounded-lg object-cover bg-muted" />
                  : <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center">
                      <Package className="h-5 w-5 text-muted-foreground" />
                    </div>
                }
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-sm">₹{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <Separator />

          {/* Payment method note */}
          <div className="px-6 py-4 bg-muted/20">
            {order.paymentMethod === "cod" && (
              <p className="text-sm text-amber-700">💵 Cash on Delivery — please keep ₹{order.total} ready at delivery.</p>
            )}
            {order.paymentMethod === "phone_confirm" && (
              <p className="text-sm text-blue-700">📞 Phone Confirmation — our team will contact you to arrange payment.</p>
            )}
            {order.paymentMethod === "online" && order.paymentStatus === "paid" && (
              <p className="text-sm text-green-700">✅ Payment confirmed via online payment.</p>
            )}
          </div>
        </motion.div>
      )}

      {/* Back to home */}
      <div className="text-center mt-8">
        <Button variant="ghost" onClick={() => setLocation("/")}>← Back to Home</Button>
      </div>
    </div>
  );
};