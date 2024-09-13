// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import the connection to the database
const sequelize = require('../config/connection');

// Define the Category model, extending Sequelize's Model class
class Category extends Model {}

// Initialize the Category model with its fields and configuration
Category.init(
  {
    // Define the 'id' field as an integer that cannot be null, is the primary key, and auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,    // Field must not be null
      primaryKey: true,    // This field is the primary key
      autoIncrement: true  // Automatically increments for each new record
    },
    // Define the 'category_name' field as a string that cannot be null
    category_name: {
      type: DataTypes.STRING,  // This field stores a string value
      allowNull: false         // Field must not be null
    }
  },
  {
    // Provide the Sequelize instance to connect this model to the database
    sequelize,
    // Set the model name to 'category'
    modelName: 'category',
    // Prevent Sequelize from pluralizing the table name
    freezeTableName: true,
    // Use snake_case for automatically generated fields (e.g., foreign keys)
    underscored: true,
    // Disable automatic timestamps (createdAt, updatedAt)
    timestamps: false
  }
);

// Export the Category model for use in other parts of the application
module.exports = Category;




