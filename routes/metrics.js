const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Startup = require('../models/Startup');

// Get metrics for a startup
router.get('/:startupId', auth, async (req, res) => {
  try {
    const startup = await Startup.findOne({ _id: req.params.startupId, userId: req.user.userId });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup.metrics);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update metrics (for simulation)
router.put('/:startupId', auth, async (req, res) => {
  const { profit, revenue, users, burnRate, productMarketFit, cashFlow, riskLevel } = req.body;
  try {
    const startup = await Startup.findOne({ _id: req.params.startupId, userId: req.user.userId });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });

    startup.metrics = {
      profit: profit || startup.metrics.profit,
      revenue: revenue || startup.metrics.revenue,
      users: users || startup.metrics.users,
      burnRate: burnRate || startup.metrics.burnRate,
      productMarketFit: productMarketFit || startup.metrics.productMarketFit,
      cashFlow: cashFlow || startup.metrics.cashFlow,
      riskLevel: riskLevel || startup.metrics.riskLevel
    };
    await startup.save();
    res.json(startup.metrics);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;