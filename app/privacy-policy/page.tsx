import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Header Section */}
        <div className="space-y-6 mb-16">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            Legal & Compliance
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
            Last Updated: April 2026
          </p>
        </div>

        {/* Introduction Notice */}
        <div className="bg-muted/30 border border-border rounded-2xl p-6 mb-12 flex items-start gap-4">
          <ShieldAlert
            className="text-primary shrink-0 mt-1"
            size={24}
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            At Selo Beds, we take your privacy seriously. We only collect the
            data we absolutely need to deliver your mattress and provide
            excellent support. We will never sell your personal information to
            third-party marketers.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12 text-muted-foreground leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              1. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us when you
              make a purchase, create an account, or contact our customer
              support team. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Contact Information:</strong> Your name, email address,
                and phone number.
              </li>
              <li>
                <strong>Delivery Details:</strong> Your shipping address and
                billing address.
              </li>
              <li>
                <strong>Payment Information:</strong> Processed securely via our
                payment partners (Stripe and Klarna). We do not store your full
                credit card details on our servers.
              </li>
              <li>
                <strong>Communication Records:</strong> Emails or messages sent
                to our support team regarding your order or trial period.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect for the following essential
              business purposes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                To process your order and deliver your mattress from our Tyseley
                hub to your home.
              </li>
              <li>
                To send you transactional emails (order confirmations, delivery
                tracking, and return processing).
              </li>
              <li>
                To manage your 100-Night Trial and process any potential refunds
                or charity collections.
              </li>
              <li>
                To comply with UK tax laws and maintain accurate financial
                records.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              3. Information Sharing & Third Parties
            </h2>
            <p>
              We do not sell your data. We only share your information with
              trusted third-party service providers who assist us in operating
              our business. These include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Logistics Partners:</strong> Local couriers who need
                your address and phone number to deliver or collect your
                mattress.
              </li>
              <li>
                <strong>Payment Processors:</strong> Stripe and Klarna, to
                securely handle your transactions and financing.
              </li>
              <li>
                <strong>Cloud Infrastructure:</strong> Secure databases
                (Supabase) and email routing services (Resend) used to run our
                website operations.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              4. Cookies & Tracking
            </h2>
            <p>
              Our website uses essential cookies to ensure the shopping cart
              functions correctly and to securely process your checkout. We may
              also use basic, anonymized analytics to understand how many people
              visit our site, but we do not use invasive tracking pixels to
              follow you across the internet.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              5. Your UK GDPR Rights
            </h2>
            <p>
              Under the UK General Data Protection Regulation (UK GDPR), you
              have specific rights regarding your personal data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Right to Access:</strong> You can request a copy of the
                personal data we hold about you.
              </li>
              <li>
                <strong>Right to Erasure:</strong> You can ask us to delete your
                data (&quot;Right to be Forgotten&quot;), provided we are not
                legally required to keep it for tax/accounting purposes.
              </li>
              <li>
                <strong>Right to Correction:</strong> You can ask us to fix any
                inaccurate data we have on file.
              </li>
            </ul>
          </section>

          {/* Contact Section within Policy */}
          <section className="bg-background border border-border rounded-3xl p-8 mt-12">
            <h2 className="text-xl font-black uppercase tracking-tight text-foreground mb-4">
              6. Contacting the Data Controller
            </h2>
            <p className="mb-6">
              Selo Beds is the data controller for your personal information. If
              you wish to exercise any of your privacy rights, or if you have
              questions about this policy, please reach out to us:
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  Email Us
                </span>
                <Link
                  href="/contact"
                  className="font-bold underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  privacy@selobeds.co.uk
                </Link>
              </div>
              {/* <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  Write to Us
                </span>
                <p className="font-medium text-sm">
                  Selo Beds Distribution Hub
                  <br />
                  Tyseley, Birmingham
                  <br />
                  West Midlands, UK
                </p>
              </div> */}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
