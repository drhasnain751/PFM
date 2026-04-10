const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logger for debugging 404s
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const uploadsPath = process.env.VERCEL 
    ? path.join('/tmp', 'uploads') 
    : path.join(__dirname, '..', 'uploads');

const fs = require('fs');
if (!fs.existsSync(uploadsPath)) {
    try {
        fs.mkdirSync(uploadsPath, { recursive: true });
    } catch (e) {
        console.error('Could not create uploads directory:', e);
    }
}

app.use('/uploads', express.static(uploadsPath));

// Routes will be imported here
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions');
app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'PFM Backend is running' });
});

console.log('Database runs locally on JSON file (db.json)');

// Check if running in Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
