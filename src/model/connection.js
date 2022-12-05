require('dotenv').config()
const { DataTypes } = require("sequelize")
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
db.likes = require('./likeModel') (sequelize, Sequelize)
db.retweets = require('./retweetModel') (sequelize, Sequelize)

// association
db.users.hasMany(db.contents,{
    foreignKey:{
    type : DataTypes.UUID,
    allowNull : false
}})
db.contents.belongsTo(db.users)

db.users.hasMany(db.comments,{
    foreignKey:{
        type:DataTypes.UUID,
        allowNull:false
    }
})
db.comments.belongsTo(db.users)

db.contents.hasMany(db.comments,{
    foreignKey:{
        type:DataTypes.UUID,
        allowNull:false
    }
})
db.comments.belongsTo(db.contents)

db.users.hasMany(db.likes,{
    foreignKey:{
        type:DataTypes.UUID,
        allowNull:false
    }
})
db.likes.belongsTo(db.users)

db.contents.hasMany(db.likes,{
    foreignKey:{
        type:DataTypes.UUID,
        allowNull:false
    }
})
db.likes.belongsTo(db.contents)

db.users.hasMany(db.retweets,{
    foreignKey:{
        type:DataTypes.UUID,
        allowNull:false
    }
})
db.retweets.belongsTo(db.users)

db.contents.hasMany(db.retweets,{
    foreignKey:{
        type:DataTypes.UUID,
        allowNull:false
    }
})
db.retweets.belongsTo(db.contents)

module.exports = db