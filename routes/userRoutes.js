const express = require('express')
const { loginUser, registerUser, getUser } = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.get('/get', authMiddleware, getUser)

module.exports = router