/* 
 *  API middleware functions for Lab report endpoints
 */

const router = require('express').Router();
const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
const { requireAuthentication, generateAuthToken } = require('../lib/auth');
const { 
    insertNewLabReport,
    getLabReportsByUserId,
    updateLabReport,
    deleteLabReport,
    LabReportSchema,
    LabReportPatchSchema
} = require('../models/labReports');
const { debug } = require('../lib/debug');

// =========================================
// ===========  GET lab reports =============
// =========================================
/*
    Resource: GET /lab-reports/{id}
    Action: Gets all lab reports from user. 
    Media Type: JSON
*/
router.get('/:id', async(req, res) => {
    // Get user id TODO: will change user id variable to req.userId in future as an appended secure number from lib/auth
    const userId = parseInt(req.params.id);
    // Check if user is a valid user from db
    if(true) { //TODO: this will actually check for authentic user in future
        try {
            // Query for the list of lab reports
            const labReports = await getLabReportsByUserId(userId);
            debug("-- Successfully grabbed list of lab reports for user: ", `${userId}`);
            res.status(200).send({
                labReports: labReports,
                successStatus: true 
            });
        } catch(err) {
            debug("-- Error: ", err);
            res.status(500).send({
                errorMessage: "Server failed to grab lab reports",
                successStatus: false
            });
        }
    } else {
        debug("-- Getting drug prescription failed unauthenticated user");
        res.status(400).send({
            errorMessage: "Unauthenticated user",
            successStatus: false 
        });
    }
})

// =========================================
// ============  POST lab reports ===========
// =========================================

/*
    Resource: POST /lab-reports/{id}
    Action: Add a user lab reports record to database. 
    Media Type: JSON
*/
router.post('/:id', async(req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, LabReportSchema);
    
    // TODO: 7.1.2020 Will need to do JWT auth and check if user is in DB
    // Check the request body to ensure it contains valid fields
    if(validateAgainstSchema(body, LabReportSchema)){
        try{
            // Make query to database
            const reportId = await insertNewLabReport(body);
            debug("-- Successfully inserted new lab report");
            // Upon success send response back

            // TODO: 7.1.2020 Make sure when implementing client to understand the error messages
            // Thinking as client posts data. DB may only need to respond whether it was 
            // successfully saved to db. If so then the client will save(cached) post instead
            // of making another request. This will minimize resources necessary for operation.
            res.status(201).send({
                reportId: reportId,
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
// ==========  PATCH lab reports ===========
// =========================================

/*
    Resource: PATCH /lab-reports/{id}
    Action: User can modify a hospital visit at this endpoint
    Media Type: JSON
*/
router.patch('/:id', async (req, res) => {
    // Get user id and extract request body
    req.body.userId = parseInt(req.params.id);
    const body = extractValidFields(req.body, LabReportPatchSchema);
    
    // Check if request body is valid
    if(validateAgainstSchema(body, LabReportPatchSchema)) {
        // Validate authenticated user
        if(true){ // TODO: validate user via req.authenticated
            try {
                // Query to update the lab report
                await updateLabReport(body);
                debug("-- Successfully updated a lab report");
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
// ==========  DELETE lab report ===========
// =========================================

router.delete('/:userId/:reportId', async (req, res) => {
    // Get the user and report id from uri
    const ids = {
        userId: parseInt(req.params.userId),
        reportId: parseInt(req.params.reportId)
    };
    // TODO: Check user authentication 
    if(true){
        try {
            // Make query to delete a lab report
            await deleteLabReport(ids);
            debug("-- Deleted lab report successfully");
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