var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));  //设置views的路径。
app.set('view engine', 'ejs');  //设置模板引擎，jade比较难，所以选择ejs

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.get('/',function(req,res,next){
    app.render('index.ejs',{});  //重绘页面,插入空内容
})
//use   1、处理中间件    2、导入路由模块
//all   1、处理404的请求
//get   1、专门用来处理get逻辑
/*app.get('/hongbao',function(req,res,next){
  //1、获得用户的数据   2、处理数据    3、返回响应
    var name = req.query.name;  //查询对象
    var moneyNum = req.query.moneyNum;
    console.log(name , moneyNum);

    res.send('已经进入数据库');
})*/
app.post('/hongbao',function(req,res,next){
 //1、获得用户的数据   2、处理数据    3、返回响应
 var name = req.body.name;  //请求体里面的查询
 var moneyNum = req.body.moneyNum;
 console.log(name , moneyNum);
 //通过重定向的方法
    //res.redirect('/result.html');
    //render:渲染,画图的意思,生成html之后自动发给浏览器
    //第一个参数：页面的位置
    //第二个参数：数据,按照名值对的方式给出
    //res.render('test.ejs',{name:'yu',position:['李钟','万鹏','中医','黄票','东方boy']});


    //1、准备模板【由html生成了ejs】

    //2、准备数据
    var dataResult ={
        userName:name,
        moneyNum:moneyNum
    }
    //3、渲染并且发送给服务器
    res.render('result.ejs',dataResult);
 })
//自定义的一个路径
app.get('/test',function(req,res,next){
    res.render('test.ejs',{name:'yu',position:['李钟','万鹏','中医','黄票','东方boy']});
})

// catch 404 and forward to error handler[处理网页404的情况]
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler[处理所有的错误]
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
