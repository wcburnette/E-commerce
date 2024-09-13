const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// GET all tags
router.get('/', async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [
        { model: Product, through: ProductTag, attributes: ['id', 'product_name'] }
      ]
    });
    res.status(200).json(tags);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET a single tag by ID
router.get('/:id', async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [
        { model: Product, through: ProductTag, attributes: ['id', 'product_name'] }
      ]
    });
    if (!tag) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json(tag);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// PUT update a tag
router.put('/:id', async (req, res) => {
  try {
    // Perform the update operation
    const [affectedRows] = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });

    // Check if any rows were affected
    if (affectedRows === 0) {
      return res.status(404).json({ message: 'No tag found with this id!' });
    }

    // Respond with a success message if the update was successful
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'An error occurred while updating the tag', error: err });
  }
});


// DELETE a tag
router.delete('/:id', async (req, res) => {
  try {
    const result = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!result) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }
    res.status(200).json({ message: 'Tag deleted successfully!' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;



