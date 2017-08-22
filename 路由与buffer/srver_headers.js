var http = require('http');
var server =http.createServer(function serverHandler(req,res){
    //获取用户的输入     文件路径
    var urlStr = req.url;
    //console.log(urlStr);
/*
    '/'        //首页   领先的web结束教程
    '/html/index.asp'   //html   html教程
    '/html/html_intro.asp'   //介绍    html简介
*/

    //路由 由路径找到资源 router
    switch(urlStr){
        case '/':
            res.writeHead(200,'OK',{
                'Content-Type':'text/html; charset=utf-8'
            })
            res.write('首页   领先的web结束教程');
            break;
        case '/html/index.asp':
            res.writeHead(200,'OK',{
                'Content-Type':'text/html; charset=utf-8'
            })
            res.write('html   html教程');
            break;
        case '/html/html_intro.asp':
            res.writeHead(200,'OK',{
                'Content-Type':'text/html; charset=utf-8'
            })
            res.write('介绍    html简介');
            break;
        default:
            res.writeHead(404,'not found',{
                'Content-Type':'text/html; charset=utf-8'
            })
            res.write('404 真不巧，你要的网页丢失了');
    }
    res.end("");


}).listen(8081,function(){
    console.log("server start");
})