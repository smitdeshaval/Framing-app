/**
 * KisanConnect Backend Server
 * 
 * Express REST API server providing:
 * - Direct Farmer-to-Buyer trade mechanisms
 * - Mandi price benchmark comparison engine
 * - JWT authentication & role-based access control
 * - Zero-config hybrid database storage
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const { connectDB, readStore } = require('./config/db');

// Import routes
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const inquiryRoutes = require('./routes/inquiryRoutes');
const mandiRoutes = require('./routes/mandiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // Allow frontend dev server
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded crop images statically
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/mandi-prices', mandiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    name: 'KisanConnect API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// 404 Route handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// Centralized error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error occurred'
  });
});

// Server Initialization
async function startServer() {
  try {
    // 1. Initialize Database
    await connectDB();

    // 2. Auto-seed if database is unseeded
    const store = readStore();
    if (!store.listings || store.listings.length === 0) {
      console.log('🌱 Fresh store detected. Auto-populating sample agricultural data...');
      require('./scripts/seed');
    }

    // 3. Start Listening
    app.listen(PORT, () => {
      console.log('====================================================');
      console.log(`🌾 KisanConnect Backend Server Running on Port ${PORT}`);
      console.log(`📍 REST API: http://localhost:${PORT}/api/health`);
      console.log(`📊 Mandi Engine: http://localhost:${PORT}/api/mandi-prices`);
      console.log(`📦 Produce Listings: http://localhost:${PORT}/api/listings`);
      console.log('====================================================');
    });
  } catch (error) {
    console.error('Failed to start KisanConnect server:', error);
    process.exit(1);
  }
}

startServer();
