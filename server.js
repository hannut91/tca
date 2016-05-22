var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({ session: expressSession });
var mongoose = require('mongoose');
require('./models/users_model.js');
var conn = mongoose.connect('mongodb://localhost/myapp');
var app = express();
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use('/views', express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    secret: 'SECRET',
    cookie: { maxAge: 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: 'mongodb://localhost/myapp',
        collection: 'sessions'
    })
}));
require('./routes')(app);
app.listen(3000);


/*
var intervalFunc = require('./interval');
var currentDate = new Date().getMinutes();

//1시간마다 날짜가 지났는지 확인
var interval = setInterval(function () {
    var nextDate = new Date().getMinutes();
    console.log("currentDate : " + currentDate);
    console.log("nextDate : " + nextDate);
    if (currentDate == nextDate) {
        console.log("is equal");
    } else {
        console.log("Not equal");
        currentDate = nextDate;
        intervalFunc.check();
    }
}, '3600000');

*/