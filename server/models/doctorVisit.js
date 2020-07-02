/*
 * Doctor visit schema and data accessor methods 
 */

const mysqlPool = require('../lib/mysqlPool');

/*
 *  Schemas describing fields of doctorvisit object
 */ 

const DoctorVisitSchema = {
    userId: {required: true},
    date: {required: true},
    clinicianName: {required: true},
    notes: {required: true},
    bloodPressure: {required: false},
    heartRate: {required: false}
};
exports.DoctorVisitSchema = DoctorVisitSchema;

const DoctorVisitPatchSchema = {
    visitId: {required: true},
    userId: {required: true},
    date: {required: false},
    clinicianName: {required: false},
    notes: {required: false},
    bloodPressure: {required: false},
    heartRate: {required: false}
};
exports.DoctorVisitPatchSchema = DoctorVisitPatchSchema;
/*
 *  Data Accessor Methods
 */

/*
    Query: Creates and inserts a new doctor visit
    Returns: insertId of new insert
    Return Value: INT
 */

async function insertNewDoctorVisit(body) {
    const [ results ] = await mysqlPool.query(
        'INSERT INTO doctorvisit SET ?',
        body
    );

    return results.insertId;
}
exports.insertNewDoctorVisit = insertNewDoctorVisit;

/*
    Query: Get all doctor visits information for a specific user
    Returns: JSON object array of a users doctor visits
    Return Value: JSON Object array
 */

async function getDoctorVisitByUserId(userId) {
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM doctorvisit WHERE userId=?',
        [userId]
    );

    return results;
}
exports.getDoctorVisitByUserId = getDoctorVisitByUserId;

/*
    Query: Update doctor visits columns
    Returns: number of affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function updateDoctorVisit(body) {
    const [ results ] = await mysqlPool.query(
        'UPDATE doctorvisit SET ? WHERE visitId=? AND userId=?',
        [body, body.visitId, body.userId]
    );

    if(results.affectedRows == 0){
        throw new Error("No doctor visit by doctor visit id and no affected rows");
    }
    return results;
}
exports.updateDoctorVisit = updateDoctorVisit;

/*
    Query: Deletes a doctor visit row from doctorvisit table
    Returns: affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function deleteDoctorVisit(ids) {
    const [ results ] = await mysqlPool.query(
        'DELETE FROM doctorvisit WHERE visitId=? AND userId=?',
        [ids.visitId, ids.userId]
    );

    if(results.affectedRows == 0) {
        throw new Error("No doctor visit was deleted");
    }

    return results.affectedRows;
}
exports.deleteDoctorVisit = deleteDoctorVisit;