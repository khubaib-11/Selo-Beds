import { Star } from "lucide-react";
import { Badge } from "./ui/badge";

const REVIEWS = [
  {
    name: "James L.",
    role: "Side Sleeper",
    content:
      "I've struggled with lower back pain for years. After just one week on this mattress, I'm waking up refreshed. The support is unparalleled.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "Verified Buyer",
    content:
      "The delivery was seamless, and the 100-night trial gave me the peace of mind I needed. It's the perfect balance of soft and firm.",
    rating: 5,
  },
  {
    name: "David K.",
    role: "Hot Sleeper",
    content:
      "Finally, a mattress that actually stays cool. The breath-ability is incredible. No more waking up in the middle of the night overheated.",
    rating: 5,
  },
  {
    name: "Elena R.",
    role: "Verified Buyer",
    content:
      "Beautifully designed. It looks as good as it feels. My bedroom feels like a five-star hotel now.",
    rating: 4,
  },
];

export function Reviews() {
  return (
    <section className="w-full py-24 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-foreground">
            Trusted by Thousands of Sleepers
          </h2>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5 fill-primary text-primary"
              />
            ))}
            <span className="ml-2 font-medium">4.9/5 Average Rating</span>
          </div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {REVIEWS.map((review, index) => (
            <div
              key={index}
              className="break-inside-avoid p-8 rounded-3xl bg-background border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary"
                    />
                  ))}
                </div>

                <p className="text-foreground leading-relaxed italic">
                  &quot;{review.content}&quot;
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div>
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {review.role}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-none text-[10px] uppercase tracking-tighter"
                  >
                    Verified
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      Í
    </section>
  );
}
