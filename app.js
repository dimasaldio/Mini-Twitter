require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./src/route')
const passport = require('passport')
const db = require('./src/model/connection')

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
db.sequelize.sync({alter:true})

app.use(passport.initialize())
require('./src/middlewares/passport')


app.use(router)


app.listen(process.env.PORT, ()=>{
    console.log(`terhubung ke ${process.env.PORT}`)
})