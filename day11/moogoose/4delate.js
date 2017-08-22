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

//在model层删除
/*monsterModel.remove({name:'牛魔王'},function(err){
    if(err){
        console.err(err);
    }else{
        console.log('删除成功');
    }
})*/

//在Entity层删除【思路是先在model层找到，然后在Entity层删除】
//此时如果使用的是find方法,返回的数据是一个数组，此时需要小心的几个问题：
/*(1)当没有查询到数据返回空数组的时候,防止报错
(2)当使用docs.remove()的时候,此时的docs很可能是数组而不是对象*/
monsterModel.find({name:'红孩子'},function(err,docs){
    if(err){
        console.err(err);
    }else{
        console.log(docs);
        if(docs.length == 0){
            //[]
        }else{
            docs[0].remove(function(err,docR){
                if(err){
                    console.err(err);
                }else{
                    console.log('元素已经删除');
                    console.log(docR);//指的是内存里面的元素
                    //所以如果误删了之后还可以将内存的值存放在数据库中
                    docDetail.save();
                }
            })  //删除第一个
        }
    }
})
/*而此时是用findOne或者findById效果会好用很多。*/






