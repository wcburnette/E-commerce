const router = require('express').Router(); // Import Express Router
const apiRoutes = require('./api'); // Import API routes from the './api' directory

// Use '/api' as the base route for all API-related routes
router.use('/api', apiRoutes);

// Catch-all route for any requests to undefined routes
// Sends a message that the user has navigated to the wrong route
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

module.exports = router; // Export the router so it can be used in other files
