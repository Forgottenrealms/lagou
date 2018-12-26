var express = require('express');
var router = express.Router();
const UserService = require("../services/user-service.js");

//访问/api/users/login.do资源
router.post("/login.do", UserService.login);
//访问/api/users/register.do资源
router.post("/register.do", UserService.register);

module.exports = router;