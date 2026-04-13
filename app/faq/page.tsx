"use client";

import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FAQPage() {
  // Anti-spam email obfuscation
  // Bots cannot read this because the email is never fully written in the code
  const handleEmailClick = () => {
    const user = "support";
    const domain = "selobeds.co.uk";
    window.location.href = `mailto:${user}@${domain}?subject=Selo%20Beds%20Support`;
  };

  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-16 md:mb-24">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            Knowledge Base
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our mattresses, delivery, and the
            100-night trial.
          </p>
        </div>

        <div className="space-y-16">
          {/* Section: Delivery & Setup */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight border-b border-border pb-4">
              Delivery & Setup
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left font-bold uppercase tracking-wide">
                  Does the mattress come compressed in a box?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  No, and that is by design! We never crush, roll, or compress
                  our mattresses. Rolling a mattress damages the edge support
                  and traps chemical smells. Your Selo mattress arrives in its
                  true form, structurally perfect and ready to sleep on the
                  second it comes through your door.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left font-bold uppercase tracking-wide">
                  How much does delivery cost?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  Delivery is completely free. We believe that premium products
                  shouldn&apos;t come with hidden shipping fees at checkout.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left font-bold uppercase tracking-wide">
                  Will you take away my old mattress?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  Currently, we do not offer an old mattress removal service. We
                  recommend contacting your local council, as many offer free or
                  low-cost bulk collection services for large furniture items.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Section: Trial & Returns */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight border-b border-border pb-4">
              100-Night Trial & Returns
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left font-bold uppercase tracking-wide">
                  How does the 100-Night Trial work?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  Your 100 nights begin the day your mattress is delivered. We
                  ask that you sleep on it for a minimum of 30 nights to allow
                  your body to adjust to proper spinal alignment. If you decide
                  it isn&apos;t for you anytime between day 30 and day 100, we
                  will help you arrange a return for a full refund.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left font-bold uppercase tracking-wide">
                  Do I have to squeeze it back into a box to return it?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  Not at all! If you decide to return your mattress, simply
                  reach out to our support team. We will arrange for our
                  specialized courier team to collect the mattress directly from
                  your home, completely free of charge. Once collected, we
                  process your full refund immediately.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Section: Product & Care */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight border-b border-border pb-4">
              Product & Care
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left font-bold uppercase tracking-wide">
                  What kind of bed frame do I need?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  Selo mattresses are designed to work on any firm, flat
                  surface. You can use a platform bed, a box spring, or a
                  slatted base. If using slats, please ensure the gaps between
                  the slats are no wider than 3 inches to properly support the
                  foam and maintain your 10-year warranty.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left font-bold uppercase tracking-wide">
                  Do I need to flip the mattress?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  No. Our mattresses are engineered with a specific
                  top-to-bottom layer structure (support base on the bottom,
                  comfort foams on top). However, we do recommend rotating the
                  mattress 180 degrees every 3 to 6 months to ensure even wear
                  over the years.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Section: Financing */}
          <section className="space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tight border-b border-border pb-4">
              Payment & Financing
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full"
            >
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left font-bold uppercase tracking-wide">
                  Do you offer financing options?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                  Yes! We have partnered with Klarna so you can split your
                  purchase into 3 equal, interest-free installments. Simply
                  select Klarna as your payment method during checkout.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>

        {/* Support CTA */}
        <div className="mt-24 bg-muted/40 rounded-[2.5rem] p-8 md:p-12 text-center flex flex-col items-center space-y-6 border border-border/50">
          <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center shadow-sm">
            <MessageCircle
              className="text-primary"
              size={28}
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black uppercase tracking-tighter">
              Still have questions?
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Our sleep experts are here to help. Reach out to us and we&apos;ll
              get back to you within 24 hours.
            </p>
          </div>
          <div className="pt-4">
            <Button
              onClick={handleEmailClick}
              className="rounded-full px-12 font-bold uppercase tracking-widest text-xs h-14"
            >
              Email Support
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
