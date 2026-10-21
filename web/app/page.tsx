import Link from "next/link";
import HeroScene from "@/components/three/HeroScene";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-12">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          01 — Multinomial Naive Bayes, from scratch
        </p>
        <h1 className="font-display text-6xl leading-[0.95] tracking-tight md:text-8xl">
          Spam,{" "}
          <span className="italic text-accent-soft">stopped.</span>
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
          A small model with a simple job. Trained on 5,574 real SMS messages,
          validated against scikit-learn. Paste a message — it tells you the
          truth.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <Link
            href="/scan"
            className="rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg transition hover:bg-accent-soft"
          >
            Scan a message →
          </Link>
          <Link
            href="/how"
            className="rounded-md border border-border px-6 py-3 text-sm font-medium text-fg transition hover:border-accent-soft hover:text-accent-soft"
          >
            How it works
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <HeroScene />
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          02 — Limitations
        </p>
        <h2 className="font-display text-4xl">What it can&apos;t do.</h2>
        <ul className="mt-8 space-y-4 text-muted">
          {[
            "The independence assumption is wrong for real language.",
            "Word order and meaning are ignored — “not free” looks like “free”.",
            "Spammers change wording; the model needs retraining.",
            "Raw probabilities are overconfident — good for ranking, not calibration.",
            "English SMS only. Not general purpose.",
          ].map((line, i) => (
            <li key={i} className="flex gap-4 border-b border-border pb-4">
              <span className="font-mono text-xs text-dim">
                0{i + 1}
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}