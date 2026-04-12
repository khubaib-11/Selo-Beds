import { MapPin, MapPinHouse, Truck } from "lucide-react";
import Image from "next/image";
import Map from "../app/assets/public/map.webp";
import { Badge } from "./ui/badge";

export function DeliveryMap() {
  return (
    <section className="w-full py-24 bg-muted/30 border-y border-border/50 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="border-primary text-primary px-4 py-1 uppercase tracking-[0.2em] text-[10px] font-bold"
              >
                Local Logistics
              </Badge>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase">
                Free Same-Day <br />
                <span className="text-primary">Delivery Zone</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                We operate our own fleet of Clean Air Zone compliant vehicles.
                If you live within a 10-mile radius of our Birmingham warehouse,
                delivery is 100% free.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex gap-4 items-start">
                <div className="bg-background p-3 rounded-full shadow-sm border border-border shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1">
                    Key Areas
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    City Centre, Digbeth, Jewellery Quarter, Edgbaston,
                    Solihull, Handsworth wood, Sutton Coldfield, Erdington, and
                    more ...
                  </p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="bg-background p-3 rounded-full shadow-sm border border-border shrink-0">
                  <Truck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold uppercase tracking-widest text-sm mb-1">
                    Cutoff Time
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Order by 12:00 PM for guaranteed same-day arrival. Orders
                    after 12:00 PM are guaranteed for next-day delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stylized Map Visual */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative aspect-square md:aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden bg-background border border-border shadow-2xl">
              {/* 1. The Static Custom Map Image */}
              <Image
                src={Map}
                alt="Birmingham Delivery Radius Map"
                fill
                className="object-cover"
                priority
              />

              {/* Optional: Subtle darkened overlay to ensure glowing icons pop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-transparent to-black/20 pointer-events-none" />

              {/* 2. The Free Delivery Radius Overlay (Centered) - Now with a VISIBLE Border */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[75%] aspect-square rounded-full bg-primary/5 border-2 border-primary/60 backdrop-blur-[.5px] pointer-events-none z-10" />

              {/* 3. The HQ / Warehouse Pin (Dead Center) using MapPinHouse */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-30 group">
                <div className="relative flex items-center justify-center">
                  {/* Radar Pulse Effect */}
                  <div className="absolute w-16 h-16 bg-primary/20 rounded-full animate-ping opacity-75" />
                  <div className="absolute w-10 h-10 bg-primary/40 rounded-full animate-pulse" />
                  {/* Core Icon Pin */}
                  <div className="bg-background p-2.5 rounded-full shadow-[0_0_25px_rgba(var(--primary),0.8)] z-10 border-2 border-primary">
                    <MapPinHouse
                      className="w-6 h-6 text-primary"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                {/* Label */}
                <span className="mt-3 font-black uppercase tracking-[0.2em] text-[10px] bg-background/90 backdrop-blur-md px-4 py-2 rounded-full border border-border shadow-2xl text-primary whitespace-nowrap">
                  HQ (Tyseley)
                </span>
              </div>

              {/* 4. Secondary Pin: City Centre / Digbeth (Top Left of Center) using MapPin */}
              {/* Adjust top-[%] and left-[%] values to match your specific map image */}
              <div className="absolute top-[38%] left-[42%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-crosshair z-20">
                <div className="relative">
                  {/* Subtle white glow on standard pins */}
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-background p-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.7)] border-2 border-white/50 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                    <MapPin
                      className="w-4 h-4 text-white group-hover:text-primary transition-colors"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                {/* Tooltip on hover */}
                <span className="absolute top-9 font-bold uppercase tracking-widest text-[9px] bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white z-40">
                  City Centre
                </span>
              </div>

              {/* 5. Secondary Pin: Solihull (Bottom Right of Center) using MapPin */}
              <div className="absolute top-[72%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-crosshair z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-background p-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.7)] border-2 border-white/50 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                    <MapPin
                      className="w-4 h-4 text-white group-hover:text-primary transition-colors"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <span className="absolute top-9 font-bold uppercase tracking-widest text-[9px] bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white z-40">
                  Solihull
                </span>
              </div>

              {/* 6. Secondary Pin: Sutton Coldfield (Top Right) using MapPin */}
              <div className="absolute top-[20%] left-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-crosshair z-20">
                <div className="relative">
                  <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="bg-background p-1.5 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.7)] border-2 border-white/50 group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                    <MapPin
                      className="w-4 h-4 text-white group-hover:text-primary transition-colors"
                      strokeWidth={2.5}
                    />
                  </div>
                </div>
                <span className="absolute top-9 font-bold uppercase tracking-widest text-[9px] bg-background/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-border opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-white z-40">
                  Sutton Coldfield
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
