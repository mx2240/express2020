// api/index.js
const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (serverless-safe)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  const db = await mongoose.connect(process.env.MONGO_URI, {
    bufferCommands: false,
  });
  isConnected = db.connections[0].readyState;
  console.log('✅ MongoDB connected');
}
connectDB().catch(err => console.error('MongoDB connection error:', err));

// Sample route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Example route from a router (replace with your own)
const sampleRouter = express.Router();
sampleRouter.get('/hello', (req, res) => {
  res.json({ message: 'Hello from /hello route!' });
});
app.use('/api', sampleRouter);

// Error handling
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Export serverless handler for Vercel
module.exports = app;
module.exports.handler = serverless(app);
