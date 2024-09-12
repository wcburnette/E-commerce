// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import the Sequelize connection instance
const sequelize = require('../config/connection');
// Import related models
const Product = require('./product');
const ProductTag = require('./product-tag');

// Define a new class 'Tag' that extends Sequelize's 'Model' class
class Tag extends Model {}

// Initialize the Tag model with its schema and configuration
Tag.init(
  {
    // Define the 'id' column as the primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Auto-increment for each new tag
    },
    // Define the 'tag_name' column as a string and not allowing null values
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the Sequelize connection instance
    timestamps: false, // Disable automatic timestamps
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    underscored: true, // Use snake_case column names
    modelName: 'tag', // Name of the model in the database
  }
);

// Define associations
// A tag belongs to many products (through the ProductTag model)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

// Export the Tag model for use in other files
module.exports = Tag;



