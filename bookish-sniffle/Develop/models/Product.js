// Import necessary modules from Sequelize
const { Model, DataTypes } = require('sequelize');
// Import the Sequelize connection instance
const sequelize = require('../config/connection');
// Import related models
const Category = require('./Category');
const Tag = require('./tag');
const ProductTag = require('./product-tag');

// Define a new class 'Product' that extends Sequelize's 'Model' class
class Product extends Model {}

// Initialize the Product model with its schema and configuration
Product.init(
  {
    // Define the 'id' column as the primary key
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true, // Auto-increment for each new product
    },
    // Define the 'product_name' column as a string and not allowing null values
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Define the 'price' column with a decimal type and validation
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true, // Ensure the value is a valid decimal
      },
    },
    // Define the 'stock' column with an integer type and validation
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true, // Ensure the value is a number
      },
    },
    // Define the 'category_id' column to reference the 'category' model's 'id'
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    sequelize, // Pass the Sequelize connection instance
    timestamps: false, // Disable automatic timestamps
    freezeTableName: true, // Prevent Sequelize from pluralizing table name
    underscored: true, // Use snake_case column names
    modelName: 'product', // Name of the model in the database
  }
);

// Define associations
// A product belongs to a category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

// A product belongs to many tags (through the ProductTag model)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

// Export the Product model for use in other files
module.exports = Product;
