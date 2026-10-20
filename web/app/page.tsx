"use client";

import { useState } from "react";
import { predict, type PredictResponse } from "@/lib/api";

export default function ScanPage() {
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

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Scanner</h1>
      <p className="mt-2 text-muted">
        Paste any SMS. We&apos;ll tell you if it&apos;s spam.
      </p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Congratulations! You won a FREE iPhone. Click here to claim your prize now!"
        rows={6}
        className="mt-6 w-full rounded-xl border border-border bg-surface p-4 text-fg outline-none focus:border-accent"
      />

      <button
        onClick={handleScan}
        disabled={loading || !text.trim()}
        className="mt-4 rounded-xl bg-accent px-6 py-3 font-semibold text-bg transition disabled:opacity-50"
      >
        {loading ? "Scanning..." : "Scan message"}
      </button>

      {error && (
        <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-4 text-red-300">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8 rounded-2xl border border-border bg-surface p-6">
          <div className="flex items-center justify-between">
            <span
              className={`text-2xl font-semibold ${
                isSpam ? "text-red-400" : "text-accent"
              }`}
            >
              {isSpam ? "⚠ SPAM" : "✓ HAM"}
            </span>
            <span className="text-lg text-muted">
              {(result.confidence * 100).toFixed(1)}%
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg">
            <div
              className={`h-full ${isSpam ? "bg-red-500" : "bg-accent"}`}
              style={{ width: `${result.confidence * 100}%` }}
            />
          </div>

          {topWords.length > 0 && (
            <>
              <h3 className="mt-6 text-sm font-semibold text-muted">Why</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {topWords.map((w) => (
                  <li
                    key={w.word}
                    className={`rounded-full border px-3 py-1 text-sm ${
                      w.log_ratio > 0
                        ? "border-red-500/40 bg-red-500/10 text-red-300"
                        : "border-accent/40 bg-accent/10 text-accent"
                    }`}
                  >
                    {w.word} ({w.log_ratio > 0 ? "+" : ""}
                    {w.log_ratio.toFixed(1)})
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