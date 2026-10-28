"use client";

import { useEffect, useState } from "react";
import { getMetrics, type Metrics } from "@/lib/api";
import CeramicBall from "@/components/three/CeramicBall";

const frameMeta = [
  {
    id: "accuracy",
    label: "Accuracy",
    formula: "(TP + TN) / total",
    hint: "How often the model is right overall.",
    pos: { top: "10%", left: "6%" } as const,
  },
  {
    id: "precision",
    label: "Precision",
    formula: "TP / (TP + FP)",
    hint: "Of everything flagged spam, how much was actually spam.",
    pos: { top: "10%", right: "6%" } as const,
  },
  {
    id: "recall",
    label: "Recall",
    formula: "TP / (TP + FN)",
    hint: "Of all real spam, how much did we catch.",
    pos: { bottom: "16%", left: "6%" } as const,
  },
  {
    id: "f1",
    label: "F1",
    formula: "2PR / (P + R)",
    hint: "Harmonic mean — punishes imbalance between precision and recall.",
    pos: { bottom: "16%", right: "6%" } as const,
  },
] as const;

export default function DashboardPage() {
  const [open, setOpen] = useState(false);
  const [m, setM] = useState<Metrics | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    if (open && !m) {
      getMetrics()
        .then(setM)
        .catch(() => {});
    }
  }, [open, m]);

  // Stage 1 — sealed ball
  if (!open) {
    return (
      <section className="relative h-[85vh] w-full">
        <CeramicBall onClick={() => setOpen(true)} height="70vh" />

        <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Specimen · 003
          </span>
          <span>Dashboard · v0.1.0</span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span>◌ matte ceramic · sealed</span>
          <span>click to reveal →</span>
        </div>
      </section>
    );
  }

  // Stage 2 — revealed
  return (
    <>
      <section className="relative h-[85vh] w-full">
        <CeramicBall interactive={false} height="70vh" />

        {frameMeta.map((f, i) => {
          const value = m ? (m as unknown as Record<string, number>)[f.id] : null;
          const isFocused = focused === f.id;
          const isDimmed = focused !== null && focused !== f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFocused(isFocused ? null : f.id)}
              style={{
                ...f.pos,
                animation: `frame-pop 0.5s ease-out ${0.2 + i * 0.12}s both`,
              }}
              className={`absolute hidden w-52 rounded-md border bg-bg/70 p-4 text-left backdrop-blur-sm transition md:block ${
                isFocused
                  ? "border-accent-soft shadow-lg scale-105"
                  : isDimmed
                    ? "border-border opacity-30"
                    : "border-border hover:border-accent-soft hover:-translate-y-0.5"
              }`}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-dim">
                0{i + 1} · {f.label}
              </div>
              <div className="mt-3 font-display text-3xl">
                {value != null ? `${(value * 100).toFixed(1)}%` : "—"}
              </div>
              <div className="mt-1 font-mono text-[10px] text-dim">
                {isFocused ? f.formula : "click to expand"}
              </div>
              {isFocused && (
                <p className="mt-3 text-xs leading-relaxed text-muted">
                  {f.hint}
                </p>
              )}
            </button>
          );
        
        })}
                {/* Mobile-only fallback: metrics list under the ball */}
        <div className="absolute inset-x-4 top-[70vh] mt-4 space-y-2 md:hidden">
          {frameMeta.map((f, i) => {
            const value = m ? (m as unknown as Record<string, number>)[f.id] : null;
            return (
              <div
                key={f.id}
                className="flex items-baseline justify-between border-b border-border py-2 font-mono text-xs"
              >
                <span className="uppercase tracking-[0.2em] text-dim">
                  0{i + 1} · {f.label}
                </span>
                <span className="text-fg">
                  {value != null ? `${(value * 100).toFixed(1)}%` : "—"}
                </span>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Specimen · 003 — Revealed
          </span>
          <button
            onClick={() => {
              setOpen(false);
              setFocused(null);
            }}
            className="pointer-events-auto font-mono text-[11px] uppercase tracking-[0.25em] text-dim transition hover:text-fg"
          >
            ← close
          </button>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span>◌ matte ceramic · revealed</span>
          <span>click a frame →</span>
        </div>
      </section>

      {/* Plate 004 — Confusion matrix */}
      <section className="mx-auto max-w-3xl px-6 pt-12 pb-24">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          Plate · 004 — Confusion matrix
        </p>

        {m && (
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
            <div className="bg-surface/60 p-6">
              <div className="font-display text-4xl text-accent-soft">
                {m.tp}
              </div>
              <div className="mt-1 font-mono text-xs text-dim">TP</div>
            </div>
            <div className="bg-surface/60 p-6">
              <div className="font-display text-4xl">{m.fn}</div>
              <div className="mt-1 font-mono text-xs text-dim">FN</div>
            </div>

            <div className="bg-bg p-3 font-mono text-xs uppercase text-dim">
              actual ham
            </div>
            <div className="bg-surface/60 p-6">
              <div className="font-display text-4xl">{m.fp}</div>
              <div className="mt-1 font-mono text-xs text-dim">FP</div>
            </div>
            <div className="bg-surface/60 p-6">
              <div className="font-display text-4xl text-muted">{m.tn}</div>
              <div className="mt-1 font-mono text-xs text-dim">TN</div>
            </div>
          </div>
        )}

        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
          A false positive — a real message marked spam — is the expensive
          error. That&apos;s why the model tunes for precision.
        </p>
      </section>
    </>
  );
}