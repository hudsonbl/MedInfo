/* 
 *  API middleware functions for allergies endpoints
 */

const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { requireAuthentication, generateAuthToken } = require('../lib/auth');
const { 
    insertNewChronicHealthIssue,
    getChronicHealthByUserId,
    updateChronicHealthIssue,
    deleteChronicHealthIssue,
    ChronicHealthSchema,
    ChronicHealthPatchSchema
} = require('../models/chronicHealth');
const { debug } = require('../lib/debug');

// =========================================
// ========  GET chronic health issue ======
// =========================================
/*
    Resource: GET /chronic-health/{id}
    Action: Gets all chronic health issues from user. 
    Media Type: JSON
*/
router.get('/:id', async(req, res) => {
    // Get user id TODO: will change userid variable to req.userId in future as an appended secure number from lib/auth
    const userId = parseInt(req.params.id);
    // Check if user is a valid user from db
    if(true) { //TODO: this will actually check for authentic user in future
        try {
            // Query for the list of allergies
            const health = await getChronicHealthByUserId(userId);
            debug("-- Successfully grabbed list of chronic health issues for user: ", `${userId}`);
            res.status(200).send({
                health: health,
                successStatus: true 
            });
        } catch(err) {
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Server failed to grab chronic health issues",
                successStatus: false
            });
        }
    } else {
        debug("-- Getting chronic health issues failed unauthenticated user");
        res.status(400).send({
            errorMessage: "Unauthenticated user",
            successStatus: false 
        });
    }
})

// =========================================
// =======  POST chronic health issue ======
// =========================================

/*
    Resource: POST /chronic-health/{id}
    Action: Add a user allergy record to database. 
    Media Type: JSON
*/
router.post('/:id', async(req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, ChronicHealthSchema);
    
    // TODO: 7.1.2020 Will need to do JWT auth and check if user is in DB
    // Check the request body to ensure it contains valid fields
    if(validateAgainstSchema(body, ChronicHealthSchema)){
        try{
            // Make query to database
            const insertId = await insertNewChronicHealthIssue(body);
            debug("-- Successfully inserted new chronic health issue");
            // Upon success send response back

            // TODO: 7.1.2020 Make sure when implementing client to understand the error messages
            // Thinking as client posts data. DB may only need to respond whether it was 
            // successfully saved to db. If so then the client will save(cached) post instead
            // of making another request. This will minimize resources necessary for operation.
            res.status(201).send({
                chronicId: insertId,
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
// ======  PATCH chronic health issue ======
// =========================================

/*
    Resource: PATCH /chronic-health/{id}
    Action: User can modify a chronic health issue at this endpoint
    Media Type: JSON
*/
router.patch('/:id', async (req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, ChronicHealthPatchSchema);
    
    // Check if request body is valid
    if(validateAgainstSchema(body, ChronicHealthPatchSchema)) {
        // Validate authenticated user
        if(true){ // TODO: validate user via req.authenticated
            try {
                // Query to update the allergy
                await updateChronicHealthIssue(body);
                debug("-- Successfully updated a chronic health issue");
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
// =====  DELETE chronic health issue ======
// =========================================

router.delete('/:userId/:chronicId', async (req, res) => {
    // Get the user and allergy id from uri
    const ids = {
        userId: parseInt(req.params.userId),
        chronicId: parseInt(req.params.chronicId)
    };
    // TODO: Check user authentication 
    if(true){
        try {
            // Make query to delete a allergy
            await deleteChronicHealthIssue(ids);
            debug("-- Deleted chronic health issue successfully");
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