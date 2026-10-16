"""train.py — train NaiveBayes on the SMS data and print metrics."""

from preprocess import load_data, tokenize, train_test_split
from model import NaiveBayes
from evaluate import report


def main():
    rows = load_data("data/SMSSpamCollection")
    train, test = train_test_split(rows, test_ratio=0.2, seed=42)

    X_train = [tokenize(t) for _, t in train]
    y_train = [lbl for lbl, _ in train]
    X_test  = [tokenize(t) for _, t in test]
    y_test  = [lbl for lbl, _ in test]

    print(f"Train size: {len(X_train)}   Test size: {len(X_test)}")

    nb = NaiveBayes(alpha=1.0).fit(X_train, y_train)

    print("\n== Our Naive Bayes ==")
    metrics = report(y_test, nb.predict(X_test))

    print("\nTop 15 spam words:")
    for word, ratio in nb.top_words("spam", n=15):
        print(f"  {word:<15} {ratio:+.2f}")

    return metrics


if __name__ == "__main__":
    main()