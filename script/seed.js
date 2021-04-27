'use strict';

const {
  db,
  models: { Order, User, Plant },
} = require('../server/db');

async function orderSeeding() {
  const orders = await Promise.all([
    Order.create({}),
    Order.create({}),
    Order.create({}),
    Order.create({
      status: 'shipped',
    }),
    Order.create({}),
    Order.create({}),
    Order.create({}),
    Order.create({}),
    Order.create({}),
    Order.create({}),
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

  // Creating plants
  const plants = await Promise.all([
    await Plant.create({
      name: 'Summer Crush',
      species: 'Hydrangea',
      price: 40.0,
      imageURL:
        'https://images.thdstatic.com/productImages/e154a248-ac84-46bf-a1a9-65724e122958/svn/endless-summer-bushes-14750-64_600.jpg',
      description:
        '2 Gal. Summer Crush Hydrangea Plant with Raspberry Red or Neon Purple Blooms /n /n Perennial hydrangea grows in USDA plant zones 4 to 9 /n Requires 2 to 4 hours of direct morning sun and afternoon shade /n Disease-resistant plant ideal for containers and small gardens',
      quantity: 5,
      active: false,
    }),

    await Plant.create({
      name: 'Red Diamond Loropetalum',
      species: 'Shrub',
      price: 45.0,
      imageURL:
        'https://images.thdstatic.com/productImages/fdcc14f7-564e-4206-a9ec-42ffb6b6eea5/svn/southern-living-plant-collection-bushes-14376-64_600.jpg',
      description:
        '2 Gal. Red Diamond Loropetalum Shrub with Burgundy Foliage and Bright Red Blooms /n /n USDA zones 7-10 /n Mature size 6 ft. W x 6 ft. h /n Full sun to part shade; Evergreen- year round interest /n Deep, vivid red blooms late winter to early spring and sporadically summer and fall /n Compact habit, deer resistant, reblooming, year-round interest /n Plants are trimmed at times when shipped to promote plant health',
      quantity: 3,
    }),
    await Plant.create({
      name: 'Rose Bush with Red Flowers',
      species: 'Bush',
      price: 40.0,
      imageURL:
        'https://images.homedepot-static.com/productImages/8d2e90af-b472-4835-9b00-a1f503436a42/svn/knock-out-rose-rose-bushes-13210-64_1000.jpg',
      description:
        '1 Gal. Red The Double Knock Out Rose Bush with Red Flowers /n /n Continuous flowers from spring through frost /n Drought tolerant and self-cleaning - no need to deadhead /n Full double flowers look like a classic rose /n Loves the full sun /n Deep, purplish green foliage /n Deciduous- Foliage loss in winter and new growth in spring /n Ships dormant (no foliage) winter through early spring',
      quantity: 12,
    }),
    await Plant.create({
      name: 'Autumn Carnation',
      species: 'Shrub',
      price: 25.0,
      imageURL:
        'https://images.thdstatic.com/productImages/ff7241c0-b4e1-47ab-a953-7b4b4dac705b/svn/encore-azalea-bushes-10325-64_1000.jpg',
      description:
        '1 Gal. Autumn Carnation Shrub with Semi Double Pink Flowers /n /n Zone 6-10 /n Blooms in spring, summer and fall /n Low maintenance /n Requires 4-hours to 6-hours of Sun /n Excellent as container plants /n Evergreen- year round interest /n Attracts butterflies, hummingbirds and bees /n Plants are trimmed at times when shipped to promote plant health',
      quantity: 6,
    }),
    await Plant.create({
      name: 'Rose Bush with Yellow Flowers',
      species: 'Bush',
      price: 40.0,
      imageURL:
        'https://images.thdstatic.com/productImages/a8632db2-1f1c-4cef-9663-a27a14e8d128/svn/knock-out-rose-bushes-13216-64_600.jpg',
      description:
        '1 Gal. Yellow The Sunny Knock Out Rose Bush with Yellow Flowers /n /n Yellow to cream flowers /n Mature size 3 ft. to 4 ft. H x 3 ft. to 5 ft. W /n Dark green, semi-glossy foliage /n USDA zones 4-11 /n Ships dormant winter through early spring /n Plants are trimmed at times when shipped to promote plant health /n Full sun to part shade',
      quantity: 13,
    }),
    await Plant.create({
      name: 'Pugster Blue Buddleia',
      species: 'Shrub',
      price: 30.0,
      imageURL:
        'https://images.thdstatic.com/productImages/bd267874-b35b-4251-8c9d-193ba5d42250/svn/bushes-14736-64_600.jpg',
      description:
        '2 Gal. Pugster Blue Buddeia Shrub with True-Blue Flowers /n /n Thanks to thick, sturdy stems, the pugster series offers vastly improved hardiness and winter survival over other types of dwarf butterfly bush /n Long blooming /n Fragrant flower /n Continuous bloom or rebloomer /n Deadheading not necessary',
      quantity: 5,
    }),
    await Plant.create({
      name: 'Braided Hibiscus',
      species: 'Hibiscus',
      price: 54.0,
      imageURL:
        'https://images.thdstatic.com/productImages/25598dfa-f9db-4ad6-9b43-33217ad7c445/svn/costa-farms-annuals-10hibbrgrch-64_1000.jpg',
      description:
        '2 Gal. Braided Hibiscus Live Tropical Plant /n /n Needs full sun, hibiscus love to have 6-hours to 8-hours of direct sunlight every day in order to produce the most flowers, they will grow in part shade, but will produce less blooms /n Keep watered in Summer, water hibiscus often in hot weather, plants grown in container may need watering every day in order to bloom to full potential, it is common for hibiscus to drop flower buds if they dry out too much /n Attracts butterflies /n Easy to grow /n Deer/rabbit resistant /n May arrive with flowers in bud form that will then blossom in a week or so',
      quantity: 6,
    }),
    await Plant.create({
      name: 'Kaleidoscope Abelia Plant with White Flowers',
      species: 'Abelia',
      price: 37.0,
      imageURL:
        'https://images.thdstatic.com/productImages/49539b64-9175-4d3e-9f42-72ea67e5d730/svn/southern-living-bushes-14411-64_600.jpg',
      description:
        '2 Gal. Kaleidoscope Abelia Plant with Chameleon-like Foliage that Blooms White Flowers /n /n Full sun to part shade /n USDA zones 6 - 9 /n Mature size 2 ft. 2.5 ft. H x 3 ft. to 3.5 ft. W /n Variegated foliage with small white flowers /n Evergreen- year round interest /n Plants are trimmed at times when shipped to promote plant health',
      quantity: 3,
    }),
    await Plant.create({
      name: 'Supertunia Vista Bubblegum Petunia',
      species: 'Petunia',
      price: 31.0,
      imageURL:
        'https://i.pinimg.com/originals/d5/1d/b4/d51db48001ccb7e164cff6c59f2edc10.jpg',
      description:
        '4.25 in. Proven Winners Grande Supertunia Vista Bubblegum Live Petunia Plant with Bright Pink Flowers /n /n Full sun /n Heat tolerant /n Blooms spring until frost /n USDA hardiness zones 9 - 11 /n Botanical name: petunia sp /n Attracts Hummingbirds /n Drought Tolerant',
      quantity: 8,
    }),
    await Plant.create({
      name: 'Superbells Calibrachoa Plant with Purple & Yellow Flowers',
      species: 'Calibrachoa',
      price: 32.0,
      imageURL:
        'https://images.thdstatic.com/productImages/6eec1b5b-91ce-41d6-800a-2190ee7baee3/svn/annuals-pwcal1bmp4pk-64_600.jpg',
      description:
        '4.25 in. Proven Winners Grande Superbells Blue Moon Punch Live Calibrachoa Plant with Purple & Yellow Flowers /n /n Full sun /n Heat tolerant /n Blooms spring until frost /n USDA hardiness zones 8 -11 /n Botanical name: calibrachoa /n Attracts Hummingbirds /n Drought Tolerant',
      quantity: 3,
    }),
    await Plant.create({
      name: 'Blue Orchid',
      species: 'Orchid',
      price: 80.0,
      imageURL:
        'https://images.thdstatic.com/productImages/90d397dc-eb08-4b6b-94bd-19ad911f2c35/svn/decoblooms-orchids-db9059-64_1000.jpg',
      description:
        '5 in. Orchid Blue /n /n Ideal for planting indoors near a moderately bright windowsill /n Pre-potted orchid can be grown in bright sunlight /n Requires watering once a week /n Orchid re-blooms to natural white phalaenopsis',
      quantity: 100,
    }),
    await Plant.create({
      name: 'Purple Orchid',
      species: 'Orchid',
      price: 80.0,
      imageURL:
        'https://images.thdstatic.com/productImages/fe7c2cc3-cf39-4566-bcfb-77b9401c96f1/svn/decoblooms-orchids-db8991-64_1000.jpg',
      description:
        '5 in. Orchid Purple  /n /n Ideal for planting indoors near a moderately bright windowsill /n Pre-potted orchid can be grown in bright sunlight /n Requires watering once a week /n Purple fused orchids will re-bloom as white flowers',
      quantity: 100,
    }),
    await Plant.create({
      name: 'Green Mound Juniper Bonsai',
      species: 'Bonsai',
      price: 40.0,
      imageURL:
        'https://images.thdstatic.com/productImages/05076193-7591-472e-b0c5-5530252e4806/svn/brussel-s-bonsai-bonsai-trees-dt-7079gmj-64_1000.jpg',
      description:
        'Green Mound Juniper Bonsai /n /n Textured foliage has a striking look and is easy to trim /n  Arrives in a sleek container with a humidity tray /n Perfect for bonsai beginners /n Prefers morning sun and afternoon shade',
      quantity: 9,
    }),
    await Plant.create({
      name: 'Satsuki Azalea',
      species: 'Satsuki Azalea',
      price: 30.0,
      imageURL:
        'https://images.thdstatic.com/productImages/cf96e081-66ad-410b-8b20-82190ff62aa5/svn/brussel-s-bonsai-bonsai-trees-dt-3066az-64_1000.jpg',
      description:
        'Satsuki Azalea 5-year old plant of the dwarf chinzan variety /n /n Produces gorgeous pink blossoms in the middle of May /n Comes with deco rock, 8 in. humidity tray and care brochure /n Perfect accent piece for outdoor porch, patio, and deck areas',
      quantity: 12,
    }),
    await Plant.create({
      name: 'Ponytail Palm',
      species: 'Palm',
      price: 50.0,
      imageURL:
        'https://images.thdstatic.com/productImages/d6ef6c9c-f4ab-417f-af7c-517d27900815/svn/brussel-s-bonsai-bonsai-trees-dt-7001ptp-64_1000.jpg',
      description:
        'Ponytail Palm /n /n Brings life to indoor environments /n Massive trunk with a weeping fountain of foliage /n Extremely low maintenance /n Thrives in low light /n Requires infrequent watering /n 6 years old',
      quantity: 2,
    }),
    await Plant.create({
      name: 'Assorted Succulent',
      species: 'Succulent',
      price: 31.0,
      imageURL:
        'https://images.thdstatic.com/productImages/f946e716-caf9-4b66-82e3-a89dc9647cf9/svn/shop-succulents-succulents-a12-64_1000.jpg',
      description:
        '2 in. Assorted Succulent (Collection of 12) /n /n Ideal for growing in USDA hardiness zones 11 through 13 /n Drought-tolerant succulents require low maintenance /n Collection of 12 plants with varied textures, sizes, and tones /n All Home Botanicals plants come with helpful care instructions in every pack',
      quantity: 8,
    }),
    await Plant.create({
      name: 'Blue Desert Gems Garden',
      species: 'Succulent',
      price: 40.0,
      imageURL:
        'https://images.thdstatic.com/productImages/0bb0daf9-1033-4d30-a6b6-c3376977fe5f/svn/costa-farms-succulents-6desgembluglobw-64_1000.jpg',
      description:
        'Blue Desert Gems Garden in 6 in. Gloss Ceramic Bowl /n /n Requires high sunlight for hefty growth /n Requires little water after every 10 days for hefty growth /n Perfect accent piece for home and office /n Plant received may vary due to availability, environment and season',
      quantity: 5,
    }),
    await Plant.create({
      name: 'Yellow Desert Gems Garden',
      species: 'Succulent',
      price: 40.99,
      imageURL:
        'https://images.thdstatic.com/productImages/96ffc2d1-48eb-45d7-8a56-fa3059c1e14d/svn/costa-farms-succulents-6desgemyelglobw-64_1000.jpg',
      description:
        'Yellow Desert Gems Garden in 6 in. Gloss Ceramic Bowl /n /n Best planted indoors to enhance your home decor /n  Pre-potted plant requires full sunlight for growth /n Requires little water after every 10 days for hefty growth /n Plant received may vary due to availability, environment and season',
      quantity: 10,
    }),
  ]);

  const orders = await orderSeeding();

  console.log(`seeded ${orders.length} orders`);
  console.log(`seeded successfully`);

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: 'gelleri@gmail.com',
      password: '123',
      isAdmin: true,
      name: 'Monica Geller',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create({
      email: 'green@gmail.com',
      password: '123',
      name: 'Rachel Green',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create({
      email: 'tribbiani@gmail.com',
      password: '123',
      name: 'Joey Tribbiani',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create({
      email: 'buffay@gmail.com',
      password: '123',
      name: 'Phoebe Buffay',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create({
      email: 'bing@gmail.com',
      password: '123',
      name: 'Chandler Bing',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
    User.create({
      email: 'ross@gmail.com',
      password: '123',
      name: 'Ross Geller',
      shippingAddress: '90 Bedford St, New York, NY 10014',
      billingAddress: '90 Bedford St, New York, NY 10014',
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);

  await users[0].setOrders(orders[0]);
  await users[1].setOrders([orders[2], orders[5]]);
  await users[2].setOrders(orders[3]);
  await users[3].setOrders(orders[6]);
  await users[4].setOrders(orders[8]);

  await plants[0].setOrders(orders[0], { through: { quantity: 2 } });

  await orders[2].setPlants(plants[3], { through: { quantity: 5 } });
  await orders[2].addPlant(plants[12], { through: { quantity: 9 } });

  return {
    users,
    orders,
    plants,
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
