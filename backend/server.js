const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // 👈 Connect MongoDB

dotenv.config(); // Load .env variables

const app = express();

// Connect to MongoDB
connectDB(); // 👈 Important!

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
// Root route
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
