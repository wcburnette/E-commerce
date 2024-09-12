const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET all tags
router.get('/', (req, res) => {
  // Retrieve all tags and include associated products
  Tag.findAll({
    include: [
      { model: Product, through: ProductTag, attributes: ['id', 'product_name'] }
    ]
  })
    .then(tags => res.json(tags))
    .catch(err => {
      console.log(err);
      // Return a 500 error status for server issues
      res.status(500).json(err);
    });
});

// GET a single tag by its `id`
router.get('/:id', (req, res) => {
  // Retrieve a tag by its `id` and include associated products
  Tag.findByPk(req.params.id, {
    include: [
      { model: Product, through: ProductTag, attributes: ['id', 'product_name'] }
    ]
  })
    .then(tag => {
      // If no tag is found, return 404 status with a message
      if (!tag) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
      res.json(tag);
    })
    .catch(err => {
      console.log(err);
      // Return a 500 error status for server issues
      res.status(500).json(err);
    });
});

// POST a new tag
router.post('/', (req, res) => {
  // Create a new tag with the request body
  Tag.create(req.body)
    .then(tag => res.json(tag))
    .catch(err => {
      console.log(err);
      // Return a 400 error status for bad requests
      res.status(400).json(err);
    });
});

// PUT to update a tag by its `id`
router.put('/:id', (req, res) => {
  // Update the tag by its `id` using the request body
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(tag => {
      // If no tag is found, return 404 status with a message
      if (!tag[0]) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
      res.json(tag);
    })
    .catch(err => {
      console.log(err);
      // Return a 500 error status for server issues
      res.status(500).json(err);
    });
});

// DELETE a tag by its `id`
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(tag => {
      // If no tag is found, return 404 status with a message
      if (!tag) {
        res.status(404).json({ message: 'No tag found with this id!' });
        return;
      }
      res.json({ message: 'Tag deleted successfully!' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;


