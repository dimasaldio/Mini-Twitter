const { DataTypes, UUIDV4 } = require("sequelize")

module.exports = (sequelize) =>{
    const Like = sequelize.define('like', {
        like_id : {
            type : DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            primaryKey : true
        },
        authorLike : {
            type : DataTypes.STRING,
            allowNull : false
        },
        post : {
            type : DataTypes.STRING,
            allowNull : false
        },
        like : {
            type : DataTypes.BOOLEAN,
            allowNull:false
        }
    })

    return Like
}