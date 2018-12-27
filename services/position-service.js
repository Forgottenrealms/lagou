const PositionDao = require("../dao/position-dao.js");

const PositionService = {
    //添加职位
    add(req, res, next) {
        //获取添加的职位数据
        const {user, company, position, salary, address, type, experience} = req.body;

        //如果传了文件
        let logo = "";
        if(req.file) {
            logo = "/imgs/upload/" + req.file.filename;
        }
        console.log(logo)

        PositionDao.add({user, company, position, salary, address, type, experience, logo})
                    .then(data => {
                        res.json({
                            "res_code": 1,
                            "res_error": "",
                            "res_body": {
                              "status": 200,
                              "ret": {
                                "code": 1,
                                "message": "添加成功",
                                "data": data
                              }
                            }
                          });
                    })
                    .catch(err => {
                        res.send({
                            "res_code": 0,
                            "res_error": err,
                            "res_body": {}
                          });
                    });
    },
    //查询条数
    findCount(req, res, next) {
        //获取要查找的用户
        const {user} = req.query;

        PositionDao.findCount({user})
                    .then(data => {
                        res.json({
                            "res_code": 1,
                            "res_error": "",
                            "res_body": {
                                "status": 200,
                                "ret": {
                                "code": 1,
                                "message": "查找成功",
                                "data": data
                                }
                            }
                        });
                    })
    },
    //查找职位
    find(req, res, next) {
        //获取要查找的用户
        const {user, pages} = req.query;

        PositionDao.find({user, pages})    //查找当前用户添加的职位信息
                    .then(data => {
                        console.log(data)
                            if(data.length >= 1) {
                                res.json({
                                    "res_code": 1,
                                    "res_error": "",
                                    "res_body": {
                                      "status": 200,
                                      "ret": {
                                        "code": 1,
                                        "message": "查找成功",
                                        // "data": {
                                        //   "company": data[0].company,
                                        //   "position": data[0].position,
                                        //   "type": data[0].type,
                                        //   "experience": data[0].experience,
                                        //   "salary": data[0].salary,
                                        //   "address": data[0].address
                                        // }
                                        "data": data
                                      }
                                    }
                                })
                            }
                    })
                    .catch(err => {
                        res.send(err);
                    });
    },
    //修改职位
    update(req, res, next) {
        //获取要修改的职位数据
        const {_id, user, company, position, salary, address, type, experience} = req.body;

        //如果传了文件
        let logo = "";
        if(req.file) {
            logo = "/imgs/upload/" + req.file.filename;
        }

        PositionDao.update({_id, user, company, position, salary, address, type, experience, logo})
                    .then(data => {
                        res.json({
                            "res_code": 1,
                            "res_error": "",
                            "res_body": {
                              "status": 200,
                              "ret": {
                                "code": 1,
                                "message": "修改成功",
                                "data": {_id, user, company, position, salary, address, type, experience, logo}
                              }
                            }
                          });
                    })
                    .catch(err => {
                        res.send({
                            "res_code": 0,
                            "res_error": err,
                            "res_body": {}
                          });
                    });
    },
    //删除职位
    delete(req, res, next) {
        //获取要删除的职位id
        const {_id} = req.query;

        PositionDao.delete({_id})
                    .then(data => {
                        res.json({
                            "res_code": 1,
                            "res_error": "",
                            "res_body": {
                              "status": 200,
                              "ret": {
                                "code": 1,
                                "message": "删除成功",
                                "data": {}
                              }
                            }
                          });
                    })
                    .catch(err => {
                        res.send({
                            "res_code": 0,
                            "res_error": err,
                            "res_body": {}
                          });
                    })
    }
};

module.exports = PositionService;