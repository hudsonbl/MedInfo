/* 
 *  User schema and data accessor methods
 */
const {debug} = require('../lib/debug');
const mysqlPool = require('../lib/mysqlPool');
const bcrypt = require('bcryptjs');
const {generateQRCode} = require('../lib/qrCode');
const { decryptHash } = require('../lib/replaceChar');
const { v4: uuidv4, validate } = require('uuid');
/*
 *  Schemas describing fields of user object
 */

const UUID_LEN = 36;

const UserSchema = {
    name: {required: true},
    email: {required: true},
    password: {required: true}
};
exports.UserSchema = UserSchema;

const UserLoginSchema = {
    email: {required: true},
    password: {required: true}
};
exports.UserLoginSchema = UserLoginSchema;

const UserForgotPasswordSchema = {
    email: {required: true}
};
exports.UserForgotPasswordSchema = UserForgotPasswordSchema;

const UserResetPasswordSchema = {
    email: {required: true},
    code: {required: true},
    password: {required: true},
    reenterPassword: {required: true}
};
exports.UserResetPasswordSchema = UserResetPasswordSchema;

/*
 *  Data Accessor Methods
 */

/*
    Query: Creates and inserts a new user
    Returns: users table userId for new user. Or throws error if user email is taken
    Return Value: int, error
 */

async function insertNewUser(user) {
    // Insert the user into the database
    // TODO: Make the promise handled

    const [ results ] = await mysqlPool.query(
        'INSERT INTO users SET ?',
        user
    );
    
    const conjugatedId = user.uuId + results.insertId.toString();
    // Create QR Code image and save it
    const qrpost = {
        userId: results.insertId,
        filepath: generateQRCode(conjugatedId)
    };

    const [ resultQRPost ] = await mysqlPool.query(
        'INSERT INTO qrimages SET ?',
        qrpost
    )
   
    // TODO: Needs to throw error if user email is taken
    return results.insertId;
}
exports.insertNewUser = insertNewUser;


/*
    Query: Gets a user by their unique email
    Returns: user data
    Return Value: JSON
 */
async function getUserByEmail(email) {
    console.log("Email==========> ", email)
    const [ results ] = await mysqlPool.query(
        "SELECT * FROM users WHERE email=?",
        [email]
    )
    console.log("Results: ", results);
    return results[0];
}
exports.getUserByEmail = getUserByEmail;
/*
    Query: Checks if encrypted password matches
    Returns: userId and true or false if user is verified.
    Return Value: JSON Object
 */
async function validateUser(email, password){
    const user = await getUserByEmail(email);
    console.log("USER: ", password);
    const verifiedUser = await bcrypt.compare(password, user.password);
    console.log("Verified User: ", verifiedUser);
    return {
        userId: user.userId,
        name: user.name,
        verified: verifiedUser
    };
}
exports.validateUser = validateUser;

/*
    Query: Checks if encrypted password matches
    Returns: userId and true or false if user is verified.
    Return Value: JSON Object
 */
async function getUserById(userId){
    const [ results ] = await mysqlPool.query(
        'SELECT name FROM users WHERE userId=?',
        [userId]
    )
    debug("=========== Results: ", results[0].name);
    return results[0].name;
}
exports.getUserById = getUserById;

/*
    Query: Enters a newly created user into unverified user table
    Returns: userId
    Return Value: JSON Object
 */
async function insertUnverifiedUser(body){

    body.password = await bcrypt.hash(
        body.password,
        10
    );

    const [ results ] = await mysqlPool.query(
        'INSERT INTO unverifiedusers SET ?',
        body
    );

    return results.insertId;
}
exports.insertUnverifiedUser = insertUnverifiedUser;

/*
    Query: Gets a user by their unique unverified email
    Returns: user data
    Return Value: JSON
 */
async function getUnverifiedUserByEmail(email) {
    
    const [ results ] = await mysqlPool.query(
        "SELECT * FROM unverifiedusers WHERE email=?",
        [email]
    )

    return results[0];
}
exports.getUnverifiedUserByEmail = getUnverifiedUserByEmail;

/*
    Query: Checks if encrypted password matches for unverified accoutn
    Returns: userId and true or false if user is verified.
    Return Value: JSON Object
 */
async function validateUnverifiedUser(email, hashedEmail){
  
    const user = await getUnverifiedUserByEmail(email);
    const key = email.split('@');
    let decryption = decryptHash(hashedEmail);
    const verifiedUser = await bcrypt.compare(key[0], decryption);

    return {
        user: user,
        verified: verifiedUser
    };
}
exports.validateUnverifiedUser = validateUnverifiedUser;

/*
    Query: Upon resolving user verification. The unverified copy of the user is deleted.
    Returns: userId 
    Return Value: JSON Object
 */
async function deleteUnverifiedUser(email) {
    const [ results ] = await mysqlPool.query(
        'DELETE FROM unverifiedusers WHERE email=?',
        [email]
    );

    return results.affectedRows;
}
exports.deleteUnverifiedUser = deleteUnverifiedUser;


/*
    Query: Updates a users password
    Returns: rows affected 
    Return Value: JSON Object
 */
async function updateUserPassword(user) {
    user.password = await bcrypt.hash(
        user.password,
        10
    );

    const [ results ] = await mysqlPool.query(
        'UPDATE users SET password=? WHERE email=?',
        [user.password, user.email]
    );

    return results.affectedRows;
}
exports.updateUserPassword = updateUserPassword;

/*
    Query: Selects all users
    Returns: all users
    Return Value: JSON Object
 */
async function selectAllUsers() {

    const [ results ] = await mysqlPool.query(
        'SELECT * FROM users'
    );

    return results;
}
exports.selectAllUsers = selectAllUsers;

/*
    Query: Verifies a uniqueID
    Returns: userId and if the unique id was a valid unique id
    Return Value: JSON Object
 */
async function verifyUniqueId(uniqueId) {
    const userId =  uniqueId.slice(UUID_LEN, uniqueId.length);
    const _uuId = uniqueId.slice(0, UUID_LEN);

    // Check if the uuId provided is indeed a uuid
    if(!validate(_uuId)){
        return {validUUID: false};
    }

    const [ results ] = await mysqlPool.query(
        'SELECT * FROM users WHERE userId=? AND uuId=?',
        [parseInt(userId), _uuId]
    );

    return {validUUID: true, userId: results[0].userId};
}
exports.verifyUniqueId = verifyUniqueId;

/*
    Query: gets a Unique id associated with the users id 
    Returns: uuid for a user
    Return Value: JSON Object
 */
async function getUUIDByUserId(userId){
    const [ results ] = await mysqlPool.query(
        'SELECT uuId FROM users WHERE userId=?',
        [userId]
    );

    return results[0];
}
exports.getUUIDByUserId = getUUIDByUserId;