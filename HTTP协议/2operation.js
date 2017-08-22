var http = require('http');

//创建服务
//只有发送请求的时候才会执行这个函数serverCreate
var server = http.createServer(function serverCreate(req,res){
	//console.log(req);
	var urlStr = req.url;
	var method = req.method;
	console.log(req.url,req.method);

	res.write('dfsdfgg \n');  //普通的返回数据方式
	

	res.end('hello world ');  //结束本次访问，同时把数据返回回去。


}).listen(3000,function(){
	//在webstorm里面直接run一下就会向服务器请求3000的端口
	console.log('服务器开始监听');
});

//3分钟之后关闭服务器
setTimeout(function(){
	server.close(function(){
		console.log('服务器关闭');
	})
},1000*60*3)