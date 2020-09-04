/*
 * Reusable MySQL connection pool for making queries throughout the rest of
 * the app. 
 */

const mysql = require('mysql2/promise');
//host: process.env.MYSQL_HOST || '127.0.0.1', //<-- this is for website
//port: process.env.MYSQL_PORT || 3306,

//host: process.env.MYSQL_HOST || 'localhost', //<-- this is for development
//port: process.env.MYSQL_PORT || 3333,

const mysqlPool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: process.env.MYSQL_PORT || 3306,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
});

module.exports = mysqlPool;