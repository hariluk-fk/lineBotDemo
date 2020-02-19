const express = require('express');
const mongodb = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
require('dotenv/config');
const partNoRoute = require('./routes/partNo');
const serialNoRoute = require('./routes/serialNo');
const locationRoute = require('./routes/location');
const userRoute = require('./routes/user');
const cors = require('cors')

var port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/article', partNoRoute);
app.use('/serial', serialNoRoute);
app.use('/location', locationRoute);
app.use('/user', userRoute)

// Home screen 
app.get('/', (req, res)=> {
    res.send('Welcome To Sample API by Hariluk.F')
})

mongodb.connect(
    process.env.DB_CONNECTION, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },() => {})
    .then(() => console.log('Database is already connected!'))
    .catch(err => {
        console.log({message: err});
    });

// how to we start listening to server
app.listen(port);