/*
var buf = new Buffer(20);  //借黑板
console.log(buf);
buf.fill(0);   //檫黑板，去除内存内容
console.log(buf);

buf = null;   //垃圾回收机制，把黑板还回去

*/

/*---------------------------------------------------------*/
var buf = new Buffer('I love you');
console.log(buf);
console.log(buf.toString());  //转成字符串
//这里赋值为4a是因为i对应的49+1=4a,对应的是j
buf[0] = 0x4a;  //0x表示16进制数
console.log(buf);    //类似数组的类型。
console.log(buf.toString());  //
console.log(buf.length);  //字符长度










