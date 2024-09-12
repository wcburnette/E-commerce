// Import Sequelize constructor from the 'sequelize' package
const Sequelize = require('sequelize');

// Load environment variables from a .env file
require('dotenv').config();

// Create a new Sequelize instance, connecting to the database with credentials
const sequelize = new Sequelize(
  process.env.DB_NAME, // Database name
  process.env.DB_USER, // Database user
  process.env.DB_PASSWORD, // Database password
  {
    host: process.env.DB_HOST, // Database host
    dialect: 'postgres', // Database type (PostgreSQL)
    port: process.env.DB_PORT, // Database port
    logging: false, // Disable logging of SQL queries
  }
);

// Export the Sequelize instance for use in other parts of the application
module.exports = sequelize;

