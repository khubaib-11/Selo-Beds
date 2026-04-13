import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Home, Store, Moon, Tag, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ShowroomsPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            The Selo Experience
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Our showroom is your bedroom.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We skipped the expensive retail stores, the pushy commissioned
            salespeople, and the awkward 5-minute tests. Here is why we deliver
            straight from our Tyseley hub to your door.
          </p>
        </div>

        {/* The Comparison Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {/* The Old Way */}
          <div className="bg-muted/30 border border-border rounded-[2.5rem] p-8 md:p-12 space-y-8">
            <div className="flex items-center gap-4 border-b border-border/50 pb-4">
              <Store
                className="text-muted-foreground"
                size={28}
              />
              <h2 className="text-2xl font-black uppercase tracking-tight text-muted-foreground">
                The Old Way
              </h2>
            </div>
            <ul className="space-y-6 text-muted-foreground">
              <li className="flex gap-4">
                <span className="font-bold text-destructive">✗</span>
                <p>
                  Awkwardly lying on a bed for 5 minutes with your shoes on and
                  fluorescent lights overhead.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-destructive">✗</span>
                <p>
                  Paying a 50% markup just to cover the store&apos;s rent,
                  electricity, and staff commissions.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-destructive">✗</span>
                <p>
                  Dealing with aggressive sales tactics when you just want to
                  browse in peace.
                </p>
              </li>
            </ul>
          </div>

          {/* The Selo Way */}
          <div className="bg-background shadow-xl shadow-primary/5 border border-primary/20 rounded-[2.5rem] p-8 md:p-12 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
            <div className="flex items-center gap-4 border-b border-border/50 pb-4">
              <Home
                className="text-primary"
                size={28}
              />
              <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
                The Selo Way
              </h2>
            </div>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="font-bold text-primary">✓</span>
                <p>
                  Testing the mattress in your own pajamas, in your own
                  temperature, for 100 nights.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-primary">✓</span>
                <p>
                  Getting premium, luxury materials for a fraction of the cost
                  because we have zero retail overhead.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-primary">✓</span>
                <p>
                  Fast, direct delivery straight from our Birmingham dispatch
                  hub to your bedroom.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-24">
          <div className="flex items-center gap-4 bg-muted/40 p-6 rounded-2xl border border-border">
            <div className="h-12 w-12 bg-background rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Tag
                className="text-primary"
                size={20}
              />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs mb-1">
                Honest Pricing
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No middlemen means you only pay for the quality of the mattress,
                not the real estate.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-muted/40 p-6 rounded-2xl border border-border">
            <div className="h-12 w-12 bg-background rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <Moon
                className="text-primary"
                size={20}
              />
            </div>
            <div>
              <h3 className="font-bold uppercase tracking-widest text-xs mb-1">
                Real-World Testing
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your spine takes weeks to adjust to a new bed. Five minutes in a
                store tells you nothing.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-primary text-primary-foreground rounded-[3rem] p-12 md:p-16">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6">
            Ready to start your home trial?
          </h2>
          <p className="text-primary-foreground/80 max-w-xl mx-auto mb-10 leading-relaxed">
            Order today and experience the difference in your own environment.
            If you don&apos;t love it, we&apos;ll pick it up for free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              className="rounded-full px-8 py-6 text-sm font-bold uppercase tracking-widest bg-background text-foreground hover:bg-muted transition-colors"
            >
              <Link href="/">Shop Mattresses</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8 py-6 text-sm font-bold uppercase tracking-widest border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground transition-colors"
            >
              <Link href="/trial">
                Read Trial Policy <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
