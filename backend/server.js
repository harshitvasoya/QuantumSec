
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const useragent = require('express-useragent');

// Load local .env; Render environment variables are also supported.
dotenv.config();

// Import existing routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogRoutes');
const projectRoutes = require('./routes/projectRoutes');
const adminAuthRoutes = require('./routes/adminAuth');
const geminiRoutes = require('./routes/geminiRoutes');
const contactFormRoute = require('./routes/contactForm');
const uploadResumeRoute = require('./routes/uploadResume');
const fetchResumeRoute = require('./routes/fetchResume');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(useragent.express());

// Existing API routes
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api', geminiRoutes);
app.use('/api', contactFormRoute);
app.use('/api', uploadResumeRoute);
app.use('/api', fetchResumeRoute);

// Liveness check: confirms that the HTTP server is running.
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Database readiness check
app.get('/health/db', (_req, res) => {
  const connected = mongoose.connection.readyState === 1;

  res.status(connected ? 200 : 503).json({
    database: connected ? 'connected' : 'unavailable',
  });
});

// Root route
app.get('/', (_req, res) => {
  res.send('🌐 API is running...');
});

// Start HTTP server using Render's assigned port.
const PORT = Number(process.env.PORT) || 5000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});

// Attempt MongoDB connection independently of HTTP startup.
async function connectDatabase() {
  if (!process.env.MONGO_URI) {
    console.error(
      'MONGO_URI is missing. Configure it in Render Environment.'
    );
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    // Do not log the connection URI or credentials.
    console.error('MongoDB connection failed:', err.message);
  }
}

connectDatabase();

// Graceful shutdown
async function shutdown(signal) {
  console.log(`${signal} received; shutting down...`);

  server.close(async () => {
    try {
      await mongoose.disconnect();
    } catch (err) {
      console.error('MongoDB disconnect failed:', err.message);
    }

    process.exit(0);
  });
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
