module.exports = (sequelize, Sequelize) => {
    const Content = sequelize.define('content', {
        content_id : {
            type : Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull : false,
            primaryKey : true
        },
        author : {
            type : Sequelize.STRING,
            allowNull : false
        },
        content : {
            type : Sequelize.STRING,
            allowNull : false
        }
    })

    return Content
}