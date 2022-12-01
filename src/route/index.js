const express = require('express')
const router = express.Router()
const content = require('./content')
const auth = require('./auth')

router.use('/auth', auth)
router.use('/', content)

module.exports = router