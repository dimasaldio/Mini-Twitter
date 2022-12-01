module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define('user', {
        user_id : {
            type : Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull : false,
            primaryKey : true
        },
        name : {
            type : Sequelize.STRING,
            allowNull : false
        },
        email : {
            type: Sequelize.STRING,
            unique:true,
            isEmail:true,
            allowNull: false
        },
        password : {
            type: Sequelize.STRING,
            allowNull: false
        }
    })

    return User
}