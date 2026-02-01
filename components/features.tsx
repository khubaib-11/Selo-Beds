import { Moon, CreditCard, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: Moon,
    title: "100-Night Trial",
    description:
      "Try it risk-free in your own home. If it's not the best sleep of your life, we'll arrange a full refund and pick it up.",
  },
  {
    icon: CreditCard,
    title: "0% APR Financing",
    description:
      "Upgrade your sleep today and pay over time. 0% interest financing available for up to 36 months.",
  },
  {
    icon: ShieldCheck,
    title: "10-Year Guarantee",
    description:
      "Built to last. Every mattress is backed by a decade-long warranty covering materials and craftsmanship.",
  },
];

export function Features() {
  return (
    <section className="w-full py-24 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-y md:border-x border-border">
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="group p-8 md:p-12 transition-all duration-300 hover:bg-muted/50 cursor-default"
            >
              <div className="flex flex-col items-start space-y-6">
                {/* Icon wrapper with brand color transition */}
                <div className="relative">
                  <feature.icon
                    strokeWidth={1.5}
                    className="h-10 w-10 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-500"
                  />
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold uppercase tracking-widest text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Subtle Brand Accent Line */}
                <div className="h-0.5 w-8 bg-border group-hover:w-16 group-hover:bg-primary transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
