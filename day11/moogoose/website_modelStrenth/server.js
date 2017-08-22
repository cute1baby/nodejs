/**
 * Created by lizhong on 2017/8/15.
 */
/*做成模块化，各司其职进行工作*/
var http = require('http');
var url = require('url');
var fs = require('fs');

//引入存入数据库的模块
var sqlData = require('./db_sql/db.js');  //require应该放在头部,一般不放在逻辑代码里,在上面是同步执行的

var sum = 0;
var counter = 0;
var moneyStr = null;
var ave =0;


var server = http.createServer(function(req,res){
    var urlStr = req.url;
    var urlObj=url.parse(urlStr,true);
    var name =urlObj.query.userName;
    var moneyNum = +urlObj.query.userNum;
    var pathname = urlObj.pathname;
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
            sqlData.setDB(hongbao,function(err,result){
                if(err){
                    res.end(err);
                    console.log('给用户看到的时候假装网络错误');
                }else{
                    //此时返回的是一个对象，要想展示在网页上必须要是字符串或者Buffer.不然会报错
                    var resultStr = JSON.stringify(result);
                    res.end(resultStr);
                    console.log('数据已经发过来了');
                }
            });  //调用暴露出来的方法


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
















