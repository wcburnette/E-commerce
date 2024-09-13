// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import the connection to the database
const sequelize = require('../config/connection');

// Define the Tag model, which extends Sequelize's Model class
class Tag extends Model {}

// Initialize the Tag model with its fields and configuration
Tag.init(
  {
    // Define the 'id' field as an integer that cannot be null, is the primary key, and auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define the 'tag_name' field as a string that cannot be null
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // Provide the Sequelize instance to connect this model to the database
    sequelize,
    // Set the model name to 'tag'
    modelName: 'tag',
    // Prevent Sequelize from pluralizing the table name
    freezeTableName: true,
    // Use snake_case for automatically generated fields
    underscored: true,
    // Disable automatic timestamps (createdAt, updatedAt)
    timestamps: false
  }
);

// Export the Tag model for use in other parts of the application
module.exports = Tag;






