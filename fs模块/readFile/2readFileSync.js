var fs =require('fs');
var filePath= './content.txt';
//同步读取文件；
console.log('before');
var data = fs.readFileSync(filePath);   //通知操作系统去读取文件,在读取文件的这段时间里。代码不在向下解析了，而是等到把文件都读取完成之后才读取下面的信息。

try{
    //逻辑代码
    console.log(data);
    console.log(data.toString());
}catch(err){
    //错误处理，不会阻塞
    console.log(err);
    console.log('我会把上面的错误给抓住，想要抛出给上级操作系统，没给你抛出，在这里就直接给抓获了');
}

console.log('after,我喊一嗓子花5ms,解读数据用了1000ms.一共用了1005ms');
//内部的读取机制：






