import Link from "next/link";
import CeramicObject from "@/components/three/CeramicObject";

export default function Home() {
  return (
    <>
      {/* Plate 001 — The specimen in the studio */}
      <section className="relative h-[92vh] w-full">
        <CeramicObject />

        <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            Specimen · 001
          </span>
          <span>Naive Bayes · v0.1.0</span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-between px-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          <span>◌ matte ceramic · studio lit</span>
          <span>← drag to inspect →</span>
        </div>
      </section>

      {/* Plate 002 — Catalogue entry */}
      <section className="mx-auto max-w-3xl px-6 pt-24 pb-16">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          Plate · 002 — Catalogue
        </p>
        <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-7xl">
          Spam,{" "}
          <span className="italic text-accent-soft">quietly</span>{" "}
          stopped.
        </h1>
        <p className="mt-10 text-lg leading-relaxed text-muted">
          A Multinomial Naive Bayes classifier, written from scratch in Python.
          Trained on 5,574 real SMS messages. Validated against scikit-learn.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-muted">
          It reads a message, decides whether it looks like spam or ham, and
          shows you exactly which words made it decide. Nothing is hidden.
        </p>
      </section>

      {/* Plate 003 — Application */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          Plate · 003 — Application
        </p>
        <div className="border-y border-border py-14">
          <h2 className="font-display text-4xl tracking-tight">
            Test it on a real message.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Paste anything. The model returns a verdict, a confidence, and the
            words that pushed it there.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/scan"
              className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg transition hover:bg-accent-soft"
            >
              Open scanner →
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md border border-border px-6 py-3 text-sm font-medium text-fg transition hover:border-accent-soft hover:text-accent-soft"
            >
              See the numbers
            </Link>
          </div>
        </div>
      </section>

      {/* Plate 004 — Limitations */}
      <section className="mx-auto max-w-3xl px-6 pb-32">
        <p className="mb-8 font-mono text-[11px] uppercase tracking-[0.25em] text-dim">
          Plate · 004 — Limitations
        </p>
        <h2 className="font-display text-4xl tracking-tight">
          What it can&apos;t do.
        </h2>
        <ul className="mt-10">
          {[
            "The independence assumption is wrong for real language.",
            "Word order and meaning are ignored — “not free” looks like “free”.",
            "Spammers change wording; the model needs retraining.",
            "Raw probabilities are overconfident — good for ranking, not calibration.",
            "English SMS only. Not general purpose.",
          ].map((line, i) => (
            <li key={i} className="flex gap-6 border-b border-border py-5">
              <span className="font-mono text-xs text-dim pt-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-muted">{line}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}