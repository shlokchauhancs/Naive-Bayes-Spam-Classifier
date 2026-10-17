"""service.py — loads the trained model and runs predictions."""

import json
import os
import pickle
import sys

_HERE = os.path.dirname(os.path.abspath(__file__))
_ML_DIR = os.path.join(_HERE, "..", "ml")

# Make `model` importable as a top-level module, so pickle.load() can find it
sys.path.insert(0, _ML_DIR)

from ml.preprocess import tokenize  # noqa: E402

with open(os.path.join(_ML_DIR, "artifacts", "model.pkl"), "rb") as f:
    _model = pickle.load(f)

with open(os.path.join(_ML_DIR, "artifacts", "metrics.json"), "r") as f:
    _metrics = json.load(f)


def predict(text: str) -> dict:
    tokens = tokenize(text)
    probs = _model.predict_proba(tokens)
    label = max(probs, key=probs.get)
    return {
        "label": label,
        "confidence": probs[label],
        "probabilities": probs,
        "tokens": tokens,
        "explanation": _model.explain(tokens),
    }


def get_metrics() -> dict:
    return _metrics