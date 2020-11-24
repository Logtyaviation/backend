require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var companyRouter = require('./contexts/company/routes/company');
var credentialsRouter = require('./contexts/credentials/routes/credentials');
var medicalRouter = require('./contexts/medical/routes/medical');
var profileRouter = require('./contexts/profile/routes/profile');
var licenseRoute = require('./contexts/license/routes/license');
var accountRouter = require('./contexts/account/routes/account');


var session = require('express-session')

const cors = require('cors');

 


var app = express();

app.use(cors({credentials: true, origin: 'http://localhost:5000'}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  if (req.method === "OPTIONS") {
      return res.status(200).end();
  } else {
      next();
  }
});

app.use(cookieParser());

app.set('trust proxy', 1) // trust first proxy
const expiryDate = 60*60*1000*24 // 24 hours
app.use(session({
  name: 'logty-session',
  secret: 'asbaflux',
  cookie: {
    // secure: false,
    // httpOnly: true,
    expires: expiryDate
  },
  // resave: false, 
  // saveUninitialized: false
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/company', companyRouter);
app.use('/credentials', credentialsRouter);
app.use('/medical', medicalRouter);
app.use('/profile', profileRouter);
app.use('/license', licenseRoute);
app.use('/account', accountRouter);

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
