"""preprocess.py — load, clean, tokenize, and split the SMS dataset."""

import re
import random
from collections import Counter


def tokenize(text: str) -> list[str]:
    """Lowercase and keep words/numbers/apostrophes.

    Example:
        >>> tokenize("FREE iPhone! 100% OFF, don't miss")
        ['free', 'iphone', '100', 'off', "don't", 'miss']
    """
    return re.findall(r"[a-z0-9']+", text.lower())


def load_data(path: str) -> list[tuple[str, str]]:
    """Return list of (label, text). File format: label<TAB>text."""
    rows: list[tuple[str, str]] = []
    with open(path, encoding="latin-1") as f:
        for line in f:
            label, _, text = line.partition("\t")
            text = text.strip()
            if text:
                rows.append((label.strip(), text))
    return rows


def train_test_split(
    rows: list[tuple[str, str]],
    test_ratio: float = 0.2,
    seed: int = 42,
) -> tuple[list[tuple[str, str]], list[tuple[str, str]]]:
    """Shuffle and split. Returns (train, test)."""
    rows = rows[:]                       # don't mutate caller's list
    random.Random(seed).shuffle(rows)    # reproducible
    cut = int(len(rows) * (1 - test_ratio))
    return rows[:cut], rows[cut:]


if __name__ == "__main__":
    rows = load_data("data/SMSSpamCollection")
    train, test = train_test_split(rows)

    print(f"Total : {len(rows)}")
    print(f"Train : {len(train)}")
    print(f"Test  : {len(test)}")

    print("Label distribution:", Counter(lbl for lbl, _ in rows))

    print("\nFirst 5 training rows:")
    for lbl, txt in train[:5]:
        print(f"  [{lbl}] {txt[:70]}...")

    print("\nTokenized sample:")
    sample = "Congratulations! You've won a FREE iPhone. Click now!"
    print(" ", tokenize(sample))