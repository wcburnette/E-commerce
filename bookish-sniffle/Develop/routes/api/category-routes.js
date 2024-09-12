const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET all categories
router.get('/', async (req, res) => {
  try {
    // Find all categories and include their associated Products
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    // Return the category data in JSON format with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 500 error status for server issues
    res.status(500).json(err);
  }
});

// GET a single category by its `id`
router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` and include its associated Products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    // If no category found, return 404 status with a message
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    // Return the category data in JSON format with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 500 error status for server issues
    res.status(500).json(err);
  }
});

// POST a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category using the request body
    const categoryData = await Category.create(req.body);
    // Return the new category data in JSON format with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 400 error status for bad requests
    res.status(400).json(err);
  }
});

// PUT to update a category by its `id`
router.put('/:id', async (req, res) => {
  try {
    // Update the category by its `id` using the request body
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // If no category is updated, return 404 status with a message
    if (!categoryData[0]) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    // Return the updated category data in JSON format with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 500 error status for server issues
    res.status(500).json(err);
  }
});

// DELETE a category by its `id`
router.delete('/:id', async (req, res) => {
  try {
    // Delete the category by its `id`
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    // If no category is deleted, return 404 status with a message
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    // Return the deleted category data in JSON format with a 200 OK status
    res.status(200).json(categoryData);
  } catch (err) {
    // Return a 500 error status for server issues
    res.status(500).json(err);
  }
});

module.exports = router;
