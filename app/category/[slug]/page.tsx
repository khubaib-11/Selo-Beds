import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tables } from "@/database.types";
import { Suspense } from "react";

type Variant = Pick<Tables<"product_variants">, "price" | "size">;

type Product = Pick<
  Tables<"products">,
  "id" | "name" | "image_url" | "description"
> & {
  product_variants: Variant[];
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select("name, image_url")
    .eq("slug", slug)
    .single();

  if (!category) {
    return {
      title: "Category Not Found | Your Mattress",
    };
  }

  return {
    title: `${category.name} Mattresses & Essentials | Your Mattress`,
    description: `Shop our premium ${category.name.toLowerCase()} collection. Discover tailored comfort and handcrafted quality for every sleeper.`,
    openGraph: {
      title: `${category.name} Collection | Your Mattress`,
      description: `Shop our premium ${category.name.toLowerCase()} collection. Discover tailored comfort and handcrafted quality for every sleeper.`,
      images: category.image_url ? [{ url: category.image_url }] : [],
    },
  };
}

async function CategoryContent({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: category } = await supabase
    .from("categories")
    .select(
      `
      id,
      name,
      image_url,
      products (
        id,
        name,
        image_url,
        description,
        product_variants (
          price,
          size
        )
      )
    `,
    )
    .eq("slug", slug)
    .single();

  if (!category) notFound();

  const hasProducts = category.products && category.products.length > 0;

  return (
    <>
      {/* Hero Header - Always show this so the user knows where they are */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={
            category.image_url ||
            "https://zxkrobxvmerfpavvuzsx.supabase.co/storage/v1/object/public/products/Cozy,%20Neutral-Toned%20Bedroom%20Haven%20(2).png"
          }
          alt={`${category.name} Collection Hero Image`}
          fill
          priority
          className="object-cover opacity-60 grayscale-[0.5]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background" />
        <div className="relative z-10 text-center space-y-4 px-4">
          <Badge
            variant="outline"
            className="border-primary text-primary px-4 py-1 uppercase tracking-[0.3em] text-[10px]"
          >
            Collection
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground">
            {category.name}
          </h1>
        </div>
      </section>

      {/* Conditional Rendering: Product Grid OR Empty State */}
      <section className="container mx-auto px-4 py-20">
        {hasProducts ? (
          <div className="flex flex-col gap-24">
            {(category.products as unknown as Product[]).map((product) => {
              const prices = product.product_variants.map((v) => v.price);
              const startingPrice = Math.min(...prices);

              return (
                <div
                  key={product.id}
                  className="group flex flex-col lg:flex-row gap-12 lg:gap-20 items-center"
                >
                  <div className="relative aspect-square w-full lg:w-1/2 overflow-hidden rounded-[2.5rem] bg-muted shadow-sm group-hover:shadow-2xl transition-all duration-500">
                    <Image
                      src={
                        product.image_url ||
                        "https://zxkrobxvmerfpavvuzsx.supabase.co/storage/v1/object/public/products/Cozy,%20Neutral-Toned%20Bedroom%20Haven%20(2).png"
                      }
                      alt={`Buy ${product.name} - Premium ${category.name}`}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>

                  <div className="w-full lg:w-1/2 space-y-8 md:space-y-10">
                    <div className="space-y-4">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter">
                        {product.name}
                      </h2>
                      <p className="text-primary font-bold tracking-[0.2em] uppercase text-sm md:text-base">
                        Starting at ${startingPrice.toLocaleString()}
                      </p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                      {product.description}
                    </p>

                    <div className="space-y-4">
                      <h3 className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Available Sizes
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.product_variants.map((v) => (
                          <span
                            key={v.size}
                            className="text-xs border-2 border-border/50 px-4 py-2 rounded-full text-foreground uppercase font-bold tracking-wider"
                          >
                            {v.size}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="block pt-4"
                    >
                      <Button
                        size="lg"
                        className="w-full sm:w-auto rounded-full px-12 font-black uppercase tracking-[0.2em] text-xs h-16 bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                      >
                        Configure Your Sleep
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Nice Empty State */
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="bg-muted p-8 rounded-full">
              <ShoppingBag className="w-12 h-12 text-muted-foreground stroke-[1px]" />
            </div>
            <div className="space-y-3 max-w-md">
              <h2 className="text-2xl font-bold tracking-tight">
                Refining the Collection
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We are currently hand-selecting the finest materials for our{" "}
                <span className="text-foreground font-semibold">
                  {category.name}
                </span>
                . Check back soon or explore our other award-winning sleep
                essentials.
              </p>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="rounded-full px-8 gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Return to Shop
              </Button>
            </Link>
          </div>
        )}
      </section>
    </>
  );
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="min-h-screen bg-background">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[60vh] text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
            Loading Collection...
          </div>
        }
      >
        <CategoryContent params={params} />
      </Suspense>
      <Footer />
    </main>
  );
}
