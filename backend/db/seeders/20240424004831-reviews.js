'use strict';

const { Review, User, Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const reviews = [
  {
    userId: 3,
    spotId: 1,
    review: "Our stay at this Airbnb was absolutely fantastic! The location was perfect, with breathtaking views and easy access to local attractions. The accommodations were clean, comfortable, and beautifully decorated. The host was incredibly responsive and helpful throughout our stay. We can't wait to come back!",
    stars: 5
  },
  {
    userId: 2,
    spotId: 2,
    review: "We had a wonderful time at this Airbnb! The space was exactly as described—cozy, well-appointed, and conveniently located. The host thought of every detail to make our stay enjoyable, from providing local recommendations to ensuring we had everything we needed. We especially loved the charming decor and the welcoming atmosphere. Highly recommend!",
    stars: 4
  },
  {
    userId: 3,
    spotId: 3,
    review: "What a gem of an Airbnb! From the moment we arrived, we felt right at home. The property was stunning, with gorgeous views and plenty of amenities to keep us entertained. The host was friendly and accommodating, making sure we had everything we needed for a comfortable stay. We loved every minute of our time here and can't wait to return!",
    stars: 5
  },
  {
    userId: 2,
    spotId: 4,
    review: "Our experience at this Airbnb was simply wonderful! The attention to detail in the design and amenities provided exceeded our expectations. The location was perfect for exploring the area, and the host's communication made check-in and check-out a breeze. We would highly recommend this place to anyone looking for a relaxing and enjoyable getaway.",
    stars: 4
  },
  {
    userId: 3,
    spotId: 5,
    review: "Staying at this Airbnb was a highlight of our trip! The accommodations were clean, comfortable, and tastefully decorated. We appreciated the little touches like a stocked kitchen and cozy linens that made us feel right at home. The host was friendly and responsive, providing excellent recommendations for local activities and dining options. We can't wait to visit again!",
    stars: 4
  },
  {
    userId: 1,
    spotId: 6,
    review: "We had an amazing time at this Airbnb! The property was even more stunning in person, and the views were absolutely breathtaking. The accommodations were top-notch, with modern amenities and plenty of space for our group. The host went above and beyond to ensure our stay was perfect, and we're already planning our next visit. Highly recommend for anyone looking for a memorable vacation experience!",
    stars: 4
  },
  {
    userId: 2,
    spotId: 7,
    review: "Our stay at this Airbnb was fantastic from start to finish! The location was unbeatable, with easy access to attractions and dining options. The space itself was beautifully decorated and immaculately clean, with all the comforts of home. The host was incredibly accommodating and provided excellent communication throughout our stay. We can't wait to come back and explore more of the area!",
    stars: 4
  },
  {
    userId: 3,
    spotId: 8,
    review: "We absolutely loved our time at this Airbnb! The cabin was cozy, charming, and thoughtfully equipped with everything we needed for a relaxing getaway. The surrounding nature was stunning, and we enjoyed hiking trails and exploring the nearby lakes. The host was friendly and attentive, ensuring that our stay was enjoyable from beginning to end. We would highly recommend this place to anyone looking for a peaceful retreat.",
    stars: 4
  },
  {
    userId: 3,
    spotId: 2,
    review: "Our stay at this Airbnb exceeded all expectations! The accommodations were stylish and comfortable, with plenty of space for our group to relax and unwind. The location was perfect for exploring the area, and we appreciated the host's thoughtful recommendations for local attractions and dining options. We couldn't have asked for a better experience and can't wait to return in the future!",
    stars: 5
  },
  {
    userId: 1,
    spotId: 4,
    review: "We had a fantastic stay at this Airbnb! The location was ideal, with easy access to attractions and restaurants. The apartment was clean, comfortable, and well-equipped with everything we needed for a great trip. The host was friendly and communicative, making check-in a breeze. We would definitely stay here again!",
    stars: 5
  },
  {
    userId: 2,
    spotId: 6,
    review: "Our experience at this Airbnb was excellent! The property was exactly as described, with beautiful decor and thoughtful amenities. We appreciated the attention to detail, from the comfortable bedding to the fully stocked kitchen. The location was perfect for exploring the area, and the host provided helpful recommendations for local activities. We can't wait to return!",
    stars: 5
  },
  {
    userId: 1,
    spotId: 8,
    review: "We thoroughly enjoyed our stay at this Airbnb! The space was stylish and comfortable, and the host went above and beyond to ensure we had a wonderful experience. The location was fantastic, within walking distance of shops and restaurants. We especially loved the cozy fireplace and scenic views. Highly recommend this Airbnb to anyone visiting the area!",
    stars: 5
  },
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(reviews , { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, { }, {});
  }
};
