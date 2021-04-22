//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');

const Order = require('./models/order');

const Plant = require('./models/plant');
const OrderProducts = require('./models/order-products');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Plant, { through: OrderProducts });
Plant.belongsToMany(Order, { through: OrderProducts });

module.exports = {
  db,
  models: {
    User,
    Order,
    Plant,
  },
};
