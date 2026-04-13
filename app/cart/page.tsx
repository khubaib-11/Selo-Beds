//
"use client";

import SimplifiedFooter from "@/components/SimplifiedFooter";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useCartHydration } from "@/hooks/use-cart-hydration";
import { useCartStore } from "@/lib/store/useCartStore";
import { createClient } from "@/lib/supabase/client";
import {
  ArrowRight,
  Loader2,
  Minus,
  Plus,
  ShieldCheck,
  Trash2,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import KlarnaLogo from "../assets/public/klaran.png";

import { Input } from "@/components/ui/input";
import { User } from "@supabase/supabase-js";

export default function CartPage() {
  const hydrated = useCartHydration();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const supabase = createClient();

  // A simple but effective regex for email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isEmailReady = isValidEmail(emailInput);

  useEffect(() => {
    // Check if user is logged in on mount
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
      }
    };
    getUser();
  }, [supabase.auth]);

  const handleCheckoutClick = () => {
    if (user) {
      // User is logged in: Send their ID to the API
      initiateStripeCheckout(user.id, user.email ?? null);
    } else {
      // No user: Open the Guest/Login selection modal
      setOpenAuthModal(true);
    }
  };

  const handleGoogleLogin = async () => {
    // Ensure that after Google auth, they come straight back to the cart
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/cart`,
      },
    });

    if (data) {
      toast.success("Google login successful!");
    }

    if (error) {
      toast.error("Google login failed. Please try again.");
    }
  };

  const initiateStripeCheckout = async (
    userId: string | null,
    email: string | null,
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: JSON.stringify({
          items,
          userId,
          email,
        }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.error || "Checkout failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      toast.error("Network error during checkout.");
      setIsLoading(false);
    }
  };

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
                    <DialogContent
                      className="sm:max-w-[425px] rounded-[2rem] p-8"
                      title="Checkout details dialogue"
                    >
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
                    emailInput && !isEmailReady
                      ? "border-orange-200 bg-orange-50/30"
                      : "border-muted bg-muted/20 focus:border-primary/50"
                  }`}
                  onChange={(e) => setEmailInput(e.target.value)}
                  value={emailInput}
                />
                {emailInput && !isEmailReady && (
                  <p className="text-[10px] text-center font-bold text-orange-600 uppercase tracking-widest animate-in fade-in slide-in-from-top-1">
                    Please enter a valid email address
                  </p>
                )}
              </div>

              <div className="space-y-4">
                <Button
                  onClick={() => initiateStripeCheckout(null, emailInput)}
                  disabled={!isEmailReady}
                  className="w-full rounded-full h-16 text-[11px] uppercase font-black tracking-[0.25em] bg-primary hover:bg-primary/90 shadow-xl shadow-primary/10 transition-all"
                >
                  Continue as Guest
                </Button>

                {/* Google Social Auth */}
                <Button
                  variant="outline"
                  onClick={handleGoogleLogin}
                  className="w-full rounded-full h-16 text-[11px] uppercase font-black tracking-[0.25em] border-2 border-muted hover:bg-muted/50 flex gap-3 items-center justify-center transition-all"
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  Sign in with Google
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
                  variant="ghost"
                  asChild
                  className="w-full rounded-full h-12 text-[10px] uppercase font-black tracking-[0.2em]"
                >
                  <Link href="/auth/sign-up?redirect=/cart">
                    Create Selo Account
                  </Link>
                </Button>

                <div className="text-center pt-2">
                  <span className="text-xs text-muted-foreground font-medium">
                    Already have an account?{" "}
                  </span>
                  <Link
                    href="/auth/login?redirect=/cart"
                    className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    Sign In
                  </Link>
                </div>
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
