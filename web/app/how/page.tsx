const sections = [
  {
    n: "01",
    title: "Bayes' theorem",
    body: "We want the probability of a class given a message. Bayes flips it into something we can measure: the probability of the message given the class, times the class prior.",
    formula: "P(C | x) = P(x | C) · P(C) / P(x)",
    note: "P(x) is the same for every class, so it disappears when we compare.",
  },
  {
    n: "02",
    title: "The naive assumption",
    body: "Assume the words are independent given the class. It's wrong for real language — “free” and “prize” travel together — but it makes the math tractable and it works remarkably well.",
    formula: "P(x | C) = ∏ P(wᵢ | C)",
  },
  {
    n: "03",
    title: "Laplace smoothing",
    body: "Without it, a word never seen in spam gives probability zero — and zero times anything is zero. Add a small α to every count so no word can wipe out the whole product.",
    formula: "P(w | C) = (count(w, C) + α) / (total_words(C) + α·|V|)",
    note: "α = 1 in this model. |V| is the vocabulary size.",
  },
  {
    n: "04",
    title: "The log trick",
    body: "Multiplying thousands of tiny probabilities underflows to zero on a computer. Taking logs turns the product into a sum — stable, fast, and same winner.",
    formula: "score(C) = log P(C) + Σ log P(wᵢ | C)",
  },
  {
    n: "05",
    title: "Decision",
    body: "The class with the higher score wins. That's the entire model. Everything else is careful bookkeeping of counts.",
  },
];

export default function HowPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pt-20 pb-16">
      <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-dim">
        How it works
      </p>
      <h1 className="font-display text-5xl leading-[1.02] tracking-tight md:text-6xl">
        The whole model, in five steps.
      </h1>
      <p className="mt-4 text-muted">
        No tricks. No black boxes. This is everything.
      </p>

      <div className="mt-16 space-y-16">
        {sections.map((s) => (
          <article key={s.n}>
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs text-dim">{s.n}</span>
              <h2 className="font-display text-3xl tracking-tight">
                {s.title}
              </h2>
            </div>
            <p className="mt-4 leading-relaxed text-fg/90">{s.body}</p>
            {s.formula && (
              <pre className="mt-5 overflow-x-auto rounded-md border border-border bg-surface p-5 font-mono text-sm text-fg">
{s.formula}
              </pre>
            )}
            {s.note && <p className="mt-3 text-sm text-dim">{s.note}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}