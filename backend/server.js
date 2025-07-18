const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blogRoutes');
const projectRoutes = require('./routes/projectRoutes');
const adminAuthRoutes = require('./routes/adminAuth');
const geminiRoutes = require('./routes/geminiRoutes');
const contactFormRoute = require('./routes/contactForm');
const useragent = require('express-useragent');
const uploadResumeRoute = require('./routes/uploadResume');
const fetchResumeRoute = require('./routes/fetchResume');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(useragent.express());


// Public API Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/admin', authRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api', geminiRoutes);
app.use('/api', contactFormRoute);
app.use('/api', uploadResumeRoute);
app.use('/api', fetchResumeRoute);

// Root route
app.get("/", (req, res) => {
  res.send("🌐 API is running...");
});

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(5000, () =>
      console.log('🚀 Server running at http://localhost:5000')
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // 🔁 Exit process on failure
  });
