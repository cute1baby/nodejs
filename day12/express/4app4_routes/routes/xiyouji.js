//模块化【西游记】
var express = require('express');
var router = express.Router(); //生成router对象

//   /sun
router.get('/sun',function(req,res,next){
    console.log('sun');
    res.send('孙悟空');
})
//   /zhu  猪八戒
router.get('/zhu',function(req,res,next){
    console.log('zhu');
    res.send('猪八戒');
})

module.exports = router;