const { Category } = require('../models'); // Import the Category model from the models folder

// Data to seed the categories table
const categoryData = [
  {
    category_name: 'Shirts',
  },
  {
    category_name: 'Shorts',
  },
  {
    category_name: 'Music',
  },
  {
    category_name: 'Hats',
  },
  {
    category_name: 'Shoes',
  },
];

// Function to bulk insert category data into the Category table
const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories; // Export the seedCategories function for use in seedAll

