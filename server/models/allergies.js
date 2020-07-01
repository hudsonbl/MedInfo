/*
 * Allergy schema and data accessor methods 
 */

const mysqlPool = require('../lib/mysqlPool');

/*
 *  Schemas describing fields of allergy object
 */ 

const AllergySchema = {
    userId: {required: true},
    allergy: {required: true},
    symptoms: {required: true},
    medication: {required: false} // TODO: will need to reinit db cuz I had NOT NULL in this field
};
exports.AllergySchema = AllergySchema;

const AllergyPatchSchema = {
    userId: {required: true},
    allergyId: {required: true},
    allergy: {required: false},
    symptoms: {required: false},
    medication: {required: false}
};
exports.AllergyPatchSchema = AllergyPatchSchema;
/*
 *  Data Accessor Methods
 */

/*
    Query: Creates and inserts a new allergy
    Returns: insertId of new insert
    Return Value: int, error
 */

async function insertNewAllergy(body) {
    const [ results ] = await mysqlPool.query(
        'INSERT INTO allergies SET ?',
        body
    );

    return results.insertId;
}
exports.insertNewAllergy = insertNewAllergy;

/*
    Query: Get all allergy information for a specific user
    Returns: JSON object array of a users allergies
    Return Value: JSON Object array
 */

async function getAllergiesByUserId(userId) {
    const [ results ] = await mysqlPool.query(
        'SELECT * FROM allergies WHERE userId=?',
        [userId]
    );

    return results;
}
exports.getAllergiesByUserId = getAllergiesByUserId;

/*
    Query: Update allergy columns
    Returns: number of affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function updateAllergy(body) {
    const [ results ] = await mysqlPool.query(
        'UPDATE allergies SET ? WHERE allergyId=? AND userId=?',
        [body, body.allergyId, body.userId]
    );

    if(results.affectedRows == 0){
        throw new Error("No allergy by allergy Id and no affected rows");
    }
    return results;
}
exports.updateAllergy = updateAllergy;

/*
    Query: Deletes a allergy row from allergies table
    Returns: affected rows, if its zero it means operation was invalid or nothing changed
    Return Value: INT
 */

async function deleteAllergy(ids) {
    const [ results ] = await mysqlPool.query(
        'DELETE FROM allergies WHERE allergyId=? AND userId=?',
        [ids.allergyId, ids.userId]
    );

    if(results.affectedRows == 0) {
        throw new Error("No allergy was deleted");
    }

    return results.affectedRows;
}
exports.deleteAllergy = deleteAllergy;