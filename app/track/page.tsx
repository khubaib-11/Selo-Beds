"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Database } from "@/database.types";
import Image from "next/image";

type OrderWithItems = Database["public"]["Tables"]["orders"]["Row"] & {
  items?: {
    name: string;
    image: string;
    size: string;
    quantity: number;
    price: number;
  }[];
};

function TrackingContent() {
  const searchParams = useSearchParams();
  const autoSessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<OrderWithItems | null>(null);
  const [form, setForm] = useState({ tracking: "", email: "" });

  const supabase = createClient();

  // We wrap the fetch logic in useCallback so it can be used by both the form and the auto-load
  const fetchOrder = useCallback(
    async (params: {
      tracking?: string;
      email?: string;
      sessionId?: string;
    }) => {
      setLoading(true);
      let query = supabase.from("orders").select(`
        *,
        order_items (
          quantity,
          price_at_purchase,
          products (
            name,
            image_url
          )
        )
      `);

      if (params.sessionId) {
        query = query.eq("stripe_session_id", params.sessionId);
      } else {
        query = query
          .ilike("tracking_number", params.tracking || "")
          .ilike("email", params.email || "");
      }

      const { data, error } = await query.maybeSingle();

      if (error || !data) {
        if (!params.sessionId)
          toast.error("Order not found. Check your details.");
        setLoading(false);
        return;
      }

      // Map Supabase relationships to the expected component structure
      const formattedOrder: OrderWithItems = {
        ...data,
        items:
          data.order_items?.map((item) => ({
            name: item.products?.name || "Mattress",
            image: item.products?.image_url || "/sleepQuiz.png",
            size: "Standard",
            quantity: item.quantity ?? 1,
            price: item.price_at_purchase,
          })) || [],
      };

      setOrder(formattedOrder);
      setLoading(false);
    },
    [supabase],
  );

  // Auto-load if session_id is in URL
  useEffect(() => {
    if (autoSessionId) {
      fetchOrder({ sessionId: autoSessionId });
    }
  }, [autoSessionId, fetchOrder]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary/20" />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] animate-pulse">
          Locating Order...
        </p>
      </div>
    );
  }

  if (order) {
    return (
      <main className="container mx-auto px-4 py-20 max-w-4xl">
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={() => setOrder(null)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} /> Track different order
          </button>
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
            {order.status}
          </Badge>
        </div>

        <div className="rounded-[3rem] border border-border bg-muted/10 p-8 md:p-16 space-y-12">
          <header className="space-y-2">
            <h1 className="text-4xl font-black uppercase tracking-tighter">
              Order {order.tracking_number}
            </h1>
            <p className="text-sm text-muted-foreground italic">
              Confirmed on {new Date(order.created_at).toLocaleDateString()}
            </p>
          </header>

          {/* Render Order Items */}
          <div className="space-y-6">
            {order.items?.map((item, i: number) => (
              <div
                key={i}
                className="flex items-center gap-6 border-b border-border/50 pb-6 last:border-0"
              >
                <div className="h-24 w-24 rounded-3xl bg-muted overflow-hidden shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                    width={240}
                    height={240}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl">{item.name}</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    {item.size} • Qty {item.quantity}
                  </p>
                </div>
                <p className="font-black text-xl">${item.price}</p>
              </div>
            ))}
          </div>

          <div className="pt-8 flex justify-between items-end border-t border-border">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Ship To
              </p>
              <p className="text-sm font-bold">
                {order.email || "Verified Customer"}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                Total Paid
              </p>
              <p className="text-4xl font-black tracking-tighter">
                ${order.total_amount}
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-32 flex flex-col items-center">
      <div className="max-w-md w-full space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black uppercase tracking-tighter">
            Track Order
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Enter your details below to see your mattress journey.
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchOrder(form);
          }}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest ml-4 opacity-50">
              Tracking Number
            </label>
            <Input
              placeholder="E.G. 5A2F9B1"
              className="rounded-full h-16 px-8 border-2 bg-muted/10 text-center uppercase font-mono"
              value={form.tracking}
              onChange={(e) => setForm({ ...form, tracking: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest ml-4 opacity-50">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="The email used at checkout"
              className="rounded-full h-16 px-8 border-2 bg-muted/10 text-center"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <Button className="w-full h-16 rounded-full font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/20 transition-all active:scale-95">
            Locate My Order
          </Button>
        </form>
      </div>
    </main>
  );
}

export default function TrackingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary/20" />
        </div>
      }
    >
      <TrackingContent />
    </Suspense>
  );
}

// Simple Badge Component if not using shadcn badge
function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      {children}
    </span>
  );
}
