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
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    handleValidationErrors
];

//GET All Spots
router.get('/', async (req, res) => {
    let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice, page, size } = req.query;
    page = parseInt(page)
    size = parseInt(size)

    if(isNaN(page)) page = 1
    if(isNaN(size)) size = 20
    if(isNaN(minLat)) minLat = -90
    if(isNaN(maxLat)) maxLat = 90
    if(isNaN(minLng)) minLng = -180
    if(isNaN(maxLng)) maxLng = 180
    if(isNaN(minPrice)) minPrice = 1
    if(isNaN(maxPrice)) maxPrice = 999

    if(page < 1){
        res.status(400);
        return res.json({ message: "Page must be greater than or equal to 1" });
    }
    if(size < 1 || size > 20){
        res.status(400);
        return res.json({ message: "Size must be between 1 and 20" });
    }

    const where = {};
    if(minLng && (minLng >= -180 && minLng <= 180)){
        if(maxLng && (maxLng >= -180 && maxLng <= 180)){
            where.lat = {[Op.between]: [minLng, maxLng]}
        } else {
            res.status(400);
            return res.json({ message: "Maximum longitude is invalid" });
        }
    } else {
        res.status(400);
        return res.json({ message: "Minimum longitude is invalid" });
    }

    if(minLat && (minLat >= -90 && minLat <= 90)){
        if(maxLat && (maxLat >= -90 && maxLat <= 90)){
            where.lat = {[Op.between]: [minLat, maxLat]}
        } else {
            res.status(400);
            return res.json({ message: "Maximum latitude is invalid" });
        }
    } else {
        res.status(400);
        return res.json({ message: "Minimum latitude is invalid" });
    }

    if(minPrice && minPrice >= 0){
        if(maxPrice && (maxPrice >= 0)){
            where.price = {[Op.between]: [minPrice, maxPrice]}
        } else {
            res.status(400);
            return res.json({ message: "Maximum price must be greater than or equal to 0" });
        }
    } else {
        res.status(400);
        return res.json({ message: "Minimum price must be greater than or equal to 0" });
    }



    let spots = await Spot.findAll({
        where,
        limit: size,
        offset: (page - 1) * size
    })
    
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

        currentSpots[i].dataValues.avgStars = average

        let image = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: currentSpots[i].dataValues.id,
                preview: true
            }
        })

        let preview = image.dataValues.url

        currentSpots[i].dataValues.previewImg = preview
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

//POST Create a Spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const { user } = req

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

//POST Add Image to Spot by id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const {user} = req
    const { spotId } = req.params
    const { url, preview } = req.body
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    if(spot.dataValues.ownerId !== user.id){
        res.status(403);
        return res.json({ message: "Spot must belong to the current user" });
    }
    const image = await spot.createSpotImage({ url, preview })

    return res.status(200).json({id: image.id, url: image.url, preview: image.preview})
})

//PUT Edit a Spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const {user} = req
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

    if(spot.dataValues.ownerId !== user.id){
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
    const {user} = req
    const { spotId } = req.params
    const spot = await Spot.findByPk(spotId)

    if(!spot){
        res.status(404);
        return res.json({ message: "Spot couldn't be found" });
    }

    if(spot.dataValues.ownerId !== user.id){
        res.status(403);
        return res.json({ message: "Spot must belong to the current user" });
    }

    spot.destroy()

    return res.status(200).json({ "message": "Successfully deleted" })
})

//GET All Reviews of Spot by id
router.get('/:spotId/reviews', async (req, res) => {
    const {user} = req
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

//POST Add a Review to Spot by id
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const {spotId} = req.params
    const {review, stars} = req.body
    const { user } = req

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