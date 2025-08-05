const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  sector: { type: String, required: true },
  targetAudience: { type: String, required: true },
  businessModel: { type: String, required: true },
  market: {
    region: { type: String },
    segment: { type: String },
    size: { type: String },
    saturation: { type: String }
  },
  pricing: {
    base: { type: Number },
    premium: { type: Number },
    enterprise: { type: Number }
  },
  metrics: {
    profit: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    users: { type: Number, default: 0 },
    burnRate: { type: Number, default: 0 },
    productMarketFit: { type: Number, default: 0 },
    cashFlow: { type: Number, default: 0 },
    riskLevel: { type: Number, default: 0 }
  },
  events: [{ message: String, timestamp: { type: Date, default: Date.now } }],
  feedback: [{ message: String, timestamp: { type: Date, default: Date.now } }],
  competitorMoves: [{ message: String, timestamp: { type: Date, default: Date.now } }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Startup', startupSchema);