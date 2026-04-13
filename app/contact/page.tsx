"use client";

import { Footer } from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderNumber: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Anti-spam email obfuscation
  const handleEmailClick = () => {
    const user = "support";
    const domain = "selobeds.co.uk";
    window.location.href = `mailto:${user}@${domain}?subject=Selo%20Beds%20Customer%20Support`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        // Trigger the Success UI instead of just clearing the form
        setIsSent(true);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.log("Network error", err);
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <main className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-20">
          <Badge className="bg-primary/10 text-primary border-none uppercase tracking-widest text-[10px] px-3 py-1">
            We&apos;re Here To Help
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
            Get in touch.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            No endless hold music or automated phone menus. Just fast, helpful
            support from our sleep experts right here in Birmingham.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Left Column: Information Cards */}
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-8">
              Contact Information
            </h2>

            {/* Email Card */}
            <div className="bg-background border border-border rounded-[2rem] p-8 shadow-sm">
              <div className="h-10 w-10 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <Mail
                  className="text-primary"
                  size={20}
                />
              </div>
              <h3 className="font-bold uppercase tracking-wide text-base mb-2">
                Email Support
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                The fastest way to reach us. We aim to reply to all inquiries
                within 24 hours during the workweek.
              </p>
              <Button
                onClick={handleEmailClick}
                variant="outline"
                className="w-full rounded-full font-bold uppercase tracking-widest text-xs h-12"
              >
                Email Our Team
              </Button>
            </div>

            {/* HQ Card */}
            <div className="bg-background border border-border rounded-[2rem] p-8 shadow-sm">
              <div className="h-10 w-10 bg-muted rounded-xl flex items-center justify-center mb-6">
                <MapPin
                  className="text-foreground"
                  size={20}
                />
              </div>
              <h3 className="font-bold uppercase tracking-wide text-base mb-2">
                Distribution Hub
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Tyseley, Birmingham
                <br />
                West Midlands, UK
              </p>
              <p className="text-xs text-muted-foreground mt-4 italic">
                *Please note: This is our dispatch warehouse, not a public
                showroom. We do not accept walk-ins.
              </p>
            </div>

            {/* Hours Card */}
            <div className="flex items-start gap-4 p-4">
              <Clock
                className="text-muted-foreground mt-1"
                size={20}
              />
              <div>
                <h3 className="font-bold uppercase tracking-wide text-sm mb-1">
                  Operating Hours
                </h3>
                <p className="text-muted-foreground text-sm">
                  Monday - Friday: 9am - 5pm
                </p>
                <p className="text-muted-foreground text-sm">
                  Saturday & Sunday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Form / Success UI */}
          <div className="lg:col-span-7">
            <div className="bg-muted/30 rounded-[3rem] p-8 md:p-12 border border-border/50 h-full flex flex-col justify-center">
              {isSent ? (
                /* SUCCESS STATE UI */
                <div className="text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
                  <div className="mx-auto h-24 w-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8">
                    <CheckCircle2
                      className="text-green-500"
                      size={48}
                    />
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tight">
                    Message Sent!
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-md mx-auto text-lg">
                    Thanks for reaching out, {formData.name.split(" ")[0]}.
                    We&apos;ve received your message and our Birmingham team
                    will send a reply directly to{" "}
                    <strong className="text-foreground">
                      {formData.email}
                    </strong>{" "}
                    shortly.
                  </p>
                  <div className="pt-8">
                    <Button
                      onClick={() => {
                        setFormData({
                          name: "",
                          email: "",
                          orderNumber: "",
                          message: "",
                        });
                        setIsSent(false);
                      }}
                      variant="outline"
                      className="rounded-full px-8 font-bold uppercase tracking-widest text-xs"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                /* FORM STATE UI */
                <div className="animate-in fade-in duration-500">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-2">
                    Send a Message
                  </h2>
                  <p className="text-muted-foreground text-sm mb-8">
                    Fill out the form below and we&apos;ll route it to the right
                    team member.
                  </p>

                  <form
                    onSubmit={handleFormSubmit}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground ml-2">
                          Full Name
                        </label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="Jane Doe"
                          className="rounded-2xl h-14 px-6 bg-background border-border"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground ml-2">
                          Email Address
                        </label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="jane@example.com"
                          className="rounded-2xl h-14 px-6 bg-background border-border"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground ml-2">
                        Order Number (Optional)
                      </label>
                      <Input
                        value={formData.orderNumber}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            orderNumber: e.target.value,
                          })
                        }
                        placeholder="e.g. SELO-12345"
                        className="rounded-2xl h-14 px-6 bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground ml-2">
                        How can we help?
                      </label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Write your message here..."
                        className="rounded-3xl min-h-[150px] p-6 bg-background border-border resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full h-16 text-sm font-bold uppercase tracking-widest flex gap-2 items-center justify-center transition-all"
                    >
                      {isSubmitting ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Answer Callout */}
        <div className="mt-24 text-center">
          <p className="text-muted-foreground text-sm mb-4">
            Looking for immediate answers?
          </p>
          <Button
            variant="link"
            asChild
            className="uppercase tracking-widest font-bold text-xs"
          >
            <Link href="/faq">
              Read our FAQs <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
