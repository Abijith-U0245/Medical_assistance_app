const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
console.log("📦 Loaded MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/medicines', require('./routes/medicineRoutes'));
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/ngos', require('./routes/ngoRoutes')); // ⬅️ lowercase 'ngos'
app.use('/api/pharmacies', require('./routes/pharmacyRoutes')); // ⬅️ add pharmacy routes
app.use('/api/hospitals', require('./routes/hospitalRoutes'))
app.use('/api/admin', require('./routes/adminRoutes'));

// Root route
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
