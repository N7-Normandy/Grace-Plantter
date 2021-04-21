'use strict';

const {db, models: {User}} = require ('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed () {
  await db.sync ({force: true}); // clears db and matches models to tables
  console.log ('db synced!');

  // Creating Users
  const users = await Promise.all ([
    User.create ({
      email: 'gelleri@gmail.com',
      password: '123',
      isAdmin: true,
      name: 'Monica Geller',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create ({
      email: 'green@gmail.com',
      password: '123',
      name: 'Rachel Green',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create ({
      email: 'tribbiani@gmail.com',
      password: '123',
      name: 'Joey Tribbiani',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create ({
      email: 'buffay@gmail.com',
      password: '123',
      name: 'Phoebe Buffay',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create ({
      email: 'bing@gmail.com',
      password: '123',
      name: 'Chandler Bing',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create ({
      email: 'ross@gmail.com',
      password: '123',
      name: 'Ross Geller',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
  ]);

  console.log (`seeded ${users.length} users`);
  console.log (`seeded successfully`);
  return {
    users,
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed () {
  console.log ('seeding...');
  try {
    await seed ();
  } catch (err) {
    console.error (err);
    process.exitCode = 1;
  } finally {
    console.log ('closing db connection');
    await db.close ();
    console.log ('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed ();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
