const express = require('express');
const api = require('./api/api');
const bodyParser = require('body-parser');
const BasicStrategy = require('passport-http').BasicStrategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const fs = require('fs');
const passport = require('passport');
const { bearer } = require('./api/auth');
var configuration = JSON.parse(fs.readFileSync('env.json', 'utf-8'));
var serverConfig = configuration["server"];

const port = 3000

const app = express();
var indexRouter = express.Router()

//middleware
app.use(bodyParser.urlencoded());

//passport
passport.use(new BasicStrategy(api.auth.basic));
passport.use(new BearerStrategy(api.auth.bearer));

var passport_options = {"session": false};

api.database.connect(function(){
    console.log("Connection within app has been performed");
});

if(configuration.server.debugMode) {
    indexRouter.post('/revert', api.database.revert);
}

//users
indexRouter.get('/user', api.users.getUsers); // TODO: Verwijder dit
indexRouter.get('/user/:id', passport.authenticate('bearer', passport_options), api.users.getUser);
indexRouter.post('/user', api.users.createUser);
indexRouter.put('/user/:id', passport.authenticate('bearer', passport_options), api.users.updateUser);

//login route
indexRouter.get('/login', passport.authenticate('basic', {"session": false}), function(req, res){
    res.json([{"token": req.user}]);
});
indexRouter.post('/login', passport.authenticate('bearer', passport_options), function(req, res) {
    var authorization = req.headers["authorization"];
    var token = authorization.split(" ")[1];

    console.log("Logging out: " + token);
    var vals = {
        "valid": "0"
    }
    api.database.performUpdate('AuthTokens', vals, 'token', token, function(err) {
        if(err) {
            res.json({"result": false});
        } else {
            res.json({"result": true});
        }
    });

})

//User area
indexRouter.get('/user/:uid/area/:aid', passport.authenticate('bearer', passport_options), api.users.getArea);
indexRouter.delete('/user/:uid/area/:aid', passport.authenticate('bearer', passport_options), api.users.deleteArea);
indexRouter.post('/user/:uid/area', passport.authenticate('bearer', passport_options), api.users.createArea);
indexRouter.get('/user/:uid/area', passport.authenticate('bearer', passport_options), api.users.getAllArea);


//parkingspot
indexRouter.get('/parkingspot', api.parking.getAllParking);
indexRouter.post('/parkingspot', passport.authenticate('bearer', passport_options), api.parking.createParking);
indexRouter.get('/parkingspot/:id', api.parking.getParking);
indexRouter.delete('/parkingspot/:id', passport.authenticate('bearer', passport_options), api.parking.deleteParking);
indexRouter.put('/parkingspot/:id/:uid', passport.authenticate('bearer', passport_options), api.parking.occupyParking);
indexRouter.get('/parkingspot/:uid/area/:aid', passport.authenticate('bearer', passport_options), api.parking.getAllParkingForArea);

console.log('Used root: ' + serverConfig["baseUrl"]);

app.use(serverConfig["baseUrl"], indexRouter);

app.listen(port, function(){
    console.log("Server has been started");
});
