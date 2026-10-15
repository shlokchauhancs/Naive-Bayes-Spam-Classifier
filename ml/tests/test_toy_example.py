"""test_toy_example.py — verify the PDF's worked example gives ~82% spam."""

import sys
import os

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from model import NaiveBayes
from preprocess import tokenize


def test_pdf_worked_example():
    spam_docs = ["win money now", "win prize now"]
    ham_docs = ["meet me now", "lunch at noon"]

    docs = [tokenize(t) for t in spam_docs + ham_docs]
    labels = ["spam", "spam", "ham", "ham"]

    nb = NaiveBayes(alpha=1.0).fit(docs, labels)

    assert len(nb.vocab) == 9, f"vocab size should be 9, got {len(nb.vocab)}"
    assert nb.total_words["spam"] == 6, f"spam total wrong: {nb.total_words['spam']}"
    assert nb.total_words["ham"] == 6, f"ham total wrong: {nb.total_words['ham']}"

    tokens = tokenize("win now")
    pred = nb.predict_one(tokens)
    assert pred == "spam", f"expected spam, got {pred}"

    probs = nb.predict_proba(tokens)
    assert abs(probs["spam"] - 0.82) < 0.02, f"expected ~0.82 spam, got {probs['spam']:.4f}"

    print("=== PDF worked example ===")
    print(f"vocabulary size : {len(nb.vocab)}")
    print(f"spam total words: {nb.total_words['spam']}")
    print(f"ham  total words: {nb.total_words['ham']}")
    print(f"test tokens     : {tokens}")
    print(f"prediction      : {pred}")
    print(f"P(spam) = {probs['spam']:.4f}")
    print(f"P(ham)  = {probs['ham']:.4f}")
    print("ALL ASSERTIONS PASSED ✅")


if __name__ == "__main__":
    test_pdf_worked_example()