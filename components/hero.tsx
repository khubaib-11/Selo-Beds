"use client";
import { Building2, Clock, MapPin, Truck } from "lucide-react";
import Image from "next/image";
import heroImage from "../app/assets/hero.png";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export function Hero() {
  return (
    <div className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* 1. Custom Animations */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes slowZoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-slow-zoom {
          animation: slowZoom 15s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
      `,
        }}
      />

      {/* 2. Background Image with Slow Zoom Effect */}
      <div className="absolute inset-0 z-0 bg-black">
        <Image
          src={heroImage}
          alt="Premium mattress delivery in Birmingham"
          fill
          className="object-cover opacity-60 animate-slow-zoom"
          priority
        />
        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90" />
      </div>

      {/* 3. Content */}
      <div className="relative z-10 container px-4 sm:px-6 flex flex-col items-center text-center gap-6 md:gap-8 py-16 sm:py-24 md:py-32">
        {/* Eyebrow Tag */}
        <div className="opacity-0 animate-fade-in-up">
          <span className="bg-white/10 text-white border border-white/20 px-4 sm:px-5 py-2 rounded-2xl sm:rounded-full uppercase tracking-[0.2em] text-[10px] sm:text-xs font-black backdrop-blur-md shadow-xl flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-0 text-center">
            <span>Bespoke Comfort</span>
            <span className="text-primary hidden sm:inline mx-2">•</span>
            <span>Handcrafted Quality</span>
          </span>
        </div>

        {/* Headline utilizing the brand's --primary color */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-white max-w-5xl leading-[1.1] opacity-0 animate-fade-in-up delay-100">
          Skip the 3-Week Wait. <br className="hidden md:block" />
          <span className="text-primary">
            Sleep on a Premium Mattress Tonight.
          </span>
        </h1>

        <p className="text-sm sm:text-base lg:text-lg text-white/80 font-medium max-w-2xl opacity-0 animate-fade-in-up delay-200 leading-relaxed tracking-wide px-2 sm:px-0">
          Designed for Birmingham. Choose between our luxury Hybrid or classic
          Pocket Spring mattresses. Order by 12 PM for 100% free same-day local
          delivery. Backed by our risk-free 100-night trial.
        </p>

        {/* Buttons utilizing CSS variable mappings */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto opacity-0 animate-fade-in-up delay-300 pt-2 sm:pt-4 px-4 sm:px-0">
          <Button
            asChild
            size="lg"
            className="h-12 sm:h-14 md:h-16 px-4 sm:px-6 md:px-10 rounded-full text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.15em] shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all w-full sm:w-auto"
          >
            <a href="#collectionsGrid">Shop In-Stock Mattresses</a>
          </Button>

          {/* 4. The Slide-Out Delivery Drawer (Sheet) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="lg"
                className="h-12 sm:h-14 md:h-16 px-4 sm:px-6 md:px-10 rounded-full text-[10px] sm:text-xs md:text-sm font-black uppercase tracking-[0.15em]  bg-white/5 backdrop-blur-md text-white hover:bg-white/10 border border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                variant="secondary"
              >
                See Delivery Details
              </Button>
            </SheetTrigger>

            {/* Drawer Content */}
            <SheetContent className="overflow-y-auto w-[80vw] sm:w-[400px] sm:max-w-md bg-background text-foreground border-border p-6 sm:p-10">
              <SheetHeader className="text-left mb-8">
                <SheetTitle className="text-xl font-black uppercase tracking-widest text-primary">
                  Free Same-Day Delivery
                </SheetTitle>
                <SheetDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed mt-2">
                  No waiting weeks for your new bed. We handle local logistics
                  so you can sleep better tonight.
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-8 sm:space-y-10 mt-4">
                {/* Feature 1 */}
                <div className="flex gap-4 sm:gap-6">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-base sm:text-lg uppercase tracking-wider">
                      The 12 PM Cutoff
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-1 sm:mt-2">
                      Order before 12:00 PM and we will deliver it today. Orders
                      placed after noon are guaranteed for next-day delivery.
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex gap-4 sm:gap-6">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-base sm:text-lg uppercase tracking-wider">
                      Local Birmingham Radius
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-1 sm:mt-2">
                      Free delivery covers a 10-mile radius of our warehouse,
                      including the City Centre, Digbeth, Jewellery Quarter,
                      Edgbaston, and Solihull.
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex gap-4 sm:gap-6">
                  <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-base sm:text-lg uppercase tracking-wider">
                      CAZ Compliant Vans
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-1 sm:mt-2">
                      Living inside the Clean Air Zone ring road? No problem.
                      Our delivery fleet is fully compliant with no hidden
                      surcharges.
                    </p>
                  </div>
                </div>

                {/* Feature 4 */}
                <div className="flex gap-4 sm:gap-6">
                  <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary shrink-0" />
                  <div>
                    <h4 className="font-bold text-base sm:text-lg uppercase tracking-wider">
                      Apartment Friendly
                    </h4>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mt-1 sm:mt-2">
                      Top floor with no lift? Our team brings your mattress
                      straight to your front door, removing the hassle of
                      city-center logistics.
                    </p>
                  </div>
                </div>

                {/* Action inside the drawer */}
                <div className="pt-8 mt-8 border-t border-border">
                  <SheetTrigger asChild>
                    <Button
                      asChild
                      size="lg"
                      className="w-full h-12 sm:h-14 rounded-full text-xs sm:text-sm font-black uppercase tracking-[0.15em] shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <a href="#collectionsGrid">View Mattresses Now</a>
                    </Button>
                  </SheetTrigger>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* 5. Trust Badge using the brand's --primary border */}
        <div className="mt-6 sm:mt-8 md:mt-12 opacity-0 animate-fade-in-up delay-400 w-full sm:w-auto px-4 sm:px-0">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-2xl sm:rounded-full flex items-center justify-center">
            <span className="text-white/90 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] flex flex-col sm:flex-row items-center text-center gap-1 sm:gap-0">
              <span>Local Birmingham Stock</span>
              <span className="hidden sm:inline mx-2 md:mx-3 text-primary">
                •
              </span>
              <span>Order before noon for delivery today</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
