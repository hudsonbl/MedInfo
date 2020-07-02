/*
 * Hospital visit schema and data accessor methods
 */

const mysqlPool = require('../lib/mysqlPool');

/*
 *  Schemas describing fields of hospitalvisit object
 */

const HosipitalVisitSchema = {
    userId: {required: true},
    date: {required: true},
    clinicianName: {required: true},
    notes: {required: true},
    labreportId: {required: false}
};
exports.HosipitalVisitSchema = HosipitalVisitSchema;

const HosipitalVisitPatchSchema = {
    visitId: {required: true},
    userId: {required: true},
    date: {required: false},
    clinicianName: {required: false},
    notes: {required: false},
    labreportId: {required: false}
};
exports.HosipitalVisitPatchSchema = HosipitalVisitPatchSchema;
/*
 * Data accessor methods
 */

/*
    Query: Creates and inserts a new hospital visit
    Returns: insertId of new hospital visit
    Return Value: INT
 */

async function insertNewHosipitalVisit(body) {
    const [ results ] = await mysqlPool.query(
        'INSERT INTO hospitalvisit SET ?',
        body
    );

    return results.insertId;
}
exports.insertNewHosipitalVisit = insertNewHosipitalVisit;

/*
    Query: Get all hospital visits for a specific user
    Returns: JSON object array of a users hospital visits
    Return Value: JSON Object array
 */

async function getHosipitalVisitsByUserId(userId) {
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM hospitalvisit WHERE userId=?',
        [userId]
    );
    
    return results;
}
exports.getHosipitalVisitsByUserId = getHosipitalVisitsByUserId;

/*
    Query: Update hospitalvisit columns
    Returns: number of affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function updateHosipitalVisit(body) {
    const [ results ] = await mysqlPool.query(
        'UPDATE hospitalvisit SET ? WHERE visitId=? AND userId=?',
        [body, body.visitId, body.userId]
    );

    if(results.affectedRows == 0){
        throw new Error("No hospital visit with hospital Id and no affected rows");
    }
    return results;
}
exports.updateHosipitalVisit = updateHosipitalVisit;

/*
    Query: Deletes a hospital visit row from hospitalvisit table
    Returns: affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function deleteHosipitalVisit(ids) {
    const [ results ] = await mysqlPool.query(
        'DELETE FROM hospitalvisit WHERE visitId=? AND userId=?',
        [ids.visitId, ids.userId]
    );

    if(results.affectedRows == 0) {
        throw new Error("No hospital visit was deleted");
    }

    return results.affectedRows;
}
exports.deleteHosipitalVisit = deleteHosipitalVisit;