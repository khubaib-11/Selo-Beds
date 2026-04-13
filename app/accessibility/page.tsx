import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Accessibility, Eye, Keyboard, MonitorSpeaker } from "lucide-react";

export default function AccessibilityPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Header Section */}
        <div className="space-y-6 mb-16">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            Digital Inclusion
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Accessibility Statement
          </h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">
            Last Updated: April 2026
          </p>
        </div>

        {/* Introduction Notice */}
        <div className="bg-primary text-primary-foreground border border-primary/20 rounded-2xl p-6 mb-12 flex items-start gap-4">
          <Accessibility
            className="shrink-0 mt-1"
            size={24}
          />
          <p className="text-sm leading-relaxed">
            At Selo Beds, we believe that a great night's sleep should be
            accessible to everyone—and that journey starts right here on our
            website. We are actively committed to ensuring digital accessibility
            for people with disabilities.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12 text-muted-foreground leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              Our Standard
            </h2>
            <p>
              We are continuously improving the user experience for everyone and
              applying the relevant accessibility standards. Our goal is to
              adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 at
              the AA level. These guidelines explain how to make web content
              more accessible for people with a wide array of disabilities and
              more user-friendly for everyone.
            </p>
          </section>

          <section className="space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              What we are doing
            </h2>
            <p>
              We have built our website with modern technologies designed to
              support assistive devices. Here are some of the active steps we
              take:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="bg-muted/30 border border-border p-6 rounded-2xl space-y-3">
                <MonitorSpeaker
                  className="text-primary"
                  size={20}
                />
                <h3 className="font-bold text-foreground uppercase tracking-tight text-sm">
                  Screen Readers
                </h3>
                <p className="text-sm">
                  We use semantic HTML and ARIA labels to ensure our store can
                  be navigated clearly via screen-reading software.
                </p>
              </div>

              <div className="bg-muted/30 border border-border p-6 rounded-2xl space-y-3">
                <Keyboard
                  className="text-primary"
                  size={20}
                />
                <h3 className="font-bold text-foreground uppercase tracking-tight text-sm">
                  Keyboard Navigation
                </h3>
                <p className="text-sm">
                  Our menus, product configurators, and checkout flows are
                  designed to be fully navigable using only a keyboard.
                </p>
              </div>

              <div className="bg-muted/30 border border-border p-6 rounded-2xl space-y-3">
                <Eye
                  className="text-primary"
                  size={20}
                />
                <h3 className="font-bold text-foreground uppercase tracking-tight text-sm">
                  Visual Clarity
                </h3>
                <p className="text-sm">
                  We enforce strict color contrast ratios and avoid using color
                  as the only visual means of conveying information.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-black uppercase tracking-tight text-foreground">
              Known Limitations
            </h2>
            <p>
              While we strive to make Selo Beds as accessible as possible, there
              may be some limitations. As a growing e-commerce platform, we
              occasionally use third-party plugins (like external payment
              gateways) that we do not directly control. If you encounter an
              accessibility barrier with any part of our checkout process,
              please let us know immediately so we can assist you directly.
            </p>
          </section>

          {/* Contact Section within Policy */}
          <section className="bg-background border border-border rounded-3xl p-8 mt-12">
            <h2 className="text-xl font-black uppercase tracking-tight text-foreground mb-4">
              Feedback & Support
            </h2>
            <p className="mb-6">
              We welcome your feedback on the accessibility of Selo Beds. If you
              encounter accessibility barriers on our site, or if you need
              assistance completing an order, please contact our team:
            </p>
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-primary mb-1">
                  Email Support
                </span>
                <Link
                  href="/contact"
                  className="font-bold underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  accessibility@selobeds.co.uk
                </Link>
                <p className="text-xs mt-2">
                  We aim to respond to accessibility feedback within 1 business
                  day.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
