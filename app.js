require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var companyRouter = require('./routes/company');
var credentialsRouter = require('./routes/credentials');
var medicalRouter = require('./routes/medical');
var profilRouter = require('./routes/profil');
var licenseRoute = require('./routes/license');
var license_detailsRoute = require('./routes/license_details');
var rating_detailsRoute = require('./routes/rating_details');
const cors = require('cors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/company', companyRouter);
app.use('/credentials', credentialsRouter);
app.use('/medical', medicalRouter);
app.use('/profil', profilRouter);
app.use('/license', licenseRoute);
app.use('/license_details', license_detailsRoute);
app.use('/rating_details', rating_detailsRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
