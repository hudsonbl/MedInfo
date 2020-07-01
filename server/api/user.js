/* 
 *  API middleware functions for user endpoints
 */

 const router = require('express').Router();
 const { validateAgainstSchema, extractValidFields } = require('../lib/validation');
 const { requireAuthentication, generateAuthToken } = require('../lib/auth');
 const { } = require('../models/users');

// =========================================
// =============  GET users  ===============
// =========================================



// =========================================
// ===========  POST users =================
// =========================================


/*
    Resource: POST /users/
    Action: Creates a user profile. Should send name, email, password
    Media Type: JSON
*/


/*
    Resource: POST /users/login
    Action: Logs a user in. User recieves id of user and JWT token
    Media Type: JSON
*/