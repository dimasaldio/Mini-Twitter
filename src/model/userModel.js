const { DataTypes } = require("sequelize")

module.exports = (sequelize) =>{
    const User = sequelize.define('user', {
        user_id : {
            type : DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type: DataTypes.STRING,
            unique:true,
            isEmail:true,
            allowNull: false
        },
        password : {
            type: DataTypes.STRING,
            allowNull: false
        }
    })

    return User
}