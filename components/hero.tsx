import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import heroImage from "../app/assets/hero.png";

export function Hero() {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImage}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 md:px-6 flex flex-col items-center text-center gap-6">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white max-w-3xl">
          Sleep Better, Live Better
        </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-[600px]">
          Discover the perfect mattress for your sleep style. Premium comfort,
          exceptional support, and a 100-night trial.
        </p>
        <div className="flex gap-4">
          <Link href="/mattresses">
            <Button
              size="lg"
              className="font-semibold text-lg h-12 px-8"
            >
              Shop Mattresses
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
