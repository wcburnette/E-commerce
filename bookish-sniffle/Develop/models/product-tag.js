// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import the Sequelize connection instance
const sequelize = require('../config/connection');

// Define a new class 'ProductTag' that extends Sequelize's 'Model' class
class ProductTag extends Model {}

// Initialize the ProductTag model with its schema and configuration
ProductTag.init(
  {
    // Define the 'id' column as the primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Auto-increment for each new ProductTag
    },
    // Define the 'product_id' column to reference the 'product' model's 'id'
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    // Define the 'tag_id' column to reference the 'tag' model's 'id'
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    sequelize, // Pass the Sequelize connection instance
    timestamps: false, // Disable automatic timestamps
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    underscored: true, // Use snake_case column names
    modelName: 'product_tag', // Name of the model in the database
  }
);

// Export the ProductTag model for use in other files
module.exports = ProductTag;
