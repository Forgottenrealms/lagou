//引入mongoose模块
const mongoose = require("mongoose");

//连接数据库
mongoose.connect('mongodb://localhost:27017/lagou');

// 创建用户 Schema（数据结构）
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
});
// 创建用户模型 Model（相当于根据数据结构创建表: 在 mongodb 中创建 users 集合）
const User = mongoose.model('user', userSchema);

// 创建职位 Schema（数据结构）
const positionSchema = new mongoose.Schema({
    logo: String,
    user: String,
    company: String,
    position: String,
    salary: String,
    address: String,
    type: String,
    experience: String
});
// 创建职位模型 Model（相当于根据数据结构创建表: 在 mongodb 中创建 users 集合）
const Position = mongoose.model('position', positionSchema);

const Model = {User, Position};

module.exports = Model;