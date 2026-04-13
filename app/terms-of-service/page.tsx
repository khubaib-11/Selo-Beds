import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Scale } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Header Section */}
        <div className="space-y-6 mb-16">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            Legal & Compliance
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
            Last Updated: April 2026
          </p>
        </div>

        {/* Introduction Notice */}
        <div className="bg-muted/30 border border-border rounded-2xl p-6 mb-12 flex items-start gap-4">
          <Scale
            className="text-primary shrink-0 mt-1"
            size={24}
          />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Welcome to Selo Beds. These Terms of Service legally bind you and
            outline the rules for using our website and purchasing our products.
            By placing an order, you agree to these terms.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12 text-muted-foreground leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              1. General Conditions
            </h2>
            <p>
              We reserve the right to refuse service to anyone for any reason at
              any time. You understand that your content (not including credit
              card information), may be transferred unencrypted and involve
              transmissions over various networks. Credit card information is
              always encrypted during transfer over networks via our secure
              payment partners.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              2. Products & Pricing
            </h2>
            <p>
              Prices for our products are subject to change without notice. We
              reserve the right at any time to modify or discontinue a product
              without notice.
            </p>
            <p>
              We have made every effort to display as accurately as possible the
              colors and images of our products. We cannot guarantee that your
              computer monitor&apos;s display of any color will be accurate. All
              descriptions of products or product pricing are subject to change
              at anytime without notice, at the sole discretion of us.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              3. Delivery & Risk of Loss
            </h2>
            <p>
              Selo Beds operates primarily within the West Midlands, dispatching
              from our Tyseley hub. While we aim for specific delivery windows
              (such as same-day delivery for local orders), these are targets
              and not legally binding guarantees.
            </p>
            <p>
              The risk of loss and title for items purchased pass to you upon
              our delivery to the address provided during checkout. If a product
              arrives damaged in transit, it must be reported within 48 hours as
              outlined in our Delivery & Returns policy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              4. The 100-Night Trial & Warranties
            </h2>
            <p>
              Our 100-Night Trial and 10-Year Limited Warranty are subject to
              specific conditions, including a mandatory 30-night break-in
              period and requirements regarding proper bed foundations.
            </p>
            <p>
              Any attempt to abuse these policies (e.g., purposefully damaging a
              mattress or exceeding the household return limits) voids your
              eligibility. For the full legal boundaries of these offerings,
              please refer directly to our{" "}
              <Link
                href="/trial"
                className="underline underline-offset-4 hover:text-primary"
              >
                Trial Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/warranty"
                className="underline underline-offset-4 hover:text-primary"
              >
                Warranty Policy
              </Link>{" "}
              pages, which are incorporated into these Terms by reference.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              5. Limitation of Liability
            </h2>
            <p>
              Selo Beds is not a medical device company. Our mattresses are
              designed for general comfort and sleep support. We make no medical
              claims that our products will cure, treat, or prevent any medical
              condition, including back pain, insomnia, or orthopedic issues.
            </p>
            <p>
              In no case shall Selo Beds, our directors, officers, employees, or
              affiliates be liable for any injury, loss, claim, or any direct,
              indirect, incidental, punitive, or consequential damages of any
              kind, including, without limitation lost profits, lost revenue, or
              any similar damages arising from your use of any of our products.
              Our maximum liability to you will never exceed the total amount
              you paid for the product in question.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              6. Governing Law
            </h2>
            <p>
              These Terms of Service and any separate agreements whereby we
              provide you services shall be governed by and construed in
              accordance with the laws of England and Wales. Any disputes will
              be subject to the exclusive jurisdiction of the courts of England.
            </p>
          </section>

          {/* Contact Section within Policy */}
          <section className="bg-background border border-border rounded-3xl p-8 mt-12">
            <h2 className="text-xl font-black uppercase tracking-tight text-foreground mb-4">
              7. Contact Information
            </h2>
            <p className="mb-6">
              Questions about the Terms of Service should be sent to us via our
              contact page or by email:
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
                  legal@selobeds.co.uk
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
