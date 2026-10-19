// 1. IMPORT PACKAGES
const express = require('express'); // The framework that handles HTTP requests and routing
const cors = require('cors');       // Allows React frontend (port 3000) to talk to this server (port 5000) without being blocked by the browser.
const mongoose = require('mongoose'); // The library that lets us write JavaScript to talk to MongoDB
require('dotenv').config();         // Loads the hidden variables from .env file into process.env

// 2. INITIALIZE THE APP
const app = express();

// 3. MIDDLEWARE
// Middleware are functions that run on every request before it reaches routes.
app.use(cors());             // Allows Cross-Origin requests
app.use(express.json());     // Automatically parses incoming JSON data so we can read req.body

// 4. BASIC TEST ROUTE
// If someone goes to http://localhost:5000/ in a browser, they see this message.
app.get('/', (req, res) => {
    res.send('ArtSphere API is running...');
});

// 5. START THE SERVER
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});