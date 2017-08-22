var fs = require('fs');
var filePath = './logSync.txt';
var data1 = '如果我有一个小苹果，那么我会的肯定特别多\n';
var data2 = '如果我有两个小苹果，那么我会的肯定特别多\n';
var data3 = '如果我有三个小苹果，那么我会的肯定特别多\n';
//写同步文件,按照顺序执行
fs.writeFileSync(filePath,data1,{flag:'a'});
fs.writeFileSync(filePath,data2,{flag:'a'});
fs.writeFileSync(filePath,data3,{flag:'a'});










