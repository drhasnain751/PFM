import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder, StandardScaler

class MLService:
    def __init__(self):
        self.isolation_forest = IsolationForest(contamination=0.1, random_state=42)
        self.random_forest = RandomForestClassifier(n_estimators=100, random_state=42)
        self.logistic_regression = LogisticRegression(random_state=42)
        
        self.le_category = LabelEncoder()
        self.scaler = StandardScaler()
        self.is_trained = False

    def _preprocess(self, df: pd.DataFrame, training=False):
        if training:
            df['category_encoded'] = self.le_category.fit_transform(df['category'])
            df['amount_scaled'] = self.scaler.fit_transform(df[['amount']])
        else:
            df['category_encoded'] = self.le_category.transform(df['category'])
            df['amount_scaled'] = self.scaler.transform(df[['amount']])
        
        # Features: scaled amount, encoded category, subscription flag
        X = df[['amount_scaled', 'category_encoded', 'is_subscription']]
        return X

    def train(self, df: pd.DataFrame):
        X = self._preprocess(df, training=True)
        
        # 1. Isolation Forest for Unsupervised Anomaly Detection
        self.isolation_forest.fit(X)
        anomaly_labels = self.isolation_forest.predict(X)
        
        # Assume anomalies (-1) are risky (1), and normal (1) are safe (0)
        y = np.where(anomaly_labels == -1, 1, 0)
        
        # 2. Random Forest & Logistic Regression
        self.random_forest.fit(X, y)
        self.logistic_regression.fit(X, y)
        
        self.is_trained = True
        return {"samples": len(df), "anomalies_detected": int(sum(y))}

    def predict(self, amount: float, category: str, is_subscription: bool):
        if not self.is_trained:
            # Fallback dumb logic if not trained
            risk = min(100, amount / 100 * 10)
            return {
                "prediction": "Risky" if risk > 50 else "Normal",
                "risk_score": risk,
                "confidence_score": 0.5
            }
            
        try:
            df = pd.DataFrame([{
                "amount": amount,
                "category": category,
                "is_subscription": int(is_subscription)
            }])
            X = self._preprocess(df, training=False)
            
            # Use isolation forest as primary anomaly detector
            iso_pred = self.isolation_forest.predict(X)[0]
            
            # Use random forest for risk classification
            rf_prob = self.random_forest.predict_proba(X)[0]
            
            # Risk score based on probability of being anomalous (class 1)
            risk_score = rf_prob[1] * 100 if len(rf_prob) > 1 else (100 if iso_pred == -1 else 0)
            
            prediction = "Risky" if risk_score > 50 else "Normal"
            confidence = max(rf_prob) if len(rf_prob) > 1 else 0.8
            
            return {
                "prediction": prediction,
                "risk_score": round(risk_score, 2),
                "confidence_score": round(confidence, 2)
            }
        except Exception as e:
            # Unknown category fallback
            return {
                "prediction": "Normal",
                "risk_score": 0.0,
                "confidence_score": 0.0
            }
