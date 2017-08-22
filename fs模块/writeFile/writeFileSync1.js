var fs = require('fs');
var filePath = './logSync.txt';
var data1 = '如果我有一个小苹果，那么我会的肯定特别多\n';
//写同步文件,按照顺序执行
console.log('before');
try{
    fs.writeFileSync(filePath,data1,{flag:'r'});
}catch(err){
    console.log(err);
}

console.log('after');










