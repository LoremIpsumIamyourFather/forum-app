/* 
 * FILE PURPOSE: 
 * This is the entry point for the backend Node.js server. It initializes the Express 
 * application, applies middleware, connects to MongoDB, mounts the API routes, 
 * and starts the server listening on a specific port.
 */

// 1. IMPORT PACKAGES
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// 2. IMPORT ROUTES
// Imports the auth routes file created in the routes folder.
const authRoutes = require('./routes/auth');

// 3. INITIALIZE THE APPLICATION
// Creates the Express app. This MUST happen before using app.use().
const app = express();

// 4. APPLY MIDDLEWARE
app.use(cors());
app.use(express.json());

// 5. MOUNT ROUTES
// Tells Express to use the imported authRoutes for any URL starting with /api.
// This makes the /api/register and /api/login endpoints work.
app.use('/api', authRoutes);

// 6. CONNECT TO MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch((err) => console.log('MongoDB Connection Error:', err));

// 7. START THE SERVER
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});