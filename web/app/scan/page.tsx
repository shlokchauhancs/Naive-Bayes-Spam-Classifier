"use client";

import { useState } from "react";
import { predict, type PredictResponse } from "@/lib/api";
import CeramicBox from "@/components/three/CeramicBox";

export default function ScanPage() {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleScan() {
    if (!text.trim()) return;
    setLoading(true);
    setError(null);
    try {
      setResult(await predict(text));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const isSpam = result?.label === "spam";
  const topWords = result
    ? result.explanation
        .filter((w) => w.seen && Math.abs(w.log_ratio) > 0.5)
        .sort((a, b) => Math.abs(b.log_ratio) - Math.abs(a.log_ratio))
        .slice(0, 6)
    : [];

  // Stage 1: sealed specimen
  if (!open) {
    return (
      <section className="relative h-[85vh] w-full">
        <CeramicBox onClick={() => setOpen(true)} />

        <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Specimen · 002
          </span>
          <span>Scanner · v0.1.0</span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span>◌ matte ceramic · sealed</span>
          <span>click to open →</span>
        </div>
      </section>
    );
  }

  // Stage 2: opened — the scanner form
  return (
    <section className="mx-auto max-w-3xl px-6 pt-24 pb-16">
      <div className="mb-12 flex items-baseline justify-between">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          Specimen · 002 — Opened
        </p>
        <button
          onClick={() => {
            setOpen(false);
            setText("");
            setResult(null);
            setError(null);
          }}
          className="font-mono text-[11px] uppercase tracking-[0.25em] text-dim transition hover:text-fg"
        >
          ← close
        </button>
      </div>

      <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
        What do we have here?
      </h1>
      <p className="mt-4 max-w-xl text-muted">
        Paste any message. The model returns a verdict and the words that
        pushed it there.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Congratulations! You won a FREE iPhone. Click here to claim your prize now!"
        rows={6}
        className="mt-10 w-full resize-none rounded-md border border-border bg-surface/40 p-5 text-fg placeholder:text-dim outline-none transition focus:border-accent-soft"
      />

      <div className="mt-4 flex items-center justify-between">
        <span className="font-mono text-xs text-dim">
          {text.length} / 5000
        </span>
        <button
          onClick={handleScan}
          disabled={loading || !text.trim()}
          className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg transition hover:bg-accent-soft disabled:opacity-40"
        >
          {loading ? "Reading…" : "Scan →"}
        </button>
      </div>

      {error && (
        <p className="mt-8 border-l-2 border-accent pl-4 text-sm text-accent-soft">
          {error}
        </p>
      )}

      {result && (
        <div className="animate-fade-up mt-12 border-t border-border pt-8">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
            Verdict
          </p>

          <div className="flex items-baseline justify-between">
            <h2
              className={`font-display text-5xl leading-none tracking-tight ${
                isSpam ? "text-accent-soft" : "text-fg"
              }`}
            >
              {isSpam ? "Spam." : "Ham."}
            </h2>
            <span className="font-mono text-sm text-muted">
              {(result.confidence * 100).toFixed(2)}% confident
            </span>
          </div>

          <div className="mt-6 h-px w-full overflow-hidden bg-border">
            <div
              className={`h-full ${isSpam ? "bg-accent" : "bg-muted"}`}
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>

          {topWords.length > 0 && (
            <>
              <p className="mt-10 mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
                Signals
              </p>
              <ul className="space-y-2">
                {topWords.map((w) => (
                  <li
                    key={w.word}
                    className="flex items-baseline justify-between border-b border-border pb-2 text-sm"
                  >
                    <span
                      className={
                        w.log_ratio > 0 ? "text-fg" : "text-muted"
                      }
                    >
                      {w.word}
                    </span>
                    <span
                      className={`font-mono text-xs ${
                        w.log_ratio > 0 ? "text-accent-soft" : "text-dim"
                      }`}
                    >
                      {w.log_ratio > 0 ? "+" : ""}
                      {w.log_ratio.toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </section>
  );
}