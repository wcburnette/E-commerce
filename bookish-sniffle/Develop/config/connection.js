// config/connection.js
const Sequelize = require('sequelize');
require('dotenv').config();

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

module.exports = sequelize;


