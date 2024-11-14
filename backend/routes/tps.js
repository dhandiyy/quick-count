const tpsRouter = require('express').Router()
const tpsController = require('../controllers/tps')

//CREATE
tpsRouter.post('/', tpsController.createNewTps);

//GET
tpsRouter.get('/', tpsController.getAllTps);

//UPDATE
tpsRouter.put('/:id', tpsController.updateTps);

//DELETE
tpsRouter.delete('/:id', tpsController.deleteTps)

module.exports = tpsRouter