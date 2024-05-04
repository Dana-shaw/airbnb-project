const express = require('express')
const { Op } = require('sequelize');


const { Spot, Review, SpotImage, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

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
    check('lat')
        .exists({ checkFalsy: true })
        .isInt({ gt: -90, lt: 90 })
        .withMessage('Latitude must be within -90 and 90'),
    check('lng')
        .exists({ checkFalsy: true })
        .isInt({ gt: -180, lt: 180 })
        .withMessage('Longitude must be within -180 and 180'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .isInt({ gt: 0 })
        .withMessage('Price per day must be a positive number'),
    handleValidationErrors
];

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .not().isEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ gt: 0, lt: 6 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

const validateFilter = [
    check('page')
        .optional()
        .isInt({ gt: 0, lt: 11 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .isInt({ gt: 0, lt: 21 })
        .withMessage('Size must be between 1 and 20'),
    check('maxLat')
        .optional()
        .isInt({ gt: -90, lt: 90 })
        .withMessage('Maximum latitude is invalid'),
    check('minLat')
        .optional()
        .isInt({ gt: -90, lt: 90 })
        .withMessage('Minimum latitude is invalid'),
    check('maxLng')
        .optional()
        .isInt({ gt: -180, lt: 180 })
        .withMessage('Maximum longitude is invalid'),
    check('minLng')
        .optional()
        .isInt({ gt: -180, lt: 180 })
        .withMessage('Minimum longitude is invalid'),
    check('minPrice')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .optional()
        .isInt({ gt: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
];


//GET All Spots
router.get('/', validateFilter, async (req, res) => {
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice, page, size } = req.query;
    page = parseInt(page)
    size = parseInt(size)

    if (isNaN(page)) page = 1
    if (isNaN(size)) size = 20
    

    const where = {};
    
    if(minLat){
        where.lat = {[Op.gte]: minLat}
    }
    if(maxLat){
        where.lat = {[Op.lte]: maxLat}
    }
    if(minLat && maxLat){
        where.lat = {[Op.between]: [minLat, maxLat]}
    }

    if(minLng){
        where.lng = {[Op.gte]: minLng}
    }
    if(maxLng){
        where.lng = {[Op.lte]: maxLng}
    }
    if(minLng && maxLng){
        where.lng = {[Op.between]: [minLng, maxLng]}
    }

    if(minPrice){
        where.price = {[Op.gte]: minPrice}
    }
    if(maxPrice){
        where.price = {[Op.lte]: maxPrice}
    }
    if(minPrice && maxPrice){
        where.price = {[Op.between]: [minPrice, maxPrice]}
    }




    let spots = await Spot.findAll({
        where,
        limit: size,
        offset: (page - 1) * size
    })

    for (let i = 0; i < spots.length; i++) {
        let review = await Review.findAll({
            where: {
                spotId: spots[i].dataValues.id
            }
        })
        
        if(!review || !review[0].dataValues){
            spots[i].dataValues.avgRating = null
        } else {
            let count = review.length
            let sum = await Review.sum('stars', { where: { spotId: spots[i].dataValues.id } })
            let average = sum / count
            
            spots[i].dataValues.avgRating = average
        }

        let image = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: spots[i].dataValues.id,
                preview: true
            }
        })
        
        if(!image || !image.dataValues){
            spots[i].dataValues.previewImage = null
        } else {
            spots[i].dataValues.previewImage = image.dataValues.url
        }
    }
    return res.status(200).json({ 'Spots': spots, page, size })
})

//GET All Spots Owned by Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req

    let currentSpots = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    })

    for (let i = 0; i < currentSpots.length; i++) {
        let review = await Review.findAll({
            where: {
                spotId: currentSpots[i].dataValues.id
            }
        })
        let count = review.length
        let sum = await Review.sum('stars', { where: { spotId: currentSpots[i].dataValues.id } })
        let average = sum / count

        currentSpots[i].dataValues.avgRating = average

        let image = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: currentSpots[i].dataValues.id,
                preview: true
            }
        })

        let preview = image.dataValues.url

        currentSpots[i].dataValues.previewImage = preview
    }

    return res.status(200).json({ 'Spots': currentSpots })
})

//GET Spot by id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params
    let spot = await Spot.findAll({
        where: {
            id: spotId
        }
    })

    if (!spot[0]) {
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

    return res.status(200).json(spot[0])
})

//POST Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { user } = req
    const { address, city, state, country, lat, lng, name, description, price } = req.body

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

    return res.status(201).json(newSpot)
})

//POST Add Image to Spot by id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { user } = req
    const { spotId } = req.params
    const { url, preview } = req.body
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    if (spot.dataValues.ownerId !== user.id) {
        res.status(403);
        return res.json({ message: "Spot must belong to the current user" });
    }
    const image = await spot.createSpotImage({ url, preview })

    return res.status(200).json({ id: image.id, url: image.url, preview: image.preview })
})

//PUT Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { user } = req
    const { spotId } = req.params
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    if (spot.dataValues.ownerId !== user.id) {
        res.status(403);
        return res.json({ message: "Spot must belong to the current user" });
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

//DELETE a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { user } = req
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    if (spot.dataValues.ownerId !== user.id) {
        res.status(403);
        return res.json({ message: "Spot must belong to the current user" });
    }

    spot.destroy()

    return res.status(200).json({ "message": "Successfully deleted" })
})

//GET All Reviews of Spot by id
router.get('/:spotId/reviews', async (req, res) => {
    const { user } = req
    const { spotId } = req.params

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

    if (!reviews[0]) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }


    return res.status(200).json({ 'Reviews': reviews })
})

//POST Add a Review to Spot by id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { spotId } = req.params
    const { review, stars } = req.body
    const { user } = req

    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    const existingReview = await Review.findOne({
        where: {
            userId: parseInt(user.id),
            spotId
        }
    })

    if (existingReview) {
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