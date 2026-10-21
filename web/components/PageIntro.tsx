"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const labels: Record<string, string> = {
  "/": "Multinomial Naive Bayes · 5,574 messages",
  "/scan": "Scanner",
  "/dashboard": "Metrics",
  "/how": "Method",
};

export default function PageIntro() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 1100);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-bg"
      style={{ animation: "intro-out 1.1s ease-in-out forwards" }}
      onClick={() => setVisible(false)}
      aria-hidden
    >
      <div className="text-center">
        <div
          className="font-display text-5xl tracking-tight md:text-7xl"
          style={{ animation: "intro-fade-up 0.5s ease-out 0.05s both" }}
        >
          Spam<span className="italic text-accent-soft">Shield</span>
        </div>

        <div
          className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-dim md:text-xs"
          style={{ animation: "intro-fade-up 0.5s ease-out 0.2s both" }}
        >
          {labels[pathname] ?? "SpamShield"}
        </div>

        <div
          className="mx-auto mt-6 h-px bg-accent"
          style={{ animation: "intro-rule 0.6s ease-out 0.35s both" }}
        />
      </div>
    </div>
  );
}