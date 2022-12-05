const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    const Content = sequelize.define('content', {
        content_id : {
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull : false,
            primaryKey : true
        },
        author : {
            type : DataTypes.STRING,
            allowNull : false
        },
        content : {
            type : DataTypes.STRING,
            allowNull : false
        },
        isRetweeting :{
            type:DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        },
        retweetCounted :{
            type:DataTypes.INTEGER,
            allowNull :false,
            defaultValue : 0
        },
        likeCounted :{
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        },
        replyCounted :{
            type:DataTypes.INTEGER,
            allowNull : false,
            defaultValue : 0
        },
    })

    return Content
}