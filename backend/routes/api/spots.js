const express = require('express')
const { Op } = require('sequelize');

const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// const validateSpot = [
//     check('')
//         .exists({ checkFalsy: true })
//         .isEmail()
//         .withMessage('Please provide a valid email.'),
//     check('')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 4 })
//         .withMessage('Please provide a username with at least 4 characters.'),
//     check('')
//         .not()
//         .isEmail()
//         .withMessage('Username cannot be an email.'),
//     check('')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 6 })
//         .withMessage('Password must be 6 characters or more.'),
//     handleValidationErrors
// ];

router.get('/', async (req, res) => {
    const spots = await Spot.findAll({})
})








module.exports = router;