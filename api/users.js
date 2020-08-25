const con = require('./mysqlconnection')

exports.getUser = function (req, res) {
};

exports.createUser = function(req, res)  {
    var p = req.body.password;
    var n = req.body.name;
    var g = req.body.guide;
    var e = req.body.email;

    vals = {
        "name": n,
        "password": p,
        "guide": g,
        "email": e
    };

    

};

exports.deleteUser = function(req, res) {

};

exports.updateUser = function(req, res) {

};


/**
 * Deze twee functies moeten misschien in een apart bestand komen
 */

exports.createArea = function(req, res) {

};

exports.getArea = function(req, res) {

};