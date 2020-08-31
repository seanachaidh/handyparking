const express = require('express');
const api = require('./api/api');
const bodyParser = require('body-parser');

const port = 3000

const app = express();

//middleware
app.use(bodyParser.urlencoded());

api.database.connect(function(){
    console.log("Connection within app has been performed");
});

//users
app.get('/user', api.users.getUsers);
app.get('/user/:id', api.users.getUser);
app.post('/user', api.users.createUser);
app.put('/user/:id', api.users.updateUser);

//User area
app.get('/user/:uid/area/:aid', api.users.getArea);
app.delete('/user/:uid/area/:aid', api.users.deleteArea);
app.post('/user/:uid/area', api.users.createParking);
app.get('/user/:uid/area', api.users.getAllArea);


//parkingspot
app.get('/parkingspot', api.parking.getAllParking);
app.post('/parkingspot', api.parking.createParking);
app.get('/parkingspot/:id', api.parking.getParking);
app.delete('/parkingspot/:id', api.parking.deleteParking);
app.put('/parkingspot/:id', api.parking.occupyParking);

app.listen(3000, function(){
    console.log("Server has been started");
});
