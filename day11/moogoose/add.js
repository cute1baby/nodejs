//引入
var mongoose = require('mongoose');
//连接
mongoose.connect('mongodb://127.0.0.1:27017/xiyou'); //连接一个新的数据库

var connection = mongoose.connection;  //连上返回的值,类似jquery的data
//当...的时候
connection.on('error',function(err){
    console.log(err);
})
connection.on('open',function(){
    //we are connected!
    console.log('we are connected');
})



//建立schema[类似表头]
var monsterSchema = new mongoose.Schema({
    name:{type:String},
    age:{type:Number,default:21},  //设置默认值
    address:String,
    skill:String,
    gender:Number   //性别  男:1,女:2

})


//增加
//创建Model[代理人]
//两个参数：一个是表名称，一个是schema结构.
var monsterModel = mongoose.model('monster',monsterSchema);
//创建数据并且写入数据

//写入数据   //model层写入数据   //entity写入数据
var niu = {
    name:'牛魔王',
    address:'火焰山',
    skill:'发狠',
    gender:1
}
var hong = {
    name:'红孩子',
    address:'火焰山',
    skill:'发火',
    gender:1
}
/*monsterModel.create(niu,function(err,doc){
    if(err){
        console.log(err);
    }else{
        console.log(doc);  //此时的doc是entity对象
    }
});*/

//创建一个实例，内存里面的一个对象
var  niuEntity = new monsterModel(niu);  //用模具造人

//异步io
niuEntity.save(function(){
    //这样就能保证放进去之后再回调中执行。
    console.log('牛魔样已经放进数据库了');
//保证先有牛后有孩儿。
    var  hongEntity = new monsterModel(hong);
    hongEntity.save();
});  //假定需要5分钟，但是下面的代码很快就执行了


//这里的运行是：
/*如果红孩子和牛魔王都是在同一级，那么在上面的先发出请求，
但是谁先存入数据库谁也不知道，因为都是异步的。
所以为了保证红孩子在牛的后面，就把红孩写在牛的回调函数里面。*/

