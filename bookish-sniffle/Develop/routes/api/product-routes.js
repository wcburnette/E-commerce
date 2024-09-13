// Import required modules and models
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// Route to get all products with associated Category and Tag data
router.get('/', (req, res) => {
  Product.findAll({
    include: [
      { model: Category, attributes: ['id', 'category_name'] },
      { model: Tag, through: ProductTag, attributes: ['id', 'tag_name'] }
    ]
  })
    .then(products => res.json(products)) // Respond with the products in JSON format
    .catch(err => {
      console.log(err); // Log any errors to the console
      res.status(500).json(err); // Respond with a 500 status code and error message
    });
});

// Route to get a single product by ID with associated Category and Tag data
router.get('/:id', (req, res) => {
  Product.findByPk(req.params.id, {
    include: [
      { model: Category, attributes: ['id', 'category_name'] },
      { model: Tag, through: ProductTag, attributes: ['id', 'tag_name'] }
    ]
  })
    .then(product => {
      if (!product) {
        res.status(404).json({ message: 'No product found with this id!' }); // Respond with a 404 status if the product is not found
        return;
      }
      res.json(product); // Respond with the product in JSON format
    })
    .catch(err => {
      console.log(err); // Log any errors to the console
      res.status(500).json(err); // Respond with a 500 status code and error message
    });
});

// Export the router to be used in other files
module.exports = router;






