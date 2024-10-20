require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const phenomenonRoutes = require('./routes/phenomenonRoutes');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use('/api/phenomena', phenomenonRoutes);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

let server;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

const startServer = async (testPort) => {
  await connectDB();
  const serverPort = testPort === 0 ? 0 : (testPort || port);
  server = app.listen(serverPort, () => {
    const actualPort = server.address().port;
    console.log(`Server is running on port ${actualPort}`);
  });
  return server;
};

const closeServer = async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
  if (server) {
    await new Promise(resolve => server.close(resolve));
  }
};

module.exports = { app, startServer, closeServer };
