const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { readDB, writeDB } = require('../db');

const router = express.Router();

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');
      req.user = decoded; // just passing the ID
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Get all transactions for the logged in user
router.get('/', protect, async (req, res) => {
  try {
    const db = readDB();
    const transactions = db.transactions
        .filter(t => t.user === req.user.id)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Add a transaction
router.post('/', protect, async (req, res) => {
  const { amount, category, isSubscription } = req.body;

  try {
    let predictionData = { prediction: 'Normal', risk_score: 0, confidence_score: 0 };
    
    // 1. Basic Rule-based Fallback (Works instantly without ML service)
    const normalizedAmount = Number(amount);
    if (normalizedAmount > 500) {
      predictionData = { prediction: 'Risky', risk_score: 85, confidence_score: 0.9 };
    } else if (isSubscription && normalizedAmount > 100) {
      predictionData = { prediction: 'Risky', risk_score: 75, confidence_score: 0.85 };
    } else if (category === 'Food' && normalizedAmount > 300) {
      predictionData = { prediction: 'Risky', risk_score: 90, confidence_score: 0.95 };
    }

    // 2. Try Advanced ML Service
    try {
      const mlUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';
      const mlResponse = await axios.post(`${mlUrl}/predict-leakage`, {
        amount: Number(amount),
        category: category,
        is_subscription: Boolean(isSubscription)
      });
      // If ML is up, use it
      predictionData = mlResponse.data;
    } catch (mlErr) {
      // console.log("Using local heuristic model (ML Service offline)");
    }

    const db = readDB();
    const newTx = {
      _id: Date.now().toString(),
      user: req.user.id,
      amount: Number(amount),
      category,
      isSubscription: Boolean(isSubscription),
      date: new Date().toISOString(),
      prediction: predictionData.prediction,
      riskScore: Number(predictionData.risk_score || predictionData.riskScore),
      confidenceScore: Number(predictionData.confidence_score || predictionData.confidenceScore)
    };

    db.transactions.push(newTx);
    writeDB(db);

    res.status(201).json(newTx);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
