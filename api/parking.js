const e = require('express');
const con = require('./mysqlconnection');

exports.getParking = function(req, res) {
    con.performSelect('ParkingSpots', {"idParkingSpots": req.params.id}, function(err, result){
        if(err) throw err;
        res.json(result);
    });
};

exports.createParking = function(req, res) {
    var x1 = req.body.x1;
    var x2 = req.body.x2;
    con.performInsert('ParkingSpots', {
        "x": x1,
        "y": x2
    }, function(err){
        res.json({"result": (err == null)});
    });
};

exports.deleteParking = function(req, res) {
    con.performDelete('ParkinSpots', "idParkingSpots", req.params.id, function(err){
        res.json({"result": (err == null)});
    });
};

exports.getAllParking = function(req, res) {
    con.performSelect('ParkingSpots', {}, function(err, result){
        if(err) throw err;
        var results = [];
        result.forEach(r => {
            var buffer = Buffer.from(r.image, 'binary');
            results.push({
                "idParkingSpots": r.idParkingSpots,
                "coordinate": {
                    "latitude": r.x,
                    "longtitude": r.y
                },
                "occupied": (r.occupied == 0)?"false":"true",
                'image': r.image,
                'rating': r.rating
            });
        });
        res.json(results);
    });
};

/* Deze functie werkt denk ik alleen maar in het noordoostelijke deel van de planeet. Ik moet dit eens uittesten */
function isInArea(point, area) {
    var px = point["x"]; var py = point["y"];
    var a1x = area["x1"]; var a1y = area["y1"];
    var a2x = area["x2"]; var a2y = area["y2"];

    var truth_x = ((a1x <= px) && (a2x >= px));
    var truth_y = ((a1y <= px) && (a2y >= py));
    return (truth_y && truth_x);
}

/* TODO: pas de api aan zodat deze berekening door de databank kan gebeuren */
exports.getAllParkingForArea = function(req, res) {
    var aid = req.params.aid;
    var uid = req.params.uid;

    if(req.user.authid != uid) {
        res.json([{}]);
    } else {
        con.performSelect('Area', {
            "idArea": aid
        }, function(err, result){
            if(err) throw err;
            var a = result[0];

            con.performSelect('ParkingSpots', {}, function(err, result){
                if(err) throw err;
                var filtered_result = [];
                result.forEach(e => {
                    if(isInArea(e, a)){
                        filtered_result.push(e);
                    }
                });
                res.json(filtered_result);
            });
        });        
    }
};

exports.occupyParking = function(req, res) {
    var pid = req.params.id;
    var uid = req.params.uid;

    if(req.user.authid != uid) {
        res.json({"result": false});
    } else {
        con.performSelect('ParkingSpots', {
            "idParkingspots": pid
        }, function(err, result){
            if(err) throw err;
            var r = result[0];
            r["occupied"] = !r["occupied"];
            con.performUpdate('Parkingspots', r, 'idParkingspots', pid, function(err){
                res.json({"result": (err == null)});
            });
        });        
    }
};
