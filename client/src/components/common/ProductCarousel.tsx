import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "./ProductCard";

interface ProductCarouselProps {
  products: any[];
  title?: string;
}

export const ProductCarousel = ({ products, title }: ProductCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    dragFree: true,
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative">
      {title && (
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-serif font-bold text-foreground tracking-tight">{title}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full" onClick={scrollPrev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full" onClick={scrollNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}

      <div className="overflow-hidden -mx-4 px-4 pb-8" ref={emblaRef}>
        <div className="flex gap-6">
          {products.map((product) => (
            <div key={product.id} className="flex-[0_0_85%] sm:flex-[0_0_45%] md:flex-[0_0_30%] lg:flex-[0_0_22%]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
