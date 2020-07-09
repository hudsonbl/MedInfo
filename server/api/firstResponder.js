/* 
 *  API middleware functions for first responder endpoints
 */

const router = require('express').Router();

const { debug } = require('../lib/debug');
const {getAllergiesByUserId} = require('../models/allergies');


router.get('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    // TODO: This will need to have some secure way of parsing incoming data. It currently
    //       expects valid input
    try{
        const allergies = await getAllergiesByUserId(userId);
        debug("Success getting allergies for user: ", userId);
        res.status(200).send({
            allergies: allergies,
            successStatus: true
        });
    } catch (err) {
        debug("Error getting qrcode! Err: ", err);
        res.status(400).send({
            successStatus: false,
            errorMessage: "Error getting allergies!"
        })
    }
});

module.exports = router;