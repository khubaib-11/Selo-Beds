import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { TablesInsert } from "@/database.types";

// Check this line carefully for extra braces!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

interface CartItem {
  productId: string;
  variantId?: string;
  name: string;
  size: string;
  image?: string;
  price: number;
  quantity: number;
}

export async function POST(req: Request) {
  try {
    const { items, userId, email, address } = await req.json();

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    // Safety check: if items is empty, Stripe will throw a 500
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    let totalAmount = 0;

    const line_items = items.map((item: CartItem) => {
      totalAmount += item.price * item.quantity;
      return {
        price_data: {
          currency: "gbp",
          product_data: {
            name: `${item.name} (${item.size})`,
            // Ensure image is a valid URL and not an empty string/null
            images: item.image ? [item.image] : [],
          },
          // IMPORTANT: Must be an integer (cents).
          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      };
    });

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card", "klarna"],
      line_items,
      phone_number_collection: {
        enabled: true,
      },

      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "GB"],
      },
    };

    // Pre-fill the email on the Stripe Checkout page for both guests and logged-in users
    if (email) {
      sessionConfig.customer_email = email;
    }

    // Attach the user ID to the Stripe session for easier webhook tracking
    if (userId) {
      sessionConfig.client_reference_id = userId;
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    // Initialize Supabase Admin Client using Service Role Key to bypass RLS for server-side inserts
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(
        "SUPABASE_SERVICE_ROLE_KEY is missing from your environment variables.",
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Ensure the user exists in the public.profiles table to prevent foreign key constraint errors
    if (userId) {
      await supabase.from("profiles").upsert({ id: userId });
    }

    // 1. Insert the pending Order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: userId || null,
        email: email,
        total_amount: totalAmount,
        stripe_session_id: session.id,
        status: "pending",
        shipping_address: address || {}, // Save the address if provided, otherwise fallback to empty object
      })
      .select()
      .single();

    if (orderError) {
      throw new Error(
        `Failed to save order to database: ${orderError.message}`,
      );
    }

    // 2. Insert the related Order Items
    const orderItems: TablesInsert<"order_items">[] = items.map(
      (item: CartItem) => ({
        order_id: order.id,
        product_id: item.productId,
        quantity: item.quantity,
        price_at_purchase: item.price,
        variant_id: item.variantId || null,
      }),
    );

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      throw new Error(
        `Failed to save order items to database: ${itemsError.message}`,
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("STRIKE API ERROR:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
