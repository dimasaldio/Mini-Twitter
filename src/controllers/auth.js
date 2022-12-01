require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../model/connection')
const User = db.users
const {hashSync, compareSync} = require('bcrypt')

class AuthController{

    // register
    async register(req,res){
        try {
            await User.create({
                name:req.body.name,
                email:req.body.email,
                password:hashSync(req.body.password, 10)
            })
            res.status(200).json({message : 'success register'})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'error register, check log'})
        }
    }

    // login
    async login(req,res){
        try {
            const result = await User.findOne({
                where : {email : req.body.email}
            })
            if(!result || !compareSync(req.body.password, result.password)){
               return res.status(402).json({message:'wrong username/pass'})
            }
            
            const payload = {email : result.email, id : result.user_id}
            const token = jwt.sign(payload, process.env.SECRET, {expiresIn:'1d'})

            res.status(200).json({
                message : 'success login', 
                data : {
                    email : result.email,
                    token : token
                }
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'error login, check log'})
        }
    }

}

module.exports = new AuthController()