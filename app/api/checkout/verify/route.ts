// import { NextResponse } from "next/server";
// import Stripe from "stripe";
// import { createClient } from "@supabase/supabase-js";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2026-01-28.clover",
// });

// export async function POST(req: Request) {
//   try {
//     const { sessionId } = await req.json();

//     if (!sessionId) {
//       return NextResponse.json(
//         { error: "Missing session ID" },
//         { status: 400 },
//       );
//     }

//     // 1. Retrieve the completed session from Stripe
//     const session = await stripe.checkout.sessions.retrieve(sessionId);

//     console.log(session.customer_details);

//     // 2. Extract the shipping address Stripe collected
//     const full_name = session.customer_details?.name || "Customer";
//     const email = session.customer_details?.email;
//     const shippingAddress = session.customer_details?.address;
//     const phone = session.customer_details?.phone;

//     if (!shippingAddress || !phone) {
//       return NextResponse.json(
//         { error: "Missing shipping address or phone number" },
//         { status: 400 },
//       );
//     }

//     // 3. Initialize Supabase Admin Client
//     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
//     const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
//     const supabase = createClient(supabaseUrl, supabaseServiceKey);

//     // 4. Update the order in Supabase
//     const { data, error } = await supabase
//       .from("orders")
//       .update({
//         full_name: full_name,
//         email: email,
//         phone: phone,
//         shipping_address: shippingAddress,
//         status: "processing", // Update status to processing since they paid
//       })
//       .eq("stripe_session_id", sessionId)
//       .select()
//       .single();

//     if (error) throw error;

//     return NextResponse.json({ success: true, order: data });
//   } catch (error) {
//     const errorMessage =
//       error instanceof Error ? error.message : "An unknown error occurred";
//     console.error("Error verifying session:", errorMessage);
//     return NextResponse.json({ error: errorMessage }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { OrderConfirmationEmail } from "@/emails/OrderConfirmation";

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session ID" },
        { status: 400 },
      );
    }

    // 1. Retrieve the completed session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // 2. Extract the shipping address Stripe collected
    const full_name = session.customer_details?.name || "Customer";
    const email = session.customer_details?.email;
    const shippingAddress = session.customer_details?.address;
    const phone = session.customer_details?.phone;

    if (!shippingAddress || !phone) {
      return NextResponse.json(
        { error: "Missing shipping address or phone number" },
        { status: 400 },
      );
    }

    // 3. Initialize Supabase Admin Client
    // We use the service role key here to securely bypass RLS from the backend
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 🛑 4. IDEMPOTENCY CHECK: Prevent Duplicate Emails 🛑
    // Check if we already processed this session
    const { data: existingOrder, error: checkError } = await supabase
      .from("orders")
      .select("status, customer_notes, total_amount, id")
      .eq("stripe_session_id", sessionId)
      .single();

    if (checkError) {
      console.error("Error checking existing order:", checkError);
      // We don't throw here; let it attempt the update if it couldn't read for some reason
    }

    // If it's already marked as processing, the user refreshed the page.
    // Return success instantly and SKIP the update and emails.
    if (existingOrder?.status === "processing") {
      console.log(
        `Order ${existingOrder.id} already processed. Skipping duplicate dispatch.`,
      );
      return NextResponse.json({ success: true, order: existingOrder });
    }

    // 5. Update the order in Supabase
    const { data, error } = await supabase
      .from("orders")
      .update({
        full_name: full_name,
        email: email,
        phone: phone,
        shipping_address: shippingAddress,
        status: "processing", // Mark as processing so future checks skip emails
      })
      .eq("stripe_session_id", sessionId)
      .select()
      .single();

    if (error) throw error;

    // 6. Fire off Email Notifications (Non-blocking)
    if (data.email) {
      try {
        const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL!;
        const senderDomain = "orders@shop.selobeds.co.uk";

        // Promise.allSettled runs both requests concurrently.
        // If one fails, the other still succeeds, and the whole route doesn't crash.
        const emailResults = await Promise.allSettled([
          // Email 1: Customer Confirmation
          resend.emails.send({
            from: `Selo Beds <${senderDomain}>`,
            to: [data.email],
            subject: "Order Confirmed - Better Sleep is on the Way",
            react: OrderConfirmationEmail({
              customerName: data.full_name,
              orderId: data.id,
              totalAmount: data.total_amount,
              customerNotes: data.customer_notes || undefined,
            }),
          }),

          // Email 2: Admin Internal Alert
          resend.emails.send({
            from: `System Alert <${senderDomain}>`,
            to: [adminEmail],
            subject: `🚨 New Order: £${data.total_amount} - ${data.full_name}`,
            text: `A new order has been placed!\n\nCustomer: ${data.full_name}\nEmail: ${data.email}\nPhone: ${data.phone}\nOrder ID: ${data.id}\nAmount: £${data.total_amount}\nDelivery Notes: ${data.customer_notes || "None"}\n\nPlease check the admin dashboard for full shipping details.`,
          }),
        ]);

        // Log any email failures for internal monitoring
        emailResults.forEach((result, index) => {
          if (result.status === "rejected") {
            console.error(`Email attempt ${index + 1} failed:`, result.reason);
          } else if (result.value.error) {
            console.error(
              `Resend API Error (Email ${index + 1}):`,
              result.value.error,
            );
          }
        });
      } catch (emailError) {
        // This ensures the user still sees the "Success" screen even if Resend is completely down
        console.error("Critical failure during email dispatch:", emailError);
      }
    }

    return NextResponse.json({ success: true, order: data });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error verifying session:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
