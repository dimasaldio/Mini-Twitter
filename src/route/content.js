const express = require('express')
const router = express.Router()
const {getContentUser, createContent, comment, showSpecificContent, like, getAllContent, retweet} = require('../controllers/content')
const authenticationJwt = require('../middlewares/passport')

router.post('/', authenticationJwt ,createContent)
router.get('/', getAllContent)
router.get('/profile/:userName', getContentUser)
router.post('/comment/:contentID',authenticationJwt, comment)
router.get('/:contentID',authenticationJwt, showSpecificContent)
router.post('/like/:contentID', authenticationJwt, like)
router.post('/retweet/:contentID', authenticationJwt, retweet)

module.exports = router