/**
 * Created by lizhong on 2017/8/15.
 */
var http = require('http');
var url = require('url');
var fs = require('fs');
var sum = 0;
var counter = 0;
var moneyStr = null;
var ave =0;


/*********************************连接数据库准备开始**************************************/
/*与数据库相关*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/xiyou'); //连接一个新的数据库
var connection = mongoose.connection;  //连上返回的值,类似jquery的data
connection.on('error',function(err){
    console.log(err);
})
connection.on('open',function(){
    console.log('we are connected');
})

//建立schema[类似表头]
var hongbaoSchema = new mongoose.Schema({
    name:{type:String},
    num:{type:Number},  //设置默认值
})

var hongbaoModel = mongoose.model('hongbao',hongbaoSchema);  //建立一张红包的表

/*********************************连接数据库准备结束**************************************/




var server = http.createServer(function(req,res){
    var urlStr = req.url;
    var urlObj=url.parse(urlStr,true);
    var name =urlObj.query.userName;
    var moneyNum = +urlObj.query.userNum;
    var pathname = urlObj.pathname;
    console.log(pathname);
    switch(pathname){
        case '/':
            var path = './index.html';
            fs.readFile(path,function(err,data){
                if(err){
                    console.log(err);
                }else{
                    res.end(data);
                }
            })
            break;
        case '/hongbao':
            counter++;
            sum += moneyNum;
            moneyStr =name+ '\t'+ moneyNum;

             //写入数据
             var hongbao = {
                name:name,
                num:moneyNum,
             }
             //使用Model层增加
             hongbaoModel.create(hongbao,function(err,doc){
                 if(err){
                     console.log(err);
                     res.end('出错了');
                 }else{
                     console.log(doc);
                     res.end('增加成功');
                 }
             });
            break;
        case '/ave':
            ave = sum /counter;
            moneyStr = ave;
            //pathWrite(moneyStr,res);
            break;
        default:
            res.statusCode = 404;
            res.end('404,你的页面不小心丢失了!');
    }
}).listen(3000,function(){
    console.log('准备就绪');
})
















