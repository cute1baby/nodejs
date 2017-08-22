var express = require('express');
var router = express.Router();
//曹操   cao
router.get('/cao',function(req,res,next){
    console.log('曹操');
    res.send('曹操');
})

//关羽   guan
router.get('/guan',function(req,res,next){
    console.log('关羽');
    res.send('关羽');
})

module.exports = router;