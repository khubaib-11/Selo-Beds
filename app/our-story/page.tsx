import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function OurStoryPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-24">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            The Selo Story
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            We woke up to a <br className="hidden md:block" /> broken industry.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Overpriced showrooms. Pushy salespeople. Mattresses crushed into
            tiny boxes. We decided there had to be a better way to help people
            sleep.
          </p>
        </div>

        {/* The Origin Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
          <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square bg-muted rounded-[3rem] overflow-hidden">
            {/* Placeholder for a team photo, warehouse photo, or brand lifestyle image */}
            <div className="absolute inset-0 bg-primary/5 flex items-center justify-center p-12 text-center">
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-widest">
                [Insert Photo of Tyseley Warehouse or Team Here]
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Premium sleep shouldn&apos;t be a luxury.
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Selo Beds started with a simple realization: buying a mattress
                has become a miserable experience. If you go to a traditional
                retailer, you end up paying double what the mattress is worth
                just to cover the store&apos;s rent and the salesperson&apos;s
                commission.
              </p>
              <p>
                Then came the &quot;bed-in-a-box&quot; companies. While they
                fixed the pricing, they introduced a new problem: they crush,
                vacuum-seal, and roll their mattresses just to save on shipping.
                This damages the internal structure and traps chemical smells,
                leaving you to sleep on a compromised bed.
              </p>
              <p className="font-bold text-foreground">
                We knew we could do it better.
              </p>
            </div>
          </div>
        </div>

        {/* The Selo Difference (Three Pillars) */}
        <div className="bg-muted/30 rounded-[3rem] p-8 md:p-16 border border-border/50 mb-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black uppercase tracking-tighter">
              How we changed the rules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4 text-center md:text-left">
              <div className="mx-auto md:mx-0 h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles
                  className="text-primary"
                  size={24}
                />
              </div>
              <h3 className="font-bold uppercase tracking-wide text-lg">
                Zero Middlemen
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                By operating purely online and skipping the fancy showrooms, we
                pour every penny into the quality of the materials, not the real
                estate.
              </p>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="mx-auto md:mx-0 h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck
                  className="text-primary"
                  size={24}
                />
              </div>
              <h3 className="font-bold uppercase tracking-wide text-lg">
                Never Crushed
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We refuse to roll our mattresses. Yours arrives flat, fully
                expanded, and structurally perfect—ready for you to sleep on
                from night one.
              </p>
            </div>

            <div className="space-y-4 text-center md:text-left">
              <div className="mx-auto md:mx-0 h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <MapPin
                  className="text-primary"
                  size={24}
                />
              </div>
              <h3 className="font-bold uppercase tracking-wide text-lg">
                Locally Dispatched
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Operating right out of Tyseley, Birmingham, we manage our own
                logistics. This allows us to offer lightning-fast, often
                same-day delivery to our community.
              </p>
            </div>
          </div>
        </div>

        {/* Founder / Team Sign-off */}
        <div className="text-center max-w-2xl mx-auto space-y-8">
          <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            <Heart size={28} />
          </div>
          <h2 className="text-3xl font-black uppercase tracking-tighter">
            We&apos;ve got your back.
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We aren&apos;t a faceless corporation. We are a small, dedicated
            team right here in the West Midlands, working hard every day to make
            sure you get the best night&apos;s sleep of your life.
          </p>
          <div className="pt-8">
            <Button
              asChild
              className="rounded-full px-12 py-6 text-sm font-bold uppercase tracking-widest"
            >
              <Link href="/">Explore Our Collection</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
