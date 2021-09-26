const Sequelize = require('sequelize');
const db = require('../db');

const OrderItem = db.define('orderItem', {
  quantity: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 10
    }
  },
  price: {
    type: Sequelize.INTEGER
  }
});

module.exports = OrderItem;
