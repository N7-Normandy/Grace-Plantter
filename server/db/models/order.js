/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  totalPrice: {
    type: Sequelize.INTEGER,
    get() {
      return this.getDataValue('totalPrice') / 100;
    },
    set(num) {
      this.setDataValue('totalPrice', num * 100);
    },
  },
  paymentType: {
    type: Sequelize.STRING,
  },
  status: {
    type: Sequelize.ENUM(['cart', 'purchased', 'shipped', 'refunded']),
    defaultValue: 'cart',
  },
});

// Order.beforeCreate((order) => {
//   const total = order.plantsBought.reduce((acc, curr) => {
//     return acc + curr.plant.price * curr.quantity;
//   }, 0);
//   order.totalPrice = total;
// });

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
