const { readDB, writeDB } = require('../db');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');

const path = require('path');
const uploadsPath = process.env.VERCEL 
    ? path.join('/tmp', 'uploads') 
    : path.join(__dirname, '..', '..', 'uploads');

const router = express.Router();
const upload = multer({ dest: uploadsPath });

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

router.post('/upload', protect, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const results = [];
  const transactions = [];
  const db = readDB();

  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      try {
        for (const row of results) {
          const amount = Number(row.Amount || row.amount);
          const category = row.Category || row.category || 'Uncategorized';
          const isSubscription = Boolean(row.IsSubscription || row.is_subscription);
          const date = row.Date || row.date || new Date().toISOString();

          let predictionData = { prediction: 'Normal', risk_score: 0, confidence_score: 0 };
          
          // Heuristic fallback
          if (amount > 500) predictionData = { prediction: 'Risky', risk_score: 85, confidence_score: 0.9 };
          
          // Try ML
          try {
            const mlUrl = process.env.ML_SERVICE_URL || 'http://127.0.0.1:8000';
            const mlResponse = await axios.post(`${mlUrl}/predict-leakage`, {
              amount,
              category,
              is_subscription: isSubscription
            });
            predictionData = mlResponse.data;
          } catch (mlErr) {}

          const newTx = {
            _id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
            user: req.user.id,
            amount,
            category,
            isSubscription,
            date,
            prediction: predictionData.prediction,
            riskScore: Number(predictionData.risk_score || predictionData.riskScore),
            confidenceScore: Number(predictionData.confidence_score || predictionData.confidenceScore)
          };
          transactions.push(newTx);
          db.transactions.push(newTx);
        }

        writeDB(db);
        fs.unlinkSync(req.file.path); // Clean up
        res.status(201).json({ 
          message: `${transactions.length} transactions processed`,
          transactions 
        });
      } catch (err) {
        res.status(500).json({ message: 'Error processing CSV: ' + err.message });
      }
    });
});

module.exports = router;
