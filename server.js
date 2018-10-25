const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const auth = require('./api/routes/Auth');
//db
mongoose.connect('mongodb://localhost:27017/cycle_shop', (err, db) => {
    if (!err) return console.log('database connected');

    console.log('database connection failed', err);
});

// routes
const product = require('./api/routes/product');

// create express app instance

const app = express();
app.use(express.static('public'));

app.use(express.urlencoded({useNewUrlParser: true, extended: false}));

app.use(express.json());
app.use(cors());
// connecting to database

// app initialize passport
app.use(passport.initialize());

// start the jwt-strategy
require('./config/passport')(passport);


app.use('/api/products', product);
app.use('/api/auth', auth);
app.use(morgan('dev'));

app.listen(5555, err => {
    if (!err) return console.log('server stated ');
})
