module.exports = (sequelize, Sequelize)=>{
    const comment = sequelize.define('comment', {
        comment_id : {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey:true
        },
        author : {
            type: Sequelize.STRING,
            allowNull:false
        },
        post : {
            type: Sequelize.STRING,
            allowNull:false
        },
        comment : {
            type: Sequelize.STRING,
            allowNull:false
        }
    })

    return comment
}