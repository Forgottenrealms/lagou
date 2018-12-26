var express = require('express');
var router = express.Router();
const UserService = require("../services/captcha-service.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//get 请求"/api/captcha/gen"下的资源，生成验证码
router.get("/captcha/gen", UserService.genCode);

//get 请求"/api/captcha/verify"下的资源，校验验证码
router.get("/captcha/verify", UserService.verify);

module.exports = router;
