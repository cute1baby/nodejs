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
 * 上面的格式对于添加和查询来说【创建Schema和model】*
 * */

/*Model层的修改*/
monsterModel.update({name:'红孩子'},{$set:{age:19}},function(err){
    if(err){
       console.err(err);
    }else{
        console.log('修改完成了');
    }
})


//entity层
monsterModel.findById('59931042b92c031ffcd85711',function(err,docs){
    if(err){
        console.err(err);
    }else{
        console.log(docs);
        docs.age = 36;  //修改对象的key值,但是只修改了内存的值
        docs.save(function(err,docR){  //将修改的值存储进入数据库里
            if(err){
                console.err(err);
            }else{
                console.err('修改并且存储陈成功');
                console.err(docR); //内存的值,此时已经是修改的值
            }
        });
    }
})