require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const phenomenonRoutes = require('./routes/phenomenonRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/phenomena', phenomenonRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
