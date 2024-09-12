const Product = require('./product');
const Category = require('./Category');
const Tag = require('./tag');
const ProductTag = require('./product-tag');

// A product belongs to a category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE',
});

// A category has many products
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// A product belongs to many tags (through the ProductTag model)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

// A tag belongs to many products (through the ProductTag model)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

