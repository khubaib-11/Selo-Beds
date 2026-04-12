"use client";

import { useEffect, Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCartStore } from "@/lib/store/useCartStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  CheckCircle2,
  Truck,
  Calendar,
  Mail,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const clearCart = useCartStore((state) => state.clearCart);
  const [status, setStatus] = useState<"verifying" | "success" | "error">(
    "verifying",
  );
  const [notes, setNotes] = useState("");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSaved, setNotesSaved] = useState(false);

  // Clear the cart only after successful verification
  useEffect(() => {
    if (sessionId && status === "success") {
      clearCart();
    }
  }, [sessionId, status, clearCart]);

  useEffect(() => {
    if (sessionId) {
      fetch("/api/checkout/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error("Failed to verify order");
          }
          return res.json();
        })
        .then((data) => {
          console.log("Order updated with address!", data);
          setStatus("success");
        })
        .catch((err) => {
          console.error("Failed to update order", err);
          setStatus("error");
        });
    } else {
      setStatus("error");
    }
  }, [sessionId]);

  const handleSaveNotes = async () => {
    if (!notes.trim() || !sessionId) return;
    setIsSavingNotes(true);

    const supabase = createClient();

    // We use .select() at the end to verify a row was actually modified
    const { data, error } = await supabase
      .from("orders")
      .update({ customer_notes: notes })
      .eq("stripe_session_id", sessionId)
      .select();

    setIsSavingNotes(false);

    if (error) {
      toast.error("Failed to save delivery notes.");
      console.error("Supabase Error:", error.message);
    } else if (!data || data.length === 0) {
      // This happens if the sessionId doesn't exist in the DB
      // or if RLS policies are blocking the update.
      toast.error("Order not found. Notes could not be linked.");
      console.warn(
        "No rows updated. Check if stripe_session_id matches and RLS allows UPDATE.",
      );
    } else {
      setNotesSaved(true);
      toast.success("Delivery notes added successfully!");
    }
  };

  if (status === "verifying") {
    return (
      <main className="min-h-[80vh] flex items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center space-y-6 animate-in fade-in duration-500">
          <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black uppercase tracking-widest animate-pulse">
              Verifying Your Order...
            </h2>
            <p className="text-muted-foreground">
              Please wait a moment while we confirm your details.
            </p>
          </div>
        </div>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="min-h-[80vh] flex items-center justify-center py-20 px-4">
        <div className="flex flex-col items-center text-center space-y-6 max-w-md animate-in fade-in duration-500">
          <h2 className="text-3xl font-black tracking-widest uppercase text-destructive">
            Verification Failed
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We couldn&apos;t automatically verify your order at this time. If
            you completed payment, please check your email for confirmation or
            contact support.
          </p>
          <Button
            asChild
            className="rounded-full px-10 font-bold uppercase tracking-widest h-14 shadow-lg shadow-primary/20"
          >
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] flex items-center justify-center py-20 px-4 animate-in fade-in duration-500">
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

        {/* Delivery Notes Section */}
        <div className="max-w-md mx-auto py-4">
          {!notesSaved ? (
            <div className="space-y-4 text-left bg-muted/30 p-6 rounded-3xl border border-border">
              <div className="space-y-1">
                <h3 className="font-bold uppercase tracking-widest text-sm">
                  Add Delivery Notes (Optional)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  e.g., Gate code is 1234, leave by the side door, beware of
                  dog, call upon arrival. Add anything you want during delivery.
                </p>
              </div>
              <Textarea
                placeholder="Enter your delivery instructions here..."
                className="resize-none rounded-xl bg-background"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
              <Button
                onClick={handleSaveNotes}
                disabled={isSavingNotes || !notes.trim()}
                className="w-full rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-primary/10 transition-all active:scale-95"
              >
                {isSavingNotes ? "Saving..." : "Save Notes"}
              </Button>
            </div>
          ) : (
            <div className="bg-primary/10 text-primary p-6 rounded-3xl border border-primary/20 flex flex-col items-center justify-center space-y-3">
              <CheckCircle2 className="h-8 w-8" />
              <p className="font-bold uppercase tracking-widest text-xs text-center">
                Notes Saved Successfully
              </p>
              <p className="text-sm text-center text-foreground">
                Our delivery team will make sure to follow your instructions.
              </p>
            </div>
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

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] flex items-center justify-center text-muted-foreground uppercase tracking-widest font-bold">
          Loading...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}

function Step({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
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
