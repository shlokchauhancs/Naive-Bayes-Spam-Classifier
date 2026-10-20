export default function HowPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">How it works</h1>
      <p className="mt-2 text-muted">
        Multinomial Naive Bayes, from the ground up.
      </p>

      <div className="mt-10 space-y-10 text-fg/90 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-fg">1. Bayes&apos; theorem</h2>
          <p className="mt-2">We want P(class | message). Bayes flips it:</p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm">
{`P(C | x) = P(x | C) · P(C) / P(x)`}
          </pre>
          <p className="mt-2 text-muted">
            P(x) is the same for both classes, so we ignore it when comparing.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fg">2. The naive assumption</h2>
          <p className="mt-2">Assume words are independent given the class:</p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm">
{`P(x | C) = ∏ P(w_i | C)`}
          </pre>
          <p className="mt-2 text-muted">
            Wrong in real language, but simple and remarkably effective for text.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fg">3. Laplace smoothing</h2>
          <p className="mt-2">
            Add α to every count so unseen words don&apos;t zero out the product:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm">
{`P(w | C) = (count(w, C) + α) / (total_words(C) + α·|V|)`}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fg">4. The log trick</h2>
          <p className="mt-2">
            Multiplying thousands of small probabilities underflows to 0. Logs
            turn products into sums:
          </p>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-border bg-surface p-4 text-sm">
{`score(C) = log P(C) + Σ log P(w_i | C)`}
          </pre>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-fg">5. Decision</h2>
          <p className="mt-2">
            The class with the higher score wins. That&apos;s it.
          </p>
        </div>
      </div>
    </section>
  );
}