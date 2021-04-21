/* global describe beforeEach it */

const { expect } = require('chai');
const {
  db,
  models: { Order },
} = require('../index');

const seed = require('../../../script/seed');

describe('Order mdoel', () => {
  let orders;
  beforeEach(async () => {
    orders = (await seed()).orders;
  });

  describe('plants bought', () => {
    it('is an array of objects describing the plant at purchase time and how many were bought', () => {
      const { plantsBought } = orders[0];
      expect(plantsBought).to.be.a('array');

      const plantsBought2 = orders[1].plantsBought;
      expect(plantsBought2).to.be.a('array');

      const plantsBought3 = orders[2].plantsBought;
      expect(plantsBought3).to.be.a('array');
    });

    it('holds objects representing plant instances and a prop describing the quantity', () => {
      const order = orders[0];

      expect(order.plantsBought[0]).to.be.a('object');
      expect(order.plantsBought[0].quantity).to.be.a('number');
    });
  });

  describe('total price', () => {
    it('sums up all the prices of the plants in the order', () => {
      expect(orders[0].totalPrice).to.equal(240);
      expect(orders[1].totalPrice).to.equal(275.99);
      expect(orders[2].totalPrice).to.equal(467.4);
    });
  });
});
