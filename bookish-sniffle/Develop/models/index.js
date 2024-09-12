// Import all models
const Product = require('./product');
const Category = require('./Category');
const Tag = require('./tag');
const ProductTag = require('./product-tag');

// Define associations between models

// A product belongs to a category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE', // Delete product when the associated category is deleted
});

// A category has many products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// A product belongs to many tags (through the ProductTag model)
Product.belongsToMany(Tag, {
  through: ProductTag, // Join table for many-to-many relationship
  foreignKey: 'product_id',
  otherKey: 'tag_id',
});

// A tag belongs to many products (through the ProductTag model)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
  otherKey: 'product_id',
});

// Export all models for use in other parts of the application
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
