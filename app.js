var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Connect To Database
const config = require('./config/database');

mongoose.Promise = global.Promise;

mongoose.connect(config.database, function(err){
    if(err){
        console.error("Error! " + err);
    }
});


// Body Parser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(cors());

var indexRouter = require('./routes/index');
var users = require('./routes/users');
var contrat = require('./routes/contrat');
//var activiteRouter = require('./routes/activite');
//var leaveRequestRouter = require('./routes/leaveRequest');
//var listLeaveRouter = require('./routes/listLeave');
//var profileRouter = require('./routes/profile');
//var updatePasswordRouter = require('./routes/updatePassword');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', users);
app.use('/contrat', contrat);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
