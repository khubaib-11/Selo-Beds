// app/profile/page.tsx
import { LogoutButton } from "@/components/logout-button";
import { Button } from "@/components/ui/button";
import { Tables } from "@/database.types";
import { createClient } from "@/lib/supabase/server";
import { Package, ShoppingBag, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

type OrderItemWithProduct = Pick<
  Tables<"order_items">,
  "quantity" | "price_at_purchase"
> & {
  products: Pick<Tables<"products">, "name" | "image_url"> | null;
};

type OrderWithItems = Tables<"orders"> & {
  order_items: OrderItemWithProduct[];
};

async function ProfileContent({
  searchParams,
}: {
  searchParams: Promise<{ recent?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const recentSessionId = resolvedSearchParams.recent;

  let orders: OrderWithItems[] = [];

  if (user) {
    // Member View: Fetch all their orders
    const { data } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          quantity,
          price_at_purchase,
          products (
            name,
            image_url
          )
        )
      `,
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    orders = (data as unknown as OrderWithItems[]) || [];
  } else if (recentSessionId) {
    // Guest View: Fetch only the order they just placed
    const { data } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          quantity,
          price_at_purchase,
          products (
            name,
            image_url
          )
        )
      `,
      )
      .eq("stripe_session_id", recentSessionId)
      .single();
    if (data) orders = [data as unknown as OrderWithItems];
  } else {
    // No user and no recent order? Send to login
    redirect("/auth/login");
  }

  const formattedOrders = orders.map((order) => ({
    id: order.id,
    tracking_number: order.tracking_number,
    status: order.status,
    created_at: order.created_at,
    total_amount: order.total_amount,
    items:
      order.order_items?.map((item) => ({
        name: item.products?.name || "Mattress",
        size: "Standard", // Can be updated if you add size/variants to the order_items schema
        quantity: item.quantity ?? 1,
        price: item.price_at_purchase,
        image: item.products?.image_url || "/sleepQuiz.png",
      })) || [],
  }));

  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
      {/* Left Column / Top Section - Profile Context */}
      <div className="w-full lg:w-1/3 shrink-0">
        <div className="sticky top-32 space-y-10">
          <div className="space-y-3">
            <h1 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter">
              {user ? "My Profile" : "Order Status"}
            </h1>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {user
                ? "Manage your account preferences and track your recent deliveries."
                : "Viewing your recent guest order. Create an account to track all your orders seamlessly."}
            </p>
          </div>

          {user ? (
            <div className="p-8 rounded-[2.5rem] bg-muted/20 border border-border shadow-sm flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <User
                    size={20}
                    strokeWidth={2.5}
                  />
                </div>
                <div className="overflow-hidden">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1">
                    Account Email
                  </h3>
                  <p
                    className="font-bold text-sm truncate"
                    title={user.email}
                  >
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="pt-6 border-t border-border/50">
                <LogoutButton />
              </div>
            </div>
          ) : (
            <Button
              asChild
              className="w-full h-14 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-primary/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link href="/auth/sign-up?redirect=/profile">
                Create an Account
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Right Column - Orders Content */}
      <div className="flex-1 space-y-8">
        <h2 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3 border-b border-border pb-6">
          <Package className="text-primary h-6 w-6" />{" "}
          {user ? "Order History" : "Recent Order"}
        </h2>

        <div className="grid gap-8">
          {formattedOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-muted/10 rounded-[2.5rem] border border-border border-dashed">
              <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center mb-6 shadow-sm border border-border">
                <ShoppingBag className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-2">
                No orders found
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mb-8 leading-relaxed">
                Looks like you haven&apos;t started your 100-night trial yet.
                Discover the perfect mattress today.
              </p>
              <Button
                asChild
                className="rounded-full px-10 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] h-14 shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Link href="/#collectionsGrid">Shop Collections</Link>
              </Button>
            </div>
          ) : (
            formattedOrders.map((order) => (
              <div
                key={order.id}
                className="group relative rounded-[2.5rem] border border-border bg-background p-8 sm:p-10 shadow-sm hover:shadow-xl transition-all duration-500 hover:border-primary/30"
              >
                {/* Modern Order Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-border/50">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                      Tracking Number
                    </span>
                    <p className="text-base sm:text-lg font-mono font-bold tracking-tight">
                      {order.tracking_number || "PENDING"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full border border-border shrink-0">
                    <div
                      className={`h-2 w-2 rounded-full ${order.status === "Delivered" ? "bg-muted-foreground" : "bg-primary animate-pulse"}`}
                    />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                      {order.status || "Processing"}
                    </span>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-6">
                  {order.items?.map((item, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 sm:gap-6"
                    >
                      <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-muted overflow-hidden border border-border/50">
                        <Image
                          src={item.image || "/sleepQuiz.png"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm sm:text-lg truncate">
                          {item.name}
                        </h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-widest mt-1">
                          {item.size}{" "}
                          <span className="mx-1 sm:mx-2 border-l border-border h-3 inline-block align-middle" />{" "}
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-black text-sm sm:text-lg tracking-tighter">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap justify-between items-end gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                      Placed On
                    </p>
                    <p className="text-xs sm:text-sm font-bold">
                      {new Date(order.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      Total Amount
                    </p>
                    <p className="text-2xl sm:text-3xl font-black tracking-tighter">
                      ${(order.total_amount || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ recent?: string }>;
}) {
  return (
    <main className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[40vh] text-sm font-bold uppercase tracking-widest text-muted-foreground animate-pulse">
            Loading Profile...
          </div>
        }
      >
        <ProfileContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
