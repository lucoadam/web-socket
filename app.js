var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const mongoose = require('mongoose')
var app = express();
// const db =  'mongodb+srv://schoolsite:schoolsite@cluster0.a4lfw.mongodb.net/merodb?retryWrites=true&w=majority'
const db =  'mongodb://localhost:27017/merodb?retryWrites=true&w=majority'
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>{
        console.log('Mongo Connection Successful')
        app.enable('trust proxy');
    })
    .catch(err => console.log(err));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);



//
app.use('/users', usersRouter);

module.exports = app;
