import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { LucideIcon, Moon, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TrialPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            Rest Easy Guarantee
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            100 Nights to fall in love.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We believe a few minutes in a bright, high-pressure showroom
            isn&apos;t enough time to choose your bed. That&apos;s why we give
            you over three months to test it in the real world.
          </p>
        </div>

        {/* How It Works Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <StepCard
            icon={Truck}
            step="01"
            title="Delivered Ready"
            desc="Unlike bed-in-a-box brands, we never crush or roll our mattresses. Yours arrives in its true form, structurally perfect and ready to sleep on from night one."
          />
          <StepCard
            icon={Moon}
            step="02"
            title="The 30-Day Adjustment"
            desc="Your body needs time to unlearn its old sleeping habits. We require you to sleep on it for a minimum of 30 nights to let your spine adapt to proper support."
          />
          <StepCard
            icon={ShieldCheck}
            step="03"
            title="The Final Verdict"
            desc="If you don't absolutely love it between days 30 and 100, let us know. We'll help you arrange a local donation and process a full refund."
          />
        </div>

        {/* Policy Details (The Legal Protection) */}
        <div className="bg-muted/30 rounded-[3rem] p-8 md:p-16">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-1/3">
              <h2 className="text-2xl font-black uppercase tracking-tighter sticky top-32">
                The Fine Print
              </h2>
            </div>

            <div className="md:w-2/3 space-y-12">
              <PolicyItem
                title="The 30-Day Minimum"
                content="A new mattress is like a new pair of shoes—it needs to be broken in. Because your muscles are used to overcompensating for your old, sagging mattress, you might experience slight stiffness during the first few weeks as your posture corrects itself. Therefore, we require all customers to try the mattress for at least 30 nights before initiating a return."
              />
              <PolicyItem
                title="Condition Requirements"
                content="To qualify for a return, the mattress must be in good, donatable condition. We highly recommend using a waterproof mattress protector. Mattresses with stains, tears, odors, or damage caused by improper foundations will not be eligible for a refund."
              />
              <PolicyItem
                title="How Returns Work"
                content="We make the return process as painless as possible. If you decide to return your mattress, simply reach out to our team. We will arrange for a specialized courier to collect the unboxed mattress directly from your bedroom at no cost to you. Once the mattress is loaded onto the truck, we will immediately process your full refund."
              />
              <PolicyItem
                title="Household Limit"
                content="To prevent abuse of our trial system, the 100-night trial is limited to one mattress return per household or shipping address per year."
              />
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-24 space-y-8">
          <h3 className="text-3xl font-black uppercase tracking-tighter">
            Ready for better sleep?
          </h3>
          <Button
            asChild
            className="rounded-full px-12 py-8 text-lg font-bold uppercase tracking-widest"
          >
            <Link href="/">Shop Collections</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

{
  /* Helper Components */
}
function StepCard({
  icon: Icon,
  step,
  title,
  desc,
}: {
  icon: LucideIcon;
  step: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-background border border-border rounded-[2rem] p-8 shadow-sm relative overflow-hidden group hover:border-primary/50 transition-colors">
      <div className="absolute -right-4 -top-4 text-9xl font-black text-muted/20 select-none group-hover:text-primary/5 transition-colors">
        {step}
      </div>
      <div className="relative z-10 space-y-6">
        <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          <Icon
            className="text-primary"
            size={24}
          />
        </div>
        <div className="space-y-3">
          <h3 className="font-bold uppercase tracking-wide text-lg">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    </div>
  );
}

function PolicyItem({ title, content }: { title: string; content: string }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-bold uppercase tracking-widest text-foreground">
        {title}
      </h4>
      <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
        {content}
      </p>
    </div>
  );
}
