'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotImages = [
  {
    spotId: 1,
    url: 'image url',
    preview: true
  },
  {
    spotId: 1,
    url: 'image url',
    preview: false
  },
  {
    spotId: 2,
    url: 'image url',
    preview: true
  },
  {
    spotId: 2,
    url: 'image url',
    preview: false
  },
  {
    spotId: 3,
    url: 'image url',
    preview: true
  },
  {
    spotId: 3,
    url: 'image url',
    preview: false
  },
  {
    spotId: 3,
    url: 'image url',
    preview: false
  }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await SpotImage.bulkCreate(spotImages, { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    await queryInterface.bulkDelete(options, { url: spotImages.map(spotImage => spotImage) }, {});
  }
};
