const users = require('./users');
const parking = require('./parking');
const database = require('./mysqlconnection')

exports.users = users;
exports.parking = parking;
exports.database = database;