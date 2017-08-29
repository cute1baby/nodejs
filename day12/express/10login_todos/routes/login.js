var router = require('express').Router();
//var db = require('../db/db.js');
var logic = require('../bussiness_logic/bussiness_logic.js');

//登录
router.get('/login',logic.getLogin);
//注册
router.get('/register',logic.getRegister);

//登录
router.post('/login',logic.postLogin);

//注册
router.post('/register',logic.postRegister);


//登出(实质是删除session)
router.get('/logout',logic.getLogout);

//listTodo存储到数据库
//添加待办事项
router.post('/addItem',logic.posAddItem);

//设置完成状态
//     /finish/<%= item._id %>/?state=no
router.get('/finish/:id',logic.setFinishState);

//删除 item
// /delete/<%= item._id %>
router.get('/delete/:id',logic.setDeleteState);
module.exports = router;

//修改 item
// /edit/<%= item._id %>
router.get('/edit/:id',logic.editTitlePage);

//修改 item保存到数据库中
// /edit/<%= item._id %>
router.post('/edit/:id',logic.editTitleLogin);