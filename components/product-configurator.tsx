"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCartStore } from "@/lib/store/useCartStore";
import { LucideIcon, Moon, Sun, Wind } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Tables } from "@/database.types";

type Variant = Pick<
  Tables<"product_variants">,
  "id" | "size" | "price" | "stock_quantity"
>;

type Product = Pick<
  Tables<"products">,
  "id" | "name" | "description" | "image_url"
> & {
  product_variants: Variant[];
};

export function ProductConfigurator({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(product.product_variants[0]);
  const [firmness, setFirmness] = useState<string | null>(null);
  const [isAddedPopupOpen, setIsAddedPopupOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    if (!firmness) {
      toast.error("Please select your preferred firmness", {
        description:
          "Your support level is required for a perfect night's sleep.",
      });
      return;
    }

    addItem({
      productId: product.id,
      variantId: selectedSize.id,
      name: product.name,
      price: selectedSize.price,
      image: product.image_url || "../app/assets/public/sleepQuiz.png",
      size: `${selectedSize.size} (${firmness})`,
      quantity: 1,
    });

    setIsAddedPopupOpen(true);
  };

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
          {product.product_variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setSelectedSize(v)}
              className={`px-6 py-3 rounded-full border-2 text-xs font-bold transition-all ${
                selectedSize.id === v.id
                  ? "border-primary bg-primary text-white shadow-lg shadow-primary/20"
                  : "border-muted hover:border-foreground"
              }`}
            >
              {v.size}
            </button>
          ))}
        </div>
      </div>

      {/* Firmness Selection */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            Select Firmness
          </label>

          <Dialog>
            <DialogTrigger asChild>
              <button className="text-[10px] font-bold text-primary uppercase underline cursor-pointer hover:opacity-70 transition-opacity">
                Firmness Guide
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] rounded-[2.5rem] p-8 md:p-12">
              <DialogHeader>
                <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
                  Support Guide
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-8 py-6">
                <FirmnessOption
                  icon={Wind}
                  title="Regular Firm"
                  desc="Ideal for side sleepers. Provides deep pressure relief for shoulders and hips while maintaining spinal alignment."
                  scale="4-5/10"
                />
                <FirmnessOption
                  icon={Sun}
                  title="Medium Firm"
                  desc="Our most popular choice. Perfect for back sleepers and couples with different preferences. The gold standard of balance."
                  scale="6-7/10"
                />
                <FirmnessOption
                  icon={Moon}
                  title="Very Firm"
                  desc="Engineered for stomach sleepers and those who prefer a floating-on-top feel. Maximum orthopedic support."
                  scale="8-9/10"
                />
              </div>

              <div className="bg-muted/50 rounded-2xl p-4">
                <p className="text-[10px] text-center text-muted-foreground leading-relaxed uppercase tracking-widest font-bold">
                  All firmness levels include our 100-night risk-free trial.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {["Regular Firm", "Medium Firm", "Very Firm"].map((level) => (
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
        className="w-full h-16 rounded-full text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:scale-[1.01] active:scale-[0.98] transition-all"
      >
        Add to Bag — ${selectedSize.price}
      </Button>

      {/* Added to Bag Popup */}
      <Dialog
        open={isAddedPopupOpen}
        onOpenChange={setIsAddedPopupOpen}
      >
        <DialogContent className="sm:max-w-[420px] rounded-[2.5rem] p-8 md:p-10 text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter mb-2 text-center">
              Added to Bag
            </DialogTitle>
          </DialogHeader>

          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            <span className="font-bold text-foreground">{product.name}</span> (
            {selectedSize.size} - {firmness}) has been securely added to your
            bag.
          </p>

          <div className="flex flex-col gap-4">
            <Button
              asChild
              className="w-full h-14 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Link href="/cart">Proceed to Checkout</Link>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsAddedPopupOpen(false)}
              className="w-full h-14 rounded-full border-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Continue Shopping
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FirmnessOption({
  icon: Icon,
  title,
  desc,
  scale,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  scale: string;
}) {
  return (
    <div className="flex gap-4 group">
      <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <Icon size={20} />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-sm uppercase tracking-tight">
            {title}
          </h4>
          <span className="text-[9px] font-black text-muted-foreground/50 border border-muted px-2 py-0.5 rounded-full">
            {scale}
          </span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
