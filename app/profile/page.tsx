// app/profile/page.tsx
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
// ... other imports

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: { recent?: string };
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const recentSessionId = searchParams.recent;

  let orders = [];

  if (user) {
    // Member View: Fetch all their orders
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    orders = data || [];
  } else if (recentSessionId) {
    // Guest View: Fetch only the order they just placed
    const { data } = await supabase
      .from("orders")
      .select("*")
      .eq("stripe_session_id", recentSessionId)
      .single();
    if (data) orders = [data];
  } else {
    // No user and no recent order? Send to login
    redirect("/auth/login");
  }

  return (
    <main className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            {user ? "Your Orders" : "Order Status"}
          </h1>
          <p className="text-muted-foreground">
            {user
              ? `Logged in as ${user.email}`
              : "Viewing your recent guest order."}
          </p>
        </header>

        <div className="grid gap-8">
          {orders.map((order) => (
            <div
              key={order.id}
              className="group relative rounded-[2.5rem] border border-border bg-muted/10 p-8 md:p-12 overflow-hidden transition-all hover:bg-muted/20"
            >
              {/* Modern Order Header */}
              <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                    Tracking Number
                  </span>
                  <p className="text-lg font-mono font-bold uppercase">
                    {order.tracking_number}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-6">
                {order.items?.map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-center gap-6"
                  >
                    <div className="h-20 w-20 rounded-2xl bg-muted overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{item.name}</h4>
                      <p className="text-xs text-muted-foreground uppercase tracking-widest">
                        {item.size} — Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-lg">${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="mt-10 pt-8 border-t border-border/50 flex flex-wrap justify-between items-end gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Placed On
                  </p>
                  <p className="text-sm font-bold">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                    Total Amount
                  </p>
                  <p className="text-3xl font-black tracking-tighter">
                    ${order.total_amount}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
