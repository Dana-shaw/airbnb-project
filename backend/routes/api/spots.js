const express = require('express')
const { Op } = require('sequelize');


const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    handleValidationErrors
];

router.get('/', async (req, res) => {
    let spots = await Spot.findAll()
    console.log(spots)
    for (let i = 0; i < spots.length; i++) {
        let previewImg = 'previewImage'
        let avgStars = 'avgRating'
        let review = await Review.findAll({
            where: {
                spotId: spots[i].dataValues.id
            }
        })
        let count = review.length
        let sum = await Review.sum('stars', { where: { spotId: spots[i].dataValues.id } })
        let average = sum / count

        spots[i].dataValues[avgStars] = average

        let image = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: spots[i].dataValues.id,
                preview: true
            }
        })

        let preview = image.dataValues.url

        spots[i].dataValues[previewImg] = preview
    }
    return res.status(200).json({ 'Spots': spots })
})

router.get('/current', async (req, res) => {
    const { user } = req
    if (user) {
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };
    } else {
        return res.status(400).json({ 'message': 'Please log in' });
    }

    let currentSpots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })
    return res.status(200).json({ 'Spots': currentSpots })
})

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    let spot = await Spot.findAll({
        where: {
            id: spotId
        }
    })

    if(!spot[0]){
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    let review = await Review.findAll({
        where: {
            spotId
        }
    })
    let count = review.length
    let sum = await Review.sum('stars', { where: { spotId } })
    let average = sum / count

    spot[0].dataValues.numReviews = count
    spot[0].dataValues.avgStarRating = average

    let images = await SpotImage.findAll({
        attributes: ['id', 'url', 'preview'],
        where: {
            spotId
        }
    })

    spot[0].dataValues.SpotImages = images

    let user = await User.findOne({
        attributes: ['id', 'firstName', 'lastName'],
        where: {
            id: spot[0].dataValues.ownerId
        }
    })

    spot[0].dataValues.Owner = user

    return res.status(200).json(spot)
})

router.post('/', validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req
    if (user) {
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };
    } else {
        return res.status(400).json({ 'message': 'Must be logged in to create a spot' });
    }

    if (lat < -90 && lat > 90) {
        res.status(400);
        return res.json({
            errors: [
                { message: 'Latitude must be within -90 and 90' }
            ]
        });
    }

    if (lng < -180 && lng > 180) {
        res.status(400);
        return res.json({
            errors: [
                { message: 'Longitude must be within -180 and 180' }
            ]
        });
    }

    if (price && price < 0) {
        res.status(400);
        return res.json({
            errors: [
                { message: 'Price per day must be a positive number' }
            ]
        });
    }

    const newSpot = await Spot.create({
        ownerId: parseInt(user.id),
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.status(200).json(newSpot)
})

router.post('/:spotId/images', async (req, res) => {
    const { spotId } = req.params
    const { url, preview } = req.body
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }
    const image = await spot.createSpotImage({ url, preview })

    return res.status(200).json({id: image.id, url: image.url, preview: image.preview})
})

router.put('/:spotId', validateSpot, async (req, res) => {
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    if (lat < -90 && lat > 90) {
        res.status(400);
        return res.json({
            errors: [
                { message: 'Latitude must be within -90 and 90' }
            ]
        });
    }

    if (lng < -180 && lng > 180) {
        res.status(400);
        return res.json({
            errors: [
                { message: 'Longitude must be within -180 and 180' }
            ]
        });
    }

    if (price && price < 0) {
        res.status(400);
        return res.json({
            errors: [
                { message: 'Price per day must be a positive number' }
            ]
        });
    }
    const spot = await Spot.findByPk(spotId)

    if(!spot){
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    const updateSpot = await spot.update({
        id: spotId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    return res.status(200).json(updateSpot)
})

router.delete('/:spotId', async (req, res) => {
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)
    spot.destroy()
    return res.status(200).json({ "message": "Successfully deleted" })
})

router.get('/:spotId/reviews', async (req, res) => {
    const {spotId} = req.params
    
    let reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['username', 'email', 'hashedPassword', 'createdAt', 'updatedAt']
                }
            }, {
                model: ReviewImage,
                attributes: {
                    exclude: ['reviewId', 'createdAt', 'updatedAt']
                }
            }]
    })

    if(!reviews[0]){
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }
    
    
    return res.status(200).json({ 'Reviews': reviews })
})

router.post('/:spotId/reviews', async (req, res) => {
    const {spotId} = req.params
    const {userId, review, stars} = req.body
    const { user } = req
    if (user) {
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
        };
    } else {
        return res.status(400).json({ 'message': 'Must be logged in to create a spot' });
    }

    const spot = await Spot.findByPk(spotId)
    if(!spot){
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    const existingReview = await Review.findOne({
        where: {
            userId: parseInt(user.id),
            spotId
        }
    })
    if(existingReview){
        res.status(500);
        return res.json({ message: "User already has a review for this spot" });
    }

    const newReview = await spot.createReview({
        userId: parseInt(user.id),
        review,
        stars
    })
    return res.status(200).json(newReview)
})





module.exports = router;