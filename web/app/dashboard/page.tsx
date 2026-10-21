"use client";

import { useEffect, useState } from "react";
import { getMetrics, type Metrics } from "@/lib/api";

const cards = [
  { key: "accuracy",  label: "Accuracy",  hint: "correct / total" },
  { key: "precision", label: "Precision", hint: "of spam calls, how many were right" },
  { key: "recall",    label: "Recall",    hint: "of real spam, how much we caught" },
  { key: "f1",        label: "F1",        hint: "harmonic mean of P and R" },
] as const;

export default function DashboardPage() {
  const [m, setM] = useState<Metrics | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    getMetrics()
      .then(setM)
      .catch((e) => setErr(String(e)));
  }, []);

  if (err)
    return (
      <div className="mx-auto max-w-4xl px-6 py-20">
        <p className="border-l-2 border-accent pl-4 text-sm text-accent-soft">
          {err}
        </p>
      </div>
    );
  if (!m)
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 font-mono text-sm text-dim">
        Loading…
      </div>
    );

  return (
    <section className="mx-auto max-w-5xl px-6 pt-20 pb-16">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-dim">
        Dashboard
      </p>
      <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
        The numbers.
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Held-out test split — 1,115 messages the model never saw during training.
      </p>

      <div className="mt-12 grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.key} className="bg-bg p-5">
            <div className="font-mono text-xs uppercase tracking-wider text-dim">
              {c.label}
            </div>
            <div className="mt-3 font-display text-4xl">
              {(m[c.key] * 100).toFixed(1)}
              <span className="text-xl text-muted">%</span>
            </div>
            <div className="mt-2 text-xs text-dim">{c.hint}</div>
          </div>
        ))}
      </div>

      <p className="mt-16 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-dim">
        Confusion matrix
      </p>

      <div className="grid grid-cols-[auto_1fr_1fr] gap-px border border-border bg-border text-sm">
        <div className="bg-bg" />
        <div className="bg-bg p-3 text-center font-mono text-xs uppercase text-dim">
          pred spam
        </div>
        <div className="bg-bg p-3 text-center font-mono text-xs uppercase text-dim">
          pred ham
        </div>

        <div className="bg-bg p-3 font-mono text-xs uppercase text-dim">
          actual spam
        </div>
        <div className="bg-surface p-6">
          <div className="font-display text-4xl text-accent-soft">{m.tp}</div>
          <div className="mt-1 font-mono text-xs text-dim">TP</div>
        </div>
        <div className="bg-surface p-6">
          <div className="font-display text-4xl">{m.fn}</div>
          <div className="mt-1 font-mono text-xs text-dim">FN</div>
        </div>

        <div className="bg-bg p-3 font-mono text-xs uppercase text-dim">
          actual ham
        </div>
        <div className="bg-surface p-6">
          <div className="font-display text-4xl">{m.fp}</div>
          <div className="mt-1 font-mono text-xs text-dim">FP</div>
        </div>
        <div className="bg-surface p-6">
          <div className="font-display text-4xl text-muted">{m.tn}</div>
          <div className="mt-1 font-mono text-xs text-dim">TN</div>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-dim">
        A false positive is the expensive error here — a real message flagged as
        spam. That&apos;s why we tune for precision, not raw accuracy.
      </p>
    </section>
  );
}