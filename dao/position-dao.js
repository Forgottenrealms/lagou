const {Position} = require("./model.js");

const PositionDao = {
    //添加数据
    add(positionInfo) {
        const positions = new Position(positionInfo);
        return positions.save();
    },
    //查询数据条数
    findCount(condition) {
        return Position.find(condition).count();
    },
    //查询数据
    find(condition) {     //查找条件
        const {user, pages} = condition;
        return Position.find({user}).limit(10).skip((pages - 1) * 10);  
    },
    //修改数据
    update(positionInfo) {
        return Position.update({_id: positionInfo._id}, positionInfo);
    },
    //删除数据
    delete(id) {
        return Position.deleteOne({_id: id});
    }
};

module.exports = PositionDao;