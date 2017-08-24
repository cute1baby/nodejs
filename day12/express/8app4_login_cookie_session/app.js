var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');  //引入中间件

var loginModule = require('./routes/login_restry.js');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
    resave:true,  //再一次存储，强制存到sessionStore
    saveUninitialized:false,   //强制进行存储【不】
    secret:'lizhong'      //对数据进行加密的字符串
}));  //引入expressSession
app.use(express.static(path.join(__dirname, 'public')));

app.get('/shezhi',function(req,res,next){
    console.log(req.session);
    req.session.name='llllllll';
    console.log(req.session);
    console.log(req.sessionID);
    res.end('rty');
    next();
})
app.get('/jiacha',function(req,res,next){
    console.log(req.session);
    console.log(req.sessionID);
    res.end('rty');
    next();
})

app.all('/add',function(req,res,next){
    console.log(req.session);
    req.session.name = 'wukong';
    console.log(req.session);
    console.log(req.sessionID);
    res.end(1111);
    //next();
})

app.use('/', loginModule);
//app.use('/users', users);


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
  //res.render('error');
});

module.exports = app;
