var router = require('express').Router();
var db = require('../addIn/db.js');

router.get('/login',function(req,res,next){

    //对模板页面进行操作
    //查看当前用户的session是否有记录登录的信息
    var loginState= req.session.loginState;
    var userName= req.session.userName;
    if(loginState ==='logined'){
        //显示个性化界面
        res.send(userName+'欢迎你,登录成功');
    }else{
        console.log(11111);
        //从来没有登陆过
        res.render('login',{});   //向ejs文件插入数据
    }
})



//对应login.html中的post请求已经action的值的映射
router.post('/login',function(req,res,next){
    //准备数据
    var userName = req.body.userName;
    var password = req.body.password;
    console.log(userName,password);
    //处理数据
    //拿用户名去数据库查询
    //用汉语叙述逻辑 --> 逻辑翻译成伪代码 -->写成js代码
    /*if(用户名存在){
        if(密码匹配){
            返回登录成功
        }else{
            返回登录失败
        }
    }else{
        返回用户名不存在，请前往注册
    }*/
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
                    res.cookie('setFavirateName',userName,{expires: new Date(Date.now() + 3600*1000*24*7)});
                    res.cookie('setFaviratePassword',password,{expires: new Date(Date.now() + 3600*1000*24*7)});
                    req.session.loginState= 'logined';  //记录登录的状态
                    req.session.userName= userName;  //记录登录的状态
                    res.send('登录成功');
                }else{
                    res.send('密码不正确');
                }
            }else{
                res.send('该用户不存在,请先去注册');
            }
        }
    })
})

module.exports = router;