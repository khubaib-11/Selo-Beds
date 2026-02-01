"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/store/useCartStore";
import { useCartHydration } from "@/hooks/use-cart-hydration";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight, Truck, Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import KlarnaLogo from "../assets/public/klaran.png";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarDays, CreditCard, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import SimplifiedFooter from "@/components/SimplifiedFooter";
import { createClient } from "@/lib/supabase/client";

import { Input } from "@/components/ui/input";

export default function CartPage() {
  const hydrated = useCartHydration();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");
  const supabase = createClient();
  // A simple but effective regex for email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isEmailReady = isValidEmail(guestEmail);

  useEffect(() => {
    // Check if user is logged in on mount
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  const handleCheckoutClick = () => {
    if (user) {
      // User is logged in: Send their ID to the API
      initiateStripeCheckout(user.id, user.email);
    } else {
      // No user: Open the Guest/Login selection modal
      setOpenAuthModal(true);
    }
  };

  const initiateStripeCheckout = async (
    userId: string | null,
    email: string | null,
  ) => {
    const response = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        items,
        userId,
        guestEmail: email,
      }),
    });
    const data = await response.json();
    if (data.url) window.location.href = data.url;
  };

  //   const handleCheckout = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch("/api/checkout", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ items }),
  //       });

  //       const data = await response.json();

  //       if (data.url) {
  //         window.location.href = data.url; // Redirect to Stripe
  //       } else {
  //         toast.error("Checkout failed. Please try again.");
  //       }
  //     } catch (err) {
  //       toast.error("Something went wrong.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  if (!hydrated) return null; // Prevent hydration mismatch

  const subtotal = getTotalPrice();
  const shipping = 0; // Free delivery for premium brand
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
          Your bag is empty
        </h1>
        <p className="text-muted-foreground mb-8">
          Sounds like the perfect time to start your 100-night trial.
        </p>
        <Button
          asChild
          className="rounded-full px-8 py-6"
        >
          <Link href="/">Browse Collections</Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">
        Your Shopping Bag
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Item List */}
        <div className="lg:col-span-8 space-y-8">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex flex-col sm:flex-row gap-6 pb-8 border-b border-border"
            >
              <div className="relative aspect-square w-full sm:w-40 overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-1">
                      Size: {item.size}
                    </p>
                  </div>
                  <p className="text-xl font-bold">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center border border-border rounded-full p-1">
                    <button
                      onClick={() =>
                        updateQuantity(
                          item.variantId,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                      className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-10 text-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.variantId, item.quantity + 1)
                      }
                      className="p-2 hover:bg-muted rounded-full transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                  >
                    <Trash2 size={16} />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl">
              <Truck className="text-primary" />
              <p className="text-xs font-bold uppercase tracking-wider">
                Free White-Glove Delivery
              </p>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl">
              <ShieldCheck className="text-primary" />
              <p className="text-xs font-bold uppercase tracking-wider">
                10-Year Limited Warranty
              </p>
            </div>
          </div>
        </div>

        {/* Summary Side */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 bg-muted/30 rounded-[2rem] p-4 space-y-6">
            <h2 className="text-xl font-bold tracking-tight">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-bold text-green-600 uppercase text-[10px] tracking-widest">
                  Free
                </span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg pt-2">
                <span className="font-bold">Total</span>
                <span className="font-black">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Klarna Logic Display */}
            <div className="relative overflow-hidden rounded-[1.5rem] bg-muted/40 border border-border/50 p-6">
              {/* Decorative Background Element */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />

              <div className="relative space-y-4">
                {/* Header Line */}
                <div className="flex items-center gap-2">
                  <div className="relative h-8 w-16">
                    <Image
                      src={KlarnaLogo}
                      alt="Klarna"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                    Available at checkout
                  </span>
                </div>

                {/* Big Monthly Number */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black tracking-tighter">
                      ${(total / 3).toFixed(2)}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                      / month
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground font-medium">
                    Split your total of{" "}
                    <span className="text-foreground">
                      ${total.toLocaleString()}
                    </span>{" "}
                    into
                    <span className="text-foreground">
                      {" "}
                      3 interest-free
                    </span>{" "}
                    payments with Klarna.
                  </p>
                </div>

                {/* Action Link */}
                <div className="pt-2 flex items-center justify-between border-t border-border/40">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-[10px] font-extrabold uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
                        Learn how it works
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-[2rem] p-8">
                      <DialogHeader>
                        <div className="relative h-6 w-16 mb-2">
                          <Image
                            src={KlarnaLogo}
                            alt="Klarna"
                            fill
                            className="object-contain object-left"
                          />
                        </div>
                        <DialogTitle className="text-2xl font-black uppercase tracking-tighter">
                          Pay in 3 installments
                        </DialogTitle>
                      </DialogHeader>

                      <div className="space-y-8 py-6">
                        {/* Step 1 */}
                        <div className="flex gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                            1
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-sm">Pay today</p>
                            <p className="text-xs text-muted-foreground">
                              Your first payment of{" "}
                              <span className="text-foreground font-semibold">
                                ${(total / 3).toFixed(2)}
                              </span>{" "}
                              is taken when your order is confirmed.
                            </p>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                            2
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-sm">30 days later</p>
                            <p className="text-xs text-muted-foreground">
                              The second payment happens automatically 30 days
                              after your purchase.
                            </p>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-4">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold">
                            3
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-sm">60 days later</p>
                            <p className="text-xs text-muted-foreground">
                              The final payment is taken 60 days after your
                              purchase. No interest, ever.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-2xl bg-muted/50 p-4 space-y-3">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-70">
                          <ShieldCheck size={14} />
                          Safe & Secure
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          Klarna will perform a soft credit check which does not
                          affect your credit score. Available to UK/US residents
                          18+. T&Cs apply.
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
              </div>
            </div>

            <Button
              onClick={handleCheckoutClick}
              disabled={isLoading}
              className="w-full h-16 rounded-full text-lg font-bold group shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : (
                <>
                  Checkout Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>

            <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest font-medium">
              Secure Checkout Powered by Stripe
            </p>
          </div>
        </div>
      </div>
      <Dialog
        open={openAuthModal}
        onOpenChange={setOpenAuthModal}
      >
        <DialogContent className="w-[95vw] max-w-[500px] p-0 overflow-hidden border-none rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl bg-background">
          <div className="flex flex-col p-8 md:p-16 space-y-10">
            {/* Header - Simple & Functional */}
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-3xl font-black uppercase tracking-tighter leading-tight">
                Checkout <br className="hidden md:block" /> Details
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Please enter your email. We use this to send your{" "}
                <strong>order confirmation</strong> and{" "}
                <strong>delivery tracking</strong> updates.
              </p>
            </div>

            {/* Input Section */}
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] ml-4 text-muted-foreground">
                  Delivery Updates Email
                </label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className={`rounded-full h-16 px-8 border-2 transition-all text-base text-center md:text-left ${
                    guestEmail && !isEmailReady
                      ? "border-orange-200 bg-orange-50/30"
                      : "border-muted bg-muted/20 focus:border-primary/50"
                  }`}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  value={guestEmail}
                />
                {guestEmail && !isEmailReady && (
                  <p className="text-[10px] text-center font-bold text-orange-600 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => initiateStripeCheckout(null, guestEmail)}
                  disabled={!guestEmail.includes("@")} // Basic validation
                  className="w-full rounded-full h-16 text-[16px] uppercase font-black tracking-[0.25em] bg-primary hover:bg-primary/90 shadow-xl shadow-primary/10 transition-all"
                >
                  Continue to Payment
                </Button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest font-bold">
                    <span className="bg-background px-4 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  asChild
                  className="w-full rounded-full h-16 text-[11px] uppercase font-black tracking-[0.25em] border-2 border-muted hover:bg-muted/50"
                >
                  <Link href="/auth/login?redirect=/cart">
                    Sign In to Your Account
                  </Link>
                </Button>
              </div>
            </div>

            {/* Footer Note */}
            <p className="text-[10px] text-center text-muted-foreground leading-relaxed px-4">
              You can track your sleep journey anytime using this email address
              or your unique tracking number.
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <SimplifiedFooter />
    </main>
  );
}
