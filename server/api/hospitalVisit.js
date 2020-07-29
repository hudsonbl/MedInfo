/* 
 *  API middleware functions for allergies endpoints
 */

const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { requireAuthentication, generateAuthToken } = require('../lib/auth');
const { 
    insertNewHosipitalVisit,
    getHosipitalVisitsByUserId,
    updateHosipitalVisit,
    deleteHosipitalVisit,
    HosipitalVisitSchema,
    HosipitalVisitPatchSchema
} = require('../models/hospitalVisit');
const { debug } = require('../lib/debug');

// =========================================
// ========  GET hospital visit ============
// =========================================
/*
    Resource: GET /hospital-visit/{id}
    Action: Gets all hospital visits from user. 
    Media Type: JSON
*/
router.get('/:id', requireAuthentication, async(req, res) => {
    // Get user id TODO: will change user id variable to req.userId in future as an appended secure number from lib/auth
    const userId = parseInt(req.params.id);
    // Check if user is a valid user from db
    if(req.authenticated) { //TODO: this will actually check for authentic user in future
        try {
            // Query for the list of hospital visits
            const visits = await getHosipitalVisitsByUserId(userId);
            debug("-- Successfully grabbed list of hospital visits for user: ", `${userId}`);
            res.status(200).send({
                visits: visits,
                successStatus: true 
            });
        } catch(err) {
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Server failed to grab hospital visits",
                successStatus: false
            });
        }
    } else {
        debug("-- Getting hospital visit failed unauthenticated user");
        res.status(400).send({
            errorMessage: "Unauthenticated user",
            successStatus: false 
        });
    }
})

// =========================================
// =========  POST hospital visit ==========
// =========================================

/*
    Resource: POST /hospital-visit/{id}
    Action: Add a user hospital visit record to database. 
    Media Type: JSON
*/
router.post('/:id', requireAuthentication, async(req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, HosipitalVisitSchema);
    
    // TODO: 7.1.2020 Will need to do JWT auth and check if user is in DB
    // Check the request body to ensure it contains valid fields
    if(validateAgainstSchema(body, HosipitalVisitSchema) && req.authenticated){
        try{
            // Make query to database
            const visitId = await insertNewHosipitalVisit(body);
            debug("-- Successfully inserted new hospital visit");
            // Upon success send response back

            // TODO: 7.1.2020 Make sure when implementing client to understand the error messages
            // Thinking as client posts data. DB may only need to respond whether it was 
            // successfully saved to db. If so then the client will save(cached) post instead
            // of making another request. This will minimize resources necessary for operation.
            res.status(201).send({
                visitId: visitId,
                successStatus: true //This here is the idea. Send success either true or false.
            });
        } catch (err) {
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Server failed access",
                successStatus: false 
            });
        }
    } else {
        res.status(400).send({
            errorMessage: "Request body contained inadequate fields",
            successStatus: false
        })
    }
    
});

// =========================================
// =======  PATCH hospital visit ===========
// =========================================

/*
    Resource: PATCH /hospital-visit/{id}
    Action: User can modify a hospital visit at this endpoint
    Media Type: JSON
*/
router.patch('/:id', requireAuthentication, async (req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, HosipitalVisitPatchSchema);
    
    // Check if request body is valid
    if(validateAgainstSchema(body, HosipitalVisitPatchSchema)) {
        // Validate authenticated user
        if(req.authenticated){ // TODO: validate user via req.authenticated
            try {
                // Query to update the hospital visit
                await updateHosipitalVisit(body);
                debug("-- Successfully updated a hospital visit");
                res.status(200).send({
                    successStatus: true 
                });
            } catch (err) {
                // Server access did not work
                debug("-- Error: ", err);
                res.status(500).send({
                    errorMessage: "Server not responding",
                    successStatus: false
                });
            }
        } else {
            // User was not authenticated
            debug("-- Error: Unauthenticated user!!");
            res.status(403).send({
                errorMessage: "Unauthenticated user",
                successStatus: false
            });
        }
    } else {
        // Request body was invalid
        debug("-- Error: Invalid request body!");
        res.status(400).send({
            errorMessage: "Invalid request body",
            successStatus: false
        });
    }
});


// =========================================
// ========  DELETE hospital visit =========
// =========================================

router.delete('/:userId/:visitId', requireAuthentication, async (req, res) => {
    // Get the user and visit id from uri
    const ids = {
        userId: parseInt(req.params.userId),
        visitId: parseInt(req.params.visitId)
    };
    // TODO: Check user authentication 
    if(req.authenticated){
        try {
            // Make query to delete a hospital visit
            await deleteHosipitalVisit(ids);
            debug("-- Deleted hospital visit successfully");
            res.status(200).send({
                successStatus: true
            });
        } catch (err) {
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Server was not responding to request",
                successStatus: false 
            });
        }
    } else {
        debug("-- User was not authenticated for action");
        res.status(401).send({
            errorMessage: "Unauthenticated action",
            successStatus: false 
        });
    }
});

module.exports = router;