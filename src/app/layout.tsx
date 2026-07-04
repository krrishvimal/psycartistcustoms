import type { Metadata } from "next";
import { Playfair_Display, Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PSYC ARTIST CUSTOMS | Luxury Sneaker & Wearable Art Studio",
  description: "Bespoke 1-of-1 hand-painted custom sneakers, leather bags, wallets, and wearable art pieces by Shreenal Bawaria.",
  keywords: ["custom sneakers", "hand-painted shoes", "wearable art", "luxury footwear", "sneaker customizer India", "psycartist customs", "Shreenal Bawaria"],
  openGraph: {
    title: "PSYC ARTIST CUSTOMS | Luxury Sneaker & Wearable Art Studio",
    description: "Bespoke 1-of-1 hand-painted custom sneakers and collectibles by Shreenal Bawaria.",
    type: "website",
    locale: "en_IN",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${outfit.variable} bg-[#030303] text-[#f8fafc] font-sans relative antialiased`} suppressHydrationWarning>
        <div className="grain" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
