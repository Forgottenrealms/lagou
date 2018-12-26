const UserDao = require("../dao/user-dao.js");

const UserService = {
    //登录
    login(req, res, next) {
        //获取登录的用户名和密码
        const {username, password} = req.body;
        //查看数据库中是否已存在
        UserDao.find({username})
                .then(data => {
                    if(data.length === 1) { //如果用户名存在
                        if(data[0].password === password) {     //如果密码正确
                            res.json({
                                "res_code": 1,
                                "res_error": "",
                                "res_body": {
                                  "status": 200,
                                  "ret": {
                                    "code": 1,
                                    "message": "登录成功",
                                    "data": {
                                      "username": username
                                    }
                                  }
                                }
                            });
                        } else {    //如果密码不正确
                            res.json({
                                "res_code": 1,
                                "res_error": "",
                                "res_body": {
                                  "status": 200,
                                  "ret": {
                                    "code": 0,
                                    "message": "密码有误",
                                    "data": {}
                                  }
                                }
                              });
                        }
                    } else {    //如果用户名不正确
                        res.json({
                            "res_code": 1,
                            "res_error": "",
                            "res_body": {
                              "status": 200,
                              "ret": {
                                "code": -1,
                                "message": "用户名有误",
                                "data": {}
                              }
                            }
                          });
                    }
                })
                .catch(err => {
                    res.send(err);
                });
    },
    //注册
    register(req, res, next) {
        //获取要注册的信息
        const {username, password, email} = req.body;

        UserDao.save({username, password, email})
                .then(data => {
                    res.json({
                        "res_code": 1,
                        "res_error": "",
                        "res_body": {
                          "status": 200,
                          "ret": {
                            "code": 1,
                            "message": "注册成功",
                            "data": {
                              "username": username
                            }
                          }
                        }
                      });
                })
                .catch(err => {
                    res.send(err);
                })
    },
    //退出
    logout(req, res, next) {

    }
}

module.exports = UserService;