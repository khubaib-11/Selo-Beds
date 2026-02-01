import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ArrowLeft } from "lucide-react";

export default async function CategoryPage({
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
    <main className="min-h-screen bg-background">
      {/* Hero Header - Always show this so the user knows where they are */}
      <section className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={category.image_url || "/sleepQuiz.png"}
          alt={category.name}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {category.products.map((product: any) => {
              const prices = product.product_variants.map((v: any) => v.price);
              const startingPrice = Math.min(...prices);

              return (
                <div
                  key={product.id}
                  className="group flex flex-col md:flex-row gap-8 items-center border-b border-border/50 pb-16 last:border-0"
                >
                  <div className="relative aspect-square w-full md:w-1/2 overflow-hidden rounded-3xl bg-muted">
                    <Image
                      src={product.image_url || "/sleepQuiz.png"}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="w-full md:w-1/2 space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tight">
                        {product.name}
                      </h2>
                      <p className="text-primary font-semibold tracking-wide uppercase text-xs">
                        Starting at ${startingPrice.toLocaleString()}
                      </p>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {product.product_variants.map((v: any) => (
                        <span
                          key={v.size}
                          className="text-[10px] border border-border px-2 py-1 rounded-md text-muted-foreground uppercase font-bold"
                        >
                          {v.size}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="block pt-4"
                    >
                      <Button
                        size="lg"
                        className="rounded-full px-10 font-bold uppercase tracking-widest text-[11px] h-14 bg-primary hover:bg-primary/90"
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
    </main>
  );
}
