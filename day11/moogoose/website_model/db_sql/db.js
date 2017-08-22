
//只处理数据库的内容
/*********************************连接数据库准备开始**************************************/
/*与数据库相关*/
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/xiyou'); //连接一个新的数据库
var connection = mongoose.connection;  //连上返回的值,类似jquery的data
connection.on('error',function(err){
    console.log(err);
})
connection.on('open',function(){
    console.log('we are connected!');
})

//建立schema[类似表头]
var hongbaoSchema = new mongoose.Schema({
    name:{type:String},
    num:{type:Number},  //设置默认值
})

var hongbaoModel = mongoose.model('hongbao',hongbaoSchema);  //建立一张红包的表

/*********************************连接数据库准备结束**************************************/

function setDB (hongbao,res){
    //使用Model层增加
    hongbaoModel.create(hongbao,function(err,doc){
        if(err){
            console.log(err);
            res.end('出错了');
        }else{
            console.log(doc);
            res.end('增加成功');
        }
    });
}

exports.setDB= setDB;
