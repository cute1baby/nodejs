var http=require('http');
var reds=http.createServer(function(req,res){
    res.writeHead(200,'OK',{
        'Content-Type':'text/html; charset=utf-8'
    })
	res.write('<h1>hello worlddeggr</h1>');
	console.log('someThing has been');
    res.write('<h1>我就是你的超级英雄</h1>');
	res.end('<p>this is my first learn</p>');
})
reds.listen(8082,function(){
	console.log("1111");
});



/*var http = require('http');
http.createServer(function(req, res){
 res.writeHead(200, {'Content-type' : 'text/html'});
 res.write('<h1>Node.js</h1>');
 res.end('<p>Hello World</p>');
}).listen(3000);*/