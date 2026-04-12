import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

import { Tables } from "../database.types";

type Variant = Pick<Tables<"product_variants">, "price">;

type Product = {
  product_variants: Variant[];
};

type Category = Tables<"categories"> & {
  products: Product[];
};

export async function CollectionGrid() {
  const supabase = await createClient();

  // Fetch categories, products, and variants in one nested query
  const { data: categories, error } = await supabase.from("categories").select(`
      id,
      name,
      slug,
      image_url,
      products (
        product_variants (
          price
        )
      )
    `);

  if (error || !categories) {
    console.error("Supabase error:", error);
    return null;
  }

  return (
    <section
      className="w-full py-24 bg-background"
      id="collectionsGrid"
    >
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-20">
          <Badge
            variant="outline"
            className="border-primary text-primary px-4 py-1 uppercase tracking-[0.2em] text-[10px] font-bold"
          >
            The Essentials
          </Badge>
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
            Shop by Collection
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-lg italic">
            Tailored comfort for every sleeper.
          </p>
        </div>

        {/* Grid */}
        <div
          className={`grid gap-12 ${
            categories.length === 1
              ? "grid-cols-1 max-w-md mx-auto"
              : categories.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {categories.map((category: Category) => {
            // Calculate Price Range from variants
            const allPrices = category.products
              .flatMap((p: Product) => p.product_variants || [])
              .map((v: Variant) => v.price);

            const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
            const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;

            return (
              <div
                key={category.id}
                className="group flex flex-col"
              >
                {/* Visual Wrapper */}
                <Link
                  href={`/category/${category.slug}`}
                  className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] bg-muted mb-8 transition-transform duration-500 group-hover:-translate-y-2 shadow-sm group-hover:shadow-2xl"
                >
                  <Image
                    src={
                      category.image_url ||
                      "https://zxkrobxvmerfpavvuzsx.supabase.co/storage/v1/object/public/products/Cozy,%20Neutral-Toned%20Bedroom%20Haven%20(2).png"
                    }
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  {/* Subtle Brand Tint Overlay */}
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                </Link>

                {/* Info Wrapper */}
                <div className="flex flex-col space-y-3">
                  <div className="flex justify-between items-end">
                    <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Range:
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      ${minPrice.toLocaleString()} — $
                      {maxPrice.toLocaleString()}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 pb-4">
                    Explore our award-winning selection of{" "}
                    {category.name.toLowerCase()} designed for restorative rest.
                  </p>

                  <Link href={`/category/${category.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-border group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 py-6 font-bold uppercase tracking-widest text-[10px]"
                    >
                      View Collection
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
