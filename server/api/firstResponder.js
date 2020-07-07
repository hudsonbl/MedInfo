/* 
 *  API middleware functions for first responder endpoints
 */

const router = require('express').Router();

const { debug } = require('../lib/debug');


router.get('/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    // TODO: This will need to have some secure way of parsing incoming data. It currently
    //       expects valid input

    

});