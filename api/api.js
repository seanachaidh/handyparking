const users = require('./users');
const parking = require('./parking');
const database = require('./mysqlconnection');
const auth = require('./auth');

exports.auth = auth;
exports.users = users;
exports.parking = parking;
exports.database = database;