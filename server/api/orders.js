const chalk = require('chalk');
const router = require('express').Router();
const {
  models: { Product, Order, OrderItem }
} = require('../db');
const { loggedIn } = require('./gatekeepingMiddleware');
module.exports = router;

// GET /api/orders
router.get('/', loggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({
      where: {
        userId
      },
      include: { model: OrderItem, include: { model: Product } }
    });
    if (!orders) {
      next({ status: 500, message: 'Database query failed.' });
    }
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// POST /api/orders
router.post('/', loggedIn, async (req, res, next) => {
  try {
    const userId = req.user.id;

    const hasCart = await Order.findOne({
      where: {
        fulfilled: false,
        userId
      }
    });

    if (!hasCart) {
      const newOrder = await Order.create({
        fulfilled: false,
        userId
      });

      res.json(newOrder);
    } else {
      console.log('User already has an unfulfilled cart');
      res.sendStatus(500);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/orders/:id
router.put('/:id', loggedIn, async (req, res, next) => {
  try {
    const orderStatus = req.body.fulfilled;
    const orderId = parseInt(req.params.id);
    let order = await Order.findByPk(orderId);
    if (!order) {
      next({ status: 500, message: 'Database query failed.' });
    }

    await order.update({ fulfilled: orderStatus });
    const updatedOrder = await Order.findOne({
      where: {
        id: orderId
      },
      include: { model: OrderItem, include: { model: Product } }
    });
    if (!updatedOrder) {
      next({ status: 500, message: 'Database query failed.' });
    }

    res.json(updatedOrder);
  } catch (err) {
    next(err);
  }
});
