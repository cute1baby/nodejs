var http= require('http');
//发送请求才会触发这个函数。
var server = http.createServer(function(req,res){
//也是一个回调函数
    res.end('hello'); //结束请求
    console.log(req);
    var urlStr = req.url;  //资源路径
    var method = req.method;  //请求的方法
});

server.listen(3000,function(){
    console.log('server started');  //启动服务器
});
//端口号的解释：端口号可以在0-65535这些数字里面进行选择，类似于门牌号。现在我们设置端口号是3000的意思是现在向服务器询问3000这个端口号有人使用吗？
// 现在我的这个服务需要使用它，我需要用它给别人使用服务。如果申请成功了，给一个回调函数。