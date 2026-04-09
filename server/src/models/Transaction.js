const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  isSubscription: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  prediction: {
    type: String, // 'Normal', 'Risky'
    default: 'Normal'
  },
  riskScore: {
    type: Number,
    default: 0
  },
  confidenceScore: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
