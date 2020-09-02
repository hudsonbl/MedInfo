/* 
 *  API middleware functions for first responder endpoints
 */

const router = require('express').Router();

const { debug } = require('../lib/debug');
const {getAllergiesByUserId} = require('../models/allergies');
const { verifyUniqueId } = require('../models/users');


router.get('/:uuId', async (req, res) => {

    // TODO: This will need to have some secure way of parsing incoming data. It currently
    //       expects valid input
    console.log("Error here : ", req.params.uuId.toString());
    try{
        const body = await verifyUniqueId(`${req.params.uuId}`);
        if(body.validUUID){
            const allergies = await getAllergiesByUserId(body.userId);
            debug("Success getting allergies for user: ", body.userId);
            res.status(200).send({
                allergies: allergies,
                successStatus: true
            });
        } else {
            debug("Error either invalid uuId or no userId found");
            res.status(400).send({
                successStatus: false,
                errorMessage: "unauthenticated action"
            });
        }
    } catch (err) {
        debug("Error getting qrcode! Err: ", err);
        res.status(400).send({
            successStatus: false,
            errorMessage: "Error getting allergies!"
        });
    }
});

module.exports = router;