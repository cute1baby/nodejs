var fs = require('fs');

var fillPath = './log.txt';
var data1 = '1宋海古国有一个石头，石猴出事\n';
var data2 = '2第二天,被如来给丫山下了\n';  //数据名称没有变化,内容变化会出现覆盖
var data3 = '3如果我有一个小苹果，那么我会的肯定特别多\n';
//提倡这种方法

//按照步骤执行
//异步写文件
fs.writeFile(fillPath,data1,{flag:'a'},function (err,data){
    console.log('数据1写完之后,才会打印');
    fs.writeFile(fillPath,data2,{flag:'a'},function (err,data){
        console.log('数据2写完之后,才会打印');
        fs.writeFile(fillPath,data3,{flag:'a'},function (err,data){
            console.log('数据3写完之后,才会打印');
        })
    })
})

