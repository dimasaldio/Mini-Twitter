const db = require('../model/connection')
const User = db.users
const Content = db.contents
const Comment = db.comments
const Like = db.likes
const Retweet = db.retweets

class ContentController{

// get all content form all user
    async getAllContent(req,res){
        try {
            const content = await Content.findAll({raw:true})
            if(content.length === 0){
                return res.status(400).json({message:'no content yet'})
            }
            const mapContent = content.map(x=>{return{
                author:x.author,
                content:x.content,
                retweet:x.retweetCounted,
                like:x.likeCounted,
                comment:x.replyCounted
            }})
            res.status(200).json({data:mapContent})

        } catch (error) {
            console.log(error)
            res.status(400).json({message:'error getAllContent, check log'})
        }
    }

// get all content from one user
    async getContentUser(req,res){
        try {
            const content = await Content.findAll({raw : true, where : {author : req.params.userName}})
            if(content.length === 0){
              return res.status(404).json({message:'no content yet'})
            }

            const userContents = content.map(x=>{return{
                author:x.author,
                content:x.content,
                retweet:x.retweetCounted, 
                like:x.likeCounted,
                comment:x.replyCounted
            }
            })
             res.status(200).json({data:userContents})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'error getContent, check log'})
        }
    }

// twit
async createContent(req,res){
    try {
    const user = await User.findOne({raw:true, where : {email:req.user.email}})
    const content = await Content.create({
        userUserId : user.user_id,
        author : user.name,
        content : req.body.content
    })
    res.status(200).json({
        message : 'success create',
        data : content
    })
    } catch(error){
        console.log(error)
        res.status(400).json({message: 'error create, check log'})
    }
}

// comment
    async comment(req,res){
        try {
            const user = await User.findOne({raw:true, where:{email:req.user.email}})
            const content = await Content.findOne({raw:true, where:{content_id:req.params.contentID}})
            const countComment = await Comment.findAndCountAll()
            
            const userComment = await Comment.create({
                userUserId : user.user_id,
                contentContentId : content.content_id,
                post : content.content,
                authorComment : user.name,
                comment : req.body.comment
            })
            await Content.update({replyCounted:countComment.count}, {where:{content_id:req.params.contentID}})
            res.status(200).json({
                message:'success comment',
                data:userComment
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'error createComment, check log'})
        }
    }

// like
    async like(req,res){
        try {
            const content = await Content.findOne({raw:true, where:{content_id:req.params.contentID}})
            const user = await User.findOne({raw:true, where:{email : req.user.email}})
            const like = await Like.findOne({raw:true, where:{contentContentId:req.params.contentID, userUserId: req.user.id}})
            
           if(!like){
            await Like.create({
                userUserId : user.user_id,
                contentContentId : content.content_id,
                authorLike : user.name,
                post : content.content,
                like : true
            })
            res.status(200).json({message:'success like'})
           } else{
                if(like.like === false){
                    await Like.update({like:true}, {where:{contentContentId:req.params.contentID, userUserId:req.user.id}})
                    res.status(200).json({message:'success like'})
                } else{
                    await Like.update({like:false}, {where:{contentContentId:req.params.contentID, userUserId:req.user.id}})
                    res.status(200).json({message:'success unlike'})
                }
           }

            const countLike = await Like.findAndCountAll({where:{contentContentId:req.params.contentID, like:true}})
            return await Content.update({likeCounted:countLike.count}, {where :{content_id:req.params.contentID}})
            
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'error like, check log'})
        }
    }

// retweet
    async retweet(req,res){
        try {
        const user = await User.findOne({where :{ email: req.user.email}})
        const content = await Content.findOne({raw:true, where:{content_id:req.params.contentID}})
        const retweet = await Retweet.findOne({raw:true, where:{contentContentId:req.params.contentID}})
        
        if(!retweet){
            await Retweet.create({
                userUserId:user.user_id,
                contentContentId:content.content_id,
                authorRetweet:user.name,
                post:content.content,
                retweet:true
            })
            res.status(200).json({message:'success retweet'})
        } else{
            if(retweet.retweet===false){
                await Retweet.update({retweet:true}, {where:{contentContentId:req.params.contentID, userUserId:req.user.id}})
                res.status(200).json({message:'success retweet'})
            } else{
                await Retweet.update({retweet:false}, {where:{contentContentId:req.params.contentID, userUserId:req.user.id}})
                res.status(200).json({message:'success unretweet'})
            }
        }
        const countRetweet = await Retweet.findAndCountAll({raw:true, where:{contentContentId:req.params.contentID, retweet:true}})
        return Content.update({countRetweet:countRetweet.count}, {where:{content_id:req.params.contentID}}) 

        } catch (error) {
            console.log(error)
            res.status(400).json({message:'error retweet, check log'})
        }
        
    }

// get content specific
async showSpecificContent(req,res){
    try {
        const content = await Content.findOne({raw:true, where:{content_id:req.params.contentID}})
        const comment = await Comment.findAll({raw:true, where:{contentContentId:req.params.contentID}})
        const like = await Like.findAll({where:{contentContentId:req.params.contentID, like:true}})
        const retweet = await Retweet.findAll({where:{contentContentId:req.params.contentID, retweet:true}})
        
        if(!content){
           return res.status(400).json({message:'no content here'})
        }
        
        res.status(200).json({
            data:{
                authorContent : content.originalAuthor,
                content : content.content,
                retweet : retweet.map(x=>{return {authorRetweet : x.authorRetweet}}),
                like : like.map(x=>{return{authorLike : x.authorLike}}),
                comment : comment.map(x=>{return {authorComment : x.author, comment : x.comment}})
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({message: 'error showSpecificContent, check log'})
    }
}

}

module.exports = new ContentController()