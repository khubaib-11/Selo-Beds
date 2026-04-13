import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

// Make sure your RESEND_API_KEY is in your .env file
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, orderNumber, message } = body;

    // 1. Save the message to Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert([{ name, email, order_number: orderNumber, message }]);

    if (dbError) throw new Error("Database error");

    // 2. Send an Alert to YOU (The Business Owner)
    await resend.emails.send({
      from: "Selo System <support@shop.selobeds.co.uk>", // Using your verified domain
      to: "khubaibsajid11@gmail.com", // PUT YOUR ACTUAL EMAIL HERE
      subject: `New Support Request from ${name}`,
      text: `You have a new message from the website!\n\nName: ${name}\nEmail: ${email}\nOrder: ${orderNumber || "N/A"}\nMessage:\n${message}\n\nTo reply, just email them back at ${email}.`,
    });

    // 3. Send an Auto-Reply to the CUSTOMER
    await resend.emails.send({
      from: "Selo Beds Support <support@shop.selobeds.co.uk>",
      to: email,
      subject: "We've received your message!",
      html: `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff; color: #1a1a1a;">
      
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="margin: 0; font-size: 24px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px;">SELO BEDS</h1>
        <p style="margin: 5px 0 0; font-size: 12px; color: #666666; text-transform: uppercase; letter-spacing: 1px;">Customer Support</p>
      </div>

      <div style="background-color: #f4f4f5; border-radius: 16px; padding: 40px; margin-bottom: 30px;">
        <p style="margin-top: 0; font-size: 16px; line-height: 24px;">Hi ${name},</p>
        <p style="font-size: 16px; line-height: 24px;">Thanks for reaching out! This is an automated note to let you know we've safely received your message. Our Birmingham-based team will review it and get back to you within 24 hours.</p>

        <div style="margin: 30px 0; padding: 20px; background-color: #ffffff; border-left: 4px solid #1a1a1a; border-radius: 0 8px 8px 0; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
          <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; color: #a1a1aa;">For your records, you sent:</p>
          <p style="margin: 0; font-size: 15px; line-height: 24px; color: #3f3f46; font-style: italic;">"${message}"</p>
        </div>

        <p style="margin-bottom: 0; font-size: 16px; line-height: 24px;">Best regards,<br><strong style="font-weight: 700;">The Selo Beds Team</strong></p>
      </div>

      <div style="text-align: center; border-top: 1px solid #e5e5e5; padding-top: 30px;">
        <p style="margin: 0; font-size: 12px; color: #a1a1aa;">Selo Beds Distribution Hub</p>
        <p style="margin: 5px 0 0; font-size: 12px; color: #a1a1aa;">Tyseley, Birmingham, West Midlands</p>
      </div>

    </div>
  `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log("Error occurred when sending email", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
