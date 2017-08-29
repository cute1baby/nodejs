//创建数据库并且将注册信息导入到数据库
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todoList');
var connection = mongoose.connection;
connection.on('error',function(err){
    console.log('error');
})
connection.on('open',function(){
    console.log('mongodb connected');  //连上了就会打印它
})
var userSchema = new mongoose.Schema({
    userName:{type:String},
    password:{type:String},
    registerDate:{type:Date,default:Date.now()},
    email:String
})
//建立model
var userModel = mongoose.model('user',userSchema);

//这是数据库方法
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
/* var obj1 = {
     userName:'李仁',
     password:'11111111',
     email:'1138724604@qq.com'
 }
 addUser(obj1,function(err){

 });*/


/******************列表新增事项******************************/
//建立一个item模板
var itemSchema = new mongoose.Schema({
    userID:{type:String},
    title:{type:String},
    post_Data:{type:Date},
    finish_state:{type:Number,default:1}  //表示未完成
})
//建立model
var itemModel = mongoose.model('item',itemSchema);
//存储入表格中
function addItem(title,userId,callback){
    var obj ={
        userID:userId,
        title:title,
        post_Data:Date.now()
        //finish_state:{type:String,default:1}
    }
    itemModel.create(obj,function(err){
        if(err){
            callback(err);  //传给其他部分去查询
        }else{
            callback(null);
        }
    });
}

module.exports.addItem = addItem;

//从数据库里面获取item数组值
function getItems(userID,callBack){
    //在数据库中查数据
    itemModel.find({userID:userID},function(err,docs){
        if(err){
            callBack(err);
        }else{
            callBack(null,docs);
        }
    })
}
module.exports.getItems = getItems;

//设置item的状态
function setItemState(itemID,state,callBack){
    itemModel.findById(itemID,function(err,doc){
        if(err){
            callBack(err);
        }else{
            console.log(111);
            //查出来是一个对象而不是数组
            doc.finish_state = state;  //state指的是将要变成的状态
            doc.save(function(){   //异步IO
                callBack(null);
            });  //写进到数据库
        }
    })
}
module.exports.setItemState = setItemState;

function deleteItem(itemID,callBack){
    itemModel.findById(itemID,function(err,doc){
        if(err){
            callBack(err);
        }else{
            doc.remove(function(err){
                if(err){
                    callBack(err);
                    res.send('网络错误');
                }else{
                    callBack(null);
                }
            });
        }
    })
}
module.exports.deleteItem = deleteItem;

//修改页面的跳转
function getItemById(itemID,callBack){
    itemModel.findById(itemID,function(err,doc){
        if(err){
            callBack(err);
        }else{
            callBack(null,doc);
        }
    });
}
module.exports.getItemById = getItemById;

//修改页面的保存
function saveEditLogin(itemID,title,callBack){
    itemModel.findById(itemID,function(err,doc){
        if(err){
            callBack(err);
        }else{
            doc.title = title;
            doc.save(function(err){
                if(err){
                    callBack(err);
                }else{
                    callBack(null,doc);
                }
            });
        }
    });
}
module.exports.saveEditLogin = saveEditLogin;