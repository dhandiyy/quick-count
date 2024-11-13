const tpsRouter = require('express').Router()
const tpsController = require('../controllers/tps')

tpsRouter.get('/', tpsController.getAllTps)

module.exports = tpsRouter