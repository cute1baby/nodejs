var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//引入模块
var xiyouji = require('./routes/xiyouji.js');
var shuihu = require('./routes/shuihu.js');
var sanguo = require('./routes/sanguo.js');
var hongloumeng = require('./routes/hongloumeng.js');

var app = express();

// 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 使用包
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//默认是请求根目录，放在请求的最开始
app.use('/',function(req,res,next){
    console.log('有用户进来了，所有的请求都走，并且迎接接下来的四大名著');
    next();
})
//all是全部字符串匹配
//use前导匹配   ||雁过拔毛[就是如果浏览器文件路径/xiyouji/sun,那么他检索之后发现有这部分，那么就把这部分的毛给拔了

//处理西游记
// 剩下的部分就留下了/sun，并且把它导入到xiyouji模块中，此时xiyouji.js就可以通过/su去写路由就能拿到了。]
app.use('/xiyouji',xiyouji);  //跟上面的定义的xiyouji对应起来。

//沙和尚  sa
/*router.get('/xiyouji/sa',function(req,res,next){
    console.log('sa');
    res.send('沙和尚');
})*/

//shuihu   水浒部分
app.use('/shuihu',shuihu);
app.use('/sanguo',sanguo);
app.use('/hongloumeng',hongloumeng);  //使用某一个模块






app.all('/',function(req,res){
    res.end('all请求');
});
var cb1 = function(req,res,next){
    console.log('返回回调函数cb1给你');
    var obj = {
        'hongbao':'给你一个大红包'
    }
    res.send(obj);
    next();
}
var cb2 = function(req,res,next){
    res.end('返回回调函数cb2给你');
    console.log('返回回调函数cb1给你');
    next();
}
app.get('/hongbao',[cb1,cb2],function(req,res,next){
    res.end('返回hongbao给你');
    console.log(111);
    next('route'); //跳过某些路径，那么222,333以及后面的就不会被打印了。但是555却会打印
},function(req,res,next){
    res.end('返回hongbao333给你');
    console.log(222);
    next();
},function(req,res,next){
    res.end('返回hongbao444给你');
    console.log(333);
    next();
});
//其实累类似于把所有的路由路径都放在一个数组里面。
//如果上面有一个next,那么在同端点下的555函数也会执行的。
app.get('/hongbao',function(req,res){
    console.log(555);
})
//重定向到一个新的路径
app.get('/zuocai',function(req,res){
    console.log('做菜重定向');
    res.redirect('/hongbao');
})
//用通配符匹配404页面
app.all('*',function(req,res){
    res.end('404 not defined!');
});



// 所有错误文件的处理


module.exports = app;
