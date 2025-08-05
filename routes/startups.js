const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Startup = require('../models/Startup');

// Create a startup
router.post('/', auth, async (req, res) => {
  const { name, sector, targetAudience, businessModel } = req.body;
  try {
    const startup = new Startup({
      userId: req.user.userId,
      name,
      sector,
      targetAudience,
      businessModel,
      metrics: { profit: 0, revenue: 0, users: 0, burnRate: 0, productMarketFit: 0, cashFlow: 0, riskLevel: 0 }
    });
    await startup.save();
    res.status(201).json(startup);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all startups for the user
router.get('/', auth, async (req, res) => {
  try {
    const startups = await Startup.find({ userId: req.user.userId });
    res.json(startups);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a startup
router.put('/:id', auth, async (req, res) => {
  const { name, sector, targetAudience, businessModel } = req.body;
  try {
    const startup = await Startup.findOne({ _id: req.params.id, userId: req.user.userId });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });

    startup.name = name || startup.name;
    startup.sector = sector || startup.sector;
    startup.targetAudience = targetAudience || startup.targetAudience;
    startup.businessModel = businessModel || startup.businessModel;
    await startup.save();
    res.json(startup);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a startup
router.delete('/:id', auth, async (req, res) => {
  try {
    const startup = await Startup.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json({ message: 'Startup deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;