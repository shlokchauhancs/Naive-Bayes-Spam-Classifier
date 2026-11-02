# SpamShield

A spam detector that reads a text message and tells you whether it's **spam** or **ham** (not spam).

Built from scratch in Python — the machine learning algorithm is written by hand, not imported from a library. Then wrapped in a clean web app so anyone can try it.

**Try it live:** https://naive-bayes-spam-classifier-alpha.vercel.app
**API docs:** https://naive-bayes-spam-classifier.onrender.com/docs

---

## What it does

You paste a message like:

> *"Congratulations! You won a FREE iPhone. Click here to claim your prize now!"*

It answers:

> **SPAM.** 99.87% confident.

And shows you **why** — the exact words that pushed the decision: `free`, `won`, `claim`, `prize`. Nothing is hidden in a black box.

---

## How it works (in plain English)

1. **It learned from 5,574 real SMS messages.** About 87% were normal, 13% were spam.
2. **For each word, it counted how often it appears in spam vs ham.** For example, "free" appears in a lot of spam, rarely in normal messages.
3. **When you give it a new message, it scores it for both classes.** Each word adds a little evidence for spam or ham. Whichever score is higher wins.
4. **The math** is called *Multinomial Naive Bayes*. It's simple, fast, and surprisingly accurate for text.

If you want the math details (Bayes' theorem, Laplace smoothing, log-probabilities), open the `/how` page on the live site — it's written out step by step.

---

## Results

On 1,115 test messages the model **never saw during training**:

| Metric | Score | What it means |
|---|---|---|
| Accuracy | XX.X% | How often it's right overall |
| Precision | XX.X% | When it says spam, how often it's actually spam |
| Recall | XX.X% | Of all real spam, how much it caught |
| F1 | XX.X% | Balance between precision and recall |

**Validated against scikit-learn** (the industry-standard library): identical within rounding. That proves the from-scratch implementation is correct.

---

## What's in the box
ml/ The model — written from scratch, no ML libraries
api/ The web server (FastAPI)
web/ The website (Next.js, 3D UI)
tests/ Automated tests



Each folder does one job.

---

## Run it yourself

You need **Python 3.10+** and **Node.js 18+**.

**1. Start the API:**

```bash
pip install -r api/requirements.txt
python -m uvicorn api.main:app --port 8000