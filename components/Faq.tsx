import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const FAQS = [
  {
    question: "How does the 100-night trial work?",
    answer:
      "Your 100 nights begin the day your mattress is delivered. Because it takes time for your spine to adjust to proper support, we require a minimum 30-night break-in period. If you still don't love it between day 30 and 100, simply contact us. We will arrange a free courier collection from your home and issue a full refund.",
  },
  {
    question: "What makes your mattresses different?",
    answer:
      "Unlike 'bed-in-a-box' brands, we never crush, vacuum-pack, or roll our mattresses. Rolling damages internal support and traps chemical smells. Your Selo mattress arrives from our Tyseley hub in its true form—structurally perfect, featuring premium high-density foams, and ready to sleep on the second it comes through your door.",
  },
  {
    question: "Do I need a specific bed frame?",
    answer:
      "Selo mattresses are designed to work on any firm, flat surface, including platform beds, box springs, or slatted bases. To maintain proper support and keep your 10-year warranty valid, please ensure that if you use a slatted base, the gaps between the slats are no wider than 3 inches.",
  },
];

export function FAQ() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
            Questions & Answers
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
            Everything you need to know about the best sleep of your life.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            className="w-full"
          >
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-border py-2"
              >
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary hover:no-underline transition-colors py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Support Call to Action */}
        <div className="mt-16 p-8 rounded-3xl bg-muted/50 border border-border text-center">
          <p className="text-sm font-medium text-foreground">
            Still have questions?
            <Link href="/contact">
              <button className="ml-2 text-primary font-bold hover:underline">
                Contact our sleep experts
              </button>
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
