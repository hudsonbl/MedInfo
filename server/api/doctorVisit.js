/* 
 *  API middleware functions for allergies endpoints
 */

const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { requireAuthentication, generateAuthToken } = require('../lib/auth');
const { 
    insertNewDoctorVisit,
    getDoctorVisitByUserId,
    updateDoctorVisit,
    deleteDoctorVisit,
    DoctorVisitSchema,
    DoctorVisitPatchSchema
} = require('../models/doctorVisit');
const { debug } = require('../lib/debug');

// =========================================
// ==========  GET doctor visit ============
// =========================================
/*
    Resource: GET /doctor-visit/{id}
    Action: Gets all doctor visits from user. 
    Media Type: JSON
*/
router.get('/:id', requireAuthentication, async(req, res) => {
    // Get user id TODO: will change userid variable to req.userId in future as an appended secure number from lib/auth
    const userId = parseInt(req.params.id);
    // Check if user is a valid user from db
    if(req.authenticated) { //TODO: this will actually check for authentic user in future
        try {
            // Query for the list of doctor visits
            const visits = await getDoctorVisitByUserId(userId);
            debug("-- Successfully grabbed list of doctor visits for user: ", `${userId}`);
            res.status(200).send({
                visits: visits,
                successStatus: true 
            });
        } catch(err) {
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Server failed to grab doctor visits",
                successStatus: false
            });
        }
    } else {
        debug("-- Getting doctor visits failed unauthenticated user");
        res.status(400).send({
            errorMessage: "Unauthenticated user",
            successStatus: false 
        });
    }
})

// =========================================
// ==========  POST doctor visit ===========
// =========================================

/*
    Resource: POST /doctor-visit/{id}
    Action: Add a user doctor visit record to database. 
    Media Type: JSON
*/
router.post('/:id', requireAuthentication, async(req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, DoctorVisitSchema);
    
    // TODO: 7.1.2020 Will need to do JWT auth and check if user is in DB
    // Check the request body to ensure it contains valid fields
    if(validateAgainstSchema(body, DoctorVisitSchema) && req.authenticated){
        try{
            // Make query to database
            const visitId = await insertNewDoctorVisit(body);
            debug("-- Successfully inserted new doctor visit");
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
// =========  PATCH doctor visit ===========
// =========================================

/*
    Resource: PATCH /doctor-visit/{id}
    Action: User can modify a doctor visits at this endpoint
    Media Type: JSON
*/
router.patch('/:id', requireAuthentication, async (req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, DoctorVisitPatchSchema);

    // Check if request body is valid
    if(validateAgainstSchema(body, DoctorVisitPatchSchema)) {
        // Validate authenticated user
        if(req.authenticated){ // TODO: validate user via req.authenticated
            try {
                // Query to update the doctor visit
                await updateDoctorVisit(body);
                debug("-- Successfully updated a doctor visit");
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
// =========  DELETE doctor visit ==========
// =========================================

router.delete('/:id/:visitId', requireAuthentication, async (req, res) => {
    // Get the user and visit id from uri
    const ids = {
        userId: parseInt(req.params.id),
        visitId: parseInt(req.params.visitId)
    };
    // TODO: Check user authentication 
    if(req.authenticated){
        try {
            // Make query to delete a doctor visit
            await deleteDoctorVisit(ids);
            debug("-- Deleted doctor visit successfully");
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