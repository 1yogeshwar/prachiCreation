import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: any[];
  columns?: 2 | 3 | 4;
}

export const ProductGrid = ({ products, columns = 4 }: ProductGridProps) => {
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-x-6 gap-y-10 ${gridClasses[columns]}`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8, columns = 4 }: { count?: number; columns?: 2 | 3 | 4 }) => {
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`grid gap-x-6 gap-y-10 ${gridClasses[columns]}`}>
      {[...Array(count)].map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <div className="aspect-[4/5] rounded-xl bg-muted animate-pulse" />
          <div className="flex flex-col gap-2">
            <div className="h-3 w-1/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            <div className="h-4 w-1/3 bg-muted animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
