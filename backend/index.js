const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./errors/errorHandler');
const app = express();
const cors = require('cors');

require("dotenv").config()

// Connect to MongoDB
connectDB();

// // Use CORS middleware
app.use(cors({
    origin:'*',
}))

app.options('*', cors()); // Allow preflight requests for all routes

app.use(express.json());

// Define Routes
app.use('/api', require("./routes/route"));

// Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT,async () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;