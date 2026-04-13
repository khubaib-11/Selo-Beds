import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ShieldCheck, XCircle } from "lucide-react";

export default function WarrantyPage() {
  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            Our Quality Promise
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            The 10-Year Selo Warranty
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We build our mattresses to last. If yours fails due to a
            manufacturing defect within the first decade, we’ll repair or
            replace it. Simple as that.
          </p>
        </div>

        {/* Education Section: Guarantee vs Warranty */}
        <div className="bg-muted/30 rounded-[2rem] p-8 md:p-12 mb-24 border border-border/50">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/2 space-y-4">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                Wait, what about the 100-Night Trial?
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                It&apos;s easy to get these confused. Our{" "}
                <strong>100-Night Trial is a Guarantee</strong>—it ensures you
                actually find the bed comfortable. This{" "}
                <strong>10-Year Warranty</strong> protects you against physical
                manufacturing defects long after the trial ends.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-2 gap-4 w-full">
              <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">
                  The Guarantee
                </span>
                <p className="font-bold text-sm">
                  &quot;I don&apos;t like how it feels.&quot;
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  (Covered for 100 Nights)
                </p>
              </div>
              <div className="bg-background rounded-2xl p-6 shadow-sm border border-border">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-2 block">
                  The Warranty
                </span>
                <p className="font-bold text-sm">
                  &quot;The foam is structurally failing.&quot;
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  (Covered for 10 Years)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What is Covered vs Not Covered */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          {/* Covered */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <CheckCircle2
                className="text-green-500"
                size={28}
              />
              <h3 className="text-2xl font-black uppercase tracking-tight">
                What is Covered
              </h3>
            </div>
            <ul className="space-y-6">
              <CoverageItem
                title="Visible Indentations"
                desc="Deterioration causing the mattress to have a visible indentation greater than 1.5 inches that is not associated with an improper foundation."
              />
              <CoverageItem
                title="Physical Flaws"
                desc="Any physical flaw in the mattress that causes the foam materials to split or crack, despite normal usage and proper handling."
              />
              <CoverageItem
                title="Cover Defects"
                desc="Manufacturing defects in the cover assembly, such as unraveling seams or broken zippers (covered for the first 2 years)."
              />
            </ul>
          </div>

          {/* Not Covered */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 border-b border-border pb-4">
              <XCircle
                className="text-destructive"
                size={28}
              />
              <h3 className="text-2xl font-black uppercase tracking-tight">
                What is NOT Covered
              </h3>
            </div>
            <ul className="space-y-6">
              <CoverageItem
                title="Normal Softening"
                desc="A normal increase in the softness of the foam pressure-relief material which does not affect the pressure-relieving qualities of the mattress."
              />
              <CoverageItem
                title="Improper Support"
                desc="Damage caused by an inadequate bed frame. Selo mattresses must be supported by a firm, flat surface or a slatted frame with gaps no larger than 3 inches."
              />
              <CoverageItem
                title="Abuse or Stains"
                desc="Damage caused by liquid spills, burns, cuts, tears, or stains. We highly recommend using a waterproof mattress protector."
              />
            </ul>
          </div>
        </div>

        {/* How to Claim */}
        <div className="bg-primary text-primary-foreground rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_8s_infinite]" />

          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-8">
            <ShieldCheck
              size={48}
              className="mx-auto text-primary-foreground/80"
            />
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter">
              How to file a claim
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed">
              If you believe your mattress is experiencing a manufacturing
              defect, we want to make it right. Please send an email to{" "}
              <strong>support@selobeds.co.uk</strong> with your order number, a
              brief description of the issue, and photos showing the defect.
            </p>
            <div className="bg-black/20 rounded-2xl p-6 text-sm text-left backdrop-blur-sm">
              <p className="font-bold mb-2 uppercase tracking-widest text-[10px]">
                Photo Tip for indentations:
              </p>
              <p className="text-primary-foreground/80">
                To help us process your claim quickly, place a broom handle or
                long straight edge across the surface of the mattress, and take
                a photo with a ruler measuring the gap from the straight edge to
                the deepest part of the sag.
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
function CoverageItem({ title, desc }: { title: string; desc: string }) {
  return (
    <li className="space-y-1">
      <h4 className="font-bold uppercase tracking-tight text-foreground">
        {title}
      </h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </li>
  );
}
