"use client";

import { useState } from "react";
import CeramicDisc from "@/components/three/CeramicDisc";

const steps = [
  {
    n: "01",
    title: "Bayes' theorem",
    body: "We want the probability of a class given a message. Bayes flips it into something we can measure: the probability of the message given the class, times the class prior.",
    formula: "P(C | x) = P(x | C) · P(C) / P(x)",
    note: "P(x) is identical for every class, so it drops out when we compare.",
  },
  {
    n: "02",
    title: "The naive assumption",
    body: "Assume the words are independent given the class. It's wrong for real language — “free” and “prize” travel together — but it makes the math tractable and works remarkably well.",
    formula: "P(x | C) = ∏ P(wᵢ | C)",
  },
  {
    n: "03",
    title: "Laplace smoothing",
    body: "Without it, an unseen word gives probability zero — and zero times anything is zero. Add a small α to every count so no single word can wipe out the whole product.",
    formula: "P(w | C) = (count(w, C) + α) / (total_words(C) + α·|V|)",
    note: "α = 1 in this model. |V| is the vocabulary size.",
  },
  {
    n: "04",
    title: "The log trick",
    body: "Multiplying thousands of tiny probabilities underflows to zero on a computer. Logs turn the product into a sum — stable, fast, same winner.",
    formula: "score(C) = log P(C) + Σ log P(wᵢ | C)",
  },
  {
    n: "05",
    title: "Decision",
    body: "The class with the higher score wins. That's the entire model. Everything else is careful bookkeeping of counts.",
  },
];

export default function HowPage() {
  const [open, setOpen] = useState(false);

  // Stage 1 — sealed disc
  if (!open) {
    return (
      <section className="relative h-[85vh] w-full">
        <CeramicDisc onClick={() => setOpen(true)} />

        <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Specimen · 004
          </span>
          <span>Method · v0.1.0</span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span>◌ matte ceramic · sealed</span>
          <span>click to open →</span>
        </div>
      </section>
    );
  }

  // Stage 2 — opened
  return (
    <section className="mx-auto max-w-3xl px-6 pt-24 pb-16">
      <div className="mb-12 flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          Specimen · 004 — Opened
        </p>
        <button
          onClick={() => setOpen(false)}
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim transition hover:text-fg"
        >
          ← close
        </button>
      </div>

      <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
        The whole model, in five steps.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        No tricks. No black boxes. This is everything.
      </p>

      <div className="mt-16 space-y-16">
        {steps.map((s, i) => (
          <article
            key={s.n}
            className="animate-fade-up"
            style={{ animationDelay: `${0.15 + i * 0.1}s` }}
          >
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-dim">{s.n}</span>
              <h2 className="font-display text-3xl tracking-tight">
                {s.title}
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-fg/90">{s.body}</p>
            {s.formula && (
              <pre className="mt-5 overflow-x-auto rounded-md border border-border bg-surface/60 p-5 font-mono text-sm text-fg">
{s.formula}
              </pre>
            )}
            {s.note && (
              <p className="mt-3 text-sm text-dim">{s.note}</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}