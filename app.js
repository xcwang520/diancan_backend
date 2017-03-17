var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');
var dishes = require('./routes/dishes');
var order = require('./routes/order');

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  resave: true, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  secret: 'love'
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
    if (!req.session.user) {
      if(req.url=="/users/login" || req.url=="/users/regist"){
        next();//如果请求的地址是登录则通过，进行下一个请求
      } else {
        res.status(401);
        res.json({
            code: '1',
            msg: '未认证'
        });
      }
    } else if (req.session.user) {
        next();
    }
});

app.use('/', index);
app.use('/users', users);
app.use('/dishes', dishes);
app.use('/order', order);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
