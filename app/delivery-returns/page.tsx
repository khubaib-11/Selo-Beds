"use client";

import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Truck,
  MapPin,
  CalendarDays,
  RotateCcw,
  ShieldCheck,
  CreditCard,
  AlertTriangle,
  LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DeliveryReturnsPage() {
  // Anti-spam email obfuscation
  const handleEmailClick = () => {
    const user = "support";
    const domain = "selobeds.co.uk";
    window.location.href = `mailto:${user}@${domain}?subject=Selo%20Beds%20Support%20-%20Delivery%20Enquiry`;
  };

  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            Logistics & Policies
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Delivery & Returns
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about how your Selo mattress gets to
            you, and how we handle things if it’s not the perfect fit.
          </p>
        </div>

        {/* Delivery Section */}
        {/* Delivery Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 border-b border-border pb-6 mb-12">
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <Truck
                className="text-primary"
                size={24}
              />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Delivery Policy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PolicyCard
              icon={CalendarDays}
              title="Birmingham Same-Day"
              desc="Because our distribution hub is based in Tyseley, we aim to offer same-day delivery for our local Birmingham customers. Order before 12 PM, and subject to van capacity, you could be sleeping on it tonight."
            />
            <PolicyCard
              icon={MapPin}
              title="Wider West Midlands"
              desc="Living slightly further out? We still offer incredibly fast, free delivery across the wider West Midlands. Orders outside the immediate Birmingham area are typically delivered within 2 to 3 working days."
            />
            <PolicyCard
              icon={ShieldCheck}
              title="Premium Handling"
              desc="Your mattress is delivered in its true, uncompressed form. It is fully wrapped for protection but is never rolled or crushed, ensuring the structural integrity is flawless upon arrival."
            />
          </div>

          <div className="mt-8 bg-muted/50 rounded-2xl p-6 border border-border">
            <p className="text-sm text-muted-foreground leading-relaxed text-center">
              <strong className="text-foreground">
                Post-Order Communication:
              </strong>{" "}
              Once you place your order, our Tyseley dispatch team will contact
              you directly to confirm your exact delivery window, ensuring you
              know exactly when to expect us.
            </p>
          </div>
        </div>

        {/* Returns Section */}
        <div className="mb-24">
          <div className="flex items-center gap-4 border-b border-border pb-6 mb-12">
            <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
              <RotateCcw
                className="text-primary"
                size={24}
              />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Returns & Refunds
            </h2>
          </div>

          <div className="bg-muted/30 rounded-[3rem] p-8 md:p-12 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  How to return your mattress
                </h3>
                <ol className="space-y-6 relative border-l border-border ml-3">
                  <li className="pl-8 relative">
                    <span className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      1
                    </span>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-1">
                      Pass the 30-Day Mark
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Ensure you have slept on the mattress for the minimum
                      30-night break-in period required by our 100-Night Trial.
                    </p>
                  </li>
                  <li className="pl-8 relative">
                    <span className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      2
                    </span>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-1">
                      Contact Support
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Reach out to our team. We will verify your order and
                      confirm the mattress is in donatable condition (no stains
                      or tears).
                    </p>
                  </li>
                  <li className="pl-8 relative">
                    <span className="absolute -left-3 top-0 h-6 w-6 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                      3
                    </span>
                    <h4 className="font-bold text-sm uppercase tracking-widest mb-1">
                      Free Courier Collection
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      We will dispatch our specialized courier team to collect
                      the unboxed mattress directly from your home on a
                      scheduled date.
                    </p>
                  </li>
                </ol>
              </div>

              <div className="space-y-8">
                <div className="bg-background rounded-3xl p-6 shadow-sm border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <CreditCard
                      className="text-primary"
                      size={20}
                    />
                    <h4 className="font-bold text-sm uppercase tracking-widest">
                      Refund Processing
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Once our courier successfully collects the mattress, we will
                    initiate your refund immediately. Please allow 3-5 business
                    days for the funds to appear on your original payment method
                    (or for Klarna to adjust your balance).
                  </p>
                </div>

                <div className="bg-orange-50/50 dark:bg-orange-950/20 rounded-3xl p-6 border border-orange-200 dark:border-orange-900/50">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertTriangle
                      className="text-orange-600 dark:text-orange-500"
                      size={20}
                    />
                    <h4 className="font-bold text-sm uppercase tracking-widest text-orange-800 dark:text-orange-400">
                      Damaged in Transit
                    </h4>
                  </div>
                  <p className="text-sm text-orange-800/80 dark:text-orange-400/80 leading-relaxed">
                    If your mattress arrives with visible damage to the
                    packaging or the product itself, please accept the delivery
                    but sign for it as &quot;Damaged&quot;. Contact us within 48
                    hours with photos of the issue, and we will arrange an
                    immediate replacement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Support CTA */}
        <div className="text-center mt-12 space-y-8">
          <h3 className="text-2xl font-black uppercase tracking-tighter">
            Need to arrange a custom delivery outside the West Midlands?
          </h3>
          <Button
            onClick={handleEmailClick}
            className="rounded-full px-12 py-6 text-sm font-bold uppercase tracking-widest"
          >
            Contact Our Dispatch Team
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

{
  /* Helper Component */
}
function PolicyCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-background border border-border rounded-[2rem] p-8 shadow-sm hover:border-primary/50 transition-colors">
      <div className="h-10 w-10 bg-muted rounded-xl flex items-center justify-center mb-6">
        <Icon
          className="text-foreground"
          size={20}
        />
      </div>
      <h3 className="font-bold uppercase tracking-wide text-base mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
