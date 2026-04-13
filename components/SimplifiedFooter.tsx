import Link from "next/link";
import { ShieldCheck, Lock, CreditCard, LifeBuoy } from "lucide-react";

export default function SimplifiedFooter() {
  return (
    <footer className="mt-auto py-8 border-t border-border bg-background">
      <div className="container mx-auto px-4 max-w-4xl flex flex-col items-center gap-8">
        {/* Trust Signals - Prominent but elegant */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 text-muted-foreground/80">
          <div className="flex items-center gap-2">
            <Lock size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              256-bit SSL Secure
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Stripe Payments
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest">
              Klarna Approved
            </span>
          </div>
        </div>

        {/* Links & Copyright - Minimal & Muted */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full border-t border-border/50 pt-6 gap-6">
          <div className="text-[10px] text-muted-foreground/60 uppercase tracking-[0.2em] font-bold text-center md:text-left">
            &copy; {new Date().getFullYear()} Selo Beds Ltd.
          </div>

          <div className="flex items-center justify-center gap-6 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            <Link
              href="/privacy-policy"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms-of-service"
              target="_blank"
              className="hover:text-primary transition-colors"
            >
              Terms
            </Link>

            {/* Visual Divider */}
            <div className="h-3 w-px bg-border hidden sm:block"></div>

            <Link
              href="/contact"
              target="_blank"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <LifeBuoy size={14} />
              Need Help?
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
