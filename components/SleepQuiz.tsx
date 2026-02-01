import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
// Assuming you moved the image to public as discussed previously for consistency
// If still in assets, the import works, but public/ is standard for Next.js images
import SleepQuizImage from "../app/assets/public/sleepQuiz.png";

export function SleepQuiz() {
  return (
    <section className="w-full py-12 md:py-20 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 items-stretch bg-background rounded-[2rem] overflow-hidden border border-border shadow-sm">
          {/* Content Side */}
          <div className="p-8 md:p-12 lg:p-16 space-y-8 flex flex-col justify-center">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                Finding the perfect sleep shouldn't be a guess.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                Take our 2-minute Sleep Quiz. We'll analyze your sleeping
                position, temperature preferences, and pressure points to
                recommend your ideal mattress.
              </p>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                Personalized Firmness Rating
              </li>
              <li className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                Material Recommendations
              </li>
              <li className="flex items-center gap-3 text-sm font-medium">
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                Exclusive Quiz-Only Discount
              </li>
            </ul>

            <div className="pt-2">
              <Button
                size="lg"
                className="w-full sm:w-auto rounded-full px-8 py-6 text-base font-bold transition-all hover:gap-4 group bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Start the Sleep Quiz
                <ArrowRight className="h-5 w-5 transition-all group-hover:translate-x-1" />
              </Button>
            </div>
          </div>

          {/* Responsive Image Side */}
          <div className="relative h-[300px] sm:h-[400px] lg:h-auto min-h-[300px] w-full">
            <Image
              src={SleepQuizImage}
              alt="Person sleeping comfortably"
              fill
              priority // High priority as it's a large mid-page banner
              sizes="(max-width: 768px) 100vw, 50vw" // Optimization: Load smaller image on mobile
              className="object-cover"
            />
            {/* Subtle brand overlay */}
            <div className="absolute inset-0 bg-primary/10 mix-blend-multiply pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
