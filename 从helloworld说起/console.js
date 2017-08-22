console.log('aaa');

var obj={
    name:'wukong',
    age:12
};
console.log('info:'+ obj.toString()); //如果是拼串中的对象，他会默认的调用toString()方法
console.log('info:',obj);

//管道1
console.log("aaa");
console.info("bbb"); //log和info互为别名
//管道2
console.warn("ccc");
console.error("ddd"); //warn和error互为别名
function ccc(){
    console.trace("出错了，你看");
}
function BBB(){
    ccc();
}
function AAAA(){
    BBB();
}
AAAA();


console.time('timewwww');
var i = 0;
while(true){
    i++;
    if(i>100000){
        break;
    }
}
console.timeEnd('timewwww'); //time和timeEnd是成对出现的，用来判断这段代码一共耗费多长的时间。