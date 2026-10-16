"""evaluate.py — confusion matrix + accuracy / precision / recall / F1."""


def confusion(y_true, y_pred, positive="spam"):
    """Return (TP, FP, TN, FN) with `positive` as the class we care about."""
    tp = fp = tn = fn = 0
    for t, p in zip(y_true, y_pred):
        if p == positive and t == positive:
            tp += 1
        elif p == positive and t != positive:
            fp += 1
        elif p != positive and t != positive:
            tn += 1
        else:
            fn += 1
    return tp, fp, tn, fn


def report(y_true, y_pred, positive="spam"):
    """Print accuracy, precision, recall, F1, and a confusion matrix."""
    tp, fp, tn, fn = confusion(y_true, y_pred, positive)

    total = len(y_true)
    acc = (tp + tn) / total if total else 0.0
    prec = tp / (tp + fp) if (tp + fp) else 0.0
    rec = tp / (tp + fn) if (tp + fn) else 0.0
    f1 = 2 * prec * rec / (prec + rec) if (prec + rec) else 0.0

    print(f"Accuracy : {acc:.4f}")
    print(f"Precision: {prec:.4f}")
    print(f"Recall   : {rec:.4f}")
    print(f"F1 score : {f1:.4f}")
    print()
    print("Confusion matrix")
    print("              pred spam   pred ham")
    print(f"actual spam   {tp:6d}     {fn:6d}")
    print(f"actual ham    {fp:6d}     {tn:6d}")

    return {"accuracy": acc, "precision": prec, "recall": rec, "f1": f1,
            "tp": tp, "fp": fp, "tn": tn, "fn": fn}