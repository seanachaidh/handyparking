const express = require('express');
const api = require('./api/api');
const bodyParser = require('body-parser');

const fs = require('fs');
var configuration = JSON.parse(fs.readFileSync('env.json', 'utf-8'));
var serverConfig = configuration["server"];

const port = 3000

const app = express();
var indexRouter = express.Router()

//middleware
app.use(bodyParser.urlencoded());

api.database.connect(function(){
    console.log("Connection within app has been performed");
});

//users
indexRouter.get('/user', api.users.getUsers);
indexRouter.get('/user/:id', api.users.getUser);
indexRouter.post('/user', api.users.createUser);
indexRouter.put('/user/:id', api.users.updateUser);

//User area
indexRouter.get('/user/:uid/area/:aid', api.users.getArea);
indexRouter.delete('/user/:uid/area/:aid', api.users.deleteArea);
indexRouter.post('/user/:uid/area', api.users.createArea);
indexRouter.get('/user/:uid/area', api.users.getAllArea);


//parkingspot
indexRouter.get('/parkingspot', api.parking.getAllParking);
indexRouter.post('/parkingspot', api.parking.createParking);
indexRouter.get('/parkingspot/:id', api.parking.getParking);
indexRouter.delete('/parkingspot/:id', api.parking.deleteParking);
indexRouter.put('/parkingspot/:id', api.parking.occupyParking);
indexRouter.get('/parkingspot/area/:aid', api.parking.getAllParkingForArea);

console.log('Used root: ' + serverConfig["baseUrl"]);

app.use(serverConfig["baseUrl"], indexRouter);

app.listen(3000, function(){
    console.log("Server has been started");
});
