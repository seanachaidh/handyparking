var assert = require('assert');
var connection = require('../api/mysqlconnection');
const { equal, doesNotReject } = require('assert');


describe('MYSQL', function(){
    before(function(done) {
        connection.connect(function() {
            console.log("connected; seeding");
            seed = {
                "name": "Pieter",
                "guide": "0",
                "email": "pvankeyemulen@seanachaidh.be",
                "password": "12345"
            };
            connection.performInsert("Users", seed, function(err, result) {
                if(err) throw err;
                console.log("Seed successful");
                done();
            })
        });
    });
    after(function(done){
        
        connection.removeAllFromTable('Users', function(err, result) {
            if(err) throw err;
            done();
        });
        connection.disconnect();
    })
    describe('#createWhere', function() {
        it('Should create a mysql where clause', function() {
            var query = {
                "email": "pvankeymeulen@seanachaidh.be"
            }
            var tocheck = connection.createWhere(query);
            assert.equal(tocheck, 'where email="pvankeymeulen@seanachaidh.be"', 'simple where not succeeded');
        });
        it('Should create a where clause with multiple variables', function() {
            var query = {
                "email": "pvankeymeulen@seanachaidh.be",
                "name": "Pieter"
            };
            var tocheck = connection.createWhere(query);
            assert.equal(tocheck, 'where email="pvankeymeulen@seanachaidh.be" and name="Pieter"', 'Simple where with multiple variables not succeeded');
        })
    });

    describe('#listToString', function(){
        it('should convert a list with a single element to a string', function() {
            var test = ["hello"];
            var result = connection.listToString(test);
            assert.equal(result, '(hello)');
        });
        it('should convert a list with multiple elements to a string', function() {
            var test = ["hello", "world"];
            var result = connection.listToString(test);
            assert.equal(result, '(hello,world)');
        });
        it('should convert a list with three elements to a string', function(){
            var test = ["hello", "nice", "world"];
            var result = connection.listToString(test);
            assert.equal(result, "(hello,nice,world)");
        });
    });
    describe('#performSelect', function() {
        it('should perform selection', function(done) {
            var clause = {
                "name": "Pieter"
            };
            connection.performSelect("Users", clause, function(err, result, fields){
                if(err) {
                    throw err;
                } else {
                    first = result[0];
                    assert.equal(first["name"], "Pieter");
                    done();
                }
            });
        });
    });
    describe("#performInsertion", function() {
        it('should perform an insertion', function(done){
            vals = {
                "name": "Katrijn",
                "email": "katrijn@hotmail.com",
                "guide": "1",
                "password": "12345"
            };
            connection.performInsert("Users", vals, function() {
                var clause = {
                    "name": "Katrijn"
                };
                connection.performSelect("Users", clause, function(err, result, fields){
                    if(err) throw err;
                    var r = result[0];
                    assert.equal(r["name"], "Katrijn");
                    done();
                })
            })
        });
    });
});
