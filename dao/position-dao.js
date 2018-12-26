const {Position} = require("./model.js");

const PositionDao = {
    //添加数据
    add(positionInfo) {
        const positions = new Position(positionInfo);
        return positions.save();
    },
    //查询数据
    find(condition) {     //查找条件
        return Position.find(condition);  
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