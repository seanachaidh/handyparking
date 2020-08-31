const con = require('./mysqlconnection');
exports.getUsers = function(req, res) {
    vals = {};
    con.performSelect('Users', vals, function(err, results, fields){
        if(err) throw err;
        res.json(results);
    });
}

exports.getUser = function (req, res) {
    var id = req.params.id;
    var vals = {
        "idUsers": id
    };
    con.performSelect('Users', vals, function(err, results, fields){
        if(err) throw err;
        var user = results[0];
        res.json(user);
    });
};

exports.createUser = function(req, res)  {
    var p = req.body.password;
    var n = req.body.name;
    var g = req.body.guide;
    var e = req.body.email;

    var vals = {
        "name": n,
        "password": p,
        "guide": g,
        "email": e
    };
    con.performInsert("Users", vals, function(err){
        if(err) {
            res.json({"result": false});
        } else {
            console.log("inserted: " + JSON.stringify(vals));
            res.json({"result": true});
        }
        
    });
};

exports.deleteUser = function(req, res) {
    var id = req.query.id
    con.performDelete('Users', 'idUsers', id, function(err) {
        if (err) {
            res.json({"result": false});
        } else {
            res.json({"result": true});
        }
    });
};

exports.updateUser = function(req, res) {
    var id = req.query.id;
    var body = req.body;

    console.debug("update user body");
    console.debug(JSON.stringify(body));

    con.performUpdate('Users', body, 'idUsers', id, function(err) {
        if(err){
            res.json({"result": false});
        } else {
            res.json({"result": true});
        }
    });
};


/**
 * Deze twee functies moeten misschien in een apart bestand komen
 */

exports.createArea = function(req, res) {

};

exports.getArea = function(req, res) {

};

exports.getAllArea = function(req, res) {

};

exports.deleteArea = function(req, res) {

};