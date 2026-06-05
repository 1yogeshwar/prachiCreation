import React from "react";
import { Link, Route, Switch, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, Folders, ShoppingCart, Tag, Database } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export const AdminLayout = () => {
  const [location] = useLocation();
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <div className="p-20 text-center">Unauthorized access.</div>;
  }

  const tabs = [
    { label: "Overview", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Categories", href: "/admin/categories", icon: Folders },
    { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { label: "Coupons", href: "/admin/coupons", icon: Tag },
    { label: "Inventory", href: "/admin/inventory", icon: Database },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-50">
      <aside className="w-64 border-r border-zinc-800 p-4">
        <h2 className="text-2xl font-serif font-bold mb-8 text-primary">Craftly Admin</h2>
        <nav className="flex flex-col gap-2">
          {tabs.map((tab) => {
            const active = location === tab.href;
            const Icon = tab.icon;
            return (
              <Link key={tab.href} href={tab.href}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${active ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-900'}`}
                >
                  <Icon className="h-4 w-4" /> {tab.label}
                </Button>
              </Link>
            );
          })}
        </nav>
      </aside>
      
      <main className="flex-1 p-8 overflow-auto">
        <Switch>
          <Route path="/admin" component={() => <div><h2 className="text-3xl font-serif mb-4">Dashboard Overview</h2><p className="text-zinc-400">Analytics and metrics will appear here.</p></div>} />
          <Route path="/admin/products" component={() => <div><h2 className="text-3xl font-serif mb-4">Manage Products</h2><p className="text-zinc-400">Product list table coming soon.</p></div>} />
          <Route path="/admin/categories" component={() => <div><h2 className="text-3xl font-serif mb-4">Categories</h2><p className="text-zinc-400">Category management.</p></div>} />
          <Route path="/admin/orders" component={() => <div><h2 className="text-3xl font-serif mb-4">Orders</h2><p className="text-zinc-400">Recent orders and fulfillment status.</p></div>} />
          <Route path="/admin/coupons" component={() => <div><h2 className="text-3xl font-serif mb-4">Coupons</h2><p className="text-zinc-400">Manage discount codes.</p></div>} />
          <Route path="/admin/inventory" component={() => <div><h2 className="text-3xl font-serif mb-4">Inventory</h2><p className="text-zinc-400">Stock levels and alerts.</p></div>} />
        </Switch>
      </main>
    </div>
  );
};
