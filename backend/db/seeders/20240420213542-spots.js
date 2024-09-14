'use strict';

const { Spot, User } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spots = [
  {
    ownerId: 1,
    address: '1982 Sharon Lane',
    city: 'Michigan City',
    state: 'IN',
    country: 'USA',
    lat: 41.699566,
    lng: -86.903732,
    name: 'Cute Coastal Cottage',
    description: "Welcome to our Cute Coastal Cottage, a cozy haven nestled along the picturesque shoreline. This charming retreat boasts serene interiors infused with coastal vibes, offering a tranquil escape for those seeking solace by the sea. With sandy beaches just steps away and a quaint town nearby, our cottage promises a perfect blend of relaxation and adventure for your coastal getaway.",
    price: 150
  },
  {
    ownerId: 1,
    address: '4392 Marigold Lane',
    city: 'Miami',
    state: 'FL',
    country: 'USA',
    lat: 25.688234,
    lng: -80.121033,
    name: 'Beachside Condo',
    description: "Welcome to our Beachside Condo, where panoramic ocean views and modern comforts await your arrival. This stylish retreat offers a seamless blend of luxury and relaxation, with floor-to-ceiling windows bathing the living space in natural light and providing breathtaking vistas of the sparkling sea. Step onto the balcony to feel the salty breeze on your skin as you sip your morning coffee or unwind with a glass of wine at sunset. With direct access to the beach and amenities such as a pool and fitness center, our condo promises an unforgettable beachside retreat for your next getaway.",
    price: 200
  },
  {
    ownerId: 1,
    address: '603 Khale Street',
    city: 'Charleston',
    state: 'SC',
    country: 'USA',
    lat: 32.708889,
    lng: -79.887779,
    name: 'Historic Downtown Townhome',
    description: "Welcome to our Downtown Charleston Townhome, where historic charm meets modern luxury in the heart of the Holy City. Nestled in a vibrant neighborhood brimming with Southern hospitality, this elegantly appointed residence offers a quintessential Charleston experience. With renowned restaurants, art galleries, and cultural landmarks just steps away, our townhome provides the perfect base for exploring all that Charleston has to offer, ensuring an unforgettable stay in this beloved coastal city.",
    price: 300
  },
  {
    ownerId: 3,
    address: '4372 Old Dear Lane',
    city: 'Poughkeepsie',
    state: 'NY',
    country: 'USA',
    lat: 41.714710,
    lng: -73.885727,
    name: 'Charming Studio',
    description: "Welcome to our cozy studio in the heart of Poughkeepsie! Perfect for solo travelers or couples, this charming retreat offers a comfortable queen-sized bed, a well-equipped kitchenette, and a cozy seating area. Located just minutes from the scenic Hudson River and local attractions, our studio provides a convenient and inviting home base for exploring all that Poughkeepsie has to offer. Welcome to your home away from home!",
    price: 100
  },
  {
    ownerId: 2,
    address: '1062 Bryan Avenue',
    city: 'Minneapolis',
    state: 'MN',
    country: 'USA',
    lat: 44.886574,
    lng: -93.349953,
    name: 'Historic Brownstone Apartment',
    description: "Welcome to our Historic Downtown Brownstone Apartment, where classic elegance meets modern comfort in the heart of the city. Recently renovated to blend timeless charm with contemporary amenities, this stylish retreat offers a sophisticated urban living experience. Admire the original architectural details such as exposed brick walls and ornate moldings, while enjoying the convenience of a fully equipped kitchen, luxurious bedding, and high-speed internet. Located in a vibrant neighborhood with cafes, shops, and cultural attractions just steps away, our apartment provides the perfect blend of historic charm and urban convenience for your stay in the city.",
    price: 250
  },
  {
    ownerId: 3,
    address: '644 Cottonwood Lane',
    city: 'Nashville',
    state: 'TN',
    country: 'USA',
    lat: 36.213272,
    lng: -86.914558,
    name: 'Farmhouse Studio',
    description: "Welcome to our cozy Farmhouse Studio in Nashville, the perfect retreat for exploring Music City! Nestled in a vibrant neighborhood just minutes from downtown, this stylishly furnished studio offers all the comforts of home. Relax in the comfortable queen-sized bed after a day of sightseeing or catch up on your favorite shows on the smart TV. With a fully equipped kitchenette, you can whip up a quick meal before heading out to experience Nashville's renowned dining scene and live music venues. Whether you're here for business or pleasure, our studio provides a convenient and inviting home base for your Nashville adventures.",
    price: 175
  },
  {
    ownerId: 3,
    address: '3410 Valley Lane',
    city: 'Austin',
    state: 'TX',
    country: 'USA',
    lat: 30.352579,
    lng: -97.806152,
    name: 'Colorful Bungalow',
    description: "Welcome to our inviting Colorful Bungalow nestled in Austin's eclectic neighborhood. Soft pops of color and whimsical decor welcome you into a cozy retreat filled with charm and comfort. Unwind in the serene living space or prepare a meal in the fully equipped kitchen before venturing out to explore Austin's vibrant culture and culinary delights. With a tranquil backyard oasis offering a peaceful escape, our bungalow promises a delightful blend of relaxation and adventure for your stay in the Live Music Capital of the World.",
    price: 135
  },
  {
    ownerId: 2,
    address: '3933 Reeves Street',
    city: 'Appleton',
    state: 'WI',
    country: 'USA',
    lat: 44.355927,
    lng: -88.412247,
    name: 'Modern Lakeside Cabin',
    description: "Welcome to our Modern Lakeside Cabin, where contemporary design meets natural beauty for the ultimate retreat. Nestled on the shores of a tranquil lake, this stylish cabin offers panoramic views and serene surroundings. Step inside to discover sleek interiors adorned with minimalist decor, plush furnishings, and all the amenities you need for a comfortable stay. Whether you're lounging by the fireplace, enjoying a meal in the fully equipped kitchen, or soaking up the scenery from the spacious deck, our cabin provides the perfect blend of modern luxury and rustic charm for your lakeside getaway.",
    price: 165
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(spots , { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, { }, {});
  }
};
