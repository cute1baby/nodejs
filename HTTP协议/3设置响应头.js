var http = require("http");
var serverABC = http.createServer(function serverHandler(req,res){
	//console.log(req);
	//响应报文头部相关信息
    /*res.writeHead(200,'OK',{
		'Content-Type':'text/html; charset=utf-8'
	})*/
    //增加
    res.setHeader('Content-Type','text/html; charset=utf-8');
    //删除
    res.removeHeader('Content-Type');
    //修改
    res.setHeader('Content-Type','text/plain; charset=utf-8');
    var headers =res.getHeader('Content-Type');
    console.log(headers);  //打印出字符编码格式
    res.end("<h1>西游记后传</h1>");

}).listen(3000,function(){
	console.log('开始请求服务');
})
