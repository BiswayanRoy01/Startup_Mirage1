const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Startup = require('../models/Startup');

// Save pricing strategy
router.post('/:startupId', auth, async (req, res) => {
  const { base, premium, enterprise } = req.body;
  try {
    const startup = await Startup.findOne({ _id: req.params.startupId, userId: req.user.userId });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });

    startup.pricing = { base, premium, enterprise };
    await startup.save();
    res.json(startup);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pricing data for a startup
router.get('/:startupId', auth, async (req, res) => {
  try {
    const startup = await Startup.findOne({ _id: req.params.startupId, userId: req.user.userId });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });
    res.json(startup.pricing);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;