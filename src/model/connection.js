require('dotenv').config()

const dbConfig = require('./config')
const Sequelize  = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host : dbConfig.HOST,
    dialect : dbConfig.DIALECT,
    port : dbConfig.PORT,
    define : {
        timestamps : false
    }
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel') (sequelize,Sequelize)
db.contents = require('./contentModel') (sequelize,Sequelize)
db.comments = require('./commentModel') (sequelize,Sequelize)

// association
db.users.hasMany(db.contents,{
    foreignKey:{
    type : Sequelize.UUID,
    allowNull : false
}})
db.contents.belongsTo(db.users)

db.users.hasMany(db.comments,{
    foreignKey:{
        type:Sequelize.UUID,
        allowNull:false
    }
})
db.comments.belongsTo(db.users)

db.contents.hasMany(db.comments,{
    foreignKey:{
        type:Sequelize.UUID,
        allowNull:false
    }
})
db.comments.belongsTo(db.contents)

module.exports = db