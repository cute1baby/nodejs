var db = require('../db/db.js');
//这一部分用来存储逻辑代码

function indexPage(req,res){
    var userName = req.session.userName;
    //获取列表数据往页面中注入
    var userID = req.session.userId;
    console.log('userID='+userID);
    db.getItems(userID,function(err,docs){
        if(err){
           res.send('网络错误');
        }else{
            console.log(docs);
            res.render('item_list.ejs',{userName:userName,items:docs});
        }
    });

}
//实现模块化开发
function getLogin(req,res,next){
    /*if(已经登录){
     直接进入主页面
     }else{
     进入登录
     }*/
    var loginState = req.session.loginState;
    var userName = req.session.userName;
    console.log(loginState);
    if(loginState == 'logined'){
        //res.send('亲爱的'+userName+',欢迎回家!');
        //跳转到主页
        //res.render('item_list1.ejs',{userName:userName});
        indexPage(req,res);
    }else{
        console.log('登录');
        res.render('login.ejs',{});
    }
}
module.exports.getLogin = getLogin;

function getRegister(req,res,next){
    var loginState = req.session.loginState;
    var userName = req.session.userName;
    if(loginState == 'logined'){
        res.send('亲爱的'+userName+',欢迎回家!');
    }else{
        //从来没有登录过
        res.render('register.ejs',{});
    }
}
module.exports.getRegister = getRegister;

function postLogin(req,res,next){
    //获得数据
    var userName = req.body.userName;
    var password = req.body.password;
    //console.log(userName,password);
    //处理数据
    //console.log(userName,password);
    //res.send({userName:userName,password:password});  //输出返回用户名和密码
    //返回数据

    //调用函数
    db.findUser(userName,function(err,data){
        if(err){
            console.log(err);
            res.send('网络出现问题');
        }else{
            //一种情况是null,一种情况是object
            if(data){
                if(data.password === password){
                    //在登录成功之前种cookie草莓,周期是7天
                    //默认是session时间
                    //res.cookie('setFavirateName',userName,{expires: new Date(Date.now() + 3600*1000*24*7)});
                    //res.cookie('setFaviratePassword',password,{expires: new Date(Date.now() + 3600*1000*24*7)});
                    req.session.loginState= 'logined';  //记录登录的状态
                    req.session.userName= userName;  //记录登录的用户名
                    //保存成功的时候储存userId
                    req.session.userId= data._id;   //每一个userId都是对应着特定的用户，所以某个特定用户的_id也是定值
                    //res.send('登录成功');
                    //跳转到主页
                    //res.render('item_list1.ejs',{userName:userName});
                    indexPage(req,res);
                }else{
                    res.send('密码不正确');
                }
            }else{
                res.send('该用户不存在,请先去注册');
            }
        }
    })
}
module.exports.postLogin = postLogin;

function postRegister(req,res,next){
    //获得数据
    var userName = req.body.userName;
    var password = req.body.password;
    var passwordConfirm = req.body.passwordConfirm;
    var email = req.body.email;

    //处理数据
    /*if(密码===确认密码){
     if(存在用户){
     //用户已经存在,请更换用户
     }else{
     //重新注册一个用户
     }
     }else{
     确定密码输入错误
     }*/
    //调用函数
    db.findUser(userName,function(err,data){
        if(err){
            console.log(err);
            res.send('网络出现问题');
        }else{
            //一种情况是null,一种情况是object
            if(password === passwordConfirm){  //密码和确认密码相同
                console.log('data=',data);
                if(data){
                    res.send('用户已经存在,请更换用户');
                }else{
                    var userInfo = {
                        userName:userName,
                        password:password,
                        email:email
                    }
                    db.addUser(userInfo,function(err){
                        if(err){
                            console.error(err);
                            res.send('网络错误');
                        }else{
                            res.send('注册成功');
                        }
                    });
                }
            }else{
                res.send('确认密码输入错误,请重新输入');
            }
        }
    })



}
module.exports.postRegister = postRegister;

function getLogout(req,res,next){
    //清除session数据再重新跳转页面。
    req.session.destroy();
    //res.redirect('login.ejs');  //登出之后重定向登录页面
    res.render('login.ejs',{});  //应该是redirect需要满足什么条件的原因。
}
module.exports.getLogout = getLogout;


function posAddItem(req,res,next){
    //获得数据
    var title = req.body.title;
    var userId = req.session.userId;
    console.log(userId);
    //处理数据
    db.addItem(title,userId,function(err){
        if(err){
            res.send('网络错误');
        }else{
            //获取userName
            var userName = req.session.userName;
            //显示首页，刷一遍  返回数据
            //res.render('item_list1.ejs',{userName:userName});
            indexPage(req,res);
        }
    })
}
module.exports.posAddItem = posAddItem;

//设置完成状态
function setFinishState(req,res,next){
    //获得数据
    var itemID = req.params.id;
    var finishState = req.query.state;
    //操作数据
    var state = finishState==='yes'?2:1;  //yes最后的目的是改成2
    db.setItemState(itemID,state,function(err){

        if(err){
            res.send('网络错误');
        }else{
            indexPage(req,res);   //刷新首页
        }
    })
}
module.exports.setFinishState = setFinishState;

function setDeleteState(req,res,next){
    var itemID = req.params.id;
    db.deleteItem(itemID,function(err){
        if(err){
            console.log(err);
            res.send('网络错误');
        }else{
            //刷新页面
            indexPage(req,res);
        }
    })
}
module.exports.setDeleteState = setDeleteState;

//修改页面的跳转
function editTitlePage(req,res,next){
    var itemID = req.params.id;
    db.getItemById(itemID,function(err,doc){
        if(err){
            console.log(err);
            res.send('网路错误');
        }else{
            var userName = req.session.userName;
            var title = doc.title;
            res.render('edit.ejs',{userName:userName,itemID:itemID,title:title});
        }
    })
}
module.exports.editTitlePage = editTitlePage;

//修改页面保存到数据库
function editTitleLogin(req,res,next){
    var itemID = req.params.id;
    var title = req.body.title;
    db.saveEditLogin(itemID,title,function(err){
        if(err){
            console.log(err);
            res.send('网路错误');
        }else{
            //如果成功则刷新首页面
            indexPage(req,res);
        }
    })
}
module.exports.editTitleLogin = editTitleLogin;







