/* 
 *  API middleware functions for user endpoints
 */

 const router = require('express').Router();
 const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
 const { requireAuthentication, generateAuthToken } = require('../lib/auth');
 const { v4: uuidv4, validate } = require('uuid');
 const { 
     insertNewUser,
     validateUser,
     insertUnverifiedUser,
     validateUnverifiedUser,
     deleteUnverifiedUser,
     updateUserPassword,
     UserSchema, 
     UserLoginSchema,
     UserForgotPasswordSchema,
     UserResetPasswordSchema,
     getUserByEmail,
     getUserById
} = require('../models/users');
const { debug } = require('../lib/debug');
const {sendVerificationEmail} = require('../lib/verificationEmail');
const {forgottenPasswordEmail, verifyResetCode} = require('../lib/forgottenPasswordEmail');
var path = require('path');
const { nextTick } = require('process');

const UUID_LEN = 36;
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
            await sendVerificationEmail(body);
        
            // Checks if this is just another pass through to resend verification email.
            if(!req.body.isResend){
                // Try inserting user to database
                await insertUnverifiedUser(body);
            }
            // TODO: 7/7/2020 Depraceted warning. Not handling promise correctly upon duplicate emails. It will in future crash server.
             
            debug("--Unverified user created successfully");
            res.status(201).send({
                success: "User was created successfully",
               successStatus: true
            });
        } catch (err) {
            // Todo: Need to look into sending error messages that may intrusive and reveal
            //       too much information for client -> server interactions
            debug("--Error: ", err);
            res.status(403).send({
                errorMessage: "Error posting user to server",
                successStatus: false
            });
        }
    } else {
        res.status(400).send({
            errorMessage: "Request body contained invalid fields",
            successStatus: false
        });
    }
})

/*
    Resource: POST /users/login/confirmation/:hash
    Action: Logs a user in. User recieves id of user and JWT token
    Media Type: JSON
*/
router.post('/login/confirmation/:hash', async(req, res) => {
    const body = extractValidFields(req.body, UserLoginSchema);
    if(validateAgainstSchema(body, UserLoginSchema)) {
        try{
            // Query for user, see if correct credentials were supplied
            const authenticated = await validateUnverifiedUser(
                body.email,
                req.params.hash
            );
            
            if(authenticated.verified) {
                // Generate a JWT token for client session
                const uuId = uuidv4();
                
                // Make the user json body for db user insertion
                const user = {
                    uuId: uuId,
                    name: authenticated.user.name,
                    email: authenticated.user.email,
                    password: authenticated.user.password
                }
                const userId = await insertNewUser(user);
                await deleteUnverifiedUser(user.email);
                const token = generateAuthToken(userId);
                
                res.status(200).send({
                    bearerToken: token,
                    userId: userId,
                    uuId: uuId,
                    name: user.name,
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

/*
    Resource: POST /users/login
    Action: Logs a verified user in. User recieves id of user and JWT token
    Media Type: JSON
*/
router.post('/login', async(req, res) => {
    const body = extractValidFields(req.body, UserLoginSchema);
    console.log("Login attempt: ", body);
    if(validateAgainstSchema(body, UserLoginSchema)) {
        try{
            // Query for user, see if correct credentials were supplied
            const authenticated = await validateUser(
                body.email,
                body.password
            );
            console.log("Authenticated: ", authenticated);
            if(authenticated.verified) {
                // Generate a JWT token for client session
                const token = generateAuthToken(authenticated.userId);
                
                res.status(200).send({
                    bearerToken: token,
                    userId: authenticated.userId,
                    uuId: authenticated.uuId,
                    name: authenticated.name,
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

/*
    Resource: POST /users/forgot-password
    Action: User forgot password. This checks if email exists. Then sends email with verification code
    Media Type: JSON
*/
router.post('/forgot-password', async (req, res) => {
    const body = extractValidFields(req.body, UserForgotPasswordSchema);
    if(validateAgainstSchema(body, UserForgotPasswordSchema)){
        try {
            // Check if user exists
            await getUserByEmail(body.email);
            
            // Create Key for client when they reset their password. 
            await forgottenPasswordEmail(body.email)
            res.status(200).send({
                successStatus: true
            })

        } catch (err) {
            // TODO: Figure out if you want to save errors to db or other logging method
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Internal server error",
                successStatus: false
            })
        }
    } else {
        // TODO: Figure out if you want to save errors to db or other logging method
        res.status(400).send({
            errorMessage: "Request body contained invalid fields",
            successStatus: false
        });
    }
});

/*
    Resource: POST /users/reset-password
    Action: This endpoint verifies the code received by the client. And resets the users password
    Media Type: JSON
*/
router.post('/reset-password', async (req, res) => {
    const body = extractValidFields(req.body, UserResetPasswordSchema);
    if(validateAgainstSchema(body, UserForgotPasswordSchema)){
        try {
            // Check if user exists
            await getUserByEmail(body.email);

            // check verification code
            if(verifyResetCode(body.code, body.email)){
                // Make query to db to update users password
                await updateUserPassword(body);
                console.log("User password was reset properly");
                res.status(200).send({
                    successStatus: true
                });
            }else {
                console.log("==Error: User did not supply good key");
                res.status(400).send({
                    errorMessage: "Key was not verified",
                    successStatus: false
                });
            }
        } catch (err) {
            // TODO: Figure out if you want to save errors to db or other logging method
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Internal server error",
                successStatus: false
            })
        }
    } else {
        // TODO: Figure out if you want to save errors to db or other logging method
        res.status(400).send({
            errorMessage: "Request body contained invalid fields",
            successStatus: false
        });
    }
});

/*
    Resource: GET /users/user-info/profile/:userId
    Action: Gets profile information for user. Also retrieves their QR Code photo
    Media Type: JSON
*/  
router.get('/user-info/profile/:userId', async(req, res) => {
    const userId = parseInt(req.params.userId);
    try{
        await getUserById(userId);
        res.status(200).sendFile(path.resolve(__dirname + `/../files/qrcodes/user${userId}.png`));
    } catch(err) {
        console.log(err);
        return res.status(400).send({
            successStatus: false,
            errorMessage: "User was non accessible"
        })
    }
    
});