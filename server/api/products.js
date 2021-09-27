const router = require('express').Router();
const {
  models: { Product }
} = require('../db');

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    if (!products) {
      next({ status: 500, message: 'Database query failed.' });
    }
    res.json(products);
  } catch (err) {
    next(err);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.findByPk(id);
    if (!product) {
      next({ status: 500, message: 'Database query failed.' });
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
});

// UPDATE /api/products/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatingProduct = await Product.findByPk(id);
    if (!updatingProduct) {
      next({ status: 500, message: 'Database query failed.' });
    }
    const { name, description, price, stock } = req.body;
    await updatingProduct.update({
      name,
      description,
      price,
      stock
    });
    res.json(updatingProduct);
  } catch (err) {
    next(err);
  }
});

//DELETE api/products/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await Product.findByPk(productId);
    if (!product) {
      next({ status: 500, message: 'Database query failed.' });
    }
    await product.destroy();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

//POST api/products
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    if (!newProduct) {
      next({ status: 500, message: 'Database query failed.' });
    }
    res.json(newProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
