/* 
 *  User schema and data accessor methods
 */
const {debug} = require('../lib/debug');
const mysqlPool = require('../lib/mysqlPool');
const bcrypt = require('bcryptjs');
const {generateQRCode} = require('../lib/qrCode');
/*
 *  Schemas describing fields of user object
 */

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

/*
 *  Data Accessor Methods
 */

/*
    Query: Creates and inserts a new user
    Returns: users table userId for new user. Or throws error if user email is taken
    Return Value: int, error
 */

async function insertNewUser(user) {
    // Hash the user password for database storage. Never store plaintext passwords!
    let result = []
    user.password = await bcrypt.hash(
        user.password,
        10
    );

    // Insert the user into the database
    // TODO: Make the promise handled
    try{
        const [ results ] = await mysqlPool.query(
            "INSERT INTO users SET ?",
            user
        );
        result = results;
    }catch(err){
        //TODO: This error message can be more verbose
        debug("Error: ", err)
        return err;
    }
    // Create QR Code image and save it
    const qrpost = {
        userId: result.insertId,
        filepath: generateQRCode(result.insertId)
    }

    const [ resultQRPost ] = await mysqlPool.query(
        'INSERT INTO qrimages SET ?',
        qrpost
    )
   
    // TODO: Needs to throw error if user email is taken
    return result.insertId;
}
exports.insertNewUser = insertNewUser;


/*
    Query: Gets a user by their unique email
    Returns: user data
    Return Value: JSON
 */
async function getUserByEmail(email) {
    const [ results ] = await mysqlPool.query(
        "SELECT * FROM users WHERE email=?",
        [email]
    )

    return results[0];
}

/*
    Query: Checks if encrypted password matches
    Returns: userId and true or false if user is verified.
    Return Value: JSON Object
 */
async function validateUser(email, password){
    const user = await getUserByEmail(email);
    const verifiedUser = await bcrypt.compare(password, user.password);
    return {
        userId: user.userId,
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
    debug("== Results: ", results)
    console.log("==== Results: ", results);
    return results;
}
exports.getUserById = getUserById;