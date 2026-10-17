"""schemas.py — request/response shapes for the spam classifier API."""

from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)


class WordContribution(BaseModel):
    word: str
    log_ratio: float
    seen: bool


class PredictResponse(BaseModel):
    label: str
    confidence: float
    probabilities: dict[str, float]
    tokens: list[str]
    explanation: list[WordContribution]