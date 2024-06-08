'use strict';

const { SpotImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const spotImages = [
  {
    spotId: 1,
    url: 'https://resources.atproperties.com/images/GNIAR/00/800/929/660233dd878e7/1.jpg',
    preview: true
  },
  {
    spotId: 1,
    url: 'https://resources.atproperties.com/images/GNIAR/00/800/929/660233dd878e7/3.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://resources.atproperties.com/images/GNIAR/00/800/929/660233dd878e7/5.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://resources.atproperties.com/images/GNIAR/00/800/929/660233dd878e7/7.jpg',
    preview: false
  },
  {
    spotId: 1,
    url: 'https://resources.atproperties.com/images/GNIAR/00/800/929/660233dd878e7/8.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://www.hauteresidence.com/wp-content/uploads/2019/04/fjH9Xrz0-1024x683.jpg',
    preview: true
  },
  {
    spotId: 2,
    url: 'https://www.hauteresidence.com/wp-content/uploads/2019/04/BSMpRvxk-1024x683.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://www.hauteresidence.com/wp-content/uploads/2019/04/rZdcDUPo-1024x683.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://www.hauteresidence.com/wp-content/uploads/2019/04/gMeobklM-1024x683.jpg',
    preview: false
  },
  {
    spotId: 2,
    url: 'https://www.hauteresidence.com/wp-content/uploads/2019/04/rWK4uvU0-1024x683.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://media.architecturaldigest.com/photos/63a204dee66162a8bbfbaf3f/16:9/w_960%2Cc_limit/Hranowsky_Birch-1.jpg',
    preview: true
  },
  {
    spotId: 3,
    url: 'https://media.architecturaldigest.com/photos/63a204f05ced9765ef70a88c/master/w_960%2Cc_limit/Hranowsky_Birch-10.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://media.architecturaldigest.com/photos/63a204fe55036cf91095f083/master/w_960%2Cc_limit/Hranowsky_Birch-24.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://media.architecturaldigest.com/photos/63a20508decb2359daac233f/master/w_960%2Cc_limit/Hranowsky_Birch-47%2520Painting.jpg',
    preview: false
  },
  {
    spotId: 3,
    url: 'https://media.architecturaldigest.com/photos/63a20501decb2359daac233b/master/w_960%2Cc_limit/Hranowsky_Birch-31%2520Levels.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://media.architecturaldigest.com/photos/635fca1de3bc540330136178/16:9/w_960,c_limit/Living%20room.jpg',
    preview: true
  },
  {
    spotId: 4,
    url: 'https://media.architecturaldigest.com/photos/635fca198ccaa8231343e32f/master/w_960,c_limit/Living%20room1.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://media.architecturaldigest.com/photos/635fcddbfa72a7ce9deb8fa7/master/w_960,c_limit/Kitchen%20(1)%20(1).jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://media.architecturaldigest.com/photos/635fca1f8ccaa8231343e331/master/w_960,c_limit/Bedroom1.jpg',
    preview: false
  },
  {
    spotId: 4,
    url: 'https://media.architecturaldigest.com/photos/635fca223b16ac3da526f765/master/w_960,c_limit/Bathroom%202.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://dhdstudio.com/wp-content/uploads/2021/02/Victorian-Brownstone-Condo-After-Living-Room-1400-opt-1000x666.jpg',
    preview: true
  },
  {
    spotId: 5,
    url: 'https://dhdstudio.com/wp-content/uploads/2021/02/Victorian-Brownstone-Condo-After-Kitchen-1400-comp-1000x666.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://dhdstudio.com/wp-content/uploads/2021/02/Victorian-Brownstone-Condo-After-Stairs-1400-comp.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://dhdstudio.com/wp-content/uploads/2021/02/Victorian-Brownstone-Condo-After-Hall-1400-opt-1000x667.jpg',
    preview: false
  },
  {
    spotId: 5,
    url: 'https://dhdstudio.com/wp-content/uploads/2021/01/Victorian-Brownstone-Condo-Bathroom-1400-min.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://media.architecturaldigest.com/photos/5f6a3ba961c54e9685868c4e/master/w_960,c_limit/KrissyJones_Aug2020-33.jpg',
    preview: true
  },
  {
    spotId: 6,
    url: 'https://www.dailydreamdecor.com/wp-content/uploads/2020/10/studio-apartment-new-york-4.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://www.dailydreamdecor.com/wp-content/uploads/2020/10/studio-apartment-new-york-2.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://www.dailydreamdecor.com/wp-content/uploads/2020/10/studio-apartment-new-york-1.jpg',
    preview: false
  },
  {
    spotId: 6,
    url: 'https://www.dailydreamdecor.com/wp-content/uploads/2020/10/studio-apartment-new-york-3.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://media.architecturaldigest.com/photos/64aef72b1e11ee0b0362d92f/16:9/w_960,c_limit/%C2%A9Jane%20Beiles-103.jpg',
    preview: true
  },
  {
    spotId: 7,
    url: 'https://media.architecturaldigest.com/photos/64aef7101619f3baa4c9c6bb/master/w_960,c_limit/%C2%A9Jane%20Beiles-140.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://media.architecturaldigest.com/photos/64aef71af9dd21f1969d9bef/master/w_960,c_limit/%C2%A9Jane%20Beiles-109-2.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://media.architecturaldigest.com/photos/64aef7191619f3baa4c9c6bd/master/w_960,c_limit/%C2%A9Jane%20Beiles-126.jpg',
    preview: false
  },
  {
    spotId: 7,
    url: 'https://media.architecturaldigest.com/photos/64aef709f9dd21f1969d9bed/master/w_960,c_limit/%C2%A9Jane%20Beiles-40.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://media.architecturaldigest.com/photos/626ff57201757f07718c1a20/16:9/w_960,c_limit/AD_Accord_Card_0118.jpg',
    preview: true
  },
  {
    spotId: 8,
    url: 'https://media.architecturaldigest.com/photos/626b13e8ef630c73a9fb0c2a/master/w_960,c_limit/Job_10392.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://media.architecturaldigest.com/photos/626b13f840d3c4d76f58f0c2/master/w_960,c_limit/Job_10208.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://media.architecturaldigest.com/photos/626b13de46c3588af5764662/master/w_960,c_limit/Job_10450.jpg',
    preview: false
  },
  {
    spotId: 8,
    url: 'https://media.architecturaldigest.com/photos/626b13f1ef630c73a9fb0c2c/master/w_960,c_limit/Job_10107.jpg',
    preview: false
  },
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
