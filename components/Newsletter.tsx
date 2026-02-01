import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import Image from "next/image";

export function Newsletter() {
  return (
    /* We lock the background to a dark slate/black color so it doesn't flip to white in dark mode */
    <section className="w-full py-24 bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/newsletter.png"
          alt="Atmospheric background"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* We use a fixed dark gradient instead of theme-based 'foreground' */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-[#0a0a0a]/90" />
      </div>

      {/* Brand Glow - Stays crimson regardless of theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#ec003f]/20 blur-[120px] rounded-full pointer-events-none z-[1]" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <div className="space-y-3">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-2xl bg-[#ec003f]/10 border border-[#ec003f]/20 backdrop-blur-md">
                <Mail className="h-6 w-6 text-[#ec003f]" />
              </div>
            </div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-white">
              Join the Sleep Revolution
            </h2>
            <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed mx-auto">
              Subscribe to receive sleep tips, exclusive early access to sales,
              and <span className="text-white font-semibold">$50 off</span> your
              first order.
            </p>
          </div>

          <div className="w-full max-w-md space-y-2">
            <form className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                /* Hardcoded dark input styles to prevent theme flipping */
                className="bg-white/5 backdrop-blur-md border-white/10 text-white placeholder:text-gray-500 h-12 rounded-full px-6 focus-visible:ring-[#ec003f] focus-visible:border-[#ec003f] transition-all"
                required
              />
              <Button
                type="submit"
                className="bg-[#ec003f] hover:bg-[#ec003f]/90 text-white h-12 px-8 rounded-full font-bold transition-transform active:scale-95 shadow-lg shadow-[#ec003f]/20"
              >
                Get My Discount
              </Button>
            </form>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-4">
              No spam. Just better sleep. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
