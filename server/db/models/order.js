const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  fulfilled: {
    type: Sequelize.BOOLEAN
  },
  fulfilledDate: {
    type: Sequelize.DATE
  }
});

module.exports = Order;
