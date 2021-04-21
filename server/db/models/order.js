/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  plantsBought: {
    // copied from user.cart, if that doesn't work this won't either
    type: Sequelize.ARRAY(Sequelize.JSONB),
    defaultValue: [],
    get() {
      return this.getDataValue('plantsBought').map((item) => JSON.parse(item));
    },
    set(val) {
      return this.setDataValue(
        'plantsBought',
        val.map((item) => JSON.stringify(item))
      );
    },
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
Pseudo Code illustrating one possible version that cart and plantsBought might differ

In users:
cart = [
  {
    plant: plantId,
    quantity: 5
  },
  {
    plant: otherPlantId,
    quantity: 2
  }
]

in the order:
plantsBought = [
  {
    plant: {Plant instance}
    quantity: 5
  },
  {
    plant: {otherPlant instance},
    quantity: 2
  }
]

*/
