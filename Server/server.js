require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/tags', require('./routes/tagRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes')); // <-- NEW

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));