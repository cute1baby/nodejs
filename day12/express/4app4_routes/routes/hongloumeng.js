var express = require('express');
var router =  express.Router();

// dai   黛玉
router.get('/dai',function(req,res,next){
    console.log('黛玉');
    res.send('黛玉');
})
// bao   宝钗
router.get('/bao',function(req,res,next){
    console.log('宝钗');
    res.send('宝钗');
})



module.exports = router;