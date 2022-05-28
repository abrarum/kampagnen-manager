const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path")
const db = require('./db');
const kampagneRouter = require('./routes/kampagne-router');
require('dotenv').config({path:__dirname+'/../.env'});

const PORT = 5000;

app.use(express.json());
app.use(cors());

// Serve static files
if (process.env.REACT_APP_NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')))
}

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
    res.send('Engine started ...!');
});

app.use('/api', kampagneRouter);

app.listen(PORT, function () {
    console.log('Server is running on Port: ' + PORT);
});
