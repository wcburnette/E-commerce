const router = require('express').Router(); // Import Express Router
const categoryRoutes = require('./category-routes'); // Import category routes
const productRoutes = require('./product-routes'); // Import product routes
const tagRoutes = require('./tag-routes'); // Import tag routes

// Set up middleware to use category, product, and tag routes
// All routes starting with '/categories' will use categoryRoutes
router.use('/categories', categoryRoutes);

// All routes starting with '/products' will use productRoutes
router.use('/products', productRoutes);

// All routes starting with '/tags' will use tagRoutes
router.use('/tags', tagRoutes);

module.exports = router; // Export the router so it can be used in the main app


