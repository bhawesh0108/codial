const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codial_development');

var db = mongoose.connection;

db.on('error',console.error.bind(console,'There is an error in connecting to Database!!'));

db.once('open',function(){
    console.log("Connected to Database!!");
})

module.exports = db;