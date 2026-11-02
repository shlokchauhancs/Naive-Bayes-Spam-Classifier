const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export type WordContribution = {
  word: string;
  log_ratio: number;
  seen: boolean;
};

export type PredictResponse = {
  label: string;
  confidence: number;
  probabilities: Record<string, number>;
  tokens: string[];
  explanation: WordContribution[];
};

export type Metrics = {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  tp: number;
  fp: number;
  tn: number;
  fn: number;
};

export async function predict(text: string): Promise<PredictResponse> {
  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(`API ${res.status}: ${msg}`);
  }
  return res.json();
}

export async function getMetrics(): Promise<Metrics> {
  const res = await fetch(`${API_URL}/metrics`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}