const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Startup = require('../models/Startup');

// Save market selection for a startup
router.post('/:startupId', auth, async (req, res) => {
  const { region, segment, size, saturation } = req.body;
  try {
    const startup = await Startup.findOne({ _id: req.params.startupId, userId: req.user.userId });
    if (!startup) return res.status(404).json({ message: 'Startup not found' });

    startup.market = { region, segment, size, saturation };
    await startup.save();
    res.json(startup);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get market suggestions (mock AI suggestions for now)
router.get('/suggestions', auth, async (req, res) => {
  try {
    const suggestions = [
      { region: 'North America', segment: 'K-12 Education', size: 'Large', saturation: 'Medium' },
      { region: 'Europe', segment: 'Higher Education', size: 'Medium', saturation: 'Low' },
      { region: 'Asia', segment: 'Corporate Training', size: 'Small', saturation: 'High' }
    ];
    res.json(suggestions);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;