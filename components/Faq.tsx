import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    question: "How does the 100-night trial work?",
    answer:
      "It's simple. Once your mattress arrives, you have 100 nights to sleep on it. If you decide it's not for you, we'll arrange a free pickup and provide a full refund. No questions asked, no hidden fees.",
  },
  {
    question: "What makes your mattresses different?",
    answer:
      "We use a proprietary blend of cooling gels and high-density support foams. Unlike traditional memory foam, our material responds to your body temperature to ensure you never wake up overheated.",
  },
  {
    question: "Do I need a specific bed frame?",
    answer:
      "Our mattresses work on almost any flat surface—including boxed springs, slatted bases, or even the floor. We just recommend ensuring slats are no more than 3 inches apart for optimal support.",
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
            <button className="ml-2 text-primary font-bold hover:underline">
              Contact our sleep experts
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}
