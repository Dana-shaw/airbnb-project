'use strict';
const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviewImages = [
  {
    reviewId: 1,
    url: 'image url'
  },
  {
    reviewId: 2,
    url: 'image url'
  },
  {
    reviewId: 3,
    url: 'image url'
  },
  {
    reviewId: 4,
    url: 'image url'
  },
  {
    reviewId: 5,
    url: 'image url'
  },
  {
    reviewId: 6,
    url: 'image url'
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(reviewImages , { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options, { review: reviewImages.map(review => review) }, {});
  }
};
