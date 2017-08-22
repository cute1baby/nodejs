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
    gender:Number   //性别  男:1,女:
})


//增加
//创建Model[代理人]
//两个参数：一个是表名称，一个是schema结构.
var monsterModel = mongoose.model('monster',monsterSchema);
//创建数据并且写入数据
/*testModel.create({
    name:'路人甲',
    age:20,
    address:'猪刚鬣老宅'
});*/
var xiaoyao = {
    name:'路人甲',
    age:20,
    address:'猪刚鬣老宅',
    skill:'说谎',
    gender:1
}
var xiaoyao2 = {
    name:'路人甲',
    address:'猪刚鬣老宅',
    skill:'说谎',
    gender:1
}   //此时不需要自动填充依然能够使用默认值
//monsterModel.create(xiaoyao2);



//建立Entity
var monsterEntity = new monsterModel(xiaoyao2);  //模型的实例，就是一个个的人
//此时还只在内存中，还没有映射到数据库中。

monsterEntity.save();   //存入数据库



