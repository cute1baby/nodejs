//数据库里面 会员1位 八戒   111111
var  http= require('http');
//引入url包
var url= require('url');  //解析处理url字符串
var server = http.createServer(function(req,res){
    var urlStr = req.url;

    //获取用户输入的数据
    var urlObj=url.parse(urlStr,true); //参数，字符串  参数：true[按照对象的格式给出]  返回值是一个对象
    console.log(urlObj);
    var userName =urlObj.query.username;
    var password =urlObj.query.password;
    if(userName==="bajie" && password==="111111"){
        res.end('恭喜登陆成功');
    }else{
        res.end('something wrong');
    }
}).listen(8084,function(){
    console.log('服务器开始启动');
})