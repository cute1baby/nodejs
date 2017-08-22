var mongoose = require('mongoose');
//mongodb
mongoose.connect('mongodb://127.0.0.1:27017/xiyou');

var connection = mongoose.connection;

connection.on('error',function(err){
    console.log(err);
})
connection.on('open',function(){
    console.log('we are connected');
})

//三剑客schema,model,entity
//创建表头
var monsterSchema = new mongoose.Schema({
    name:{type:String},
    age:{type:Number,default:21},  //设置默认值
    address:String,
    skill:String,
    gender:Number   //性别  男:1,女:
})

//创建一个model
var monsterModel = mongoose.model('monster',monsterSchema);

/*
* 上面的格式对于添加和查询来说【创建Schema和model】
* */


//查询有关牛魔王的数据
/*monsterModel.find({name:'牛魔王'},{_id:1,name:1},function(err,docs){
    if(err){
        console.log(err);
    }else{
        console.log(docs);  //数组符合条件所有的元素
        var result = docs[0];  //拿到第一条数据
    }  //没有返回条件的返回空数组
})*/
//查询名字叫做牛魔王的第一条数据
/*monsterModel.findOne({name:'牛魔王'},{_id:1,name:1},function(err,docs){
    if(err){
        console.error(err);
    }else{
        console.log(docs);  //不存在时返回null
         //拿到第一条数据
    }
})*/

//通过_id查找符合条件的
/*monsterModel.findById('5992f46b9d767826484269ed',{_id:1,name:1},function(err,docs){
    if(err){
        console.error(err);
    }else{
        console.log(docs);  //返回的是entity对象
       //如果没有找到则返回null
    }
})*/




