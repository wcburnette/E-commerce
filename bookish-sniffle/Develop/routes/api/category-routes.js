const router = require('express').Router();
const { Category, Product } = require('../../models');

// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
      include: [
        { model: Product, attributes: ['id', 'product_name'] }
      ]
    });
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        { model: Product, attributes: ['id', 'product_name'] }
      ]
    });
    if (!category) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create({
      category_name: req.body.category_name
    });
    res.status(201).json(newCategory);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// PUT update a category
router.put('/:id', async (req, res) => {
  try {
    // Perform the update operation
    const [affectedRows] = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    // Check if any rows were affected
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No category found with this id!' });
    }

    // Respond with a success message if the update was successful
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'An error occurred while updating the category', error: err });
  }
});



// DELETE a category
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedCategory) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;


