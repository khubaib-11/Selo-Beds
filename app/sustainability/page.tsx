import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Leaf,
  Truck,
  Recycle,
  ShieldCheck,
  HeartHandshake,
  LucideIcon,
} from "lucide-react";

export default function SustainabilityPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            Our Responsibility
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Better sleep. <br className="hidden md:block" /> Smaller footprint.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Over 5 million mattresses end up in UK landfills every year. We are
            building a leaner, more responsible sleep company to help change
            that statistic.
          </p>
        </div>

        {/* Our Three Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <PillarCard
            icon={Truck}
            title="Local Distribution"
            desc="By operating our dispatch hub directly out of Tyseley, we minimize the transit distance for our West Midlands deliveries, significantly reducing our transport emissions compared to national retailers."
          />
          <PillarCard
            icon={ShieldCheck}
            title="Built to Last"
            desc="We never crush, vacuum-pack, or roll our mattresses into boxes. Preserving the structural integrity of the foam from day one ensures the bed lasts a full decade, preventing early replacement waste."
          />
          <PillarCard
            icon={HeartHandshake}
            title="Zero-Landfill Returns"
            desc="Mattresses returned during our 100-Night Trial are never thrown away. We actively re-route these lightly used beds to local charities like the British Heart Foundation to support the community."
          />
        </div>

        {/* Materials Section */}
        <div className="bg-muted/30 rounded-[3rem] p-8 md:p-16 border border-border/50 flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="md:w-1/2 space-y-6">
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Safe for you. <br /> Safe for the planet.
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We carefully source the materials inside every Selo bed. You spend
              a third of your life breathing in the air around your mattress,
              which is why we strictly avoid harmful volatile organic compounds
              (VOCs).
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <Leaf
                  className="text-primary"
                  size={20}
                />
                <span className="font-bold text-sm uppercase tracking-wide">
                  CertiPUR-US® Certified Foams
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Recycle
                  className="text-primary"
                  size={20}
                />
                <span className="font-bold text-sm uppercase tracking-wide">
                  Free of Ozone Depleters
                </span>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck
                  className="text-primary"
                  size={20}
                />
                <span className="font-bold text-sm uppercase tracking-wide">
                  No Heavy Metals or Formaldehyde
                </span>
              </li>
            </ul>
          </div>

          {/* Visual Graphic Area */}
          <div className="md:w-1/2 w-full aspect-square bg-background rounded-3xl border border-border flex items-center justify-center p-8 relative overflow-hidden shadow-sm">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="relative text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <Leaf
                  className="text-primary"
                  size={40}
                />
              </div>
              <h3 className="font-black text-xl uppercase tracking-widest">
                Clean Sleep
              </h3>
              <p className="text-sm text-muted-foreground">
                Rigorous independent testing ensures every layer meets the
                highest health and environmental standards.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

{
  /* Helper Component */
}
function PillarCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-background border border-border rounded-[2rem] p-8 shadow-sm hover:border-primary/50 transition-colors">
      <div className="h-12 w-12 bg-muted rounded-xl flex items-center justify-center mb-6">
        <Icon
          className="text-foreground"
          size={24}
        />
      </div>
      <h3 className="font-bold uppercase tracking-wide text-lg mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </div>
  );
}
