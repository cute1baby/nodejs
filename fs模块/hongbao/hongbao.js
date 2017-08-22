var http = require('http');
var url = require('url');
var fs = require('fs');
var sum = 0;
var counter = 0;
var moneyStr = null;
var ave =0;

var server = http.createServer(function(req,res){
    var urlStr = req.url;
    var urlObj=url.parse(urlStr,true);
    var name =urlObj.query.name;
    var moneyNum = +urlObj.query.moneyNum;
    //console.log(urlObj);
	var pathname = urlObj.pathname;
    switch(pathname){
		case '/hongbao':
			counter++;
			sum += moneyNum;
            moneyStr =name+ '\t'+ moneyNum;
		    pathWrite(moneyStr,res);
			break;
		case '/ave':
            ave = sum /counter;
            moneyStr = ave;
            pathWrite(moneyStr,res);
			break;
		default:
			res.statusCode = 404;
			res.end('404,你的页面不小心丢失了!');
	}
	res.end('love');
}).listen(3000,function(){
	console.log('准备就绪');
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