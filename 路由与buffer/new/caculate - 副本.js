//引入各种包
var  http= require('http');
//引入url包
var url= require('url');  //解析处理url字符串
var fs= require('fs');

//创建路由
var server = http.createServer(function(req,res){
    var urlStr = req.url;
    var urlObj=url.parse(urlStr,true);
    console.log(urlObj);
    var firstNun =+urlObj.query.firstNun;
   // var firstNun1 = parseInt(firstNun);
    var secondNun =+urlObj.query.secondNun;
   // var secondNun1 = parseInt(secondNun);

    //路由    url中的文件路径   资源(静态资源，计算资源)
    var pathname=urlObj.pathname;
    var result = 0;
    var str =null;
    switch(pathname){
        case '/add':
            result = firstNun + secondNun;
            str = firstNun +'+'+ secondNun+ '=' +result;

            pathWrite(str,res);
            break;
        case '/sub':
            result = firstNun - secondNun;
            str = firstNun +'-'+ secondNun+ '=' +result;

            pathWrite(str,res);
            break;
        case '/mult':
            result = firstNun * secondNun;
            str = firstNun +'*'+ secondNun+ '=' +result;

            pathWrite(str,res);
            break;
        case '/divi':
            result = firstNun / secondNun;
            str = firstNun +'/'+ secondNun+ '=' +result;

            pathWrite(str,res);
            break;
    }
    res.writeHead(200,'OK',{
        'Content-Type':'text/html; charset=utf-8'
    })
}).listen(8085,function(){
    console.log('服务器开始启动');
})

function pathWrite(str,res){
    var path = './log.txt';
    str +='\n';
    fs.writeFile(path,str,{flag:'a'},function(err){
        if(err){
            console.log(err);
        }else{
            console.log('做完了');
            res.end(str);
        }
    });
}









