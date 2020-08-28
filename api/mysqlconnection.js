const mysql = require('mysql');
const fs = require('fs');

var configuration = JSON.parse(fs.readFileSync('env.json', 'utf8'));
var dataconfiguration = configuration["database"];

console.log('loaded configuration ' + JSON.stringify(dataconfiguration));
var mysql_connection = null
var connected = false;

function zip(a1, a2) {
    return 
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

function createWhere(obj) {
    var i;
    var keys = Object.keys(obj);
    var values = Object.values(obj);
    
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

function removeAllFromTable(table, cb) {
    mysql_connection.getConnection(function(err, connection){
        var qstring = 'delete from ' + table;
        return connection.query(qstring, cb);        
    });
}

function performSelect(table, whereclause, cb) {
    mysql_connection.getConnection(function(err, connection) {
        if(err) throw err;
        var wherestring = createWhere(whereclause);
        var full_selection = 'select * from ' + table + ' ' + wherestring;
        console.log("performSelect querystring: " + full_selection);
        return connection.query(full_selection, cb)
    });

}

exports.connect = connect;
exports.disconnect = disconnect;
exports.createWhere = createWhere;
exports.listToString = listToString;
exports.connect = connect;
exports.performSelect = performSelect;
exports.performInsert = performInsert;
exports.removeAllFromTable = removeAllFromTable;