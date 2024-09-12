const express = require('express'); // Import the Express.js framework
const routes = require('./routes'); // Import routes for API endpoints
// Import the sequelize connection from the configuration file
const sequelize = require('./config/connection.js');

const app = express(); // Initialize an Express application
const PORT = process.env.PORT || 3001; // Set the port for the server, defaulting to 3001 if not in environment variables

// Middleware to parse incoming JSON requests
app.use(express.json());
// Middleware to parse incoming URL-encoded data (typically from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Use the defined routes for handling API requests
app.use(routes);

// Sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  // Start the server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`); // Log message indicating the server is running
  });
});

