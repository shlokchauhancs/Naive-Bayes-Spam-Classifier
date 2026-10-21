import Link from "next/link";
import HeroScene from "@/components/three/HeroScene";

export default function Home() {
  return (
    <>
      <section className="relative mx-auto max-w-6xl px-6 pt-16 pb-8">
        <div className="text-center">
          <h1 className="text-5xl font-semibold tracking-tight md:text-6xl">
            Spam, <span className="text-accent">stopped.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Multinomial Naive Bayes, written from scratch. Trained on 5,574 SMS
            messages. Validated against scikit-learn.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link
              href="/scan"
              className="rounded-xl bg-accent px-6 py-3 font-semibold text-bg transition hover:opacity-90"
            >
              Scan a message
            </Link>
            <Link
              href="/how"
              className="rounded-xl border border-border px-6 py-3 font-semibold text-fg transition hover:border-accent hover:text-accent"
            >
              How it works
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <HeroScene />
      </section>
            <section className="mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-2xl font-semibold">Honest limitations</h2>
        <ul className="mt-4 space-y-2 text-muted">
          <li>· The independence assumption is wrong for real language</li>
          <li>· Word order and meaning are ignored (&ldquo;not free&rdquo; vs &ldquo;free&rdquo;)</li>
          <li>· Spammers change wording; the model needs retraining</li>
          <li>· Raw probabilities are overconfident — good for ranking, not calibration</li>
          <li>· English SMS only — not general purpose</li>
        </ul>
      </section>
    </>
  );
}