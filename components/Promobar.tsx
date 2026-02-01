"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import Link from "next/link";

export function PromoBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative w-full bg-primary text-primary-foreground py-2.5 px-4 overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_4s_infinite]" />

      <div className="container mx-auto flex items-center justify-center relative z-10">
        <div className="flex items-center gap-2 text-xs md:text-sm font-bold tracking-wider uppercase">
          <Sparkles className="h-4 w-4 animate-pulse" />
          <span>New Year Sale: Save up to $400 on select mattresses</span>
          <Link
            href="/mattresses"
            className="ml-2 underline underline-offset-4 hover:opacity-80 transition-opacity"
          >
            Shop Now
          </Link>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-0 p-1 hover:bg-black/10 rounded-full transition-colors"
          aria-label="Close promotion"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <style
        jsx
        global
      >{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
}
