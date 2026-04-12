"use client";
import { useCartStore } from "@/lib/store/useCartStore";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import Logo from "./Logo";
export default function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<
    { name: string; slug: string }[]
  >([]);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const fetchCategories = async () => {
      const supabase = createClient();
      const { data } = await supabase.from("categories").select("name, slug");
      if (data) setCategories(data);
    };
    fetchCategories();

    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data?.user || null));
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
      },
    );
    return () => authListener.subscription.unsubscribe();
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md transition-all">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 -ml-2 mr-2 text-foreground hover:bg-accent rounded-md transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Logo />

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-sm font-semibold tracking-wide text-muted-foreground hover:text-primary transition-colors uppercase"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/track"
            className="text-sm font-semibold tracking-wide text-muted-foreground hover:text-primary transition-colors uppercase"
          >
            Track Order
          </Link>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 md:gap-5">
          {mounted && (
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all active:scale-95"
            >
              {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
          )}

          <Link
            href={user ? "/profile" : "/auth/login"}
            className="hidden md:flex p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all"
            aria-label="Profile"
          >
            {user ? (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground border border-dashed border-gray-300 text-xs font-bold text-primary uppercase">
                {user.email?.charAt(0) || "U"}
              </div>
            ) : (
              <ProfileIcon />
            )}
          </Link>

          <Link
            href="/cart"
            className="relative p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full transition-all"
            aria-label="Cart"
          >
            <CartIcon />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`
        fixed inset-x-0 top-20 z-40 md:hidden border-b border-border bg-background transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"}
      `}
      >
        <div className="container mx-auto px-6 py-8 flex flex-col gap-2">
          {/* FIXED: Removed 'hidden md:flex' so categories show on mobile */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">
              Collections
            </p>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/track"
              className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Track Order
            </Link>
          </div>

          <div className="mt-4 pt-6 border-t border-border flex flex-col gap-4 text-muted-foreground">
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="flex items-center gap-3 font-medium hover:text-primary transition-colors"
            >
              {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
              <span>
                {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
              </span>
            </button>
            <Link
              href={user ? "/profile" : "/auth/login"}
              className="flex items-center gap-3 font-medium hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {user ? (
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary uppercase">
                  {user.email?.charAt(0) || "U"}
                </div>
              ) : (
                <ProfileIcon />
              )}
              <span>My Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Icons remain the same...

// --- Icons (UNTOUCHED) ---

function MenuIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-menu-2"
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M4 6l16 0" />
      <path d="M4 12l16 0" />
      <path d="M4 18l16 0" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-sun"
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-moon"
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-x"
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

function ProfileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-user-square-rounded"
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M12 13a3 3 0 1 0 0 -6a3 3 0 0 0 0 6" />
      <path d="M12 3c7.2 0 9 1.8 9 9c0 7.2 -1.8 9 -9 9c-7.2 0 -9 -1.8 -9 -9c0 -7.2 1.8 -9 9 -9" />
      <path d="M6 20.05v-.05a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v.05" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-shopping-cart"
    >
      <path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
      />
      <path d="M4 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M15 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M17 17h-11v-14h-2" />
      <path d="M6 5l14 1l-1 7h-13" />
    </svg>
  );
}
