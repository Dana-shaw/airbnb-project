const express = require('express')
const { Op } = require('sequelize');

const { Spot, ReviewImage } = require('../../db/models');

const router = express.Router();

//DELETE a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const {user} = req
    const {imageId} = req.params

    const image = await ReviewImage.findByPk(imageId)
    if(!image){
        res.status(404);
        return res.json({ message: "Spot Image couldn't be found" });
    }

    const spot = await Spot.findByPk(image.dataValues.spotId)
    if(spot.dataValues.ownerId !== user.id){
        res.status(403);
        return res.json({ message: "Spot must belong to the current user" });
    }

    image.destroy()

    return res.status(200).json({ "message": "Successfully deleted" })
})

module.exports = router;