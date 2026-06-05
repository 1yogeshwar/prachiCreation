import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    slug: string;
    image: string;
    count: number;
    description?: string;
  };
  className?: string;
}

export const CategoryCard = ({ category, className }: CategoryCardProps) => (
  <Link href={`/shop/category/${category.slug}`}>
    <motion.div
      className={cn("group relative overflow-hidden cursor-pointer", className)}
      style={{ borderRadius: 16, aspectRatio: "1 / 1" }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03 }}
      data-testid={`card-category-${category.id}`}
    >
      {/* Image */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Light blush overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(255,240,245,0.35)" }} />

      {/* Bottom gradient — 80px tall */}
      <div className="absolute inset-x-0 bottom-0 pointer-events-none"
        style={{ height: 80, background: "linear-gradient(to top, rgba(80,10,60,0.72) 0%, transparent 100%)" }} />

      {/* Text */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 pt-2">
        <h3 className="font-serif font-medium text-white leading-tight"
          style={{ fontSize: 16 }}>
          {category.name}
        </h3>
        {category.description && (
          <p className="mt-0.5 text-white leading-tight"
            style={{ fontSize: 12, opacity: 0.70 }}>
            {category.description}
          </p>
        )}
      </div>

      {/* Hover: top badge */}
      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-250">
        <span className="chip-label text-[9px]">{category.count} pieces</span>
      </div>
    </motion.div>
  </Link>
);
