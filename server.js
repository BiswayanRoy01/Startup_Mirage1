const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/startups', require('./routes/startups'));
// Add after other app.use statements
// Add after app.use('/api/markets', require('./routes/markets'));
app.use('/api/pricing', require('./routes/pricing'));
// Add after app.use('/api/pricing', require('./routes/pricing'));
app.use('/api/metrics', require('./routes/metrics'));
const path = require('path');
// Add before app.listen
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
  res.send('Startup Mirage Backend');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));