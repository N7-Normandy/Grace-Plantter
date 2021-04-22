/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  plantsBought: {
    // copied from user.cart, if that doesn't work this won't either
    type: Sequelize.ARRAY(Sequelize.JSONB),
    defaultValue: [],
  },
  totalPrice: {
    type: Sequelize.FLOAT(2),
  },
  paymentType: {
    type: Sequelize.STRING,
  },
});

Order.beforeCreate((order) => {
  const total = order.plantsBought.reduce((acc, curr) => {
    return acc + curr.plant.price * curr.quantity;
  }, 0);
  order.totalPrice = total;
});

module.exports = Order;

/*
Order should look like:

{
  plantsBought: [
    {
      plant: {
        id: 12,
        name: 'blue orchid',
        ...
      },
      quantity: 12
    },
    {},
    {}
  ],
  totalPrice: 123,
  paymentType: 'Stripe'
}

*/
