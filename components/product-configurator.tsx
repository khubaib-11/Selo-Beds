"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/useCartStore";
import { toast } from "sonner";

export function ProductConfigurator({ product }: { product: any }) {
  const [selectedSize, setSelectedSize] = useState(product.product_variants[0]);
  const [firmness, setFirmness] = useState<string | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!firmness) {
      toast.error("Please select your preferred firmness");
      return;
    }

    addItem({
      productId: product.id, // <--- ADD THIS LINE
      variantId: selectedSize.id,
      name: product.name,
      price: selectedSize.price,
      image: product.image_url,
      size: `${selectedSize.size} (${firmness})`,
      quantity: 1,
    });

    toast.success("Added to cart");
  };

  //   addItem({
  //     variantId: selectedSize.id,
  //     name: product.name,
  //     price: selectedSize.price,
  //     image: product.image_url,
  //     size: `${selectedSize.size} (${firmness})`, // Store firmness in the name/size string
  //     quantity: 1,
  //     productId: product.id, // <--- ADD THIS LINE
  //   });

  //   toast.success("Added to cart");
  // };

  return (
    <div className="space-y-10">
      {/* Price Display */}
      <p className="text-4xl font-black tracking-tighter">
        ${selectedSize.price}
      </p>

      {/* Size Selection */}
      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Select Size
        </label>
        <div className="flex flex-wrap gap-2">
          {product.product_variants.map((v: any) => (
            <button
              key={v.id}
              onClick={() => setSelectedSize(v)}
              className={`px-6 py-3 rounded-full border-2 text-xs font-bold transition-all ${
                selectedSize.id === v.id
                  ? "border-primary bg-primary text-white"
                  : "border-muted hover:border-foreground"
              }`}
            >
              {v.size}
            </button>
          ))}
        </div>
      </div>

      {/* Firmness Selection - ENFORCED */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Select Firmness
          </label>
          <span className="text-[9px] font-bold text-primary uppercase underline">
            Firmness Guide
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {["Luxury Plush", "Luxury Firm", "Firm"].map((level) => (
            <button
              key={level}
              onClick={() => setFirmness(level)}
              className={`py-4 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest transition-all ${
                firmness === level
                  ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                  : "border-muted"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleAddToCart}
        className="w-full h-16 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20"
      >
        Add to Bag — ${selectedSize.price}
      </Button>
    </div>
  );
}
