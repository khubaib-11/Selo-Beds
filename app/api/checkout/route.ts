import { NextResponse } from "next/server";
import Stripe from "stripe";

// Check this line carefully for extra braces!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia", // Use the latest version or your preferred one
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    // Safety check: if items is empty, Stripe will throw a 500
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} (${item.size})`,
          // Ensure image is a valid URL and not an empty string/null
          images: item.image ? [item.image] : [],
        },
        // IMPORTANT: Must be an integer (cents).
        // We use Math.round to prevent decimals.
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cart`,
      shipping_address_collection: {
        allowed_countries: ["US", "GB"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    // This is the most important line for debugging:
    console.error("STRIKE API ERROR:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
