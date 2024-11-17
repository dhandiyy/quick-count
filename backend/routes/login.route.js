const router = require('express').Router()
const adminController = require('../controllers/admin.controller')

router.post('/', adminController.login)

module.exports = router