const express = require('express')
const router = express.Router()
const {getContentUser, createContent, createComment, showComment} = require('../controllers/content')
const authenticationJwt = require('../middlewares/passport')

router.post('/', authenticationJwt ,createContent)
router.get('/profile/:userName', getContentUser)
router.post('/:contentID',authenticationJwt, createComment)
router.get('/:contentID',authenticationJwt, showComment)

module.exports = router