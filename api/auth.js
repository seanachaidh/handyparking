var uuid = require('uuid');
var con = require('./mysqlconnection');

function create_token(user) {
    var token = uuid.v4();
    var user_id = user["idUsers"];

    var vals = {
        "token": token,
        "Users_idUsers": user_id,
        "valid": "1"
    };

    con.performInsert("AuthTokens", vals, function(err) {
        if(err) throw err;
        console.log("New token created: " + vals["token"]);
    });
    return token;
}

function bearer_stategy(token, done) {
    /* Just check if the token exists */
    var vals = {
        "token": token,
        "valid": "1"
    };

    con.performSelect('AuthTokens', vals, function(err, result) {
        if(err) throw err;
        if(result.length > 0) {
            var found_user = result[0];
            var found_user_id = found_user["Users_idUsers"];
            done(null, {"authid": found_user_id});
        } else {
            done(null, false);
        }
    });
}

function basic_stategy(username, password, done) {
    console.log("Performing basic authentication");
    var vals = {
        "email": username,
        "password": password
    };
    con.performSelect("Users", vals, function(err, result) {
        if(err) throw err;
        var user_length = result.length;
        if(user_length == 0) {
            return done(null, false);
        } else {
            var found_user = result[0];
            var created_token = create_token(found_user);
            //mogelijk punt voor fouten. Zou eigenlijk niet waar mogen zijn wanneer create_token faalt
            return done(null, created_token);
        }
    });
}
exports.basic = basic_stategy;
exports.bearer = bearer_stategy;