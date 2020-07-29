/* 
 *  API middleware functions for Lab report endpoints
 */

const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { requireAuthentication, generateAuthToken } = require('../lib/auth');
const { 
    insertNewImmunizationRecord,
    getImmunizationRecordsByUserId,
    updateImmunizationRecord,
    deleteImmunizationRecord,
    ImmunizationRecordSchema,
    ImmunizationRecordPatchSchema
} = require('../models/immunizationRecords');
const { debug } = require('../lib/debug');

// =========================================
// ======  GET immunization records ========
// =========================================
/*
    Resource: GET /immunization-record/{id}
    Action: Gets all immunization records from user. 
    Media Type: JSON
*/
router.get('/:id', requireAuthentication, async(req, res) => {
    // Get user id TODO: will change user id variable to req.userId in future as an appended secure number from lib/auth
    const userId = parseInt(req.params.id);
    // Check if user is a valid user from db
    if(req.authenticated) { //TODO: this will actually check for authentic user in future
        try {
            // Query for the list of immunization records
            const records = await getImmunizationRecordsByUserId(userId);
            debug("-- Successfully grabbed list of immunization records for user: ", `${userId}`);
            res.status(200).send({
                records: records,
                successStatus: true 
            });
        } catch(err) {
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Server failed to grab immunization records",
                successStatus: false
            });
        }
    } else {
        debug("-- Getting immunization records failed unauthenticated user");
        res.status(400).send({
            errorMessage: "Unauthenticated user",
            successStatus: false 
        });
    }
})

// =========================================
// ======  POST immunization record ========
// =========================================

/*
    Resource: POST /immunization-record/{id}
    Action: Add a user immunization record to database. 
    Media Type: JSON
*/
router.post('/:id', requireAuthentication, async(req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, ImmunizationRecordSchema);
    
    // TODO: 7.1.2020 Will need to do JWT auth and check if user is in DB
    // Check the request body to ensure it contains valid fields
    if(validateAgainstSchema(body, ImmunizationRecordSchema), req.authenticated){
        try{
            // Make query to database
            const recordId = await insertNewImmunizationRecord(body);
            debug("-- Successfully inserted new immunization record");
            // Upon success send response back

            // TODO: 7.1.2020 Make sure when implementing client to understand the error messages
            // Thinking as client posts data. DB may only need to respond whether it was 
            // successfully saved to db. If so then the client will save(cached) post instead
            // of making another request. This will minimize resources necessary for operation.
            res.status(201).send({
                recordId: recordId,
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
// =====  PATCH immunization record ========
// =========================================

/*
    Resource: PATCH /immunization-record/{id}
    Action: User can modify a immunization record at this endpoint
    Media Type: JSON
*/
router.patch('/:id', requireAuthentication, async (req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, ImmunizationRecordPatchSchema);
    
    // Check if request body is valid
    if(validateAgainstSchema(body, ImmunizationRecordPatchSchema)) {
        // Validate authenticated user
        if(req.authenticated){ // TODO: validate user via req.authenticated
            try {
                // Query to update the immunization record
                await updateImmunizationRecord(body);
                debug("-- Successfully updated a immunization record");
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
// ======  DELETE immunization record ======
// =========================================

router.delete('/:userId/:recordId', requireAuthentication, async (req, res) => {
    // Get the user and report id from uri
    const ids = {
        userId: parseInt(req.params.userId),
        recordId: parseInt(req.params.recordId)
    };
    // TODO: Check user authentication 
    if(req.authenticated){
        try {
            // Make query to delete a lab report
            await deleteImmunizationRecord(ids);
            debug("-- Deleted immunization record successfully");
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