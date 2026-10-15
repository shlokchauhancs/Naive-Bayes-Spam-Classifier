"""model.py — Multinomial Naive Bayes from scratch (Laplace smoothing + logs)."""

import math
from collections import Counter


class NaiveBayes:
    """Multinomial Naive Bayes with Laplace (add-alpha) smoothing."""

    def __init__(self, alpha: float = 1.0):
        self.alpha = alpha
        self.classes: list[str] = []
        self.vocab: set[str] = set()
        self.word_counts: dict[str, Counter] = {}
        self.total_words: dict[str, int] = {}
        self.log_prior: dict[str, float] = {}

    # ---------- TRAINING ----------

    def fit(self, docs: list[list[str]], labels: list[str]) -> "NaiveBayes":
        """docs = list of token lists. labels = list of class names (same length)."""
        n = len(labels)
        self.classes = sorted(set(labels))
        self.word_counts = {c: Counter() for c in self.classes}
        self.total_words = {}
        self.log_prior = {}
        self.vocab = set()

        # 1. count every word per class + build the vocabulary
        for tokens, label in zip(docs, labels):
            self.word_counts[label].update(tokens)
            self.vocab.update(tokens)

        # 2. log-prior P(C) and total word count per class
        for c in self.classes:
            self.log_prior[c] = math.log(labels.count(c) / n)
            self.total_words[c] = sum(self.word_counts[c].values())

        return self

    # ---------- PROBABILITY ----------

    def _log_likelihood(self, word: str, c: str) -> float:
        """log P(word | c) with Laplace smoothing."""
        num = self.word_counts[c][word] + self.alpha
        den = self.total_words[c] + self.alpha * len(self.vocab)
        return math.log(num / den)

    # ---------- PREDICTION ----------

    def scores(self, tokens: list[str]) -> dict[str, float]:
        """Raw log-score per class: log P(C) + sum log P(w_i | C)."""
        result = {}
        for c in self.classes:
            s = self.log_prior[c]
            for w in tokens:
                if w in self.vocab:
                    s += self._log_likelihood(w, c)
            result[c] = s
        return result

    def predict_one(self, tokens: list[str]) -> str:
        s = self.scores(tokens)
        return max(s, key=s.get)

    def predict(self, docs: list[list[str]]) -> list[str]:
        return [self.predict_one(d) for d in docs]

    def predict_proba(self, tokens: list[str]) -> dict[str, float]:
        """Normalized posterior probabilities (stable softmax over log-scores)."""
        s = self.scores(tokens)
        m = max(s.values())
        exp_scores = {c: math.exp(s[c] - m) for c in s}
        total = sum(exp_scores.values())
        return {c: exp_scores[c] / total for c in exp_scores}

    # ---------- EXPLAINABILITY ----------

    def top_words(self, c: str, n: int = 10, min_count: int = 5) -> list[tuple[str, float]]:
        """Words most indicative of class c, ranked by log-likelihood ratio."""
        others = [k for k in self.classes if k != c]
        if not others:
            return []
        other = others[0]
        ratios = []
        for w in self.vocab:
            if self.word_counts[c][w] < min_count:
                continue
            ratio = self._log_likelihood(w, c) - self._log_likelihood(w, other)
            ratios.append((w, ratio))
        ratios.sort(key=lambda x: x[1], reverse=True)
        return ratios[:n]

    def explain(self, tokens: list[str]) -> list[dict]:
        """Per-word contribution toward the second class vs the first."""
        if len(self.classes) < 2:
            return [{"word": w, "log_ratio": 0.0, "seen": w in self.vocab} for w in tokens]
        c, other = self.classes[1], self.classes[0]
        out = []
        for w in tokens:
            if w not in self.vocab:
                out.append({"word": w, "log_ratio": 0.0, "seen": False})
                continue
            ratio = self._log_likelihood(w, c) - self._log_likelihood(w, other)
            out.append({"word": w, "log_ratio": ratio, "seen": True})
        return out