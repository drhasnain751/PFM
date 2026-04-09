from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from models import MLService
import pandas as pd
from io import BytesIO

app = FastAPI(title="PFM ML Service")
ml_service = MLService()

class TrainResponse(BaseModel):
    message: str
    metrics: dict

class PredictionRequest(BaseModel):
    amount: float
    category: str
    is_subscription: bool

@app.get("/")
def health_check():
    return {"status": "ok", "service": "ML Leakage Detection"}

@app.post("/train-model", response_model=TrainResponse)
async def train_model(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_csv(BytesIO(contents))
    metrics = ml_service.train(df)
    return {"message": "Models trained successfully", "metrics": metrics}

@app.post("/predict-leakage")
def predict_leakage(req: PredictionRequest):
    result = ml_service.predict(req.amount, req.category, req.is_subscription)
    return result
