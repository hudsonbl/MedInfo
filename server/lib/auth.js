/*
 * This file generates user authentication tokens. 
 * If a user is correctly authenticated, they will receive a token 
 */

const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY; 
const { getUserById } = require('../models/users');

function generateAuthToken (userId) {
    const payload = { sub: userId };
    return jwt.sign(payload, secretKey, {expiresIn: '24h'});
}
exports.generateAuthToken = generateAuthToken;

// TODO: Will need to modify this function in the future
//       Last modification was the final project in ROB BOSS' class
async function requireAuthentication(req, res, next){
    /* This function will be called with every middleware function */

    const authHeader = req.get('Authorization') || '';
    const authHeaderParts = authHeader.split(' ');
    const token = authHeaderParts[0] === 'Bearer' ? authHeaderParts[1] : null;
    
    // Get user role is very important for what data privildge user has access to
    try {
        const role = await getUserById(req.body.id);
        const payload = jwt.verify(token, secretKey);
        req.user = payload.sub;
        req.role = role.role;
        req.authenticated = true;
        console.log(" == Authenticated Action");
    } catch (err) {
        console.log(" == Unauthenticated Action");
        req.authenticated = false;
    }
    next();
}
exports.requireAuthentication = requireAuthentication;