//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/User');
const Product = require('./models/product');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');

//Associations
User.hasMany(Order);
Order.belongsTo(User);

OrderItem.belongsTo(Product);
Product.hasOne(OrderItem);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    OrderItem
  }
};
