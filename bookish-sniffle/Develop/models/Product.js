// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import the connection to the database
const sequelize = require('../config/connection');

// Define the Product model, extending Sequelize's Model class
class Product extends Model {}

// Initialize the Product model with its fields and configuration
Product.init(
  {
    // Define the 'id' field as an integer that cannot be null, is the primary key, and auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define the 'product_name' field as a string that cannot be null
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Define the 'price' field as a decimal that cannot be null
    // Add validation to ensure the value is a decimal
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true // Ensures the price is a decimal value
      }
    },
    // Define the 'stock' field as an integer that cannot be null
    // Add validation to ensure the value is numeric
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true // Ensures the stock value is numeric
      }
    },
    // Define the 'category_id' field as an integer that references the 'id' field in the 'category' table
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category', // References the 'category' model
        key: 'id'          // Refers to the 'id' field in 'category'
      }
    }
  },
  {
    // Provide the Sequelize instance to connect this model to the database
    sequelize,
    // Set the model name to 'product'
    modelName: 'product',
    // Prevent Sequelize from pluralizing the table name
    freezeTableName: true,
    // Use snake_case for automatically generated fields
    underscored: true,
    // Disable automatic timestamps (createdAt, updatedAt)
    timestamps: false
  }
);

// Export the Product model for use in other parts of the application
module.exports = Product;




