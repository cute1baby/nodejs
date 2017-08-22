console.log("helloworld.js");

function test(){
    var a = 0;
    b= 7;  //污染全局变量，作为全局变量的属性。
}
test();
console.log(b); //7
console.log(global.b); //7
