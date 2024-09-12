const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET all products
router.get('/', (req, res) => {
  // Retrieve all products and include their associated categories and tags
  Product.findAll({
    include: [
      { model: Category, attributes: ['id', 'category_name'] },
      { model: Tag, through: ProductTag, attributes: ['id', 'tag_name'] }
    ]
  })
    .then(products => res.json(products))
    .catch(err => {
      console.log(err);
      // Return a 500 error status for server issues
      res.status(500).json(err);
    });
});

// GET a single product by its `id`
router.get('/:id', (req, res) => {
  // Retrieve a product by its `id` and include associated categories and tags
  Product.findByPk(req.params.id, {
    include: [
      { model: Category, attributes: ['id', 'category_name'] },
      { model: Tag, through: ProductTag, attributes: ['id', 'tag_name'] }
    ]
  })
    .then(product => {
      // If no product is found, return 404 status with a message
      if (!product) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
      res.json(product);
    })
    .catch(err => {
      console.log(err);
      // Return a 500 error status for server issues
      res.status(500).json(err);
    });
});

// POST a new product
router.post('/', (req, res) => {
  // Create a new product with the request body
  Product.create(req.body)
    .then(product => {
      // If there are product tags, create entries in ProductTag model
      if (req.body.tagIds && req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map(tag_id => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // If no tags, return the product data
      res.status(200).json(product);
    })
    .then(productTagIds => res.status(200).json(productTagIds))
    .catch(err => {
      console.log(err);
      // Return a 400 error status for bad requests
      res.status(400).json(err);
    });
});

// PUT to update a product by its `id`
router.put('/:id', (req, res) => {
  // Update the product by its `id` using the request body
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then(product => {
      if (!product[0]) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }

      // If there are new product tags, update the ProductTag entries
      if (req.body.tagIds && req.body.tagIds.length) {
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then(productTags => {
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
            .filter(tag_id => !productTagIds.includes(tag_id))
            .map(tag_id => {
              return {
                product_id: req.params.id,
                tag_id,
              };
            });

          const productTagsToRemove = productTags
            .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
            .map(({ id }) => id);

          // Remove old tags and add new tags
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        }).then(() => res.json(product))
        .catch(err => {
          console.log(err);
          // Return a 400 error status for bad requests
          res.status(400).json(err);
        });
      } else {
        res.json(product);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

// DELETE a product by its `id`
router.delete('/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(product => {
      // If no product is found, return 404 status with a message
      if (!product) {
        res.status(404).json({ message: 'No product found with this id!' });
        return;
      }
      // Return success message
      res.json({ message: 'Product deleted successfully!' });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;


