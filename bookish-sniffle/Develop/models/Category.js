// Import the necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import the Sequelize connection instance
const sequelize = require('../config/connection');
// Import the Product model to set up associations
const Product = require('./product');

// Define a new class 'Category' that extends Sequelize's 'Model' class
class Category extends Model {}

// Initialize the Category model with its schema and configuration
Category.init(
  {
    // Define the 'id' column as the primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Auto-increment for each new category
    },
    // Define the 'category_name' column as a string and not allowing null values
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize connection instance
    timestamps: false, // Disable automatic timestamps (createdAt, updatedAt)
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    underscored: true, // Use snake_case column names
    modelName: 'category', // Name of the model in the database
  }
);

// Define associations: A category has many products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Export the Category model for use in other files
module.exports = Category;
