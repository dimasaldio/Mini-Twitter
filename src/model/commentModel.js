const { DataTypes } = require("sequelize")

module.exports = (sequelize)=>{
    const comment = sequelize.define('comment', {
        comment_id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey:true
        },
        authorComment : {
            type: DataTypes.STRING,
            allowNull:false
        },
        post : {
            type: DataTypes.STRING,
            allowNull:false
        },
        comment : {
            type: DataTypes.STRING,
            allowNull:false
        }
    })

    return comment
}