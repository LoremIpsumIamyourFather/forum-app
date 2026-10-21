/* 
 * FILE PURPOSE: 
 * This is the entry point for the backend Node.js server. It initializes the Express 
 * application, applies necessary middleware to handle cross-origin requests and JSON data, 
 * establishes a connection to the MongoDB database, and starts the server listening on a specific port.
 */

// 1. IMPORT PACKAGES

// Imports the Express framework, which handles HTTP requests, routing, and server logic.
const express = require('express');

// Imports CORS (Cross-Origin Resource Sharing). This is a security feature that allows 
// the React frontend (running on port 3000) to make requests to this backend (running on port 5000).
const cors = require('cors');

// Imports Mongoose, an Object Data Modeling (ODM) library for MongoDB. 
// It provides a straightforward, schema-based solution to model application data and 
// translates code objects to MongoDB documents.
const mongoose = require('mongoose');

// Imports and configures dotenv, which loads environment variables from a .env file 
// into process.env. This keeps sensitive data (like database passwords) out of the source code.
require('dotenv').config();

// 2. INITIALIZE THE APPLICATION

// Creates an instance of an Express application. This 'app' object represents the server 
// and is used to configure routes and middleware.
const app = express();

// 3. APPLY MIDDLEWARE

// Middleware functions are executed on every request before it reaches the route handlers.
// app.use(cors()) enables Cross-Origin Resource Sharing for all incoming requests.
app.use(cors());

// app.use(express.json()) parses incoming requests with JSON payloads. 
// It populates the req.body property with the parsed data, allowing the server to read data 
// sent from the frontend.
app.use(express.json());

// 4. CONNECT TO MONGODB

// The mongoose.connect() method initiates the connection to the database using the URI 
// stored in the environment variables. This method returns a Promise.
mongoose.connect(process.env.MONGO_URI)
  // The .then() block executes if the connection is successful.
  .then(() => console.log('MongoDB Connected Successfully'))
  // The .catch() block executes if there is an error (e.g., incorrect password or network block).
  .catch((err) => console.log('MongoDB Connection Error:', err));

// 5. START THE SERVER

// Defines the port number the server will listen on. Port 5000 is commonly used for local backends.
const PORT = 5000;

// The app.listen() method binds the application to the specified port and starts 
// listening for incoming HTTP requests.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});