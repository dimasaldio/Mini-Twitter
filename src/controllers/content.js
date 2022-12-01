const db = require('../model/connection')
const User = db.users
const Content = db.contents
const Comment = db.comments

class ContentController{

// create content
    async createContent(req,res){
        try {
        const user = await User.findOne({raw:true, where : {email:req.user.email}})
        console.log(user)
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

// get content from user
    async getContentUser(req,res){
        try {
            const findUser = await Content.findAll({raw : true, where : {author : req.params.userName}})
            if(findUser.length === 0){
              return res.status(404).json({message:'no content yet'})
            }
            const userContents = findUser.map(x=>{ return{contentID:x.content_id ,content:x.content}})
            res.status(200).json({data:userContents})
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'error getContentUser, check log'})
        }
    }

// create comment for content
    async createComment(req,res){
        try {
            const user = await User.findOne({raw:true, where:{email:req.user.email}})
            const content = await Content.findOne({raw:true, where:{content_id:req.params.contentID}})
            const userComment = await Comment.create({
                userUserId : user.user_id,
                contentContentId : content.content_id,
                author : user.name,
                post : content.content_id,
                comment : req.body.comment
            })
            res.status(200).json({
                message:'success comment',
                data:userComment
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'error createComment, check log'})
        }
    }

// get content specify
    async showComment(req,res){
        try {
            const showContent = await Content.findOne({raw:true, where:{content_id:req.params.contentID}})
            const showComment = await Comment.findAll({raw:true, where:{post:req.params.contentID}})
            if(showComment.length === 0){
               return res.status(404).json({message:'no content here'})
            }
            const mapContent = showComment.map(x=>{return {comment : x.comment}})
            res.status(200).json({
                data:{
                    content : showContent.content,
                    comment : mapContent
                }
            })
        } catch (error) {
            console.log(error)
            res.status(400).json({message: 'error showComment, check log'})
        }
    }

}

module.exports = new ContentController()