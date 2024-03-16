const express = require('express')
const router = express.Router()
const { login,registre} = require('../controllers/authController')
router.post('/login', login)
router.post('/registre',registre )

module.exports = router