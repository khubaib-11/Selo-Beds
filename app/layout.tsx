import Navbar from "@/components/Navbar";
import { PromoBar } from "@/components/Promobar";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Noto_Sans } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans({ variable: "--font-sans" });

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Selo Beds",
  description:
    "Discover the perfect mattress for your sleep style. Premium comfort, exceptional support, and a 100-night trial.",
  icons: {
    icon: "../app/assets/public/favicon.ico",
    shortcut: "../app/assets/public/favicon-16x16.png",
    apple: "../app/assets/public/apple-touch-icon.png",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${notoSans.variable} scroll-smooth`}
    >
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PromoBar />
          <Navbar />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
