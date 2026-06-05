import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import categoriesData from "@/data/categories.json";

export const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 150]);

  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-8">
        <div>
          <h3 className="font-medium mb-4 text-lg">Categories</h3>
          <div className="space-y-3">
            {categoriesData.map((category) => (
              <div key={category.id} className="flex items-center space-x-2">
                <Checkbox id={`cat-${category.id}`} />
                <Label htmlFor={`cat-${category.id}`} className="text-sm font-normal cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-medium mb-4 text-lg">Price Range</h3>
          <Slider
            defaultValue={[0, 150]}
            max={200}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mb-4"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="font-medium mb-4 text-lg">Availability</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="in-stock" />
              <Label htmlFor="in-stock" className="text-sm font-normal cursor-pointer">In Stock</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="on-sale" />
              <Label htmlFor="on-sale" className="text-sm font-normal cursor-pointer">On Sale</Label>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};
