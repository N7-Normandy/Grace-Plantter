//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');

const Order = require('./models/order');

const Plant = require('./models/plant');

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Order,
    Plant,
  },
};
