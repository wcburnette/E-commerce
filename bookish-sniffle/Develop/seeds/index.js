const seedCategories = require('./category-seeds'); // Import category seeds
const seedProducts = require('./product-seeds'); // Import product seeds
const seedTags = require('./tag-seeds'); // Import tag seeds
const seedProductTags = require('./product-tag-seeds'); // Import product-tag seeds

const sequelize = require('../config/connection'); // Import sequelize connection

// Async function to seed all data
const seedAll = async () => {
  // Sync database and force all tables to drop and recreate
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');

  // Seed category data
  await seedCategories();
  console.log('\n----- CATEGORIES SEEDED -----\n');

  // Seed product data
  await seedProducts();
  console.log('\n----- PRODUCTS SEEDED -----\n');

  // Seed tag data
  await seedTags();
  console.log('\n----- TAGS SEEDED -----\n');

  // Seed product-tag data
  await seedProductTags();
  console.log('\n----- PRODUCT TAGS SEEDED -----\n');

  // Exit the process once seeding is done
  process.exit(0);
};

seedAll(); // Call the seedAll function to run all seeds
