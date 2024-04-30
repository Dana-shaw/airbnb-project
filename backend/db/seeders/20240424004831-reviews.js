'use strict';

const { Review, User, Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviews = [
  {
    userId: 5,
    spotId: 1,
    review: 'The home was cute and cozy. We loved our stay here!',
    stars: 5
  },
  {
    userId: 5,
    spotId: 2,
    review: 'Within walking distance of the beach, very convenient!',
    stars: 4
  },
  {
    userId: 5,
    spotId: 3,
    review: 'The location and place were great, but it rained a lot while we were here.',
    stars: 3
  },
  {
    userId: 4,
    spotId: 1,
    review: 'We enjoyed our stay',
    stars: 4
  },
  {
    userId: 4,
    spotId: 2,
    review: 'Great',
    stars: 4
  },
  {
    userId: 4,
    spotId: 3,
    review: 'Very accomodating. Good location.',
    stars: 4
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(reviews , { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, { review: reviews.map(review => review) }, {});
  }
};
