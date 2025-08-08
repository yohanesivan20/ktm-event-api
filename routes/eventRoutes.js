const express = require('express')
const { getListEvent, createEvent } = require('../controllers/eventController')
const authMiddleware = require('../middleware/authMiddleware')
const eventValidationRules = require('../validators/eventValidator')
const validate = require('../middleware/validateMiddleware')

const router = express.Router()

router.post('/get', eventValidationRules.getListValidationRules, validate, authMiddleware, getListEvent)
router.post('/detail/:id', )
router.post('/create', eventValidationRules.createValidationRules, validate, authMiddleware, createEvent)
router.post('/update', authMiddleware, updateEvent)

module.exports = router