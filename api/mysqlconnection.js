const mysql = require('mysql');
const fs = require('fs');

var configuration = JSON.parse(fs.readFileSync('env.json', 'utf8'));
var dataconfiguration = configuration["database"];

console.log('loaded configuration ' + JSON.stringify(dataconfiguration));
var mysql_connection = null
var connected = false;

function remove_value(arr, val) {
    var retval = {};
    var keys = Object.keys(arr);
    for(let i = 0; i < keys.length; i++) {
        if(keys[i] != val) {
            retval[keys[i]] = arr[keys[i]];
        }
    }

    return retval;
}

function createIdObj(idcol, id) {
    var retval = {};
    retval[idcol] = id;
    return retval;
}

function createSetClause(vals) {
    var retval = 'SET ';
    var vals_keys = Object.keys(vals);
    var vals_values = Object.values(vals);
    var i = 0;
    var tmpval = [];
    var tmpstring = ''

    for(i = 0; i < vals_keys.length; i++) {
        tmpval.push(vals_keys[i] + '="' + vals_values[i]+'"');
    }
    tmpstring = tmpval.join(',');
    return retval + tmpstring;
}

function quoteString(s,v) {
    if(v) {
        return '"' + s + '"';
    } else {
        return s;
    }
}

function listToString(l, v) {
    var i = 0;
    var result = '';
    for(i = 0; i<l.length; i++) {
        var current = l[i];
        if(i == 0) {
            result += '(' + quoteString(current, v);
            if(l.length == 1) {
                result += ')';
            }
        } else if(i == (l.length-1)) {
            result += ',' + quoteString(current,v) + ')';
        } else {
            result += ',' +quoteString(current, v);
        }
    }
    return result;
}

function createWhereClause(obj) {
    var i;
    var keys = Object.keys(obj);
    var values = Object.values(obj);
    
    if(keys.length == 0) {
        return '';
    } else {
        var result = 'where ';
        for(i=0; i<keys.length; i++) {
            var current_key = keys[i];
            var current_value = values[i]
            if(i == 0) {
                result += current_key + '="' + current_value + '"'
            } else {
                result += ' and ' + current_key + '="' + current_value + '"'
            }
        }
        return result;        
    }
}

function connect(cb) {
    mysql_connection = mysql.createPool(dataconfiguration);
    cb();
    return mysql_connection;
}

function disconnect() {
    mysql_connection.end();
}

function performInsert(table, vals, cb) {
    mysql_connection.getConnection(function(err, connection){
        var keys = Object.keys(vals);
        var values = Object.values(vals);

        list_keys = listToString(keys, false);
        list_values = listToString(values, true);

        var sql_string = "insert into " + table + list_keys + " values" + list_values + ";";
        console.log('Executing sql: ' + sql_string);
        connection.query(sql_string, cb); //hopelijk hebben we nu geen sql injectie
    });

}

exports.performUpdate = function(table, vals, idobj, id, cb){
    mysql_connection.getConnection(function(err, connection) {

        //Avoid that the ID is updated.
        var newvals = remove_value(vals, idobj);
        
        var set_string = createSetClause(newvals);
        var where_string = createWhereClause(createIdObj(idobj, id));
        var query = "update " + table + ' ' + set_string + ' ' + where_string + ';'
        console.log("Performing update query: " + query);
        connection.query(query, cb);
    });
}

exports.performDelete = function(table, idcol, id, cb) {
    mysql_connection.getConnection(function(err, connection){
        var clause = createIdObj(idcol, id);
        var whereclause = createWhereClause(clause);
        var sql_string = "delete from " + table + + " " . whereclause;
        
        connection.query(sql_string, cb);
    });
};

function removeAllFromTable(table, cb) {
    mysql_connection.getConnection(function(err, connection){
        var qstring = 'delete from ' + table;
        return connection.query(qstring, cb);        
    });
}

function performSelect(table, whereclause, cb) {
    mysql_connection.getConnection(function(err, connection) {
        if(err) throw err;
        var wherestring = createWhereClause(whereclause);
        var full_selection = 'select * from ' + table + ' ' + wherestring;
        console.log("performSelect querystring: " + full_selection);
        return connection.query(full_selection, cb)
    });

}

function revert(req, res) {
    mysql_connection.getConnection(function(err, connection) {
        if(err) throw err;
        //we got a connection. Load the file
        var sqlfile = fs.readFileSync("datamodel.sql").toString('utf-8');
        connection.query(sqlfile, function(err) {
            if(err) {
                res.json([{"success": false}]);
            } else {
                res.json([{"success": true}]);
            }
        });
    });
}

exports.connect = connect;
exports.disconnect = disconnect;
exports.createWhereClause = createWhereClause;
exports.listToString = listToString;
exports.performSelect = performSelect;
exports.performInsert = performInsert;
exports.removeAllFromTable = removeAllFromTable;
exports.createSetClause = createSetClause
exports.revert = revert