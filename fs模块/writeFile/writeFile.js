var fs = require('fs');

var fillPath = './log.txt';
//var data = '宋海古国有一个石头，石猴出事\n';
//var data = '第二天,被如来给丫山下了\n';  //数据名称没有变化,内容变化会出现覆盖
var data = '如果我有一个小苹果，那么我会的肯定特别多\n';
//异步写文件
fs.writeFile(fillPath,data,{flag:'a'},function (err,data){
    if(err){
        console.error(err);
    }else{
        console.log('数据写完之后,才会打印');
    }
})