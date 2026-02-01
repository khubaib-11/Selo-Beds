import Link from "next/link";

export default function SimplifiedFooter() {
  return (
    <footer className="mt-20 py-12 border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center items-center gap-8 mb-6 opacity-50 grayscale">
          {/* Add small icons for Stripe, Klarna, Visa, Mastercard here */}
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Stripe
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Klarna
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest">
            SSL Secure
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Help</Link>
        </div>
        <p className="mt-6 text-[9px] text-muted-foreground/60 uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} Your Mattress Atelier
        </p>
      </div>
    </footer>
  );
}
