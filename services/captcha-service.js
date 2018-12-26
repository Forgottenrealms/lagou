/* 验证码 */
const svgCaptcha = require("svg-captcha");

const UserService = {
    //生成验证码
    genCode(req, res, next) {
        //创建验证码
        const captcha = svgCaptcha.create({
            color: true,
            noise: 10   //干扰线
        }); 
        // 将生成的验证码文本保存到 session 中
        req.session.captcha = captcha.text;
        //响应
        res.json({
            "res_code": 1,
            "res_error": "",
            "res_body": {
                "status": 200,
                "ret": {
                "code": 1,
                "message": "请求到接口数据",
                "data": {
                    "image": captcha.data
                    }
                }
            }
        });
    },
    //验证
    verify(req, res, next) {
        const {code} = req.query;   //获取get请求中传的验证码输入值
        let valid = false;
        if(code.toUpperCase() === req.session.captcha.toUpperCase()) {  //忽略大小写
            valid = true;
        }
        res.json({
            "res_code": 1,
            "res_error": "",
            "res_body": {
              "status": 200,
              "ret": {
                "code": 0,
                "message": "",
                "data": {
                  "valid": valid
                }
              }
            }
        });
    }
};

module.exports = UserService;