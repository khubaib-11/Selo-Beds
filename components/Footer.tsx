"use client";

import { createClient } from "@/lib/supabase/client";
import {
  Facebook,
  Instagram,
  LucideIcon,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Copyright } from "./copyright";
import Logo from "./Logo";

// Keep Support and Company static as they are administrative
const SUPPORT_LINKS = [
  { label: "Delivery & Returns", href: "/delivery-returns" },
  { label: "100-Night Trial", href: "/trial" },
  { label: "Warranty", href: "/warranty" },
  { label: "FAQ", href: "/faq" },
];

const COMPANY_LINKS = [
  { label: "Our Story", href: "/our-story" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact Us", href: "/contact" },
  { label: "Showrooms", href: "/showrooms" },
];

export function Footer() {
  const [shopLinks, setShopLinks] = useState<{ label: string; href: string }[]>(
    [],
  );

  useEffect(() => {
    const fetchShopLinks = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("categories").select("name, slug");

      if (data) {
        // Map DB categories to the footer link format
        const dynamicLinks = data.map((cat) => ({
          label: cat.name,
          href: `/category/${cat.slug}`,
        }));
        setShopLinks(dynamicLinks);
      }
    };
    fetchShopLinks();
  }, []);

  return (
    <footer className="w-full border-t border-border bg-background pt-16 pb-8">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <div className="flex flex-col items-center justify-center md:items-start md:justify-start space-y-6 text-center md:text-left">
            <Logo />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto md:mx-0">
              Crafting the future of sleep with sustainable materials and
              unmatched support. Designed for every body, every night.
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <SocialLink
                icon={Instagram}
                href="#"
              />
              <SocialLink
                icon={Facebook}
                href="#"
              />
              <SocialLink
                icon={Twitter}
                href="#"
              />
              <SocialLink
                icon={Youtube}
                href="#"
              />
            </div>
          </div>

          {/* Dynamic Shop Section */}
          <FooterGroup
            title="Shop"
            links={
              shopLinks.length > 0
                ? shopLinks
                : [{ label: "All Products", href: "/category/mattresses" }]
            }
          />

          <FooterGroup
            title="Support"
            links={SUPPORT_LINKS}
          />

          <FooterGroup
            title="Company"
            links={COMPANY_LINKS}
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <Copyright />

          <div className="flex flex-wrap justify-center items-center gap-6 text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
            <Link
              href="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/accessibility"
              className="hover:text-primary transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Sub-components (FooterGroup, SocialLink) stay exactly as you have them
function FooterGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col space-y-5 text-center md:text-left">
      <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-foreground">
        {title}
      </h4>
      <ul className="flex flex-col space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialLink({ icon: Icon, href }: { icon: LucideIcon; href: string }) {
  return (
    <Link
      href={href}
      className="p-2.5 rounded-full bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-300 group"
    >
      <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
    </Link>
  );
}
