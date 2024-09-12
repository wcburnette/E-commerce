// Import the necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import the Sequelize connection instance
const sequelize = require('../config/connection');

// Define a new class 'Category' that extends Sequelize's 'Model' class
class Category extends Model {}

// Initialize the Category model with its schema and configuration
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;

