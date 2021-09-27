'use strict';

const {
  db,
  models: { User, Product, Order, OrderItem }
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

// Data for product seeding
const products = [
  {
    name: 'Mary Lou Earrings in Lavender',
    description:
      'Asymmetrical dangly earrings with a lavender marble handmade with polymer clay.',
    imageUrl:
      'https://i.etsystatic.com/25775611/r/il/78b33d/2875643117/il_794xN.2875643117_o3ab.jpg',
    price: 2500,
    stock: 1,
    category: 'Earring'
  },
  {
    name: 'Diamond Paragon Earrings (Merry Berry Collection)',
    description: 'Simple diamond shape with an intricate embossed design',
    imageUrl:
      'https://i.etsystatic.com/25775611/r/il/b85a24/2746249404/il_794xN.2746249404_tbwa.jpg',
    price: 1800,
    stock: 10,
    category: 'Earring'
  },
  {
    name: 'testing product',
    description: 'just here for testing',
    imageUrl:
      'https://images.theconversation.com/files/72534/original/image-20150219-28209-ovexg7.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop',
    price: 350,
    stock: 350,
    category: 'test'
  }
];
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  await User.create({
    firstName: 'Phillip',
    lastName: 'Kim',
    username: 'phillip.kim.3112@gmail.com',
    password: 'notmyactualpassword',
    streetAddress: '3900 Harvest Ln',
    city: 'Glenview',
    state: 'Il',
    zipCode: 60026
  });
  await User.create({
    firstName: 'Grace',
    lastName: 'Kim',
    username: 'kimgrace224@gmail.com',
    password: 'testpassword',
    streetAddress: '3900 Harvest Ln',
    city: 'Glenview',
    state: 'Il',
    zipCode: 60026,
    isAdmin: true
  });

  // Creating Products
  for (let product of products) {
    const { name, description, imageUrl, price, stock, category } = product;
    await Product.create({
      name,
      description,
      imageUrl,
      price,
      stock,
      category
    });
  }

  // Creating Dummy order items
  await OrderItem.create({
    orderId: 1,
    productId: 1,
    price: 2500,
    quantity: 1
  });

  await OrderItem.create({
    orderId: 1,
    productId: 2,
    price: 3600,
    quantity: 2
  });

  console.log(`seeded successfully`);
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
