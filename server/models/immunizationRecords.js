/*
 * Immunization record schema and data accessor methods
 */

const mysqlPool = require('../lib/mysqlPool');

/*
 *  Schemas describing fields of immunizationrecords object
 */

const ImmunizationRecordSchema = {
    userId: {required: true},
    vaccine: {required: true},
    dateGiven: {required: true},
    administeredBy: {required: true},
    nextDose: {required: false}
};
exports.ImmunizationRecordSchema = ImmunizationRecordSchema;

const ImmunizationRecordPatchSchema = {
    recordId: {required: true},
    userId: {required: true},
    vaccine: {required: false},
    dateGiven: {required: false},
    administeredBy: {required: false},
    nextDose: {required: false}
};
exports.ImmunizationRecordPatchSchema = ImmunizationRecordPatchSchema;
/*
 * Data accessor methods
 */

/*
    Query: Creates and inserts a new immunization record
    Returns: insertId of new immunization record
    Return Value: INT
 */

async function insertNewImmunizationRecord(body) {
    const [ results ] = await mysqlPool.query(
        'INSERT INTO immunizationrecords SET ?',
        body
    );

    return results.insertId;
}
exports.insertNewImmunizationRecord = insertNewImmunizationRecord;

/*
    Query: Get all immunization records for a specific user
    Returns: JSON object array of a users immunization records
    Return Value: JSON Object array
 */

async function getImmunizationRecordsByUserId(userId) {
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM immunizationrecords WHERE userId=?',
        [userId]
    );
    
    return results;
}
exports.getImmunizationRecordsByUserId = getImmunizationRecordsByUserId;

/*
    Query: Update immunizationrecords columns
    Returns: number of affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function updateImmunizationRecord(body) {
    const [ results ] = await mysqlPool.query(
        'UPDATE immunizationrecords SET ? WHERE recordId=? AND userId=?',
        [body, body.recordId, body.userId]
    );

    if(results.affectedRows == 0){
        throw new Error("No immunization record found and no affected rows");
    }
    return results;
}
exports.updateImmunizationRecord = updateImmunizationRecord;

/*
    Query: Deletes a immunization record row from immunizationrecords table
    Returns: affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function deleteImmunizationRecord(ids) {
    const [ results ] = await mysqlPool.query(
        'DELETE FROM immunizationrecords WHERE recordId=? AND userId=?',
        [ids.recordId, ids.userId]
    );

    if(results.affectedRows == 0) {
        throw new Error("No immunization record was deleted");
    }

    return results.affectedRows;
}
exports.deleteImmunizationRecord = deleteImmunizationRecord;