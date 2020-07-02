/*
 * Lab report schema and data accessor methods
 */

const mysqlPool = require('../lib/mysqlPool');

/*
 *  Schemas describing fields of labreports object
 */

const LabReportSchema = {
    userId: {required: true},
    name: {required: true},
    filetype: {required: true},
    filepath: {required: true},
    notes: {required: false}
};
exports.LabReportSchema = LabReportSchema;

const LabReportPatchSchema = {
    reportId: {required: true},
    userId: {required: true},
    name: {required: false},
    filetype: {required: false},
    filepath: {required: false},
    notes: {required: false}
};
exports.LabReportPatchSchema = LabReportPatchSchema;
/*
 * Data accessor methods
 */

/*
    Query: Creates and inserts a new lab report
    Returns: insertId of new lab report
    Return Value: INT
 */

async function insertNewLabReport(body) {
    const [ results ] = await mysqlPool.query(
        'INSERT INTO labreports SET ?',
        body
    );

    return results.insertId;
}
exports.insertNewLabReport = insertNewLabReport;

/*
    Query: Get all lab reports for a specific user
    Returns: JSON object array of a users lab reports
    Return Value: JSON Object array
 */

async function getLabReportsByUserId(userId) {
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM labreports WHERE userId=?',
        [userId]
    );
    
    return results;
}
exports.getLabReportsByUserId = getLabReportsByUserId;

/*
    Query: Update labreports columns
    Returns: number of affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function updateLabReport(body) {
    const [ results ] = await mysqlPool.query(
        'UPDATE labreports SET ? WHERE reportId=? AND userId=?',
        [body, body.reportId, body.userId]
    );

    if(results.affectedRows == 0){
        throw new Error("No Lab report with lab report id and no affected rows");
    }
    return results;
}
exports.updateLabReport = updateLabReport;

/*
    Query: Deletes a lab report row from labreports table
    Returns: affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function deleteLabReport(ids) {
    const [ results ] = await mysqlPool.query(
        'DELETE FROM labreports WHERE reportId=? AND userId=?',
        [ids.reportId, ids.userId]
    );

    if(results.affectedRows == 0) {
        throw new Error("No lab report was deleted");
    }

    return results.affectedRows;
}
exports.deleteLabReport = deleteLabReport;