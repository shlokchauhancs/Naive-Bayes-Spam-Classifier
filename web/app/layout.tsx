import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "SpamShield — Naive Bayes Spam Classifier",
  description: "Multinomial Naive Bayes spam detection, written from scratch.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="relative z-0 min-h-screen flex flex-col">
        <Nav />
        <main className="relative z-10 flex-1">{children}</main>
        <footer className="relative z-10 border-t border-border py-8 text-center text-xs text-dim">
          Built from scratch · Multinomial Naive Bayes · Next.js
        </footer>
      </body>
    </html>
  );
}