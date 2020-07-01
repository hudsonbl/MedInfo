/*
 * Chronic health issues schema and data accessor methods
 */

const mysqlPool = require('../lib/mysqlPool');

/*
 *  Schemas describing fields of chronic health issue object
 */

const ChronicHealthSchema = {
    userId: {required: true},
    condition: {required: true},
    notes: {required: false}
};
exports.ChronicHealthSchema = ChronicHealthSchema;

const ChronicHealthPatchSchema = {
    userId: {required: true},
    chronicId: {required: true},
    condition: {required: false},
    notes: {required: false}
};
exports.ChronicHealthPatchSchema = ChronicHealthPatchSchema;
/*
 * Data accessor methods
 */

/*
    Query: Creates and inserts a new chronic health issue
    Returns: insertId of new chronic health issue
    Return Value: INT
 */

async function insertNewChronicHealthIssue(body) {
    const [ results ] = await mysqlPool.query(
        'INSERT INTO chronichealth SET ?',
        body
    );

    return results.insertId;
}
exports.insertNewChronicHealthIssue = insertNewChronicHealthIssue;

/*
    Query: Get all chronic health issues for a specific user
    Returns: JSON object array of a users chronic health issues
    Return Value: JSON Object array
 */

async function getChronicHealthByUserId(userId) {
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM chronichealth WHERE userId=?',
        [userId]
    );
    
    return results;
}
exports.getChronicHealthByUserId = getChronicHealthByUserId;

/*
    Query: Update chronichealth columns
    Returns: number of affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function updateChronicHealthIssue(body) {
    const [ results ] = await mysqlPool.query(
        'UPDATE chronichealth SET ? WHERE chronicId=? AND userId=?',
        [body, body.chronicId, body.userId]
    );

    if(results.affectedRows == 0){
        throw new Error("No chronic by chronic Id and no affected rows");
    }
    return results;
}
exports.updateChronicHealthIssue = updateChronicHealthIssue;

/*
    Query: Deletes a chronic health issue row from chronichealth table
    Returns: affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function deleteChronicHealthIssue(ids) {
    const [ results ] = await mysqlPool.query(
        'DELETE FROM chronichealth WHERE chronicId=? AND userId=?',
        [ids.chronicId, ids.userId]
    );

    if(results.affectedRows == 0) {
        throw new Error("No chronic health issue was deleted");
    }

    return results.affectedRows;
}
exports.deleteChronicHealthIssue = deleteChronicHealthIssue;