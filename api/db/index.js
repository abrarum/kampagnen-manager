const mongoose = require('mongoose');
require('dotenv').config({path:__dirname+'/../../.env'});

const DB_URI = 'mongodb://localhost:27017';

mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((e) => {
        console.error('Connection error', e.message);
    })
    .then((conn) => {
        //conn.connection.db.dropDatabase();
    });

const db = mongoose.connection;

module.exports = db;
