"""test_api.py — smoke-test the FastAPI server (run with server up)."""

import json
import urllib.request

API = "http://127.0.0.1:8000"


def predict(text: str) -> dict:
    body = json.dumps({"text": text}).encode("utf-8")
    req = urllib.request.Request(
        f"{API}/predict",
        data=body,
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))


CASES = [
    ("Congratulations! You won a FREE iPhone. Claim your prize now!", "spam"),
    ("Hey, are we still meeting for lunch tomorrow?",                  "ham"),
    ("WINNER! Claim your $1000 cash prize now!",                       "spam"),
    ("Mom, I'll be home by 8pm, don't wait for dinner",                "ham"),
]

if __name__ == "__main__":
    print(f"Testing {API}\n")
    passed = 0
    for text, expected in CASES:
        r = predict(text)
        got = r["label"]
        ok = got == expected
        passed += ok
        icon = "PASS" if ok else "FAIL"
        print(f"[{icon}]  expected={expected:5s}  got={got:5s}  conf={r['confidence']:.4f}")
        print(f"        {text[:65]}")
    print(f"\n{passed}/{len(CASES)} passed")