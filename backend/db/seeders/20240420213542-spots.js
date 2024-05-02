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
    description: 'Lorem ipsum dolor sit amet',
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
    description: 'Consectetur adipiscing elit, sed do eiusmod',
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
    description: 'Tempor incididunt ut labore et dolore magna aliqua',
    price: 300
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(spots , { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, { name: spots.map(spot => spot) }, {});
  }
};
