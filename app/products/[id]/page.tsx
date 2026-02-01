import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { ProductConfigurator } from "@/components/product-configurator";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select(
      `
      id,
      name,
      description,
      image_url,
      product_variants (
        id,
        size,
        price,
        stock_quantity
      )
    `,
    )
    .eq("id", id)
    .single();

  if (!product) notFound();

  // Find minimum price for display
  const minPrice = Math.min(
    ...product.product_variants.map((v: any) => v.price),
  );

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Left: Sticky Image Gallery */}
        <div className="relative">
          <div className="sticky top-32 space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-muted shadow-xl">
              <Image
                src={product.image_url || "/sleepQuiz.png"}
                alt={product.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>

        {/* Right: Product Details & Configurator */}
        <div className="flex flex-col space-y-8">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
              Top Rated Selection
            </Badge>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground uppercase">
              {product.name}
            </h1>
            <div className="flex items-center gap-4">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill="currentColor"
                    size={16}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-muted-foreground underline">
                Verified Customer Reviews
              </span>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">
            {product.description}
          </p>

          {/* This is our interactive Client Component */}
          <ProductConfigurator product={product} />

          {/* Trust Signals */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-border">
            <TrustItem
              icon={Truck}
              text="Free Delivery"
            />
            <TrustItem
              icon={RefreshCw}
              text="100-Night Trial"
            />
            <TrustItem
              icon={ShieldCheck}
              text="Lifetime Warranty"
            />
          </div>
        </div>
      </div>
      {/* --- Add this below the main grid --- */}

      <section className="mt-32 space-y-24">
        {/* The Anatomy of Sleep - Explaining the 'Stuff' used */}
        <div className="bg-muted/30 rounded-[3.5rem] p-12 md:p-24">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
              The Anatomy of Sleep
            </h2>
            <p className="text-muted-foreground">
              Four layers of meticulously sourced materials engineered for
              spinal alignment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <LayerItem
              number="01"
              title="Organic Cotton Cover"
              desc="Breathable, hypoallergenic cover that wicks away moisture naturally."
            />
            <LayerItem
              number="02"
              title="Cloud-Response Foam"
              desc="2-inch high-density memory foam that contours to your unique pressure points."
            />
            <LayerItem
              number="03"
              title="Iso-Core Support"
              desc="Individually wrapped steel coils to reduce motion transfer between partners."
            />
            <LayerItem
              number="04"
              title="Edge-Reinforced Base"
              desc="High-density support foam ensures the mattress never sags at the perimeter."
            />
          </div>
        </div>

        {/* Technical Dimensions Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h3 className="text-3xl font-black uppercase tracking-tighter">
              Technical Details
            </h3>
            <div className="divide-y divide-border">
              <SpecRow
                label="Height"
                value="13.5 inches"
              />
              <SpecRow
                label="Country of Origin"
                value="Hand-assembled in USA"
              />
              <SpecRow
                label="Certifications"
                value="CertiPUR-US® / OEKO-TEX® Standard 100"
              />
              <SpecRow
                label="Weight Limit"
                value="Up to 1,000 lbs total"
              />
            </div>
          </div>
          <div className="relative aspect-video bg-muted rounded-[2rem] overflow-hidden">
            {/* A secondary lifestyle image or dimension diagram */}
            <Image
              src="/sleepQuiz.png"
              alt="Dimensions"
              fill
              className="object-cover opacity-50 grayscale"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-foreground/40 italic">
                Engineering Blueprint
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TrustItem({ icon: Icon, text }: { icon: any; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-muted rounded-lg">
        <Icon
          size={18}
          className="text-foreground"
        />
      </div>
      <span className="text-[11px] font-bold uppercase tracking-wider leading-tight">
        {text}
      </span>
    </div>
  );
}

{
  /* Helper Components */
}
function LayerItem({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="space-y-4">
      <span className="text-primary font-mono text-xs font-black tracking-widest">
        {number}
      </span>
      <h4 className="font-bold text-lg uppercase tracking-tight">{title}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-4">
      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}
