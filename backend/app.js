const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();
connectDB();
const app = express();
app.use(express.json);
app.get('/', (req, res) => {
    res.send('API works');

});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('server running on port ${PORT}'));