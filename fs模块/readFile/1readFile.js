var fs = require('fs');

//file path          绝对路径  相对路径
var filePath = './content.txt';
console.log('before');
//告诉系统去读取filePath这个路径下的文件
fs.readFile(filePath,function (err,data){
    if(err){
        console.error(err);
        console.log('系统出现错了，快打电话给工作人员');
    }else{
        console.log('reading...,我喊一嗓子花5ms,解读数据用了1000ms.一共用了1005ms');
        console.log(data);
        console.log(data.toString());
    }

});
console.log('after,我喊一嗓子花5ms,一共用了1005ms');

//执行顺序：before    after   reading...