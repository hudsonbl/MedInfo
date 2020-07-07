/* 
 *  API middleware functions for user endpoints
 */

 const router = require('express').Router();
 const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
 const { requireAuthentication, generateAuthToken } = require('../lib/auth');
 const { 
     insertNewUser,
     validateUser,
     UserSchema, 
     UserLoginSchema
} = require('../models/users');
const { debug } = require('../lib/debug');

// =========================================
// ===========  POST users =================
// =========================================

/*
    Resource: POST /users/
    Action: Creates a user profile. Should send name, email, password
    Media Type: JSON
*/
router.post('/', async(req, res) => {
    const body = extractValidFields(req.body, UserSchema);
    // Check the client request body to ensure it contains necessary fields for query
    // TODO: I may be able to add extra security within validateAgainstSchema where it may 
    //       Validate the user input. Ensure no XSS or SQL injection attacks occur.
    //       This action may happen on client side. Do research. 
    if(validateAgainstSchema(body, UserSchema)){
        try {
            // Try inserting user to database
            await insertNewUser(body);
            debug("--User created successfully");
            res.status(201).send({
                success: "User was created successfully",
                successStatus: true
            });
        } catch (err) {
            // Todo: Need to look into sending error messages that may intrusive and reveal
            //       too much information for client -> server interactions
            debug("--Error: ", err);
            req.status(403).send({
                errorMessage: "Error posting user to server",
                successStatus: false
            });
        }
    } else {
        req.status(400).send({
            errorMessage: "Request body contained invalid fields",
            successStatus: false
        });
    }
})

/*
    Resource: POST /users/login
    Action: Logs a user in. User recieves id of user and JWT token
    Media Type: JSON
*/
router.post('/login', async(req, res) => {
    const body = extractValidFields(req.body, UserLoginSchema);
    if(validateAgainstSchema(body, UserLoginSchema)) {
        try{
            // Query for user, see if correct credentials were supplied
            const authenticated = await validateUser(
                body.email,
                body.password
            );
            
            if(authenticated.verified) {
                // Generate a JWT token for client session
                const token = generateAuthToken(authenticated.userId);
                debug("--Login attempt verified");
                res.status(200).send({
                    bearerToken: token,
                    userId: authenticated.userId,
                    successStatus: true
                });
            } else {
                // TODO: Figure out if you want to save errors to db or other logging method
                debug("-- Error: wrong credentials were supplied");
                res.status(401).send({
                    errorMessage: "Login either contained invalid email or password",
                    successStatus: false
                });
            }
        } catch (err) {
            // TODO: Figure out if you want to save errors to db or other logging method
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Internal server error",
                successStatus: false
            });
        }
    } else {
        // TODO: Figure out if you want to save errors to db or other logging method
        res.status(400).send({
            errorMessage: "Request body contained invalid fields",
            successStatus: false
        });
    }
});
module.exports = router;