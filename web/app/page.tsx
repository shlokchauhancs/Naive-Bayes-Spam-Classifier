export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="text-5xl font-semibold tracking-tight">
        Spam, stopped.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Multinomial Naive Bayes, written from scratch. Trained on 5,574 SMS
        messages. Paste a message in the Scanner to test it.
      </p>
    </section>
  );
}