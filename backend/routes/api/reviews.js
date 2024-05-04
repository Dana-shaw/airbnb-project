const express = require('express')
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth.js');
const { Spot, Review, SpotImage, ReviewImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .not().isEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({gt: 0, lt: 6})
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

//GET All Reviews of Current User
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: {model: User}
    })
    for(let i = 0; i < reviews.length; i++){

        let spot = await Spot.findByPk({
            attributes: { exclude: ['description', 'createdAt', 'updatedAt'] },
            where: {
                id: reviews[i].dataValues.spotId
            }
        })
        reviews[i].dataValues.Spot = spot.dataValues

        let image = await SpotImage.findOne({
            attributes: ['url'],
            where: {
                spotId: reviews[i].dataValues.spotId,
                preview: true
            }
        })

        reviews[i].dataValues.Spot.previewImage = image.dataValues.url
        
        let reviewImg = await ReviewImage.findAll({
            attributes: ['id', 'url'],
            where: {
                reviewId: reviews[i].dataValues.id
            }
        })

        if(!reviewImg || !reviewImg.dataValues){
            reviews[i].dataValues.Spot.ReviewImages = []
        }
        reviews[i].dataValues.ReviewImages = reviewImg

    }

    return res.status(200).json({ 'Reviews': reviews })
})

//POST Add Image to Review by id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { user } = req
    const {reviewId} = req.params
    const {url} = req.body

    const review = await Review.findByPk(reviewId)
    if(!review || !review.dataValues){
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
    }

    if(review.dataValues.userId !== user.id){
        res.status(403);
        return res.json({ message: "Spot must belong to the current user" });
    }

    const reviewImgs = await ReviewImage.findAll({
        where: {
            reviewId
        }
    })

    if(reviewImgs.length === 10){
        res.status(403);
        return res.json({ message: "Maximum number of images for this resource was reached" });
    }

    const newImg = await review.createReviewImage({url})

    return res.status(200).json({id: newImg.id, url: newImg.url})
})

//PUT Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const {reviewId} = req.params
    const {review, stars} = req.body
    const { user } = req

    const findReview = await Review.findByPk(reviewId)

    if(!findReview || !findReview.dataValues){
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
    }

    if(findReview.dataValues.userId !== user.id){
        res.status(403);
        return res.json({ message: "Spot must belong to the current user" });
    }

    const updateReview = await findReview.update({
        review,
        stars
    })
    return res.status(200).json(updateReview)
})

//DELETE a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req
    const {reviewId} = req.params

    const review = await Review.findByPk(reviewId)

    if(!review || !review.dataValues){
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
    }

    if(review.dataValues.userId !== user.id){
        res.status(403);
        return res.json({ message: "Spot must belong to the current user" });
    }

    review.destroy()
    return res.status(200).json({ "message": "Successfully deleted" })
})


module.exports = router;