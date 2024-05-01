const express = require('express')
const { Op } = require('sequelize');

const { requireAuth } = require('../../utils/auth.js');
const { Spot, Review, SpotImage, ReviewImage, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/current', requireAuth, async (req, res) => {
    const { user } = req
    const reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: {model: User}
    })
    for(let i = 0; i < reviews.length; i++){

        let spot = await Spot.findOne({
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
        reviews[i].dataValues.ReviewImages = reviewImg

    }

    return res.status(200).json({ 'Reviews': reviews })
})

router.post('/:reviewId/images', async (req, res) => {
    const {reviewId} = req.params
    const {url} = req.body

    const review = await Review.findByPk(reviewId)
    if(!review){
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
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

router.put('/:reviewId', async (req, res) => {
    const {reviewId} = req.params
    const {review, stars} = req.body
    const { user } = req

    const findReview = await Review.findByPk(reviewId)
    if(!findReview){
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
    }

    const updateReview = await findReview.update({
        review,
        stars
    })
    return res.status(200).json(updateReview)
})

router.delete('/:reviewId', async (req, res) => {
    const {reviewId} = req.params

    const review = await Review.findByPk(reviewId)
    if(!review){
        res.status(404);
        return res.json({ message: "Review couldn't be found" });
    }
    review.destroy()
    return res.status(200).json({ "message": "Successfully deleted" })
})


module.exports = router;