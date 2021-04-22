/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const Sequelize = require('sequelize');
const db = require('../db');

const OrderProducts = db.define('orderProducts', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  subTotal: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderProducts;
