const con = require('./mysqlconnection');

exports.getUsers = function(req, res) {
    vals = {};
    con.performSelect('Users', vals, function(err, results, fields){
        if(err) throw err;
        results.forEach(element => {
            element.guide = Boolean(element.guide);
        });
        res.json(results);
    });
}

exports.getUser = function (req, res) {
    var id = req.params.id;
    var vals = {
        "idUsers": id
    };
    if(req.user.authid == id) {
        con.performSelect('Users', vals, function(err, results, fields){
            if(err) throw err;
            res.json(results);
        });        
    } else {
        res.json([{}]);
    }
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
    if(req.user.authid == id){
        con.performDelete('Users', 'idUsers', id, function(err) {
            if (err) {
                res.json({"result": false});
            } else {
                res.json({"result": true});
            }
        });       
    } else {
        res.json({"result": false});
    }
};

exports.updateUser = function(req, res) {
    var id = req.query.id;
    var body = req.body;

    console.debug("update user body");
    console.debug(JSON.stringify(body));

    if(req.user.authid == id) {
        con.performUpdate('Users', body, 'idUsers', id, function(err) {
            if(err){
                res.json({"result": false});
            } else {
                res.json({"result": true});
            }
        });        
    } else {
        res.json({"result": false});
    }
};

/**
 * Deze twee functies moeten misschien in een apart bestand komen
 */

exports.createArea = function(req, res) {
    var uid = req.params.id;

    if(req.user.authid != id) {
        res.json([{}]);
    } else {
        var x1 = req.params.x1;
        var x2 = req.params.x2;
        var y1 = req.params.y1;
        var y2 = req.params.y2;
        var name = req.params.y2;
    
        var area = {
            "name": name,
            "x1": x1,
            "x2": x2,
            "y1": y1,
            "y2": y2
        };
    
        //first we create the area
        con.performInsert('Area', area, function(err, result){
            if(err) throw err;
            var aid = result.insertId;
            //Nu dat we een gebied hebben kunnen we het in de favorieten van de gebruiker opslaan
            var fave = {
                "Users_idUsers": uid,
                "Area_idArea": aid,
                "rating": 0.0
            };
            con.performInsert("Favorites", fave, function(err){
                if(err) throw err;
                console.log("Favoriet toegevoegd: " + JSON.stringify(fave));
                res.json({"result": true});
            });
        });    
    }
};

exports.getArea = function(req, res) {
    var uid = req.params.uid;

    if(req.user.authid != uid) {
        res.json([{}]);
    } else {
        var aid = req.params.aid;
        con.performSelect('Area', {
            "idArea": aid
        }, function(err, result, fields){
            if(err) throw err;
            var r = result[0];
            con.performSelect('Favorites', {
                "Users_idUsers": uid,
                "Area_idArea": aid
            }, function(err, results, fields){
                if(err) throw err;
                var final = results[0];
                r["rating"] = final["rating"];
                res.json([r]);
            })
        });
    }
};

//TODO: Wat is deze functie?
exports.getAllArea = function(req, res) {
    con.performSelect('Area', {}, function(err, result, fields){
        if(err) throw err;
        res.json(result);
    });
};

//Dit is de eerste keer dat ik het result object in een one liner schrijf.
//Ik ga het de volgende keer ook zo doen
exports.deleteArea = function(req, res) {
    var aid = req.params.aid;
    var uid = req.params. uid;

    if (req.user.authid != uid){
        res.json({"result": false});
    } else {
        con.performDelete('Area', 'idArea', aid, function(err){
            res.json({"result": (err != null)})
        });
    }
};
