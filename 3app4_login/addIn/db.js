//创建数据库并且将注册信息导入到数据库
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/login');
var connection = mongoose.connection;
connection.on('error',function(err){
    console.log('error');
})
connection.on('open',function(){
    console.log('mongodb connected');  //连上了就会打印它
})
var userSchema = new mongoose.Schema({
    userName:{type:String},
    password:{type:String}
})
//建立model
var userModel = mongoose.model('user',userSchema);

//用户查询
function findUser(userName,callback){
    //只进行查询
    userModel.findOne({userName:userName},function(err,doc){
        if(err){
            callback(err);
        }else{
            callback(null,doc);
        }
    });
}
//暴露函数
module.exports.findUser = findUser;

//添加用户
//回调函数设计原则：有回调函数，只调用一次；回调函数必须被传入。
function addUser(userInfo,callback){
    userModel.create(userInfo,function(err){
        if(err){
            callback(err);  //传给其他部分去查询
        }else{
            callback(null);
        }
    });
}


module.exports.addUser = addUser;
/*
var obj1 = {
    userName:'wukong',
    password:'123456'
}
addUser(obj1,function(){

});*/
