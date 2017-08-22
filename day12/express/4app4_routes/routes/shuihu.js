var express = require('express');  //引入express模块
var router = express.Router();  //使用路由模块

//song  宋江
router.get('/song',function(req,res,next){
    console.log('我是宋江');
    res.send('宋江');
})

//wu  武松
router.get('/wu',function(req,res,next){
    console.log('我是武松');
    res.send('武松');
})




module.exports = router;   //将路由模块暴露出来