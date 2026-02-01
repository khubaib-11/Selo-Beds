"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store/useCartStore";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck, Calendar, Mail, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCartStore();

  // Clear the cart once the user lands here successfully
  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping" />
            <CheckCircle2 className="relative h-20 w-20 text-primary" />
          </div>
        </div>

        {/* Messaging */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
            Better Sleep is on its way
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Thank you for your order. We’re preparing your mattress for its
            journey to your bedroom.
          </p>
          {sessionId && (
            <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
              Order Ref: {sessionId.slice(-12)}
            </p>
          )}
        </div>

        {/* Timeline/What's Next */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-y border-border">
          <Step
            icon={Mail}
            title="Confirming"
            desc="Check your inbox for your order receipt."
          />
          <Step
            icon={Calendar}
            title="Scheduling"
            desc="Our white-glove team will call to book delivery."
          />
          <Step
            icon={Truck}
            title="Delivering"
            desc="Setup and old mattress removal is on us."
          />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-10 h-14 border-2"
          >
            <Link href={`/track?session_id=${sessionId}`}>
              Track Order Status
            </Link>
          </Button>

          <Button
            asChild
            className="w-full sm:w-auto rounded-full px-10 h-14 font-bold uppercase tracking-widest text-[11px] group shadow-lg shadow-primary/20"
          >
            <Link href="/">
              Continue Shopping
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] pt-8">
          Questions? Contact our Sleep Experts at support@yourmattress.com
        </p>
      </div>
    </main>
  );
}

function Step({
  icon: Icon,
  title,
  desc,
}: {
  icon: any;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center space-y-3">
      <div className="p-3 bg-muted rounded-2xl">
        <Icon className="h-6 w-6 text-foreground" />
      </div>
      <h3 className="font-bold text-sm uppercase tracking-wider">{title}</h3>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
