'use strict';

const {
  db,
  models: { Order },
} = require('../server/db');

const totalSum = (arr) => {
  return arr.reduce((acc, item) => acc + item.plant.price, 0);
};

async function orderSeeding() {
  const orders = await Promise.all([
    Order.create({
      plantsBought: [{ plant: { name: 'orchid', price: 120 }, quantity: 2 }],
    }),
    Order.create({
      plantsBought: [
        { plant: { name: 'orchid', price: 120 }, quantity: 2 },
        { plant: { name: 'apple tree', price: 35.99 }, quantity: 1 },
      ],
    }),
    Order.create({
      plantsBought: [
        { plant: { name: 'orchid', price: 120 }, quantity: 2 },
        { plant: { name: 'peony', price: 18.95 }, quantity: 12 },
      ],
    }),
    Order.create({
      plantsBought: [{ plant: { name: 'orchid', price: 120 }, quantity: 1 }],
    }),
    Order.create({
      plantsBought: [
        { plant: { name: 'orchid', price: 120 }, quantity: 2 },
        { plant: { name: 'apple tree', price: 35.99 }, quantity: 1 },
        { plant: { name: 'peony', price: 18.95 }, quantity: 4 },
      ],
    }),
    Order.create({
      plantsBought: [
        { plant: { name: 'orchid', price: 120 }, quantity: 2 },
        { plant: { name: 'peony', price: 18.95 }, quantity: 12 },
      ],
    }),
    Order.create({
      plantsBought: [{ plant: { name: 'orchid', price: 120 }, quantity: 2 }],
    }),
    Order.create({
      plantsBought: [
        { plant: { name: 'apple tree', price: 35.99 }, quantity: 5 },
      ],
    }),
    Order.create({
      plantsBought: [
        { plant: { name: 'daisy', price: 9.99 }, quantity: 2 },
        { plant: { name: 'peony', price: 18.95 }, quantity: 9 },
      ],
    }),
  ]);
  return orders;
}

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const orders = await orderSeeding();

  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded successfully`);
  return {
    orders,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
