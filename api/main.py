"""main.py — FastAPI server exposing the spam classifier."""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .schemas import PredictRequest, PredictResponse
from .service import predict, get_metrics

app = FastAPI(
    title="Naive Bayes Spam Classifier",
    description="From-scratch Multinomial Naive Bayes, trained on UCI SMS Spam Collection.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # tighten later for production
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/metrics")
def metrics():
    return get_metrics()


@app.post("/predict", response_model=PredictResponse)
def predict_route(req: PredictRequest):
    return predict(req.text)