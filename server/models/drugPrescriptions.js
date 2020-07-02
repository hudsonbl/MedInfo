/*
 * Drug prescription issues schema and data accessor methods
 */

const mysqlPool = require('../lib/mysqlPool');

/*
 *  Schemas describing fields of prescribbeddrugs object
 */

const DrugPrescriptionSchema = {
    userId: {required: true},
    name: {required: true},
    startdate: {required: false},
    enddate: {required: false},
    symptoms: {required: false}
};
exports.DrugPrescriptionSchema = DrugPrescriptionSchema;

const DrugPrescriptionPatchSchema = {
    prescriptionId: {required: true},
    userId: {required: true},
    name: {required: false},
    startdate: {required: false},
    enddate: {required: false},
    symptoms: {required: false}
};
exports.DrugPrescriptionPatchSchema = DrugPrescriptionPatchSchema;
/*
 * Data accessor methods
 */

/*
    Query: Creates and inserts a new prescription drug
    Returns: insertId of new prescription drug
    Return Value: INT
 */

async function insertNewDrugPrescription(body) {
    const [ results ] = await mysqlPool.query(
        'INSERT INTO prescribeddrugs SET ?',
        body
    );

    return results.insertId;
}
exports.insertNewDrugPrescription = insertNewDrugPrescription;

/*
    Query: Get all prescription drugs for a specific user
    Returns: JSON object array of a users presciption drugs
    Return Value: JSON Object array
 */

async function getDrugPrescriptionsByUserId(userId) {
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM prescribeddrugs WHERE userId=?',
        [userId]
    );
    
    return results;
}
exports.getDrugPrescriptionsByUserId = getDrugPrescriptionsByUserId;

/*
    Query: Update prescribeddrugs columns
    Returns: number of affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function updateDrugPrescription(body) {
    const [ results ] = await mysqlPool.query(
        'UPDATE prescribeddrugs SET ? WHERE prescriptionId=? AND userId=?',
        [body, body.prescriptionId, body.userId]
    );

    if(results.affectedRows == 0){
        throw new Error("No prescription by its drug id and no affected rows");
    }
    return results;
}
exports.updateDrugPrescription = updateDrugPrescription;

/*
    Query: Deletes a prescription drug row from prescribeddrugs table
    Returns: affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function deleteDrugPrescription(ids) {
    const [ results ] = await mysqlPool.query(
        'DELETE FROM prescribeddrugs WHERE prescriptionId=? AND userId=?',
        [ids.prescriptionId, ids.userId]
    );

    if(results.affectedRows == 0) {
        throw new Error("No prescription drug was deleted");
    }

    return results.affectedRows;
}
exports.deleteDrugPrescription = deleteDrugPrescription;