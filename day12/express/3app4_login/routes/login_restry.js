var router = require('express').Router();
var db = require('../addIn/db.js');
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