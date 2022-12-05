const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    const Retweet = sequelize.define('retweet', {
        retweet_id : {
            type : DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            allowNull:false,
            primaryKey : true
        },
        authorRetweet : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        post : {
            type : DataTypes.STRING,
            allowNull : false
        },
        retweet : {
            type : DataTypes.BOOLEAN,
            allowNull:false
        }
    })

    return Retweet
}