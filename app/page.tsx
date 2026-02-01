import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { CollectionGrid } from "@/components/CollectionGrid";
import { Suspense } from "react";
import { Reviews } from "@/components/Reviews";
import { Newsletter } from "@/components/Newsletter";
import { FAQ } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { SleepQuiz } from "@/components/SleepQuiz";

export default function Page() {
  return (
    <>
      <Hero />
      <Features />
      <Suspense fallback={<ProductShowcaseSkeleton />}>
        <CollectionGrid />
      </Suspense>
      <SleepQuiz />
      <Reviews />
      <Newsletter />
      <FAQ />
      <Footer />
    </>
  );
}

function ProductShowcaseSkeleton() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="h-10 w-64 bg-gray-200 dark:bg-gray-800 rounded mx-auto mb-12 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col border rounded-lg overflow-hidden h-[450px] animate-pulse bg-white dark:bg-gray-950"
            >
              <div className="h-60 bg-gray-200 dark:bg-gray-800" />
              <div className="flex-1 p-6 space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
