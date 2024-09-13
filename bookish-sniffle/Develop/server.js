// Import required modules
const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./routes');

// Initialize the Express application
const app = express();

// Define the port to listen on, defaulting to 3001 if not specified in the environment
const PORT = process.env.PORT || 3001;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to parse incoming URL-encoded data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Use the routes defined in the 'routes' folder
app.use(routes);

// Sync Sequelize models with the database and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});



