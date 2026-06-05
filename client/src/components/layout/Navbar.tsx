import React from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, Heart, Menu, User as UserIcon, Moon, Sun } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/layout/SearchBar";
import { PrachiLogo } from "@/components/home/HeroBanner";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const FlowerSvg = ({ size = 16 }: { size?: number }) => (
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

export const Navbar = () => {
  const { totalItems } = useCart();
  const { productIds } = useWishlist();
  const { user, isLoggedIn, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const h = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const BadgeDot = ({ count }: { count: number }) => count > 0 ? (
    <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center text-[9px] font-bold text-white rounded-full"
      style={{ background: "#9333ea" }}>
      {count}
    </span>
  ) : null;

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        background: scrolled ? "rgba(255,240,247,0.90)" : "rgba(255,240,247,0.70)",
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? "rgba(147,51,234,0.12)" : "transparent"}`,
        boxShadow: scrolled ? "0 1px 16px rgba(147,51,234,.06)" : "none",
      }}
    >
      <div className="container mx-auto px-4 lg:px-8 h-[58px] flex items-center justify-between">
        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="nav-mobile-menu">
                <Menu className="h-5 w-5" style={{ color: "#374151" }} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <div className="flex flex-col gap-8 py-8">
                <Link href="/" className="flex items-center gap-2">
                  <FlowerSvg size={18} />
                  <span className="font-serif font-bold text-xl" style={{ color: "#1a0a2e" }}>Prachi</span>
                  <span style={{ fontFamily: "'Inter'", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", color: "#9333ea", textTransform: "uppercase", marginLeft: 2 }}>Creation</span>
                </Link>
                <nav className="flex flex-col">
                  {navLinks.map(l => (
                    <Link key={l.label} href={l.href}
                      className="py-3 border-b border-border/40 last:border-0 transition-colors"
                      style={{ fontFamily: "'Inter'", fontSize: 14, fontWeight: 500, color: "#374151" }}>
                      {l.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        {/* <Link href="/" className="flex items-center gap-2" data-testid="nav-logo">
          <FlowerSvg size={18} />
          <span className="font-serif font-bold" style={{ fontSize: 21, color: "#1a0a2e" }}>Prachi</span>
          <span style={{ fontFamily: "'Inter'", fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", color: "#9333ea", textTransform: "uppercase", marginLeft: 2, paddingBottom: 2 }}>
            Creation
          </span>
        </Link> */}
        <Link href="/" data-testid="nav-logo">
  <PrachiLogo size={1.20} />
</Link>



        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map(l => (
            <Link key={l.label} href={l.href}
              style={{ fontFamily: "'Inter'", fontSize: 14, fontWeight: 500, color: location === l.href ? "#9333ea" : "#374151" }}
              className="transition-colors hover:text-purple-600">
              {l.label}
            </Link>
          ))}
        </nav>



        {/* Actions */}
        <div className="flex items-center gap-0.5">
<Button variant="ghost" size="icon" className="h-9 w-9"
  onClick={() => setSearchOpen(!searchOpen)} data-testid="nav-search">
  <Search className="h-[17px] w-[17px]" style={{ color: searchOpen ? "#9333ea" : "#374151" }} />
</Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 hidden sm:flex"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            data-testid="nav-theme-toggle">
            {theme === "light"
              ? <Moon className="h-[17px] w-[17px]" style={{ color: "#374151" }} />
              : <Sun className="h-[17px] w-[17px]" style={{ color: "#374151" }} />}
          </Button>

          <Link href="/account/wishlist" className="relative hidden sm:flex" data-testid="nav-wishlist">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Heart className="h-[17px] w-[17px]" style={{ color: "#374151" }} />
              <BadgeDot count={productIds.length} />
            </Button>
          </Link>

          <Link href="/cart" className="relative" data-testid="nav-cart">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ShoppingBag className="h-[17px] w-[17px]" style={{ color: "#374151" }} />
              <BadgeDot count={totalItems} />
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9" data-testid="nav-user-menu">
                {user?.avatar
                  ? <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full object-cover" />
                  : <UserIcon className="h-[17px] w-[17px]" style={{ color: "#374151" }} />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-52">
              {isLoggedIn ? (
                <>
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user?.role === "admin" && <DropdownMenuItem onClick={() => setLocation("/admin")}>Admin Dashboard</DropdownMenuItem>}
                  <DropdownMenuItem onClick={() => setLocation("/account/orders")}>My Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/account/profile")}>Profile Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => setLocation("/login")}>Log in</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLocation("/register")}>Create an account</DropdownMenuItem>
                   <DropdownMenuItem onClick={() => setLocation("/track")}>Track My Order</DropdownMenuItem>

                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
};
