var express = require('express');
var router = express.Router();
const PositionService = require("../services/position-service.js");
const path = require("path");

//引入multer中间件
const multer = require("multer");
//配置磁盘存储
var storage = multer.diskStorage({
    // 存储在服务器上的目标目录
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, "../public/imgs/upload/"));
    },
    // 存储的文件命名规则
    filename: function(req, file, cb) {
        // file.fieldname：文件在表单中的文件域元素名称
        // file.originalname：在用户电脑中文件的名称
        const start = file.originalname.lastIndexOf("."); // 最后一个 . 的位置
        const ext = file.originalname.slice(start); // 从最后一个 . 截取到字符串末尾，作为文件的后缀名
        cb(null, file.fieldname + '-' + Date.now() + ext);
    }
});
var upload = multer({storage: storage});


// POST 请求 访问/api/positions/add.do资源
router.post("/add.do", upload.single("logo"), PositionService.add);
// POST 请求 访问/api/positions/update.do资源
router.post("/update.do", upload.single("logo"), PositionService.update);
// GET 请求 访问/api/positions/findCount.do资源
router.get("/findCount.do", PositionService.findCount);
// GET 请求 访问/api/users/find.do资源
router.get("/find.do", upload.single("logo"), PositionService.find);
// GET 请求 访问/api/users/delete.do资源
router.get("/delete.do", PositionService.delete);

module.exports = router;