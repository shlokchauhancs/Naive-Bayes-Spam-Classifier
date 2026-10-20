"use client";

import { useEffect, useState } from "react";
import { getMetrics, type Metrics } from "@/lib/api";

const cards = [
  { key: "accuracy",  label: "Accuracy",  hint: "correct / total" },
  { key: "precision", label: "Precision", hint: "of spam calls, how many were right" },
  { key: "recall",    label: "Recall",    hint: "of real spam, how much we caught" },
  { key: "f1",        label: "F1 score",  hint: "harmonic mean of P and R" },
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
      <div className="mx-auto max-w-4xl px-6 py-16 text-red-300">{err}</div>
    );
  if (!m)
    return (
      <div className="mx-auto max-w-4xl px-6 py-16 text-muted">Loading…</div>
    );

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-muted">
        Model performance on the held-out test split.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {cards.map((c) => (
          <div key={c.key} className="rounded-xl border border-border bg-surface p-4">
            <div className="text-xs uppercase tracking-wide text-muted">
              {c.label}
            </div>
            <div className="mt-2 text-3xl font-semibold">
              {(m[c.key] * 100).toFixed(1)}%
            </div>
            <div className="mt-1 text-xs text-muted">{c.hint}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">Confusion matrix</h2>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div />
        <div className="text-muted">pred spam</div>
        <div className="text-muted">pred ham</div>

        <div className="text-muted">actual spam</div>
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-4">
          <div className="text-2xl font-semibold text-red-300">{m.tp}</div>
          <div className="text-xs text-muted">TP</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="text-2xl font-semibold">{m.fn}</div>
          <div className="text-xs text-muted">FN</div>
        </div>

        <div className="text-muted">actual ham</div>
        <div className="rounded-lg border border-border bg-surface p-4">
          <div className="text-2xl font-semibold">{m.fp}</div>
          <div className="text-xs text-muted">FP</div>
        </div>
        <div className="rounded-lg border border-accent/40 bg-accent/10 p-4">
          <div className="text-2xl font-semibold text-accent">{m.tn}</div>
          <div className="text-xs text-muted">TN</div>
        </div>
      </div>
    </section>
  );
}