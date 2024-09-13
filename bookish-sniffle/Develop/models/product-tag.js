// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import the connection to the database
const sequelize = require('../config/connection');

// Define the ProductTag model, extending Sequelize's Model class
class ProductTag extends Model {}

// Initialize the ProductTag model with its fields and configuration
ProductTag.init(
  {
    // Define the 'id' field as an integer that cannot be null, is the primary key, and auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define the 'product_id' field as an integer that references the 'id' field in the 'product' table
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product', // References the 'product' model
        key: 'id'         // Refers to the 'id' field in 'product'
      }
    },
    // Define the 'tag_id' field as an integer that references the 'id' field in the 'tag' table
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',     // References the 'tag' model
        key: 'id'         // Refers to the 'id' field in 'tag'
      }
    }
  },
  {
    // Provide the Sequelize instance to connect this model to the database
    sequelize,
    // Set the model name to 'product_tag'
    modelName: 'product_tag',
    // Prevent Sequelize from pluralizing the table name
    freezeTableName: true,
    // Use snake_case for automatically generated fields
    underscored: true,
    // Disable automatic timestamps (createdAt, updatedAt)
    timestamps: false
  }
);

// Export the ProductTag model for use in other parts of the application
module.exports = ProductTag;



