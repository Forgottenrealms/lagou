const {User} = require("./model.js");

const UserDao = {
    //保存数据
    save(userinfo) {
        const user = new User(userinfo);
        return user.save();
    },
    //查询数据
    find(condition) {
        return User.find(condition);
    }
};

module.exports = UserDao;