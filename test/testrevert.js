const superagent = require('superagent');
const assert = require('assert');

describe('#RevertTest', function() {
    it('Should revert the database', function(done) {
        superagent
            .post('http://localhost:3000/handyparking/revert')
            .set('Accept', 'json')
            .end(function(req, res){
                var result = res.body[0].success;
                assert.strictEqual(result, true, "Revert not succeeded");
                done();
            });
    });
});